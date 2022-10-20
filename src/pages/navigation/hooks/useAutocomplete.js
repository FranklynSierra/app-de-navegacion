import { useContext, useEffect, useRef, useState } from "react";
import { GoogleContext, MapsContext } from "..";
import { emittedAutocomplete } from "../events/autocompleteEvent";

function useAutocomplete(mode, extraDataDefault = {}) {
  let autocomplete;

  const inputRef = useRef(null);

  const { maps } = useContext(MapsContext);

  const google = useContext(GoogleContext);

  let extraData = {}

  useEffect(() => {
    if (google && maps) {
      autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        fields: ["place_id"],
      });

      setupPlaceChangedListener();
    }
  }, [google, maps]);

  const setupPlaceChangedListener = () => {
    google.maps.event.clearInstanceListeners(inputRef.current);

    autocomplete.bindTo("bounds", maps);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        console.log("Please select an option from the dropdown list.");
        return;
      }

      emittedAutocomplete({
        place: place.place_id,
        mode,
        extraData,
      });
    });
  };

  const setExtraData = (data) => extraData = data

  return { inputRef, setExtraData };
}

export default useAutocomplete;

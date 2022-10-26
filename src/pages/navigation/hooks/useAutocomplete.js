import { useContext, useEffect, useRef, useState } from "react";
import { GoogleContext, MapsContext } from "../context";
import { emittedAutocomplete } from "../events";
import { extraDataDefault } from "./utils";

function useAutocomplete(mode) {
    let autocomplete;

    const inputRef = useRef(null);

    const { maps } = useContext(MapsContext);

    const google = useContext(GoogleContext);

    useEffect(() => {
        if (google && maps) {
        autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
            fields: ["place_id"],
        });

        setupPlaceChangedListener();
        }
    }, [google, maps]);

    const handleListener = () => {
        const place = autocomplete.getPlace();

        if (!place.place_id) {
            console.log("Please select an option from the dropdown list.");
            return;
        }

        emittedAutocomplete({
            place: { value: place.place_id, text: inputRef.current.value },
            mode
        });
    };

    const setupPlaceChangedListener = () => {
        google.maps.event.clearInstanceListeners(inputRef.current);

        autocomplete.bindTo("bounds", maps);

        autocomplete.addListener("place_changed", handleListener);
    };

    return { inputRef };
}

export default useAutocomplete;

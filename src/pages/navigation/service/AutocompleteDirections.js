class AutocompleteDirectionsHandler {
  constructor(map, google, ref, callback) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.DRIVING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);
    this.distance = "";
    this.time = "";
    this.callback = callback

    const [originInput, destinationInput] = ref.inputsRef;

    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput.current,
      { fields: ["place_id"] }
    );

    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput.current,
      { fields: ["place_id"] }
    );
    
    google.maps.event.clearInstanceListeners(originAutocomplete);
    google.maps.event.clearInstanceListeners(destinationAutocomplete);
    this.setupPlaceChangedListener(originAutocomplete, "ORIG");
    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");
  }


  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      console.log("place " + mode)

      if (!place.place_id) {
        console.log("Please select an option from the dropdown list.");
        return;
      }

      if (mode === "ORIG") {
        this.originPlaceId = place.place_id;
      } else {
        this.destinationPlaceId = place.place_id;
      }
      
      this.route();
    
    });
  }

  route() {
    if (!this.originPlaceId || !this.destinationPlaceId) {
      console.log("no valid route",this.originPlaceId,this.destinationPlaceId);
      return;
    }

    console.log("valid route",this.originPlaceId,this.destinationPlaceId);

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        
        if (status === "OK") {
          const {originPlaceId, destinationPlaceId } = me
          me.directionsRenderer.setDirections(response);
          me.callback({
            response, 
            location: {originPlaceId, destinationPlaceId}
          })
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}

export default AutocompleteDirectionsHandler;

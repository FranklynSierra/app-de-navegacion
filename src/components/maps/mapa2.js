import { Loader } from "@googlemaps/js-api-loader";

export const loader = new Loader({
  apiKey: "AIzaSyCoPiXZdDvICYe7B9IdOCaHzhO6ecTlErw",
  version: "weekly",
  libraries: ["places"],
});

let marker, map;

function initMap(google, ref) {
  const posicion = {
    lat: 10.159585,
    lng: -67.729032,
  };

  map = new google.maps.Map(ref.mapRef.current, {
    zoom: 16,
    center: posicion,
  });

  marker = new google.maps.Marker({
    position: posicion,
    map,
    title: "posicion Inicial",
  });

  geoPosiciona();

  function geoPosiciona() {
    if (navigator.geolocation) {
      const geoLoc = navigator.geolocation;
      const watchPos = geoLoc.watchPosition(centraMapa);
    } else {
      alert(
        " Tu navegador no soporta geolcalizacion en esta version del Pirate Trip"
      );
    }
  }

  function centraMapa(position) {
    //console.log("position",position)
    const nuevaPos = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    //console.log("position new",nuevaPos);
    marker.setPosition(nuevaPos);
    map.setCenter(nuevaPos);
  }

  new AutocompleteDirectionsHandler(map, google, ref);
}

class AutocompleteDirectionsHandler {
  constructor(map, google, ref) {
    this.map = map;
    this.originPlaceId = "";
    this.destinationPlaceId = "";
    this.travelMode = google.maps.TravelMode.WALKING;
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRenderer = new google.maps.DirectionsRenderer();
    this.directionsRenderer.setMap(map);

    const {inputsRef, modeSelectorRef} = ref

    const originInput = inputsRef[0].current;
    const destinationInput = inputsRef[1].current;
    const modeSelector = modeSelectorRef.current;
    //const originInput = document.getElementById("origen-input");
    //const destinationInput = document.getElementById("destination-input");
    //const modeSelector = document.getElementById("mode-selector");

    // Specify just the place data fields that you need.
    const originAutocomplete = new google.maps.places.Autocomplete(
      originInput,
      { fields: ["place_id"] }
    );

    // Specify just the place data fields that you need.
    const destinationAutocomplete = new google.maps.places.Autocomplete(
      destinationInput,
      { fields: ["place_id"] }
    );



    this.setupPlaceChangedListener(originAutocomplete, "ORIG");

    this.setupPlaceChangedListener(destinationAutocomplete, "DEST");

    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(originInput);
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(destinationInput);
    this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(modeSelector);

    this.setupClickListener("changemode-walking", google.maps.TravelMode.WALKING);
    
    this.setupClickListener("changemode-transit",google.maps.TravelMode.TRANSIT);
    
    this.setupClickListener("changemode-driving", google.maps.TravelMode.DRIVING); 
  }

  setupClickListener(id, mode) {
    const radioButton = document.getElementById(id);
    console.log("radio", radioButton)
    if(!radioButton){ return;}
   

    radioButton.addEventListener("click", () => {
      console.log(mode)
      this.travelMode = mode;
      this.route();
    });
  }

  setupPlaceChangedListener(autocomplete, mode) {
    autocomplete.bindTo("bounds", this.map);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.place_id) {
        window.alert("Please select an option from the dropdown list.");
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
      console.log("no valid ruta", this.originPlaceId, this.destinationPlaceId)
      return;
    }

    const me = this;

    this.directionsService.route(
      {
        origin: { placeId: this.originPlaceId },
        destination: { placeId: this.destinationPlaceId },
        travelMode: this.travelMode,
      },
      (response, status) => {
        if (status === "OK") {
          me.directionsRenderer.setDirections(response);
        } else {
          window.alert("Directions request failed due to " + status);
        }
      }
    );
  }
}

export default initMap;
/*
identificador del mapa
 <div id="map"></div>
  Este script en el index.html de public
    <script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoPiXZdDvICYe7B9IdOCaHzhO6ecTlErw&callback=initMap">
</script>
*/
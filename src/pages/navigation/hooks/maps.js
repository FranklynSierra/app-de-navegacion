import AutocompleteDirectionsHandler from "./AutocompleteDirections";

function geoPosition(marker, map) {
  if (navigator.geolocation) {
    const geoLoc = navigator.geolocation;

    geoLoc.watchPosition((position) => {
      const newPos = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      marker.setPosition(newPos);
      map.setCenter(newPos);
    });
  } else {
    alert(
      " Tu navegador no soporta geolcalizacion en esta version del Pirate Trip"
    );
  }
}

function initMap(google, ref, callback) {
    let marker, map;

    const positionDefault = { lat: 10.159585, lng: -67.729032 };

    map = new google.maps.Map(ref.mapRef.current, {
        zoom: 16,
        center: positionDefault,
    });

    marker = new google.maps.Marker({
        position: positionDefault,
        map,
        title: "posicion Inicial",
    });

    geoPosition(marker, map);

    new AutocompleteDirectionsHandler(map, google, ref, (response) => {
        callback(response);
    });
}

export default initMap;

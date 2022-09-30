// let marker , map;


// function initMap() {

//   const posicion = {
//     lat: 10.159585,
//     lng: -67.729032,
//   };


//    map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 16,
//     center: posicion,
//   });

//   marker = new google.maps.Marker({
//     position: posicion,
//     map,
//     title : "posicion Inicial"
//   });
//   geoPosiciona()

//   function geoPosiciona(){
//     if (navigator.geolocation){
//     const geoLoc = navigator.geolocation
//     const options = {timeout: 300000}
//     const watchPos = geoLoc.watchPosition(centraMapa, onError, options)
   
//   }else { 
//     alert(" Tu navegador no soporta geolcalizacion en esta version del Pirate Trip")
//   }
// }
//   function centraMapa(position){
//     const nuevaPos = {
//       lat: position.coords.latitude,
//       lng: position.coords.longitude
//     }
//     console.log(nuevaPos)
//     marker.setPosition(nuevaPos)
//     map.setCenter(nuevaPos)
//   } 
//   function onError (){
//     console.error(error)
//   }
//   var origin1 = new google.maps.LatLng(55.930385, -3.118425);
// var origin2 = 'Greenwich, England';
// var destinationA = 'Stockholm, Sweden';
// var destinationB = new google.maps.LatLng(50.087692, 14.421150);

// var service = new google.maps.DistanceMatrixService();
// service.getDistanceMatrix(
//   {
//     origins: [origin1, origin2],
//     destinations: [destinationA, destinationB],
//     travelMode: 'DRIVING',
//     transitOptions: TransitOptions,
//     drivingOptions: DrivingOptions,
//     unitSystem: UnitSystem,
//     avoidHighways: Boolean,
//     avoidTolls: Boolean,
//   }, callback);

// function callback(response, status) {
 
// }
// }
// window.initMap = initMap;

/*
identificador del mapa
 <div id="map"></div>

  Este script en el index.html de public
    <script async
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCoPiXZdDvICYe7B9IdOCaHzhO6ecTlErw&callback=initMap">
</script>
*/
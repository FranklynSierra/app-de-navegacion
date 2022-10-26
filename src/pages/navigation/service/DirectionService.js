import {emittedRoute} from '../events'

class DirectionService {
    constructor(map, google) {
        this.map = map;
        this.google = google;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.travelMode = google.maps.TravelMode.DRIVING;
        this.directionsRenderer.setMap(map);
    }

    chooseOriginPlace(originPlace) {

        return originPlace === null ? this.map.getCenter() : { placeId: originPlace.value };
    }

    createRequest(originPlace, destinationPlace){
        return {
            origin: this.chooseOriginPlace(originPlace),
            destination: { placeId: destinationPlace.value },
            travelMode: this.travelMode,
        }
    }

    route(originPlace, destinationPlace) {

        if (!destinationPlace) {
            console.log("no valid route", originPlace, destinationPlace);
            return;
        }

        console.log("procesando")
        
        const me = this;

        const request = this.createRequest(originPlace, destinationPlace)

        this.directionsService.route( request,

            (response, status) => {

                if (status === "OK") {
                    me.directionsRenderer.setDirections(response);

                    emittedRoute({...response, destine: destinationPlace})
                    
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }
}

export default DirectionService;

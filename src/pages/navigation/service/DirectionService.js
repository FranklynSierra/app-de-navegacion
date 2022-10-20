import {emittedRoute} from '../events/routeEvent'

class DirectionService {
    constructor(map, google) {
        this.map = map;
        this.google = google;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.travelMode = google.maps.TravelMode.DRIVING;
        this.directionsRenderer.setMap(map);
    }

    chooseOriginPlace(originPlace, isOriginCurrent) {
        return isOriginCurrent ? this.map.getCenter() : { placeId: originPlace };
    }

    route(originPlace, destinationPlace, isOriginCurrent = false) {
        if (!destinationPlace) {
            console.log("no valid route", originPlace, destinationPlace);
            return;
        }

        console.log(originPlace, destinationPlace, isOriginCurrent);

        const me = this;

        this.directionsService.route(
            {
                origin: this.chooseOriginPlace(originPlace, isOriginCurrent),
                destination: { placeId: destinationPlace },
                travelMode: this.travelMode,
            },
            (response, status) => {
                if (status === "OK") {
                    me.directionsRenderer.setDirections(response);

                    emittedRoute(response)
                    
                } else {
                    window.alert("Directions request failed due to " + status);
                }
            }
        );
    }
}

export default DirectionService;

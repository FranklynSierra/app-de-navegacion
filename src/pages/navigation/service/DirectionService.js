import {emittedRoute, emittedRouteFailed} from '../events'

import { getCurrentPosition } from '../hooks/utils';

class DirectionService {
    constructor(map, google) {
        this.map = map;
        this.google = google;
        this.directionsService = new google.maps.DirectionsService();
        this.directionsRenderer = new google.maps.DirectionsRenderer();
        this.travelMode = google.maps.TravelMode.DRIVING;
        this.directionsRenderer.setMap(map);
    }

    async chooseOriginPlace(originPlace) {

        if(originPlace === null){

            return await getCurrentPosition()
        }

        return { placeId: originPlace.value } 
    }

    async createRequest(originPlace, destinationPlace){

        return {
            origin: await this.chooseOriginPlace(originPlace),
            destination: { placeId: destinationPlace.value },
            travelMode: this.travelMode,
        }
    }

    async route(originPlace, destinationPlace) {

        if (!destinationPlace) {
            emittedRouteFailed("No valid destine");
            return;
        }

        const me = this;

        const request = await this.createRequest(originPlace, destinationPlace)

        this.directionsService.route( request,

            (response, status) => {

                if (status === "OK") {
                    me.directionsRenderer.setDirections(response);

                    emittedRoute({...response, destine: destinationPlace})
                    
                } else {

                    emittedRouteFailed("Directions request failed");

                }
            }
        );
    }
}

export default DirectionService;

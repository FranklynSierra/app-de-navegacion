import { Loader } from "@googlemaps/js-api-loader";
import { useRef, useEffect, useState } from "react";
import { emittedRoute} from "../events/route"
import { routeDefault } from "./utils";
import initMap from "../service/maps";

function useMaps(){
    const [route, setRoute] =  useState(routeDefault)    
    const mapRef = useRef(null)
    const origenRef = useRef(null)
    const destineRef = useRef(null)

    useEffect(()=> {init()}, [])

    const loader = new Loader({
        apiKey: "AIzaSyCoPiXZdDvICYe7B9IdOCaHzhO6ecTlErw",
        version: "weekly",
        libraries: ["places"],
    });

    const getRoute = ({response: {routes}, location}) => {
        if(routes.length > 0 ){
            const {distance, duration}  = routes[0].legs[0]

            const routeCurrent = {
                distance: distance.value,
                duration: duration.text,
                origen: location.originPlaceId,
                destine: location.destinationPlaceId
            }

            setRoute(routeCurrent)
            
            emittedRoute(routeCurrent)
        }
    }

    const init = async () => {
        try {
            const inputsRef = [origenRef, destineRef]
            const google = await loader.load()
            initMap(google, {mapRef, inputsRef}, getRoute)

        } catch (e) {
            console.log(e)
        }
    }

    return {route, refs : {mapRef, origenRef, destineRef}}
}

export default useMaps
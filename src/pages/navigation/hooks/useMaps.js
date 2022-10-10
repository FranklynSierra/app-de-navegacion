import { Loader } from "@googlemaps/js-api-loader";
import { useState, useRef } from "react";
import initMap from "./maps";

function useMaps(){
    const [distance, setDistance]  = useState(0)
    const mapRef = useRef(null)
    const origenRef = useRef(null)
    const destineRef = useRef(null)

    const loader = new Loader({
        apiKey: "AIzaSyCoPiXZdDvICYe7B9IdOCaHzhO6ecTlErw",
        version: "weekly",
        libraries: ["places"],
      });

    const getRoute = ({routes}) => {
        if(routes.length > 0 ){
            const [route] = routes
            const km = parseFloat(route.legs[0].distance.text.split(" ")[0])
            console.log('route',km)
            setDistance(km)
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

    return {distance, init, refs : {mapRef, origenRef, destineRef}}
}

export default useMaps
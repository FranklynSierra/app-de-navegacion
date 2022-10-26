import { useRef, useContext, useEffect, useState } from "react";
import { GoogleContext, MapsContext } from "../context";
import { geoPositionCurrent, positionDefault } from "./utils";
import {emitter} from "../events"
import DirectionService from "../service/DirectionService";

function useMaps() {
    const google = useContext(GoogleContext);

    const { setMaps } = useContext(MapsContext);

    const mapRef = useRef(null);

    const [service, setService] = useState(null)

    let origen = null, destine = null;

    useEffect(() => {
        if (google) {
        let marker, maps, service;

        maps = new google.maps.Map(mapRef.current, {
            zoom: 16,
            center: positionDefault,
        });

        marker = new google.maps.Marker({
            position: positionDefault,
            maps,
            title: "posicion Inicial",
        });

        geoPositionCurrent((position) => {
            marker.setPosition(position);
            maps.setCenter(position);
        });

        service = new DirectionService(maps, google)
        setService(service)
        setMaps(maps);
        }
    }, [google]);


    const handleAutocomplete = async ({place, mode}) => {

        if(mode === 'origen'){
        origen = place
        }
        
        if(mode === 'destine'){
        destine = place
        }

        service.route(origen, destine)
    }

    useEffect(() => {

        if(service){
        emitter.on('autocomplete', handleAutocomplete)
        }
        
        return () => {
        emitter.removeListener('autocomplete')
        }

    }, [service])
  

    return { mapRef };
}

export default useMaps;

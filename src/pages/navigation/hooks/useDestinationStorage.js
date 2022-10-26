import { useEffect, useState } from 'react'
import {emitter} from '../events'

function useDestinationStorage() {

    let [destines, setDestines] = useState([])

    const loadDestine = () => {

        const destines = JSON.parse(localStorage.getItem("destines"));

        if(destines){
            setDestines(destines)
        }

    }

    const handleDestines = (route) => {

        if(destines.length  > 10){
            console.log('destines', destines.length)
            return;
        }

        const {placeId} = route.request.destination
        
        const index = destines.findIndex(x => x.place === placeId)
        
        if(index >= 0){
            console.log('index', index)
            return;
        }
        
        const {end_address} = route.routes[0].legs[0]

        const {text} = route.destine

        const name = `Address ${destines.length + 1}` 

        const destine = {place: placeId, address: end_address, name, addressInput: text}

        const newDestines = [...destines, destine]
        
        localStorage.setItem("destines", JSON.stringify(newDestines));

        setDestines(newDestines)
    }



    useEffect(()=> {

        loadDestine()

        emitter.on('route', handleDestines)

        return () => emitter.removeListener('route')

    }, []) 


    return {destines}
}

export default useDestinationStorage
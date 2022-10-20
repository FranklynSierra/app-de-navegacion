import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

function useGoogleMaps () {

    const [google, setGoogle] = useState(null)

    const loader = new Loader({
        apiKey: "AIzaSyCoPiXZdDvICYe7B9IdOCaHzhO6ecTlErw",
        version: "weekly",
        libraries: ["places"],
    });

    useEffect(() => {

        async function loadGoogle(){
            const google = await loader.load()
            setGoogle(google)
        }
        
        loadGoogle()

    }, [])

    return {google}
}

export default useGoogleMaps
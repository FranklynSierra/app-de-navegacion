export const requestDefault = {
    origen: "",
    destine: "",
    user: "1",
    price: 0,
    distance: 0,
};

export const routeDefault = {
    origen: "",
    destine: "",
    distance: 0,
    duration: "0 min",
};

export const dataMapsDefault = {
    origen: "", 
    destine: ""
}

export const positionDefault = { lat: 10.159585, lng: -67.729032 };

export const geoPositionCurrent  = (callback) => {

    if (navigator.geolocation) {

        navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;

            callback({ lat: latitude, lng: longitude });
        });
    } 
    else {
        alert(
            " Tu navegador no soporta geolcalizacion en esta version del Pirate Trip"
        );
    }
}


export const getCurrentPosition = () => {

    return new Promise(resolve => {
        navigator.geolocation.getCurrentPosition((pos) => {

            const {latitude, longitude} = pos.coords

            resolve({lat : latitude, lng: longitude})
        }, (err) => console.log(err), {
            timeout: 5000,
            maximumAge: Infinity
        })
    })

}
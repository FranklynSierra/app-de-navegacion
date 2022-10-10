import "../../styles/navigation.css";
import "../../styles/input.css";
import React, { useEffect, useRef, useState } from "react";
import Input from "./input";
import { NavBar } from "../../components/NavBar/NavBar";
import Session from "../../components/user/session";
import useMaps from "./hooks/useMaps";

const rateDefault = 0.75;  

const Navigation = () => {
    const {init, distance, refs} = useMaps()
    const [price, setPrice] = useState(0)

    useEffect(()=> {
        console.log("init maps")
        init()
    }, [])

    useEffect(()=>{
        setPrice((distance * rateDefault).toFixed(2))
    }, [distance])


    const onSubmit = (data) => {
        //TODO send
    }

    return (
        <>
            <NavBar>
                <Session user={"Cristhian Perez"}/>
            </NavBar>
            <main className="row container-navigation">
                <div className="col-12 col-md-8 map" id="map" ref={refs.mapRef}></div>
                <div className="col-12 col-md-4 content">
                    <form action="" >
                        <Input label="Place of departure" ref={refs.origenRef}/>
                        <Input label="Choose your destination"  ref={refs.destineRef} />
                        <div className="information">
                            <p className="text">Distance: {distance} Km</p>
                            <p className="text">Rate: {price} $</p>
                        </div>
                    </form>
                    <div className="rate">
                        <p className="text ">Rate per km is: {rateDefault}$</p>
                        <p className="text ">The rate is subject to cost variation due to holiday prices, rainy days and fuel cost variation.</p>
                    </div>
                </div>
            </main>
        </>

    );
};

export default Navigation;
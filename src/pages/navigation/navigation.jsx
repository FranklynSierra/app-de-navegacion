import "../../styles/navigation.css";
import "../../styles/input.css";
import React, { useEffect, useRef, useState } from "react";
import Input from "./input";
import { NavBar } from "../../components/NavBar/NavBar";
import Session from "../../components/user/session";
import { useForm  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import initMap, {loader} from "../../components/maps/mapa2";

//import '../../components/maps/index.ts'
const schema = yup.object({
    departure: yup.string().required("Departure is required"),
    destination: yup.string().required("Destination is required"),
  }).required();

const rateDefault = 0.75;  

const Navigation = () => {
    const mapRef = useRef(null)
    const origenRef = useRef(null)
    const destineRef = useRef(null)
    const modeSelectorRef = useRef(null)

    const [information, setInformation] = useState({distance: "0",rate: "0"})
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
      });

    useEffect(() => {
        const subscription = watch((value) => {
            // TODO values
        });
        return () => subscription.unsubscribe();
      }, [watch]);
    
    useEffect(()=> {
        const inputsRef = [origenRef, destineRef]
        loader
        .load()
        .then((google) => {
            initMap(google, {mapRef, inputsRef, modeSelectorRef})
        })
        .catch(e => {
          console.log(e)
        });

    }, [])


    const onSubmit = (data) => {
        //TODO send
    }

    return (
        <>
            <NavBar>
                <Session user={"Cristhian Perez"}/>
            </NavBar>
            <main className="row container-navigation">
                <div className="col-12 col-md-8 map" id="map" ref={mapRef}>
                </div>
                <div className="col-12 col-md-4 content">
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                        <Input label="Place of departure" ref={origenRef}/>
                        <Input label="Choose your destination"  ref={destineRef} />
                        <div id="mode-selector" ref={modeSelectorRef} className="card p-1 pe-2">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type" id="changemode-driving"  defaultChecked="checked"/>
                                <label className="form-check-label text-dark" htmlFor="changemode-driving">Driving</label>
                            </div>                                                       
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type" id="changemode-walking"/>
                                <label className="form-check-label text-dark" htmlFor="changemode-walking">Walking</label>
                            </div>                                                       
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="type" id="changemode-transit"/>
                                <label className="form-check-label text-dark" htmlFor="changemode-transit">Transit</label>
                            </div>                                                       
                        </div>
                        <div className="information">
                            <p className="text">Distance: {information.distance} Km</p>
                            <p className="text">Rate: {information.rate} $</p>
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
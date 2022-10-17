import "../../styles/navigation.css";
import "../../styles/input.css";
import React from "react";
import Input from "./components/input";
import { NavBar } from "../../components/NavBar/NavBar";
import Session from "../../components/user/session";
import useMaps from "./hooks/useMaps";
import useTransportationOrder from "./hooks/useTransportationOrder";
import Loading from "../../components/common/Loading";
import { rateDefault } from "./utils";

const Navigation = () => {

    const {route, refs} = useMaps()

    const {request: {price}, handleSubmit, isLoading} = useTransportationOrder()
    
    return (
        <>
            <NavBar>
                <Session user={"Cristhian Perez"}/>
            </NavBar>
            <main className="row container-navigation">
                <div className="col-12 col-md-7 map" id="map" ref={refs.mapRef}></div>

                <div className="col-12 col-md-4 offset-md-1 content">
                    <div className="body">
                        <Input label="Place of departure" ref={refs.origenRef}/>
                        <Input label="Choose your destination"  ref={refs.destineRef} />

                        <div className="information">
                            <p className="text">Distance: {(route.distance / 1000).toFixed(2)} Km </p>
                            <p className="text">Duration: {route.duration}</p>
                            <p className="text">Rate: {price.toFixed(2)} $</p>
                        </div>

                        <div className="d-grid mt-3">
                            <button className="btn btn-primary fw-bold d-flex justify-content-center align-items-center" onClick={handleSubmit}>                             
                                {isLoading ? <Loading/> : 'Confirm Trip'}
                            </button>
                        </div>     
                        
                    </div>
                   
                    <div className="rate  mt-2">
                        <p className="text ">Rate per km is: {rateDefault}$</p>
                        <p className="text ">The rate is subject to cost variation due to holiday prices, rainy days and fuel cost variation.</p>
                    </div>
                </div>
            </main>
        </>

    );
};

export default Navigation;
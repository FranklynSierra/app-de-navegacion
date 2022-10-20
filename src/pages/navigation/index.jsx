import "../../styles/navigation.css";
import "../../styles/input.css";
import React, { useState, createContext } from "react";
import { rateDefault } from "./utils";
import { NavBar } from "../../components/NavBar/NavBar";
import useGoogleMaps from "./hooks/useGoogleMaps";
import Input from "./components/Inputv2";
import InputOrigen from "./components/InputOrigen";
import Session from "../../components/user/session";
import Maps from "./components/Maps";
import TransportService from "./components/TransportService";

export const GoogleContext = createContext();

export const MapsContext = createContext();

const Navigation = () => {
  const { google } = useGoogleMaps();

  const [maps, setMaps] = useState(null);

  return (
    <GoogleContext.Provider value={google}>
      <MapsContext.Provider value={{ maps, setMaps }}>
        <NavBar>
          <Session user={"Cristhian Perez"} />
        </NavBar>

        <main className="row container-navigation">
          <Maps className="col-12 col-md-7 map" />

          <div className="col-12 col-md-4 offset-md-1 content">
            <div className="body">
              <InputOrigen
                label="Place of departure"
                placeholder="Search location origen"
              />

              <Input
                label="Choose your destination"
                mode="destine"
                placeholder="Search location"
              />

              <TransportService />
            </div>

            <div className="rate  mt-2">
              <p className="text ">Rate per km is: {rateDefault}$</p>
              <p className="text ">
                The rate is subject to cost variation due to holiday prices,
                rainy days and fuel cost variation.
              </p>
            </div>
          </div>
        </main>
      </MapsContext.Provider>
    </GoogleContext.Provider>
  );
};

export default Navigation;

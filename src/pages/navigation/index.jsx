import "../../styles/navigation.css";
import "../../styles/input.css";
import React, { useState } from "react";
import { GoogleContext, MapsContext, NavigationContext } from "./context";
import { dataDefault, rateDefault } from "./utils";
import { NavBar } from "../../components/NavBar/NavBar";
import useGoogleMaps from "./hooks/useGoogleMaps";
import InputDestine from "./components/InputDestine";
import InputOrigen from "./components/InputOrigen";
import Session from "../../components/user/session";
import Maps from "./components/Maps";
import TransportService from "./components/TransportService";
import DestinationHistory from "./components/DestinationHistory";
import InformationService from "./components/InformationService";

const Navigation = () => {
  const { google } = useGoogleMaps();

  const [maps, setMaps] = useState(null);

  const [data, setData] = useState(dataDefault);

  return (
    <GoogleContext.Provider value={google}>
      <MapsContext.Provider value={{ maps, setMaps }}>
        <NavigationContext.Provider
          value={{ data, setData }}
        >
            <NavBar>
                <Session user={"Cristhian Perez"} />
            </NavBar>

            <main className="row container-navigation pb-0">
                <Maps className="col-12 col-md-6 map mb-4" />

                <div className="col-12 col-md-5 offset-md-1 content">
                    <div className="body">

                        <div className="inputs">

                            <InputOrigen />

                            <InputDestine />
                        </div>

                        <TransportService />
                    </div>

                    <InformationService rateDefault={rateDefault} />

                    <DestinationHistory />
                </div>
            </main>

        </NavigationContext.Provider>
      </MapsContext.Provider>
    </GoogleContext.Provider>
  );
};

export default Navigation;

import React, { useState } from "react";
import Input from "./input";
import "../../styles/navigation.css";
import "../../styles/input.css";

const Navigation = () => {

    const [information, setInformation] = useState({distance: "0",rate: "0"})

    const rateDefault = 0.75;

    return (
        <main className="row container-navigation">
            <div className="col-8 maps"></div>
            <div className="col-4 content">
                <form action="">
                    <Input label="Place of departure" />
                    <Input label="Choose your destination" />
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
    );
};

export default Navigation;

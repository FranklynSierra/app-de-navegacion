import "../../styles/navigation.css";
import "../../styles/input.css";
import React, { useEffect, useState } from "react";
import Input from "./input";
import { useForm  } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    departure: yup.string().required("Departure is required"),
    destination: yup.string().required("Destination is required"),
  }).required();

const rateDefault = 0.75;  

const Navigation = () => {

    const [information, setInformation] = useState({distance: "0",rate: "0"})
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        mode: 'onBlur'
      });

    React.useEffect(() => {
        const subscription = watch((value) => {
            // TODO values
        });
        return () => subscription.unsubscribe();
      }, [watch]);
    
    const onSubmit = (data) => {
        //TODO send
    }


    return (
        <main className="row container-navigation">
            <div className="col-8 maps"></div>
            <div className="col-4 content">
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                <Input label="Place of departure" {...register("departure")} error={errors.departure?.message}/>
                    <Input label="Choose your destination"  {...register("destination")} error={errors.destination?.message}/>
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

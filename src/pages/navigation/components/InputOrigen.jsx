import React, { useContext, useState } from "react";
import { NavigationContext } from "../context";
import { emittedAutocomplete } from "../events";
import useAutocomplete from "../hooks/useAutocomplete";
import Input from "./Inputv2";

const InputOrigen = () => {
    const placeholder = "Search location origen"
    
    const mode = "origen"

    const { inputRef} = useAutocomplete(mode);

    const [isOriginCurrent, setOriginCurrent] = useState(true);

    const handleClick = () => {
        console.log(isOriginCurrent)

        if (!isOriginCurrent) {

            inputRef.current.value = ""
            
            emittedAutocomplete({place: null, mode});

            setOriginCurrent(true)

            return;
        }

        setOriginCurrent(false)

    };

  return (
    <Input
        label="Place of departure"
        placeholder={isOriginCurrent ? "Location current" : placeholder}
        disabled={isOriginCurrent}
        ref={inputRef}
        icon="https://img.icons8.com/ios/50/FFFFFF/search-more.png"
        iconMap= "https://img.icons8.com/windows/32/9d9d9d/circle.png"
        onClickIcon={ handleClick}
    />
  );
};

export default InputOrigen;

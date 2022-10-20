import React, { useState } from "react";
import { emittedAutocomplete } from "../events/autocompleteEvent";
import useAutocomplete from "../hooks/useAutocomplete";

const InputOrigen = ({ label, placeholder, ...props }) => {
  const mode = "origen";

  const { inputRef, setExtraData } = useAutocomplete(mode, {
    isOriginCurrent: true,
  });

  const [isOriginCurrent, setOriginCurrent] = useState(true);

  const handleClick = () => {
    if (isOriginCurrent) {
      inputRef.current.value = "";
      setExtraData({ isOriginCurrent: true });
      emittedAutocomplete({
        place: undefined,
        mode,
        extraData: { isOriginCurrent: true },
      });
      setOriginCurrent(false)
    } else {
      setExtraData({ isOriginCurrent: false });
      setOriginCurrent(true)
    }
  };

  return (
    <div className="form-group">
      <label>
        <span>{label}</span>

        <div className="input-group">
          <input
            className="form-control"
            {...props}
            ref={inputRef}
            disabled={isOriginCurrent}
            placeholder={isOriginCurrent ? "Location current" : placeholder}
          />

          <div
            className="input-group-text cursor-pointer"
            onClick={handleClick}
          >
            <img src="https://img.icons8.com/ios/50/FFFFFF/search-more.png" />
          </div>
        </div>
      </label>
    </div>
  );
};

export default InputOrigen;

import React from "react";
import useAutocomplete from "../hooks/useAutocomplete";

const Input = ({ label, mode, children, ...props }) => {
  
  const { inputRef } = useAutocomplete(mode);

  return (
    <div className="form-group">
      <label>
        <span>{label}</span>
        <input className="form-control" {...props} ref={inputRef} />
      </label>
    </div>
  );
};

export default Input;

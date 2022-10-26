import React from "react";

const Input = React.forwardRef(
  ({ label, placeholder, icon, onClickIcon, ...props }, ref) => {

    return (
        <div className="form-group">

            <label>

                <span>{label}</span>

                <div className="input-group">
                    <input
                        type="search"
                        className="form-control"
                        {...props}
                        ref={ref}
                        placeholder={placeholder}
                    />

                    <div
                        className="input-group-text cursor-pointer"
                        onClick={onClickIcon}
                    >
                        <img src={icon} />
        
                    </div>

                </div>

            </label>
      </div>
    );
  }
);

export default Input;

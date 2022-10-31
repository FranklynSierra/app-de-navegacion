import React from "react";

const Input = React.forwardRef(
  ({ label, placeholder, icon, iconMap, onClickIcon, ...props }, ref) => {

    return (
        <div className="form-group mb-2">
            <label>
                <div className="row">
                    <div className="col-1">
                        <img className='icon' src={iconMap} alt="" />
                    </div>                    
                    <span className="col-11">{label}</span>
                </div>
                
                <div className="input-group mt-2">
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

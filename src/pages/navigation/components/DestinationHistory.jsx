import React from "react";
import { emittedAutocomplete, emittedDestinationSelected } from "../events";
import { useDestinationHistory, useDestinationStorage } from "../hooks";

const DestinationHistory = () => {

  const { isVisibleHistory, handleClickClose } = useDestinationHistory();

  const { destines } = useDestinationStorage();

  const handleSelected = (place) => {
    const destine = destines.find(x => x.place === place)

    if(destine){
        emittedAutocomplete({
            mode: "destine",
            place: {
                value: destine.place,
                text: destine.addressInput
            }
        })

        emittedDestinationSelected(destine.addressInput)

        handleClickClose()
    }
  }

  return (
    <div
      className={`destination-history card animation-${
        isVisibleHistory ? "up" : ""
      }`}
    >
      <div className="header d-flex justify-content-around align-items-center p-2">
        <p className="title text-dark m-0">Saved destinations</p>
        <span
          className="icon text-dark cursor-pointer"
          onClick={handleClickClose}
        >
          &times;
        </span>
      </div>

      <ul className="list-group list-group-flush overflow-auto">
        {destines.map((v) => (
          <li
            key={v.place}
            className="list-group-item d-flex gap-3 align-items-center cursor-pointer pe-0"
            onClick={() => handleSelected(v.place)}
          >

            <div className="circle rounded-circle d-flex  justify-content-center align-items-center">
              <img
                className="icon"
                src="https://img.icons8.com/material-outlined/24/95abda/address.png"
              />
            </div>

            <div className="information d-flex flex-column ">
              <p className="name text-dark text-truncate">{v.addressInput}</p>
              <p className="address text-muted text-truncate">{v.address}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DestinationHistory;

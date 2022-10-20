import React from "react";
import useTransportationOrder from "../hooks/useTransportationOrder";
import Loading from "../../../components/common/Loading";

const TransportService = () => {
    const {
        request: { price , distance},
        extraData: {duration},
        handleSubmit,
        isLoading,
    } = useTransportationOrder();

    return (
        <>
            <div className="information mt-3">
                <p className="text">Distance: {(distance / 1000).toFixed(2)} Km </p>
                <p className="text">Duration: {duration}</p>
                <p className="text">Rate: {price.toFixed(2)} $</p>
            </div>

            <div className="d-grid mt-3">
                <button
                  className="btn btn-primary fw-bold d-flex justify-content-center align-items-center"
                  onClick={handleSubmit}
                >
                  {isLoading ? <Loading /> : "Confirm Trip"}
                </button>
            </div>
        </>

    );
};

export default TransportService;

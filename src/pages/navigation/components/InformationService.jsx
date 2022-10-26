import React from 'react'

const InformationService = ({rateDefault}) => {
  return (
    <div className="rate  mt-2">
        <p className="text">Rate per km is: {rateDefault}$</p>
        <p className="text">
            The rate is subject to cost variation due to holiday prices,
            rainy days and fuel cost variation.
        </p>
  </div>
  )
}

export default InformationService
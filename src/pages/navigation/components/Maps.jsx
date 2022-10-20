import React from 'react'
import useMaps from '../hooks/useMapsv2'

const Maps = ({className}) => {

  const {mapRef} = useMaps()

  return (
    <div className={className} id="map" ref={mapRef}/>
  )
}

export default Maps
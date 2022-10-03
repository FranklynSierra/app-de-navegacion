import React from 'react'
import fondo from "./fondo.png"
import "../styles/general.css"
import { Link } from 'react-router-dom'

export const Home = () => {
    return (
    <> 
      <div className='home'>
        <div className='title'> 
          <h1 style={{ color:"white", fontSize:"100%"}}> Viaja Seguro</h1>
          <h4 style={{ color:"white" ,fontSize:"70%"}}>encuentra conductores de confianza elije a tu gusto</h4>
        </div>
        <div className='buttons-home'>
          <button type='button' className='btn btn-danger button-home'>conductor</button>
          <Link to={'/navigate'} className='btn btn-success button-home'>cliente</Link>          
        </div>
      </div>    
    </>
  )
}

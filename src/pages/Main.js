import React from 'react'
import { NavBar } from '../components/NavBar/NavBar'
import { Home } from './Home'
import "../styles/general.css"

export const Main = () => {
  
    return (
    <>
        <div className='navBar'> 
          <NavBar/>
        </div>
        <Home/>
    </>
  )
}

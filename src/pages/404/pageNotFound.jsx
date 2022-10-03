import React from 'react'

import { Link } from 'react-router-dom'
import '../../styles/404.css'
export default function PageNotFound() {
  return (
    
       <div className="container">
        <h2>Hmmm...</h2>
        <p>It looks like you're lost...</p>
        <p>That's a trouble?</p>
        <Link to='/'>  <button type="button" className="btn">Go Back</button></Link>
    </div>
   
  )
}

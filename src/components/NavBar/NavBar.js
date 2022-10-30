import React from 'react'
import { Link} from 'react-router-dom';

export const NavBar = () => {
  
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
    <div className="container-fluid">
    <Link  to='/navigate' className='navbar-brand'> Pirate TRIP</Link>
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarText">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link  className="nav-link" to='/'>Inicio</Link>
          </li>
         
        </ul>
        <div className="d-flex">
        <Link to='/login' className='me-2'> <button className="btn btn-outline-success">Login</button> </Link>          
        <Link to='/register'> <button className="btn btn-outline-success">registro</button></Link> 
        </div>
      </div>
    </div>
  </nav>
  )
}

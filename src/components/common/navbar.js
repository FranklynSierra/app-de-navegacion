import React from 'react'

const navbar = ({children}) => {
  return (
    <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Pirate TRIP</a>
            <ul className="nav justify-content-end">
                {children}
            </ul>
        </div>
    </nav>
  )
}

export default navbar
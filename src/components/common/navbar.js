import React from 'react'

const navbar = ({children}) => {
  return (
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">Pirate TRIP</a>
            <ul class="nav justify-content-end">
                {children}
            </ul>
        </div>
    </nav>
  )
}

export default navbar
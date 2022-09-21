import React from 'react'

const input = ({ label, error, ...props}) => {
  return (
    <div className='form-group'>
        <label>
            <span>{label}</span>
            <input className='form-control'/>
        </label>
        <p className='text-danger fw-bold'>{error}</p>                    
    </div>  
  )
}

export default input
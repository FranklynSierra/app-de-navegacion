import React from 'react'

const Input = React.forwardRef(({label, error, ...props}, ref) => {
  return (
    <div className='form-group'>
        <label>
            <span>{label}</span>
            <input className='form-control' {...props} ref={ref}/>
        </label>
        <p className='text-danger fw-bold'>{error}</p>                    
    </div>  
  )
})

export default Input
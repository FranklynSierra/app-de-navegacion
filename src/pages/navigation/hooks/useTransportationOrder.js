import { useState, useEffect } from "react"
import { object, string, number} from 'yup'; 
import { requestDefault} from './utils'
import { rateDefault} from '../utils'
import { useAlert  } from 'react-alert'
import { emitter} from '../events/route'

let orderSchema = object({
    origen: string().required("Required location origen"),
    destine: string().required(),
    user: string().required(),
    price:  number().required("Required price").positive('Price must be positive'),
    distance:  number().required().positive()
});

function useTransportationOrder () {
    const [isLoading, setIsLoading] = useState(false)
    const [request, setRequest] = useState(requestDefault)
    const alert = useAlert()

    useEffect(() => {
      emitter.on('route', (route) => {
        const price = (route.distance * rateDefault)/1000
        setRequest({...request, ...route, price}) 
      })
    
      return () => {
        emitter.removeListener('route')
      }
    }, [])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            setIsLoading(true)
            const requestValidate = await orderSchema.validate({...request})

            // TODO FETCH
            alert.show('Process completed!')
            setIsLoading(false)
    
        } catch (error) {
            if( error?.name === 'ValidationError'){
                setIsLoading(false)
                alert.show(error.errors[0])
            }else{
                console.log(error.name)
            }
        }
    }

    return {request, handleSubmit, isLoading}
}


export default useTransportationOrder
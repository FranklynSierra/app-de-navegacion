import { useState, useEffect } from "react"
import { object, string, number} from 'yup'; 
import { requestDefault, routeDefault} from './utils'
import { rateDefault} from '../utils'
import { useAlert  } from 'react-alert'
import { emitter} from '../events/routeEvent'

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

    const [extraData, setExtraData] = useState({duration: "0 min"})
    const alert = useAlert()

    useEffect(() => {
      emitter.on('route', ({routes, request}) => {

        if(routes.length > 0){
            const {distance: {value}, duration: {text}, end_location} = routes[0].legs[0]

            const {start_address, end_address} = routes[0].legs[0]

            const price = (value * rateDefault)/1000

            setRequest({...request, 
                origen: start_address,
                destine: end_address, 
                distance: value, 
                price}) 

            setExtraData({duration: text}) 
        }

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

    return {request, extraData, handleSubmit, isLoading}
}


export default useTransportationOrder
import { useContext } from "react";
import { NavigationContext } from "../context";


function useDestinationHistory()  {

    const {data: {isVisibleHistory}, setData} = useContext(NavigationContext)

    const handleClickClose = () => setData((oldData) =>  ({...oldData, isVisibleHistory: false}))

    const handleClickOpen = () => setData((oldData) =>  ({...oldData, isVisibleHistory: true}))

    return {isVisibleHistory, handleClickClose, handleClickOpen}
}


export default useDestinationHistory
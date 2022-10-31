import React, {useEffect, useState} from 'react'
import { emitter } from '../events'
import { useAutocomplete, useDestinationHistory } from '../hooks'
import Input from './Inputv2'

const InputDestine = () => {

    const placeholder = "Search destine"

    const {inputRef}  = useAutocomplete("destine")

    const {isVisibleHistory, handleClickOpen} = useDestinationHistory()

    const [isDestineSelected, setIsDestineSelected] = useState(false)

    const [destine, setDestine] = useState("")


    useEffect(() => {

      emitter.on('destine-selected', (destine) => {

        setDestine(destine)
        
        setIsDestineSelected(true)

      })
    
      return () => {
        emitter.removeListener('destine-selected')
      }
    }, [])
    
    const handleFocus =  () => setIsDestineSelected(false)
    
    return (
        <Input 
            ref={inputRef}
            label="Choose your destination"
            placeholder={isDestineSelected? destine : placeholder}
            disabled={isVisibleHistory}
            icon="https://img.icons8.com/external-bearicons-glyph-bearicons/64/FFFFFF/external-Save-social-media-bearicons-glyph-bearicons.png"
            iconMap= "https://img.icons8.com/ios-filled/50/9d9d9d/marker-o.png"
            onClickIcon={handleClickOpen}
            onFocus={handleFocus}
        />
    )
}

export default InputDestine
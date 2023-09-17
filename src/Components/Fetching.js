import React from 'react'
import { BsChevronDown } from 'react-icons/bs'
import CircularProgress from '@mui/material/CircularProgress';

const Fetching = ({setIsPanelDisplayed, setResults, setWaiting}) => {
    const handleClick=()=>{
        setResults({})
        setWaiting(false)
    }
  return (
    <div className='support'>
          <div className='cancel'>
            <button onClick={handleClick}>Another URL</button>
            <button onClick={() => setIsPanelDisplayed(false)}><BsChevronDown size={20}/></button>
            
          </div>
          <div className='loading'>
             <CircularProgress/> 
          </div>
        </div>
  )
}

export default Fetching
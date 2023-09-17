import { CircularProgress } from '@mui/material';
import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
import { BsChevronDown } from 'react-icons/bs';
const DataComp = ({results, setResults, setIsPanelDisplayed, setWaiting}) => {
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

      {results[0].result[0].page_metrics == null ? (<div className='load'><CircularProgress/></div>):
        
        <div>

        
        <div className='result'>
      <div className='score'>
        <div  style={{ width: 80, height: 80 }}>
        <CircularProgressbar value={results && <p>{results[0].result[0].page_metrics.onpage_score}</p>} text={results && `${results[0].result[0].page_metrics.onpage_score}`}/>
        </div>
          <p>OnPage Score   </p>
      </div>
      <div className='otherData'>

       {results && <div className='grid-item'> <p>{results[0].result[0].page_metrics.links_external}</p><p> External Links</p> </div>}
       {results && <div className='grid-item'> <p>{results[0].result[0].page_metrics.links_internal}</p><p> Internal Links</p></div>}
       {results && <div className='grid-item'> <p>{results[0].result[0].page_metrics.broken_links}</p><p> Broken Links</p></div>}
       {results && <div className='grid-item'> <p>{results[0].result[0].page_metrics.broken_resources}</p><p> Broken Resources</p> </div>}
       </div>
      
        </div>
    </div>}
    </div>
  )
}

export default DataComp
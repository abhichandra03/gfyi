import React from 'react'
import { CircularProgressbar } from 'react-circular-progressbar';
const DataComp = ({results}) => {
  return (
    <div>
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
       {results && <div className='grid-item'> <p>{results[0].result[0].page_metrics.links_external}</p><p> External Links</p> </div>}
       </div>
      
    </div>
    </div>
    </div>
  )
}

export default DataComp
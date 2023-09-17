import React from 'react'

const UrlComp = ({texturl, searchUrl, getTask}) => {
  return (
    <div className='input'>
      <div>

      <p>Enter Url For Seo Data</p>
      </div>
        <input value={texturl} onChange={e => searchUrl(e.target.value)}></input>
      <button onClick={getTask}>Send</button>
    </div>
  )
}

export default UrlComp
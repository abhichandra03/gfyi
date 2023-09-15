import React, { useEffect, useState } from 'react'
import {ImCancelCircle} from "react-icons/im"
import axios from "axios"

const Widget = () => {
    const [isPanelDisplayed, setIsPanelDisplayed] = useState(false)
    const [texturl, setTexturl] = useState("")
    const [Results, setResults] = useState([])

    const handleSubmit =() =>{
        console.log(texturl);
    }

    const post_array = [];
    post_array.push({
      "target": "bing.com",
      "max_crawl_pages": 1,
});
  useEffect(() =>{

    
    async function getTask() {
      const config = {
                method: 'post',
                url: 'https://api.dataforseo.com/v3/on_page/task_post',
                auth:{
                    username: 'hovat94597@vip4e.com',
                    password: 'b418551cfc58cd14'
                },
                data: post_array,
                headers: {
                    'content-type': 'application/json'
                  }
            }
            
            let res = await axios(config)
            console.log(res);
            const task_id = res.data.tasks[0].id
            getData(task_id)
          }
          getTask()

     const getData =async(task_id) => {
        const config = {
            method: 'get',
            url: 'https://api.dataforseo.com/v3/on_page/summary/' + "08071719-1535-0216-0000-3aabdf68a6ef",
            auth:{
              username: 'hovat94597@vip4e.com',
                password: 'b418551cfc58cd14'
            },
            headers: {
              'content-type': 'application/json'
            }
          }
          
          let res = await axios(config)
          // console.log(task_id);
          console.log(res);
        }
    },[])

  return isPanelDisplayed ? 
  (<div className='support'>
    <div className='cancel'>

  <button onClick={() => setIsPanelDisplayed(false)}><ImCancelCircle size={20}/></button>
    </div>
    <div className='main-comp'>
        <input value={texturl} onChange={e => setTexturl(e.target.value)}></input>
    </div>
    <button onClick={handleSubmit}>Send</button>
  </div>) : 
  (<button className='button' onClick={() => setIsPanelDisplayed(true)}>Do you want to get data</button>)
}

export default Widget
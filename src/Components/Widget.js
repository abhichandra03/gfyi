import React, { useEffect, useState } from 'react'
import {BsChevronDown} from 'react-icons/bs'
import axios from "axios"
import 'react-circular-progressbar/dist/styles.css';
import CircularProgress from '@mui/material/CircularProgress';
import DataComp from './DataComp';


const Widget = () => {
//   const dotenv = require("dotenv")
// dotenv.config()

    const [isPanelDisplayed, setIsPanelDisplayed] = useState(false)
    const [texturl, setTexturl] = useState("")
    const [results, setResults] = useState({})
    const [taskid, setTaskid] = useState("")
    const [waiting, setWaiting] = useState(false)

    const handleSubmit =() =>{
        console.log(texturl);
        // getTask()
    }

    const post_array = [];
    post_array.push({
      "target": texturl,
      "max_crawl_pages": 1,
    });
    
    const getTask= async()=> {
        const config = {
                method: 'post',
                url: 'https://sandbox.dataforseo.com/v3/on_page/task_post',
                auth:{
                  username: process.env.REACT_APP_LOGIN,
                  password: process.env.REACT_APP_PASSWORD
                },
                data: post_array,
                headers: {
                    'content-type': 'application/json'
                  }
                }
            await axios(config).then(function (response) {
              var data = response['data']['tasks'];
              // Result data
              console.log(data);
              const taskid = data[0].id
              setTaskid(taskid)
            }).catch(function (error) {
              console.log(error);
            }); 
            setWaiting(true)
          } 
          
          useEffect(() => {
            if(waiting){
              
              const interval = setInterval(() => {
                getData()
              }, 3000);
              
              return () => clearInterval(interval);
            }
          }, [taskid,waiting, results])


          const getData =async() => {
            const config = {
              method: 'get',
            url: 'https://sandbox.dataforseo.com/v3/on_page/summary/' + taskid,
            auth:{
              username: process.env.REACT_APP_LOGIN,
              password: process.env.REACT_APP_PASSWORD
          },
            headers: {
              'content-type': 'application/json'
            }
          }
          await axios(config).then(function (response) {
            var data = response['data']['tasks'];
            setResults(data)
          }).catch(function (error) {
            console.log(error);
          });
          if(Object.keys(results).length!==0 && results[0].result[0].page_metrics != null){
             setWaiting(false)
          }
        }
  
      return isPanelDisplayed ? 
  (<div className='support'>
    <div className='cancel'>

  <button onClick={() => setIsPanelDisplayed(false)}><BsChevronDown size={20}/></button>
    </div>
    <div className='input'>
        <input value={texturl} onChange={e => setTexturl(e.target.value)}></input>
      <button onClick={getTask}>Send</button>
    </div>
    {
      Object.keys(results).length!=0 ?
      (results[0].result[0].page_metrics == null ? (<div><CircularProgress/></div>):
      (

        <DataComp results={results}/>
      )
    ):(waiting? <div className='loading'> <CircularProgress/> </div>:<div className='message'>Enter URL for SEO Data</div>)
    }
  </div>) : 
  (<button className='widget-button' onClick={() => setIsPanelDisplayed(true)}>Do you want to get data</button>)
}

export default Widget
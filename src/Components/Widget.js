import React, { useEffect, useState } from 'react'
import {BsChevronDown} from 'react-icons/bs'
import axios from "axios"
import 'react-circular-progressbar/dist/styles.css';
import CircularProgress from '@mui/material/CircularProgress';
import DataComp from './DataComp';
import UrlComp from './UrlComp';
import Fetching from './Fetching';


const Widget = () => {
//   const dotenv = require("dotenv")
// dotenv.config()

    const [isPanelDisplayed, setIsPanelDisplayed] = useState(false)
    const [texturl, setTexturl] = useState("")
    const [results, setResults] = useState({})
    const [taskid, setTaskid] = useState("")
    const [waiting, setWaiting] = useState(false)
    
    const searchUrl =(url) =>{
      const text = url
      text.replace('www.', "")
      text.replace("https://","")
      text.replace("http://","")
      setTexturl(text)
    }

    const post_array = [];
    post_array.push({
      "target": texturl,
      "max_crawl_pages": 1,
    });
    
    const getTask= async()=> {
        const config = {
                method: 'post',
                url: 'https://api.dataforseo.com/v3/on_page/task_post',
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
            url: 'https://api.dataforseo.com/v3/on_page/summary/' + taskid,
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
      Object.keys(results).length!=0?

        <DataComp results={results} setResults={setResults} setIsPanelDisplayed={setIsPanelDisplayed} setWaiting={setWaiting}/>
    
        : 
        (waiting? 
        <Fetching setIsPanelDisplayed={setIsPanelDisplayed} setResults={setResults} setWaiting={setWaiting}/>
        
        :
      <div className='url'>
        <div className='cancel'>

        <button onClick={() => setIsPanelDisplayed(false)}><BsChevronDown size={20}/></button>
        </div>
        <UrlComp texturl={texturl} searchUrl={searchUrl} getTask={getTask}/>
        
      </div> )  
   : 
  (<button className='widget-button' onClick={() => setIsPanelDisplayed(true)}>Do you want to get data</button>)
}

export default Widget
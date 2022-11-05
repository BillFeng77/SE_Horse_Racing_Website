import axios from 'axios'
import { useState } from 'react'
export default function Form(){
    const [news, setNews] = useState({"title":"null","content":"null"})
    axios.get('http://127.0.0.1:5000/news')
        .then(function(response){
            console.log(response.data)
            setNews(response.data)
        })
        .catch(function(error){
            console.log(error)
    })
    return (
        <div style={{textAlign:"center"}}>
        <h1>{news.title}</h1>
        <h2>{news.content}</h2>
        </div>
    )
  }
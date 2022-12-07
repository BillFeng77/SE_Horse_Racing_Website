import {Input,Space} from 'antd';
import axios from 'axios'
import { useState } from 'react'
import Link from 'next/link';



const {Search}=Input;
export default function Searchnews(){
    const [news,setNews]=useState([])
    const column=[{title:'content'},{title:"title"}]
    const onSearch=(value)=>{
        axios.get('http://127.0.0.1:5000/api/search',{params:{value}})
            .then(function(response){
                console.log(response.data)
                setNews(response.data)
            }).catch(function(error){
                console.log(error)
        })
        };
    
    return (
    <>
    <Search placeholder="Search your interested news" onSearch={onSearch}/>
    <table>
    </table>

</>
)
};
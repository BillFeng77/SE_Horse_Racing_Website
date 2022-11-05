import axios from 'axios'
import { useState } from 'react'
export default function Form(){
    const [post, setPost] = useState(null)
    function createPost(){
        axios.post('http://127.0.0.1:5000/api/query', {
            title: "Hello World!",
            body: "This is a new post."
          },{
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
          }
          )
            .then(function(response){
                console.log(response.data)
                setPost(response.data)
       //Perform action based on response
        })
        .catch(function(error){
            console.log(error);
    })
    }
    return (
        <>
        <h1>Form</h1>
        <button onClick={createPost}>Create Post</button>
        </>
    )
  }
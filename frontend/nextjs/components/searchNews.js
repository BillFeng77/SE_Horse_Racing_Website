import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
export default function Search () {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])

  const onChange = (event) => {
    setQuery(event.target.value)
  }
  const onSubmit = () => {
    // make a post request to the Flask server with the search query
    axios.get(`http://127.0.0.1:5000/api/search?q=${query}`)
      .then(response => {
        // update the state with the search results
        setResults(response.data)
        console.log(results)
      }
      )
      .catch(error =>
        console.log(error)
      )
  }

  return (
    <div>
    <input type="text" onChange={onChange} />
    <button onClick={onSubmit}>Search</button>
    <ul>
      {results.map(result =>
        <li key={result._id}><Link href={`/news/${result.title}`}>{result.title}</Link></li>
      )}
    </ul>
  </div>
  )
}

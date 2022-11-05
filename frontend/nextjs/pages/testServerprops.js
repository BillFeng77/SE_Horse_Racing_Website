import { useState, useEffect } from "react"
export default function testServerprops({data}){
  const [userinfo, setUser] = useState("")
  useEffect(()=>{
    setUser(data)
  },[data])
  console.log(data)
  return (
    <div>
      <h1>{userinfo.name}</h1>
    </div>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://127.0.0.1:5000/user`)
  const data = await res.json()
  // Pass data to the page via props
  return { props: { data } }
}
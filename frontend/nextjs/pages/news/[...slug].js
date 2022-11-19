import { useEffect, useState } from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import Layout from '../../components/layout'
import Menu from '../../components/menu'
import PostAMessageForum from '../../components/post_a_comment_forum'
import Image from 'next/image'

export default function newsContent() {
  const router =useRouter()
  const [news, setNews] = useState([])
  const [pictureID, setId] = useState(0)
  const [slug, setSLug] = useState({})
  const [newsInfo, setNewsInfo] = useState({})

  useEffect(()=>{
    if (router.isReady){
      setSLug(router.query.slug)
      populate_data(router.query.slug)
    }
  },[router.isReady, slug])
  
  const populate_data = async (slug) => {
    console.log(slug)
    if (news.length==0){
      axios.get('http://127.0.0.1:5000/news')
          .then(function(response){
              console.log(response.data)
              setNews(response.data)
          })
          .catch(function(error){
              console.log(error)
      })
    }
  }

  const styles = {
    container: {
        display:"flex",
        flexDirection: "column",
        marginLeft: 100,
        width:500
    }
  }

  useEffect(()=>{
    for (let i=0; i<news.length; i++){
      console.log(slug)
      console.log(i)
      console.log(news[i].title)
      if (slug[0]==news[i].title){
        setNewsInfo(news[i])
        setId(i)
      }
    }
  },[news])

  if (Object.keys(newsInfo).length!==0){
    return (
      <>
        <Menu/>
        <div style={{display:"flex",flexDirection:"column"}}>
        <div style={styles.container}>
          <div><h2 style={{color:'darkred'}}>{newsInfo.title}</h2></div>
          <hr style={{background:'lime', color:'black', height:'3px'}}/>
          <div><h5 style={{fontSize:'10'}}>{newsInfo.publishInformation}</h5></div>
          <Image src={`/images/newsImage/${pictureID}.jpg`} width={300} height={300}/>
          <div><h4>{newsInfo.content}</h4></div>
        </div>
        <PostAMessageForum style={{width:400}}/>
        </div>
      </>
    )
  }
  return(
      <>Loading...</>
  )
}
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
        marginLeft: 100,
        width:'80%'
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
        <div style={styles.container}>
          <h2 style={{color:'darkred'}}>{newsInfo.title}</h2>
          <hr style={{color:'black', height:'1px'}}/>
          <h5 style={{fontSize:'10'}}>{newsInfo.publishInformation}</h5>
          <hr style={{color:'black', height:'1px'}}/>
          <Image src={`/images/newsImage/${pictureID}.jpg`} width={300} height={300}/>
          <h4>{newsInfo.content}</h4>
        </div>
        <PostAMessageForum/>
      </>
    )
  }
  return(
      <>Loading...</>
  )
}
import { useEffect, useState } from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import Menu from '../../components/menu'
// import PostAMessageForum from '../../components/post_a_comment_forum'
import Image from 'next/image'
import {Col,Space, Row} from 'antd';
import PostACommentNews from '../../components/post_a_comment_news'
import {Layout} from'antd';
const {Footer}=Layout;

export default function newsContent() {
  const router =useRouter()
  const [news, setNews] = useState([])
  const [pictureId, setId] = useState(0)
  const [slug, setSLug] = useState({})
  const [newsInfo, setNewsInfo] = useState({})

  useEffect(()=>{
    if (router.isReady){
      setSLug(router.query.slug)
      populate_data(router.query.slug)
    }
  },[router.isReady, slug])
  
  const populate_data = async (slug) => {
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
        width:'40%'
    }
  }

  useEffect(()=>{
    for (let i=0; i<news.length; i++){
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
        <Row style = {{display:'flex', margin:"0 auto", width: "85%", marginTop:"30px"}}>
        <Col span = {15}>
        <span style={styles.container}>
          <h2 style={{color:'darkred'}}>{newsInfo.title}</h2>
          <hr style={{color:'black', height:'1px'}}/>
          <h5 style={{fontSize:'10', color:"gray"}}>{newsInfo.publishInformation}</h5>
          <hr style={{color:'black', height:'1px'}}/>
          <img src={`/images/newsImage/${pictureId}.jpg`} height={300} style = {{marginTop: "20px",}}/>
          <h4 style = {{marginTop: "20px",}}>{newsInfo.content}</h4>
        </span>
        </Col>
        <Col span = {9}>
        <PostACommentNews news_id={pictureId}/>
        </Col>
        </Row>
        <Footer style = {{marginTop: "300px", height:"300px", backgroundColor: "#88322F"}}>
    </Footer>
      </>
    )
  }
  return(
      <>Loading...</>
  )
}
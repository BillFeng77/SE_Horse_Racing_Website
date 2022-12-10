import { useEffect, useState } from 'react'
import axios from 'axios'
import {useRouter} from 'next/router'
import Menu from '../../components/menu'
// import PostAMessageForum from '../../components/post_a_comment_forum'
import Image from 'next/image'
import {Col,Space, Row} from 'antd';
import PostACommentNews from '../../components/post_a_comment_news'
import {Layout} from'antd';
import { DislikeFilled, LikeFilled } from '@ant-design/icons';
const {Footer}=Layout;

export default function newsContent() {
  const router =useRouter()
  const [news, setNews] = useState([])
  const [pictureId, setId] = useState(0)
  const [slug, setSLug] = useState({})
  const [newsInfo, setNewsInfo] = useState({})
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);

  useEffect(()=>{
    if (router.isReady){
      setSLug(router.query.slug)
      populate_data(router.query.slug)
    }
  },[router.isReady, slug])
  
  const populate_data = async (slug) => {
    if (news.length==0){
      axios.get('http://127.0.0.1:5000/api/news')
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
        setLikes(news[i].likes)
        setDislikes(news[i].dislikes)
      }
    }
  },[news])


// like/dislike news
  const like = () => {
    axios.post(`http://127.0.0.1:5000/api/news/${newsInfo.title}/likes`)
    .then(function(response){
      console.log(response.data);
    }
    )
    setLikes(likes+1);
  };

  const dislike = () => {
    axios.post(`http://127.0.0.1:5000/api/news/${newsInfo.title}/dislikes`)
    .then(function(response){
      console.log(response.data);
    }
    )
    setDislikes(dislikes+1);
  };



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
          <div style = {{float: "right"}}>
            <span onClick={()=>{like()}}> <LikeFilled style={{color:"#a14845", cursor:"pointer" }}></LikeFilled><span> {likes}</span></span>
            <span onClick={()=>{dislike()}}> <DislikeFilled style={{cursor:"pointer"}}></DislikeFilled><span> {dislikes}</span></span>
          </div>
          <img src={`/images/newsImage/${pictureId}.jpg`} height={300} style = {{marginTop: "20px",}}/>
          <h4 style = {{marginTop: "20px",}}>{newsInfo.content}</h4>
        </span>
        </Col>
        <Col span = {9}>
        <PostACommentNews newsTitle={newsInfo.title}/>
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
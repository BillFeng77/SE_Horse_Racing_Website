import Layout from '../../components/layout'
import { getAllNewsTitles } from '../../lib/news_title'

export default function Post({postData}) {
  return(
      <div style={{textAlign:'center'}}>
          <h3>{postData.title}</h3>
          <h5>{postData.content}</h5>
      </div>
  )
}

export function getStaticPaths() {
  const paths = getAllNewsTitles()
  return {
      paths,
      fallback: false
  }
}

export function getStaticProps(path) {
  const news = path.params.id
  console.log(news)
  const Data=
  [
   {title: "Derby wins!", content: "XXXX wins Derby!"},
   {title: "Derby Lost!", content: "XXXX loss Derby!"}
  ]
  if (news==="Derbywin"){
    const postData=Data[0]
    return {
      props: {postData}
    }
  }
  const postData=Data[1]
  return {
      props: {postData}
  }
}
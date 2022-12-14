import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'

export default function News () {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column'
    },
    compTitle: {
      display: 'inline-block',
      width: 400,
      height: 30,
      color: 'white',
      background: '#8b0000'
    },
    newsTitles: {
      display: 'flex',
      flexWrap: 'wrap',
      width: 400,
      height: 300,
      background: '#fff0f5'
    },
    newsTitle: {
      width: '50%'
    }
  }

  const [news, setNews] = useState([])
  if (news.length === 0) {
    axios.get('http://127.0.0.1:5000/api/news')
      .then(function (response) {
        console.log(response.data)
        setNews(response.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  }
  console.log(news)
  if (news.length !== 0 && news[0].title !== undefined) {
    return (
            <>
            <div style={styles.container}>
            <div style={styles.compTitle}>What's new</div>
            <div style={styles.newsTitles}>
                <div style={styles.newsTitle}><Link href={`/news/${news[0].title}`}>{news[0].title}</Link></div>
                <div style={styles.newsTitle}><Link href={`/news/${news[1].title}`}>{news[1].title}</Link></div>
                <div style={styles.newsTitle}><Link href={`/news/${news[2].title}`}>{news[2].title}</Link></div>
            </div>
            </div>
            </>
    )
  } else {
    return (
            <>Loading...</>
    )
  }
}

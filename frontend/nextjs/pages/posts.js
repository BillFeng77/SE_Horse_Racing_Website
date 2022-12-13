import Head from 'next/head'
import Link from 'next/link'
import Menu from '../components/menu'
import PostCard from '../components/PostCard'
import styles from '../styles/Home.module.css'
import React from 'react'

import { server } from '../config'

export default function Post ({ posts }) {
  return (
        <div>
            <Head>
                <title>Post</title>
            </Head>

            <Menu />

            <main>
                <div className={styles.container}>
                    {posts.length === 0
                      ? (
                        <h2>No added posts</h2>
                        )
                      : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                        )}
                </div>
            </main>

            <Link href="/add-post">
                 <a>Add post</a>
             </Link>

        </div>
  )
}

export async function getServerSideProps (ctx) {
  // get the current environment
  const dev = process.env.NODE_ENV !== 'production'
  const { DEV_URL, PROD_URL } = process.env

  // request posts from api
  const response = await fetch(`${server}/api/comments`) // {server} inported from config
  // extract the data
  // console.log(response)
  const data = await response.json()

  return {
    props: {
      posts: data.message
    }
  }
}

import Head from 'next/head'
import Menu from '../components/menu'
import React from 'react'
import PostAMessageForum from '../components/post_a_comment_forum'
import { Layout } from 'antd'
const { Footer } = Layout

// This page performs Forum
export default function Forum () {
  return (
        <div>
            <Head>
                <title>Forum</title>
            </Head>
            <Menu />
            <PostAMessageForum/>
        <Footer style = {{ marginTop: '300px', height: '300px', backgroundColor: '#88322F' }}>
    </Footer>
        </div>
  )
}

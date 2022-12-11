import Head from 'next/head';
import Link from 'next/link';
import Menu from '../components/menu';
import Selfmenu from '../components/menuv2';
import PostCard from '../components/postCard';
import styles from '../styles/Home.module.css';
// import AddPost from '../components/post_in_forum';
import AddPost from './add-post';
import PostAMessageForum from '../components/post_a_comment_forum';
import Posts from '../components/display_posts_forum'; 
import APost from '../components/display_a_post_forum';
import ScrollableDisplayPostsForum from '../components/scrollable_display_posts_forum';
import {Layout} from'antd';
const {Footer}=Layout;
import { server } from '../config';

export default function Post({ posts }) {
    return (
        <div>
            <Head>
                <title>Post</title>
            </Head>

            <Menu />

            {/* <main>
                <div className={styles.container}>
                    {posts.length === 0 ? (
                        <h2>No added posts</h2>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main> */}
            {/* <APost/> */}
            {/* <Posts/> */}
            {/* <ScrollableDisplayPostsForum/> */}
            {/* <AddPost/> */}
            <PostAMessageForum/>
                                
            {/* <Link href="/add-post">
                 <a>Add post</a>
             </Link> */}
        <Footer style = {{marginTop: "300px", height:"300px", backgroundColor: "#88322F"}}>
    </Footer>
        </div>
    );
}
import Head from 'next/head';
import Link from 'next/link';
import Menu from '../components/menu';
import PostCard from '../components/PostCard';
import styles from '../styles/Home.module.css';
// import AddPost from '../components/post_in_forum';
import AddPost from './add-post';
import PostAMessageForum from '../components/post_a_comment_forum';
import Posts from '../components/display_posts_forum'; 
import APost from '../components/display_a_post_forum';
import ScrollableDisplayPostsForum from '../components/scrollable_display_posts_forum';

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
             
        </div>
    );
}

// export async function getServerSideProps(ctx) {
//     // get the current environment
//     let dev = process.env.NODE_ENV !== 'production';
//     let { DEV_URL, PROD_URL } = process.env;

//     // request posts from api
//     let response = await fetch(`${server}/api/comments`);   //{server} inported from config
//     // extract the data
//     //console.log(response)
//     let data = await response.json();

//     return {
//         props: {
//             posts: data['message'],
//         },
//     };
// }
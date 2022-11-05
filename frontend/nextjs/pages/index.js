import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.css';
import { useState } from 'react';
import NewsLinks from '../components/newsLinks';
import Menu from '../components/menu';


export default function Home() {
  return (
    <Menu/>
  );
}





//previous homepage applying components/layout.js 
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
// export default function Home() {
//   return (
//     <Layout home>
//       <Head>
//         <title>{siteTitle}</title>
//       </Head>
      
//       <section className={utilStyles.headingMd}>
//         <p style={{textAlign:'center'}}>The Community For Horse Racing Lovers</p>
//         <NewsLinks/>
//       </section>
//     </Layout>
//   );
// }

import react from 'react'
import Link from 'next/link'
export default function NewsLinks(){
    const titles = ['Derbywin','Derbyloss']
    return(
      <>
        {titles.map((title)=>{
            const fullpath=`/news/${title}`
            return (
                <div style={{textAlign:'center'}}>
                    <Link href={fullpath}>{title}</Link>
                    <br/>
                </div>
            )
        }
        )
        }
      </>
    )

}

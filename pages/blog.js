import Link from 'next/link'

import Layout from '../components/layout/layout'
import Date from '../components/date/date'
import { getSortedPostsData } from '../lib/filesystem'

//style
import utilStyles from '../styles/utils.module.css'

export async function getStaticProps() {
  const allPostsData = getSortedPostsData()

  return {
    props: {
      allPostsData
    }
  }
}


export default function Blog ({ allPostsData }) {

    return (
        <Layout>
            <ul className={utilStyles.list}>
                { allPostsData.map( ({id, date, title}) => (

                    <li className={utilStyles.listItem} key={id}>
                      <Link href={`/posts/${id}`}>
                         {title}
                      </Link>
                    <br />
                    <Date dateString={date} />
                  </li>
                )) }
            </ul>
        </Layout>
    )

}
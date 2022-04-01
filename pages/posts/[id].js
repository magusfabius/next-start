import Head from 'next/head'
import Layout from '../../components/layout/layout'
import Date from '../../components/date/date'
import { getAllPostIds, getPostData } from '../../lib/filesystem'

// style
import utilStyles from '../../styles/utils.module.css'


export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
      paths,
      fallback: false
    }
  }

export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
      props: {
        postData
      }
    }
  }


export default function Post({ postData }) {
    return (
        <Layout blogpost>
            <Head>
                <title>{postData.title}</title>
            </Head>

            <br></br>

            <h1 className={utilStyles.headingXl}>
                {postData.title}
            </h1>  

            <div className={utilStyles.lightText}>
                <Date dateString={postData.date} />
            </div>

            <br></br>

            <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
        </Layout>
      )
}
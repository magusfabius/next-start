import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout/layout'
import utilStyles from '../styles/utils.module.css'

export default function Home() {
  return (
    <Layout home>
        <Head>
            <title>{siteTitle}</title>
        </Head>
        
        <section className={utilStyles.headingMd}>
            <p> Be very good at something then link other skills</p>
        </section>

        { /* NAVIGATION */ }
        <div className="flex justify-center space-x-4">
            <Link href={"/about"}>
                <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-xl text-white">
                    about
                </button>
            </Link>

            <Link href={"/blog"}>
                <button className="px-4 py-1 bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 rounded-xl text-white">
                    blog
                </button>
            </Link>

            <Link href={"/index_pasta"}>
                <button className="px-4 py-1 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 focus:outline-none focus:ring focus:ring-amber-300 rounded-xl text-white">
                    pasta
                </button>
            </Link>

            <Link href={"/endorfine"}>
                <button className="px-4 py-1 bg-purple-500 hover:bg-purple-600 active:bg-purple-700 focus:outline-none focus:ring focus:ring-purple-300 rounded-xl text-white">
                    endorfine
                </button>
            </Link>

            <Link href={"/rewire"}>
                <button className="px-4 py-1 bg-green-500 hover:bg-green-600 active:bg-green-700 focus:outline-none focus:ring focus:ring-green-300 rounded-xl text-white">
                    Rewire your brain
                </button>
            </Link>
        </div>

        <br></br>

        <section>
            <h1>My Digital Assets: </h1>
            
                <a target="_blank" style={{textDecorations: 'none', color: 'inherit'}} href="https://app.earth2.io/#profile/e3fbd188-0f0e-40ca-b410-db374b9ad651"> 
                    <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-xl text-white"> 
                        Earth2 
                    </button>
                </a>
            
        </section>

        <br></br>
        <br></br>

        <section>
            <h1>You need help? You need inspiration?</h1>
            <p> Read the article 'How to come up with a great business idea' </p>

            <div className="flex justify-center space-x-4">
                <Link href="https://www.freelancer.com/" target="_blank">
                    <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-xl text-white">
                        Freelancer
                    </button>
                </Link>

                
                <Link href="https://www.freelancer.com/articles/starting-your-business?w=f&ngsw-bypass=#">
                    <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-xl text-white">
                        read article
                    </button>
                </Link>
            </div>
        </section>
      
    </Layout>
  )
}

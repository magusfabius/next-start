import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Layout from '../components/layout/layout'

import Swiper from '../components/swiper/swiper'

// import { getOpensea } from '../lib/requests'


/*
{
    primary_asset_contracts: [],
    traits: {},
    stats: [Object],
    banner_image_url: null,
    chat_url: null,
    created_date: '2022-03-30T14:57:30.136517',
    default_to_fiat: false,
    description: null,
    dev_buyer_fee_basis_points: '0',
    dev_seller_fee_basis_points: '0',
    discord_url: null,
    display_data: [Object],
    external_url: null,
    featured: false,
    featured_image_url: null,
    hidden: true,
    safelist_request_status: 'not_requested',
    image_url: null,
    is_subject_to_whitelist: false,
    large_image_url: null,
    medium_username: null,
    name: 'nftcollector555 Collection',
    only_proxied_transfers: false,
    opensea_buyer_fee_basis_points: '0',
    opensea_seller_fee_basis_points: '250',
    payout_address: null,
    require_email: false,
    short_description: null,
    slug: 'nftcollector555-collection',
    telegram_url: null,
    twitter_username: null,
    instagram_username: null,
    wiki_url: null,
    is_nsfw: false
  },
*/

// todo: use SWR to fetch data (Client-Side)
// todo: If you want to use GraphQL API or libs like Axios, you can create your own fetcher function. Check SWR website
import useSWR from 'swr'

// custom fetcher function to pass to useSWR
const fetcher = async (url) => {
  const res = await fetch(url);
  console.log("custom fetcher res: ", res)
  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Attach extra info to the error object.
    error.info = await res.json();
    error.status = res.status;
    throw error;
  }

  return res.json();
};

  
function fetchData() {
  const { data, error } = useSWR('https://api.opensea.io/api/v1/collections?offset=0&limit=300', fetcher)

  return {
    data: data,
    isLoading: !error && !data,
    isError: error
  }
}

// function to show the fetched data
function showData(){
  const {data, isLoading, isError} = fetchData()

  if (isLoading) return <p>Loading ...</p>
  if (isError) return <p>Error: {isError}</p>

  return ( 
      
      data.collections.map(collection => { 
        return (
          collection.image_url ? ( 
            <div className="card" key={collection.slug + collection.name}>
              <p>{collection.name}</p>
              <Image src={ collection.image_url } height={400} width={250}></Image>
            </div>
          ) : <p> no image </p>
        )
  })
    )
}

export default function Endorfine() {
  return (
    <Layout>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          I think this is a nice thing.
        </h1>

        <p className="description">
            Would you buy it?
        </p>

      
       
       { showData() }
      </main>

      <footer>
       <p>This is the footer</p>
      </footer>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        footer {
          width: 100%;
          height: 100px;
          border-top: 1px solid #eaeaea;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        footer img {
          margin-left: 0.5rem;
        }

        footer a {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title a {
          color: #0070f3;
          text-decoration: none;
        }

        .title a:hover,
        .title a:focus,
        .title a:active {
          text-decoration: underline;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family: Menlo, Monaco, Lucida Console, Liberation Mono,
            DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        .logo {
          height: 1em;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </Layout>
  )
}

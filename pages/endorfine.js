import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/layout/layout'

import myEpicNft from '../utils/contracts/myEpicNft.json'


// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-mdwu5xo1vp';
const TOTAL_MINT_COUNT = 50;
const CONTRACT_ADDRESS = "0x71a438d35D408D6eF1c69cfC24b565483db7dFaB"


export default function Endorfine() {
  const [currentAccount, setCurrentAccount] = useState("");
  const [currentError, setCurrentError] = useState("");
  const [totalMinted, setTotalMinted] = useState(null);
  const [mintedNFT, setMintedNFT] = useState("");
  const [loading, setLoading] = useState(false)

  const checkIfWalletIsConnected = async () => {
    /*
    * Check if we're authorized to access the user's wallet, injected by Metamask
    */
   /* // it ask to connect metamask immediately
    if (typeof window !== 'undefined' && window.ethereum) {
      // check if user is connected to MetaMask
      window.ethereum.enable().then(() => {
        console.log('User is connected to MetaMask');
      }).catch(() => {
        console.log('User is not connected to MetaMask');
        return
      });
    } else {
      console.log("You don't have Metamask maybe? window.ethereum is not defined");
      return
    }
    */
    const { ethereum } = window;

    if (!ethereum) {
      console.log("Make sure you have metamask!");
      return;
    } else {
      console.log("We have the ethereum object", ethereum);
    }

    /*
    * Check if we're authorized to access the user's wallet
    */
    const accounts = await ethereum.request({ method: 'eth_accounts' });

    /*
    * User can have multiple authorized accounts, we grab the first one if its there!
    */
    if (accounts.length !== 0) {
      const account = accounts[0];
      console.log("Found an authorized account:", account);
      setCurrentAccount(account);

      // Setup listener! This is for the case where a user comes to our site
      // and ALREADY had their wallet connected + authorized.
      setupEventListener()
    } else {
      console.log("No authorized account found");
    }
  }

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      /*
      * Fancy method to request access to account.
      */
      const accounts = await ethereum.request({ method: "eth_requestAccounts" });

      /*
      * Boom! This should print out public address once we authorize Metamask.
      */
      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]); 

      // Setup listener! This is for the case where a user comes to our site
      // and connected their wallet for the first time.
      setupEventListener() 

    } catch (error) {
      console.log(error);
    }
  }

  // CONTRACT FUNCTIONS
  // Setup our listener.
  const setupEventListener = async () => {
    // Most of this looks the same as our function askContractToMintNft
    try {
      const { ethereum } = window;

      if (ethereum) {
        // Same stuff again
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        // THIS IS THE MAGIC SAUCE.
        // This will essentially "capture" our event when our contract throws it.
        // If you're familiar with webhooks, it's very similar to that!
        connectedContract.on("NewEpicNFTMinted", (from, tokenId) => {
          console.log(from, tokenId.toNumber())
          setMintedNFT(tokenId.toNumber())
        });

        console.log("Setup event listener!")

      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log(error)
      setCurrentError(error.msg)
    }
  }

  // Minting function
  const askContractToMintNft = async () => {
    setLoading(true)

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        console.log("Going to pop wallet now to pay gas...")
        let nftTxn = await connectedContract.makeAnEpicNFT({value: ethers.utils.parseEther('0.025')});

        console.log("Mining...please wait.")
        await nftTxn.wait();
        
        console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`);

        //update totalMinted
        getTotalMinted()

      } else {
        console.log("Ethereum object doesn't exist!");
      }

    } catch (error) {
      console.log(error)
      setCurrentError(error.msg)
    }

    setLoading(false)
  }

  // Get the total number of NFTs minted
  const getTotalMinted = async () => {
    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const connectedContract = new ethers.Contract(CONTRACT_ADDRESS, myEpicNft.abi, signer);

        const totalMinted = await connectedContract.getTotalNFTMintedSoFar();
        console.log("Total minted:", totalMinted.toNumber());

        setTotalMinted(totalMinted.toNumber());        
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("getTotalMinted error:", error)
      setCurrentError(error.msg)
    }
  }

  // RENDER METHODS
  const renderNotConnectedContainer = () => (
    <button onClick={connectWallet} className="px-4 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-xl text-white">
      Connect to Wallet
    </button>
  );

  const renderMintButton = () => {
    if(totalMinted >= 50){
      return <button className="sold-out-button"> SOLD OUT </button>
    }else if(loading){
      return <p style={{color: "white"}}>Loading ...</p>
    }else{
      return <button onClick={() => askContractToMintNft()} className="cta-button mint-button"> Mint NFT </button>
    }
  }

  useEffect(() => {
    checkIfWalletIsConnected();
    getTotalMinted();
  }, []);

  return (
    <div className="App">
      <Head>
        <title>Endorfine Labs</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          Endorfine Labs
        </h1>

        <p className="description">
            We cook the next NFT trend.
        </p>

        
          <div className="container">
            <div className="header-container">
              <p className="header gradient-text">My NFT Collection</p>
              <p className="sub-text">
                Mint your brand new NFT for 0.025 ETH ;)
              </p>

              <br></br>

              { (totalMinted != null) ? (
              <p className="sub-text">
                {totalMinted} / { TOTAL_MINT_COUNT } 
              </p>
              ) : null }

              <br></br>

              {currentAccount ? 
                (renderMintButton()) 
                : 
                (renderNotConnectedContainer())
              }

              <br></br>

              <div className="grid">
                { mintedNFT ? (<p className="sub-text"> Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. <a style={{color: "purple"}} target="_blank"  href={`https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${mintedNFT}`}> CHECK IT OUT</a> </p>) : null }
              </div>
              
            </div>

           
            { currentError ? 
              (
                <div className="error-container">
                  {currentError}
                </div>
              )
              : null 
            }
           

          <div className="footer-container">
            <a target="_blank" href={TWITTER_LINK}>
              <Image
                priority
                src="/images/twitter-logo.svg"
                height={100}
                width={100}
                alt="twitter logo"
              />
            </a>

            <a target="_blank" href={OPENSEA_LINK}>
              <Image
                priority
                src="/images/opensea-logo.svg"
                height={70}
                width={70}
                alt="opensea logo"
              />
            </a>
          </div>
            
          </div>
        

      </main>

      <footer>
       <p className="sub-text">TO THE MOON? NAH, TO MARS </p>
      </footer>

      <style jsx global>{`
      .App {
        height: 100vh;
        background-color: #0d1116;
        overflow: scroll;
        text-align: center;
      }
      
      .container {
        height: 100%;
        background-color: #0d1116;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }

      .error-container {
        height: 100%;
        background-color: red;
        display: flex;
        text-align: center;
        text-transform: uppercase;
        text-background: white;
      }
      
      .header-container {
        padding-top: 30px;
      }
      
      .header {
        margin: 0;
        font-size: 50px;
        font-weight: bold;
      }

      .title {
        margin: 0;
        line-height: 1.15;
        font-size: 4rem;
        color: white;
      }

      .description {
          line-height: 1.5;
          font-size: 1.5rem;
          text-align: center;
          color: white;
        }
      
      .sub-text {
        font-size: 25px;
        color: white;
      }
      
      .gradient-text {
        background: -webkit-linear-gradient(left, #60c657 30%, #35aee2 60%);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
      
      .cta-button {
        height: 45px;
        border: 0;
        width: auto;
        padding-left: 40px;
        padding-right: 40px;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        font-weight: bold;
        color: white;
      }
      
      .connect-wallet-button {
        background: -webkit-linear-gradient(left, #60c657, #35aee2);
        background-size: 200% 200%;
        animation: gradient-animation 4s ease infinite;
      }
      
      .mint-button {
        background: -webkit-linear-gradient(left, #e9e00a, #ff6fdf);
        background-size: 200% 200%;
        animation: gradient-animation 4s ease infinite;
        margin-right: 15px;
      }

      .sold-out-button {
        background: -webkit-linear-gradient(left, #ff6fdf, #e95e0a);
        background-size: 200% 200%;
        animation: gradient-animation 4s ease infinite;
        margin-right: 15px;
      }
      
      .opensea-button {
        background-color: rgb(32, 129, 226);
      }
      
      .mint-count {
        color: white;
        font-size: 18px;
        font-weight: bold;
      }
      
      .footer-container {
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 30px;
      }
      
      .footer-text {
        color: white;
        font-size: 16px;
        font-weight: bold;
      }
      
      /* KeyFrames */
      @-webkit-keyframes gradient-animation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      @-moz-keyframes gradient-animation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      @keyframes gradient-animation {
        0% {
          background-position: 0% 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0% 50%;
        }
      }
      `}</style>

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

      <style jsx>{`
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

    </div>
  )
}

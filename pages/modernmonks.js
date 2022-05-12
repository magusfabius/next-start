import Image from 'next/image'
import Head from 'next/head'

import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

// TODO: change
import myEpicNft from '../utils/contracts/myEpicNft.json'

    // Constants
    const TWITTER_HANDLE = 'modernmonksNFT';
    const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
    const OPENSEA_LINK = 'https://testnets.opensea.io/collection/squarenft-mdwu5xo1vp';
    const TOTAL_MINT_COUNT = 8888;
    const CONTRACT_ADDRESS = "0x71a438d35D408D6eF1c69cfC24b565483db7dFaB"

export default function ModernMonks () {
    const [currentAccount, setCurrentAccount] = useState("");
    const [currentError, setCurrentError] = useState("");
    const [totalMinted, setTotalMinted] = useState(null);
    const [mintedNFT, setMintedNFT] = useState("");
    const [loading, setLoading] = useState(false)

    const checkIfWalletIsConnected = async () => {
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
        <button onClick={connectWallet} className="bg-transparent border border-amber-500 hover:border-yellow-500 text-lg text-amber-500 hover:text-yellow-500 font-bold py-2 px-4 rounded-full">
            Connect to Wallet
        </button>
      );
    
      const renderMintButton = () => {
        if(totalMinted >= 50){
          return <p> SOLD OUT! BUY ON OPENSEA! </p>
        }else if(loading){
          return <p style={{color: "white"}}>Loading ...</p>
        }else{
          return <button onClick={() => askContractToMintNft()} className="bg-transparent border border-sky-500 hover:border-green-500 text-lg text-sky-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">MINT</button>
        }
      }
    
      useEffect(() => {
        checkIfWalletIsConnected();
        getTotalMinted();
      }, []);

    return (
        <div className="leading-normal tracking-normal">
              <Head>
                <title>🧘 Modern Monks 🧘</title>
             </Head>


            <nav id="header" className="fixed w-full z-10 top-0" style={{backgroundColor: 'rgba(253, 245, 231, 0.5)'}}>
              <div className="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">

                <div className="pl-4">
                  <a className="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl" href={"/"}>
                    Endorfine Labs
                  </a>
                </div>

                <div className="block lg:hidden pr-4">
                  <button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <title>Menu</title>
                      <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                    </svg>
                  </button>
                </div>

                <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-100 md:bg-transparent z-20" id="nav-content">
                  <ul className="list-reset lg:flex justify-end flex-1 items-center">
                    <li className="mr-3">
                      <a className="inline-block py-2 px-4 text-gray-900 font-bold no-underline" href="#">Mint</a>
                    </li>
                    <li className="mr-3">
                      <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4" href="#">Story</a>
                    </li>
                    <li className="mr-3">
                      <a className="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4" href="#">Mind-Map</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>

            <div className="w-full md:max-w-3xl mx-auto pt-8 pb-8 text-center break-normal">

                 <div>
                     <p className="text-black font-extrabold text-2xl md:text-1xl">Modern Monks</p>

                    
                    <Image
                        priority
                        src="/images/monk.png"
                        className="object-cover h-300 w-300"
                        height={300}
                        width={300}
                        alt="monk"
                    />

                     <p className="italic"> 🧘  If you are here there’s a reason. You are searching for peace of mind in this chaotic world. 🧘 </p>
                 </div>
                 

                 <div className="pt-8 mx-4">
                    <figure className="bg-slate-100 rounded-xl p-8 dark:bg-slate-800 shadow-xl shadow-slate-300/60">
                        <div className="pt-6 md:p-8 text-center space-y-4">
                            <blockquote>
                                <p className="text-lg font-medium dark:text-slate-200">
                                    8888 modern monks meditating on the Ethereum blockchain.
                                    Mint your brand new NFT for 0.01 and wait for the reveal day.
                                </p>
                            </blockquote>
                            <figcaption className="font-medium">
                                <div className="text-slate-200 dark:text-slate-200 text-lg">
                                    { (totalMinted != null) ? (
                                    <p className="sub-text">
                                        {totalMinted} / { TOTAL_MINT_COUNT } 
                                    </p>
                                    ) : null }
                                </div>
                                <br></br>
                                    {currentAccount ? 
                                        (renderMintButton()) 
                                        : 
                                        (renderNotConnectedContainer())
                                    }
                            </figcaption>
                        </div>
                    </figure>
                 </div>

                <div className="pt-8">
                  <p className="text-black font-extrabold text-1xl md:text-1xl"> Long Story Short </p>
                  <p className="text-left">
                      I had anxiety problems and meditation saved me.
                      I always think about the big world problems, but how can I help the world if I’m not okay with myself? How can I help in difficult moments if I don’t have the mind-tools to manage stress and fear? 

                      Art is a form of meditation and while I was creating the monks I felt better. 
                      Trying to discover the possible combinations and how many things I could create in a tiny space of 50x50 pixels gave me a reason and a creative exercise.
                  </p>

                  <br></br>
                  
                  <p className="text-black font-extrabold text-1xl md:text-1xl"> Why  </p>
                  <p className="text-left">
                    “Of course, you have to pay the bills, but listen to your heart, and let that be your guidance.  That’s been pretty much my Golden Rule throughout my whole life, to get out of the head and listen to the heart.”   
                    We have our dreams; we have our desires; we have our intentions.  But what Roger, along with Deepak Chopra and the Chopra Center teach is, to have your desires, have your dreams, and have your intentions, but don’t be attached to the outcome.  
                  </p>
                </div>
              
            </div>


            <div className="w-full pt-2 text-center" style={{backgroundColor: '#fdf5e7'}}>
                <Image src="/images/om.png" height={50} width={50} alt="OM" priority/>
                <h1 className="text-3.5xl font-extrabold text-center">About the Creator</h1>
                <p> Hi! It's me! Fabius! Who am I? Well if I got to define myself for the things that I could do I can call my self a developer, an artistand a musician.</p>
            </div>

            <div className="w-full mt-8 text-center">

              <div class="grid grid-cols-5 gap-4 pt-8">

              <div class="mx-auto flex flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60">
                <p class="text-4xl">🔗</p>
                <div class="p-4">
                  <small class="text-blue-400 text-xs">Ethereum Blockchain</small>
                  <h1 class="text-2xl font-medium text-slate-600 pb-2">ERC721A</h1>
                  <p class="text-sm tracking-tight font-light text-slate-400 leading-6">Developed with best practices to save gas</p>
                </div>
              </div>

              <div class="mx-auto flex flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60">
                <p class="text-4xl">💳</p>
                <div class="p-4">
                  <small class="text-blue-400 text-xs">Community Advantages</small>
                  <h1 class="text-2xl font-medium text-slate-600 pb-2">Membership</h1>
                  <p class="text-sm tracking-tight font-light text-slate-400 leading-6">For next projects (planned event in Italy coming up)</p>
                </div>
              </div>

              <div class="mx-auto flex flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60">
              <p class="text-4xl">💰</p>
                <div class="p-4">
                  <small class="text-blue-400 text-xs">Refund</small>
                  <h1 class="text-2xl font-medium text-slate-600 pb-2">Refund policies</h1>
                  <p class="text-sm tracking-tight font-light text-slate-400 leading-6">Dodge is an American brand of automobiles and a division of Stellantis, based in Auburn Hills, Michigan..</p>
                </div>
              </div>

              <div class="mx-auto flex flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60">
              <p class="text-4xl">💰</p>
                <div class="p-4">
                  <small class="text-blue-400 text-xs">Reveal Day</small>
                  <h1 class="text-2xl font-medium text-slate-600 pb-2">Surprise</h1>
                  <p class="text-sm tracking-tight font-light text-slate-400 leading-6">Dodge is an American brand of automobiles and a division of Stellantis, based in Auburn Hills, Michigan..</p>
                </div>
              </div>

              <div class="mx-auto flex flex-col justify-center bg-white rounded-2xl shadow-xl shadow-slate-300/60">
              <p class="text-4xl">🎁</p>
                <div class="p-4">
                  <small class="text-blue-400 text-xs">Before the drop</small>
                  <h1 class="text-2xl font-medium text-slate-600 pb-2">Airdrop</h1>
                  <p class="text-sm tracking-tight font-light text-slate-400 leading-6">888 NFT ready to enter your wallet now</p>
                </div>
              </div>
                           
              </div>
            </div>


            <div className="container w-full md:max-w-3xl mx-auto pt-8 text-center break-normal">          
                <div className="pt-8">

                  <h1 class="text-3.5xl font-extrabold text-center">FAQ</h1>

                  <div class="mt-9.5 space-y-4">

                    <details class="pb-5 md:w-200 hover:cursor-pointer">
                      <summary class="flex justify-between items-center text-summary md:text-xl">What is the supply?</summary>
                      <p class="text-left text-1xl"><b>8888</b> Modern Monks will be minted. Why 8888? Because the number 8 represent the <b>Noble Eightfold Path</b>, an early summary of the path of Buddhist practices 
                      leading to liberation from samsara, the painful cycle of rebirth, in the form of nirvana.</p>
                    </details>
                
                    <details class="pb-5 md:w-200 hover:cursor-pointer">
                      <summary class="flex justify-between items-center text-summary md:text-xl font-normal">When is the launch date?</summary>
                      <p class="text-left text-1xl">In the beginning of June. TBA</p>
                    </details>
                
                    <details class="pb-5  md:w-200 hover:cursor-pointer">
                      <summary class="flex justify-between items-center text-summary md:text-xl font-normal">What is the utility?</summary>
                      <p class="text-left text-1xl">Click “Forgot password” from the login page or “Change password” from your profile page.
                        A reset link will be emailed to you.</p>
                    </details>
                
                    <details class="pb-5  md:w-200 hover:cursor-pointer">
                      <summary class="flex justify-between items-center text-summary md:text-xl font-normal">Is the team doxxed?</summary>
                      <p class="text-left text-1xl">Yes. Our owners are public and our partner teams are also doxxed. Fabius is so happy to show his face, check it out!</p>
                    </details>
                    
                    <details class="pb-5  md:w-200 hover:cursor-pointer">
                      <summary class="flex justify-between items-center text-summary md:text-xl font-normal text-very-dark-grayish-blue hover:text-soft-red">How do I buy a Modern Monk NFT?</summary>
                     <br></br>
                     <p class="text-left text-1xl">
                        <b>1.</b> Sign up for <a href="https://metamask.io/">Metamask</a> or <a href="https://www.coinbase.com/wallet">Coinbase Wallet</a> and download the extension on your internet browser <br></br><br></br>
                        <b>2.</b> Make sure you have enough Ethereum in your wallet to cover the total cost including gas fees. <br></br><br></br>
                        <b>3.</b> On mint day, there will be a Connect button at the top of our website to connect to your wallet. <br></br><br></br>
                        <b>4.</b> Click on the mint button and you will be prompted to sign for your transaction. There will be a fee associated with every transaction related to gas prices. <br></br><br></br>
                        <b>5.</b> Once you have made your purchase, your Modern Monk NFTs will appear in your wallet, on Opensea and Rarible!</p> 
                    </details>

                  </div>

                </div>
             </div>

             <div className="w-full pt-2 text-center" style={{backgroundColor: '#fdf5e7'}}>
                <h1 className="text-3.5xl font-extrabold text-center">Partnership and collabs</h1>
                <button> Collab</button>
            </div>
                
            <div className="container w-full md:max-w-3xl mx-auto pt-20 text-center break-normal">
              <div>
                <a target="_blank" href={TWITTER_LINK}>
                <Image
                    priority
                    src="/images/twitter-logo.svg"
                    height={80}
                    width={80}
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

         </div>
    ) 
}
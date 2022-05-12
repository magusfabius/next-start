import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../components/layout/layout'
import utilStyles from '../styles/utils.module.css'
import Image from 'next/image'

export default function Home() {
  return (
    <body class="bg-gray-100 font-sans leading-normal tracking-normal">

        <nav id="header" class="fixed w-full z-10 top-0">

            <div class="w-full md:max-w-4xl mx-auto flex flex-wrap items-center justify-between mt-0 py-3">

                <div class="pl-4">
                    <a class="text-gray-900 text-base no-underline hover:no-underline font-extrabold text-xl" href="#">
                        Endorfine Labs
                    </a>
                </div>

                <div class="block lg:hidden pr-4">
                    <button id="nav-toggle" class="flex items-center px-3 py-2 border rounded text-gray-500 border-gray-600 hover:text-gray-900 hover:border-green-500 appearance-none focus:outline-none">
                        <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <title>Menu</title>
                            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
                        </svg>
                    </button>
                </div>

                <div class="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden lg:block mt-2 lg:mt-0 bg-gray-100 md:bg-transparent z-20" id="nav-content">
                    <ul class="list-reset lg:flex justify-end flex-1 items-center">
                        <li class="mr-3">
                            <a class="inline-block py-2 px-4 text-gray-900 font-bold no-underline" href="#">Active</a>
                        </li>
                        <li class="mr-3">
                            <a class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4" href="#">link</a>
                        </li>
                        <li class="mr-3">
                            <a class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-2 px-4" href="#">link</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>

        
       <div className="container w-full md:max-w-3xl mx-auto pt-20 text-center">
            <Image  src="/images/endorfine-512x512.png" 
                    height={300}
                    width={300}
                    alt="endorfine logo"/>
       </div>



        <div className="container w-full md:max-w-3xl mx-auto pt-20 ">

            <div class="w-full px-4 md:px-6 text-xl text-gray-800 leading-normal">

                <div class="font-sans pb-10">
                    <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">Things that matters.</h1>
                    <p> If you are not part of the solution you are part of the problem </p>

                    <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">Art and Tech.</h1>
                    <p> The most impactful tools to reach awarness </p>

                    <h1 class="font-bold font-sans break-normal text-gray-900 pt-6 pb-2 text-3xl md:text-4xl">Human-centered</h1>
                    <p>Projects to improve human experience between the metaverse and the real world</p>
                </div>


               


                

                <blockquote class="border-l-4 border-purple-500 italic my-8 pl-8 md:pl-12">
                    Let's start with a collection of NFTs focused on the best human tool to reach peace and feel good: meditation! 
                    Then create a real place with real people and think to the next step.  <Link href={"/modernmonks"}>Modern Monks</Link>
                 </blockquote>

            </div>

            <hr class="border-b-2 border-gray-400 mb-8 mx-4" />



            <div class="container px-4">
                <div class="font-sans bg-gradient-to-b from-purple-200 to-gray-100 rounded-lg shadow-xl p-4 text-center">
                    <h2 class="font-bold break-normal text-xl md:text-3xl">Subscribe to my Newsletter</h2>
                    <h3 class="font-bold break-normal text-gray-600 text-sm md:text-base">Get the latest posts delivered right to your inbox</h3>
                    <div class="w-full text-center pt-4">
                        <form action="#">
                            <div class="max-w-xl mx-auto p-1 pr-0 flex flex-wrap items-center">
                                <input type="email" placeholder="youremail@example.com" class="flex-1 mt-4 appearance-none border border-gray-400 rounded shadow-md p-3 text-gray-600 mr-2 focus:outline-none" />
                                <button type="submit" class="flex-1 mt-4 block md:inline-block appearance-none bg-green-500 text-white text-base font-semibold tracking-wider uppercase py-4 rounded shadow hover:bg-green-400">Subscribe</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        

            <div class="flex w-full items-center font-sans px-4 py-12">
                <img class="w-10 h-10 rounded-full mr-4" src="http://i.pravatar.cc/300" alt="Avatar of Author" />
                <div class="flex-1 px-2">
                    <p class="text-base font-bold text-base md:text-xl leading-none mb-2">Fabius</p>
                    <p class="text-gray-600 text-xs md:text-base"> Crazy developer and serious fool </p>
                </div>
                <div class="justify-end">
                    <Link href={"/fabius"}><button class="bg-transparent border border-gray-500 hover:border-green-500 text-xs text-gray-500 hover:text-green-500 font-bold py-2 px-4 rounded-full">Read More</button></Link>
                </div>
            </div>


        </div>


        <footer class="bg-white border-t border-gray-400 shadow">
            <div class="container max-w-4xl mx-auto flex py-8">

                <div class="w-full mx-auto flex flex-wrap">
                    <div class="flex w-full md:w-1/2 ">
                        <div class="px-8">
                            <h3 class="font-bold text-gray-900">About</h3>
                            <p class="py-4 text-gray-600 text-sm">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel mi ut felis tempus commodo nec id erat. Suspendisse consectetur dapibus velit ut lacinia.
                            </p>
                        </div>
                    </div>

                    <div class="flex w-full md:w-1/2">
                        <div class="px-8">
                            <h3 class="font-bold text-gray-900">Social</h3>
                            <ul class="list-reset items-center text-sm pt-3">
                                <li>
                                    <a class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="#">Add social link</a>
                                </li>
                                <li>
                                    <a class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="#">Add social link</a>
                                </li>
                                <li>
                                    <a class="inline-block text-gray-600 no-underline hover:text-gray-900 hover:text-underline py-1" href="#">Add social link</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>



            </div>
        </footer>

    </body>
  )
}

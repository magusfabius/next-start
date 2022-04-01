import Layout from "../components/layout/layout"

export default function Copypaste() {
    return (
        <Layout>
            <h1> Here you can find some elements to copy paste in case of need</h1>

            <section>
                <p>A button that opens a link in a new tab: </p>

                <a target="_blank" style={{textDecorations: 'none', color: 'inherit'}} href="https://twitter.com/fabiuscarlino"> 
                    <button className="px-4 py-1 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300 rounded-xl text-white"> 
                        NewTab
                    </button>
                </a>
            </section>

        </Layout>
    )
}
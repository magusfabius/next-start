
export async function getOpensea() {
    // Instead of the file system,
    // fetch post data from an external API endpoint

    //const options = { method: 'GET'}
    const options = {method: 'GET', headers: {Accept: 'application/json'}};
    //const url = 'https://api.opensea.io/api/v1/asset/0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb/1/?include_orders=false'


    const res = await fetch('https://api.opensea.io/api/v1/collections?offset=0&limit=300', options)
    console.log("res: ", res)
    //const json = await res.json()
    //console.log("json res: ", json)

    return await res.json()

    /*
    const response = await fetch(url, options)
    .then(res => {
        console.log("res then: ", res)
        return res.json
      })
    .then(resjson => {
      console.log("res then json: ", resjson)
      return resjson
    })
    .catch( err => {
      console.error(err)
    })

    console.log("final response")
    return response
    */
  }
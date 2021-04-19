// const port = 33771
// const prefix = `http://localhost:${port}/`
const prefix = "https://6n9uz.sse.codesandbox.io/"


export const fetch_data = async (subUrl,method="POST",params,) => {
    const url = `${prefix}${subUrl}`
    const response = await fetch(url, {
        crossDomain: true,
        dataType: 'jsonp',
        method: method,
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(params)
    })
    const data = await response.json()
    return data
}

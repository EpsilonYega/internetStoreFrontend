async function externalFetch({ url, method, headers, body, credentials }) {
    const fetchOptions = { method, headers, credentials, body: JSON.stringify(body) }
  
    try {
        return await fetch(url, fetchOptions).then(async (response) => ({ status: response.status, message: await response.text() }))
    }
    catch(error) {
        throw new Error("Internal server error")
    }
}
  
function internalFetch() {
    async function get({ credentials, headers, url }) {
        const externalFetchOptions = {
            credentials: credentials,
            headers: headers,
            method: "GET",
            url: url
        }
  
        try {
            return await externalFetch(externalFetchOptions)
        }
        catch(error) {
            return { status: 500, message: "Internal server error" }
        }
    }
  
    async function post({ credentials, headers, body, url }) {
        const externalFetchOptions = {
            credentials: credentials,
            headers: headers,
            method: "POST",
            body: body,
            url: url
        }
  
        try {
            return await externalFetch(externalFetchOptions)
        }
        catch(error) {
            return { status: 500, message: "Internal server error" }
        }
    }
  
    return { get, post }
}
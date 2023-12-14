export async function externalFetch({ url, method, headers, body, credentials, mode }) {
    const fetchOptions = { method, headers, credentials, body: JSON.stringify(body), mode }
  
    try {
        return await fetch(url, fetchOptions).then(async (response) => ({ status: response.status, message: await response.text() }))
    }
    catch(error) {
        console.log(error)
        throw new Error("Internal server error")
    }
}
  
export function internalFetch() {
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

    async function del({ credentials, headers, body, url }) {
        const externalFetchOptions = {
            credentials: credentials,
            headers: headers,
            method: "DELETE",
            mode: "no-cors",
            body: body,
            url: url,
        }
  
        try {
            return await externalFetch(externalFetchOptions)
        }
        catch(error) {
            return { status: 500, message: "Internal server error" }
        }
    }
  
    return { get, post, del }
}

export default { externalFetch, internalFetch }
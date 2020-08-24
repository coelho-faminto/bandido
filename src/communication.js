const API_URL = 'http://localhost:1337'

function _fetch(method, service, json, authorization = false) {
    let requestOptions = {}
    let headers = { 'Content-Type': 'application/json' }

    if (authorization) {
        headers = { ...headers, 'Authorization': `Bearer ${authorization}` }
    }

    if (
        (method === 'GET') ||
        (method === 'HEAD')
    ) {
        requestOptions = {
            method: method,
            headers: headers
        }
    }
    else {
        requestOptions = {
            method: method,
            headers: headers,
            body: JSON.stringify(json)
        }
    }

    return fetch(`${API_URL}${service}`, requestOptions)
}

export default _fetch;
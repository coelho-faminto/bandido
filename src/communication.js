const API_URL = 'http://localhost/MEGA/coding/react-admin-panel/v0.1.1/backend-auth'

export function _fetch(method, service, json, authorization = false) {
    let requestOptions = {}
    let headers = {}
    //let headers = { 'Content-Type': 'application/json' }

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

export function _apiRequest(request, data, jwt) {
    return new Promise((resolve, reject) => {
        _fetch(
            'POST',
            '/api.php',
            {
                request: request,
                data: data
            },
            jwt
        ).then(response => response.json()).then(data => {
            if (data.error) {
                reject(data)
                return
            }

            resolve(data.response)
        })
    })
}

export default { _fetch, _apiRequest }
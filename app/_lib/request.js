const baseUrl = "/api"

export async function requestGet(endpoint) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            credentials: 'include'
        })
        return response
    } catch (err) {
        throw err
    }
}

export async function request(endpoint, method, body) {
    try {
        const options = {
            method: method,
            credentials: 'include',
        }

        if (body instanceof FormData) {
            options.body = body
        } else {
            options.body = JSON.stringify(body)
            options.headers = {
                'Content-Type': 'application/json',
            }
        }
        const response = await fetch(`${baseUrl}${endpoint}`, options)
        return response
    } catch (err) {
        throw err
    }
}

export async function requestPost(endpoint, body) {
    return request(endpoint, 'POST', body)

}

export async function requestPut(endpoint, body) {
    return request(endpoint, 'PUT', body)

}

export async function requestDelete(endpoint, body) {
    return request(endpoint, 'DELETE', body)
}
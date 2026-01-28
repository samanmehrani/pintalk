import { handleResponse } from '@/app/_lib/auth/syncSession'

const baseUrl = process.env.NEXT_PUBLIC_SERVER_API

export async function requestGet(endpoint) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
            credentials: 'include'
        })
        await handleResponse(response)
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
        await handleResponse(response)
        return response
    } catch (err) {
        throw err
    }
}

export async function requestPost(endpoint, body) {
    return request(endpoint, 'post', body)

}

export async function requestPut(endpoint, body) {
    return request(endpoint, 'put', body)

}

export async function requestDelete(endpoint, body) {
    return request(endpoint, 'delete', body)
}
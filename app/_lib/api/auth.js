import { requestPost } from '@/app/_lib/request'

export async function requestCodeToEmail(email) {
    const response = await requestPost('/auth/email/request', {
        email
    })
    return response
}

export async function authenticateUser(email, code) {
    const response = await requestPost('/auth/email/verify', {
        email, code
    })
    return response
}
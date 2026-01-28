import { requestDelete, requestGet, requestPost, requestPut } from '@/app/_lib/request'

export async function getUserInfo() {
    const response = await requestGet('/users/me')
    return response
}

export async function registerUser(name, username, userType, secret) {
    const response = await requestPost('/users', {
        secret: secret,
        name: name,
        username: username,
        userType: userType,
    })
    return response
}

export async function getAllUsers() {
    const response = await requestGet('/users/all')
    return response
}

export async function getAUserInfo(userId) {
    const response = await requestGet('/users/' + userId)
    return response
}

export async function UpdateUserInfo(formData) {
    const response = await requestPut('/users/',
        formData,
    )
    return response
}

export async function CheckUsername(username) {
    const response = await requestPost('/users/check-' + username)
    return response
}

export async function logout() {
    const response = await requestPost('/users/logout')
    return response
}

export async function DeleteAccount(code) {
    const response = await requestDelete('/users/', {
        code
    })
    return response
}
import { requestGet, requestDelete, requestPost } from '@/app/_lib/request'

export async function sendPurchaseRequest(requestData) {
    const response = await requestPost('/notifications',
        requestData
    )
    return response
}

export async function getNotifications(page) {
    const response = await requestGet(`/notifications?page=${page}`)
    return response
}

export async function getRequestsSent(page) {
    const response = await requestGet(`/notifications/requests?page=${page}`)
    return response
}

export async function removeRequestsSent(requestId) {
    const response = await requestDelete('/notifications/requests', {
        requestId,
    })
    return response
}
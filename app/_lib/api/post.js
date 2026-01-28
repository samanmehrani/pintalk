import { requestDelete, requestGet, requestPost } from '@/app/_lib/request'

export async function createNewPost({ text, label, author }) {
    const response = await requestPost('/posts', {
        text,
        label,
        author,
    })
    return response
}

export async function getUsersPosts(userId, page) {
    const response = await requestGet('/posts/' + userId + `/posts?page=${page}`)
    return response
}

export async function getTimelinePosts(page) {
    const response = await requestGet(`/posts/timeline?page=${page}`)
    return response
}

export async function deletePost(postId) {
    const response = await requestDelete('/posts/', {
        post_id: postId
    })
    return response
}
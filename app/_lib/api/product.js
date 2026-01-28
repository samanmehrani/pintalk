import { requestDelete, requestGet, requestPost } from '@/app/_lib/request'

export async function createNewProduct(fullFormData) {
    const response = await requestPost('/products',
        fullFormData,
    )
    return response
}

export async function getAProduct(productId) {
    const response = await requestGet('/products/product/' + productId)
    return response
}

export async function getProductsByLabel(productLabel) {
    const response = await requestGet('/products/categories/' + productLabel)
    return response
}

export async function getUsersProducts(userId, page) {
    const response = await requestGet('/products/' + userId + `/products?page=${page}`)
    return response
}

export async function getShopProducts(page) {
    const response = await requestGet(`/products/bazaar?page=${page}`)
    return response
}

export async function SearchProductsByLabel(query, page) {
    const response = await requestGet(`/products/search?label=${query}&page=${page}`)
    return response
}

export async function getProductsByHsCode(filter, page) {
    const response = await requestGet(`/products/searchForExplore?page=${page}&hscode=${filter.hsCode}&type=${filter.type}&country=${filter.inputValues?.country}&partner=${filter.inputValues?.partner}`)
    return response
}

export async function deleteProduct(productId) {
    const response = await requestDelete('/products/', {
        product_id: productId
    })
    return response
}
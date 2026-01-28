'use client'

export function renameUserInfo(userInfo) {
    const {
        name: name,
        username: username,
        email: email,
        coverPicture: coverPicture,
        profilePicture: profilePicture,
        founded: founded,
        location: location,
        numberOfLocations: numberOfLocations,
        isAdmin: isAdmin,
        industry: industry,
        link: link,
        created_at: registerationTimestamp,
        updated_at: updatedAt,
    } = userInfo

    const renamedUserInfo = {
        name,
        username,
        email,
        coverPicture,
        profilePicture,
        founded,
        location,
        numberOfLocations,
        isAdmin,
        industry,
        link,
        email,
        registerationTimestamp,
        updatedAt,
    }

    return renamedUserInfo
}

export function setUserInfo(userInfo) {
    userInfo = renameUserInfo(userInfo)

    for (const [key, value] of Object.entries(userInfo)) {
        localStorage.setItem(key, value)
    }
}

export function getUserInfo(userInfo) {
    let user = {
        name: '',
        username: '',
        email: '',
        coverPicture: '',
        profilePicture: '',
        founded: '',
        location: '',
        numberOfLocations: '',
        isAdmin: '',
        industry: '',
        email: '',
        link: '',
        registerationTimestamp: '',
        updatedAt: '',
    }

    for (const key of Object.keys(user)) {
        user.key = localStorage.getItem(key)
    }
    return user
}

export function getUserName() {
    return localStorage.getItem("name")
}

export function getUserUsername() {
    return localStorage.getItem("username")
}

export function getUserEmail() {
    return localStorage.getItem("email")
}

export function getUserProfilePicture() {
    return localStorage.getItem("profilePicture")
}

export function getUserCoverPicture() {
    return localStorage.getItem("coverPicture")
}

export function getUserRegisterationTimestamp() {
    return localStorage.getItem("registerationTimestamp")
}

export function clearStorage() {
    localStorage.clear()
}
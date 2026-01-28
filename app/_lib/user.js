import { useUserStore } from '@/app/_lib/hooks/store'
import { renameUserInfo } from '@/app/_lib/storage'
import { logout } from '@/app/_lib/api/user'

export function storeUser(userInfo) {
    useUserStore.setState({ user: renameUserInfo(userInfo) })
}

export async function removeUser() {
    useUserStore.setState({ user: {} })
    await logout()
}
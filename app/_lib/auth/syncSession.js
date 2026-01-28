import { useUserStore } from '@/app/_lib/hooks/store'

export async function handleResponse(response) {
  if (response.status === 401) {
    useUserStore.setState({ user: {} })
    document.cookie = `session=; path=/; max-age=0`
  } else if (response.ok) {
    document.cookie = `session=true; path=/`
  }
  return response
}

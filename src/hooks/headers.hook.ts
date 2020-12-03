import { useAuth } from "./auth.hooks"

export function useHeaders() {
    const { token } = useAuth()

    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
    }
}
import { useCallback, useEffect } from "react"

export function useRefresh(callback: () => Promise<void>) {
    const refresh =  useCallback(() => {
        callback()
    }, [])

    useEffect(refresh, [])
}
import { useAsync } from "./async.hook"
import axios from 'axios'
import { useHeaders } from "./headers.hook"

const urlAPI = 'http://localhost:8000'

export function useGetQuery<T>(endpoint: string, immediate = true) {
    const headers = useHeaders()
    const url = `${urlAPI}/${endpoint}`

    const get = useAsync<T>(async () => {
        try {
            return (await axios({ url, headers, method: 'GET' })).data    
        } catch (error) {
            console.log(error)
            localStorage.removeItem('credentials')
        }
    }, immediate)

    return get
}

export function usePostQuery<T, U = any>(endpoint: string, data: U, immediate = false) {
    const headers = useHeaders()
    const url = `${urlAPI}/${endpoint}`

    const post = useAsync<T>(async (): Promise<T> => {
        return (await (await axios({ url, headers, data, method: 'POST' })).data)    
    }, immediate)

    return post
}

export function usePutQuery<T, U = any>(endpoint: string, data: U, immediate = false) {
    const headers = useHeaders()
    const url = `${urlAPI}/${endpoint}`

    const put = useAsync<T>(async () => {
        try {
            const response = await axios({ url, headers, data, method: 'PUT' })
            console.log(response)
            return response.data    
        } catch (e) {
            console.log('PUT', e)
        }
    }, immediate)

    return put
}

export function useDeleteQuery(endpoint: string, immediate = false) {
    const headers = useHeaders()
    const url = `${urlAPI}/${endpoint}`

    const remove = useAsync(async () => {
        await (await axios({ url, headers, method: 'DELETE' })).data    
    }, immediate)

    return remove
}
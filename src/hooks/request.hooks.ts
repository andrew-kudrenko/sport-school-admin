import { useAuth } from "./auth.hooks"

const apiUrl: string = 'http://localhost:8000'

type HTTPMethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS'

async function request<T = any>(headers: Headers, endPoint: string, method: HTTPMethodType, body: any): Promise<T> {
    try {
        const options: RequestInit = { method, headers }

        if (body) {
            options.body = body
        }

        const response = await fetch(apiUrl.concat(endPoint), options)
        const json = await response.json()

        return json
    } catch (e) {
        throw e
    }
}

interface IUseRequestHeaders {
    json: Headers
    formData: Headers
}

const headers = (): IUseRequestHeaders => ({
    json: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }),
    formData: new Headers({
        'Accept': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })
})

const authHeaders = (jwt: string | null): IUseRequestHeaders => ({
    json: new Headers({ 
        'Accept': 'application/json', 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${String(jwt)}`, 
    }),
    formData: new Headers({
        'Accept': 'application/x-www-form-urlencoded; charset=UTF-8', 
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': `Bearer ${String(jwt)}`, 
    })
})

function createUseRequest(headers: IUseRequestHeaders) {
    return function() {        
        async function requestJSON<T = any>(endPoint: string, method: HTTPMethodType = 'GET', body: any = null): Promise<T> {
            return await request<T>(headers.json, endPoint, method, body)
        }

        async function requestFormData<T = any>(endPoint: string, method: HTTPMethodType = 'GET', body: any = null): Promise<T> {
            return await request<T>(headers.formData, endPoint, method, body)
        }

        return { requestJSON, requestFormData }
    }
}


export function useRequest() {
    return createUseRequest(headers())()
}

export function useAuthRequest() {
    const { token } = useAuth()

    return createUseRequest(authHeaders(token))()
}
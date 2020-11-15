import { ICachedUserData } from "../interfaces/entities.interfaces"

const apiUrl: string = 'http://localhost:8000'

type HTTPMethodType = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE' | 'OPTIONS'

async function requestBase<T = any>(headers: Headers, endPoint: string, method: HTTPMethodType, body: any): Promise<T> {
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

type IRequestHeaders = {
    json: Headers
    formData: Headers
}

const headers: IRequestHeaders = {
    json: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }),
    formData: new Headers({
        'Accept': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    })
}

function createRequest(headers: IRequestHeaders, token: string | null = null) {
    if (token) {
        Object.keys(headers)
        .forEach(key => {
            (headers as any)[key].append('Authorization', `Bearer ${token}`)
        })
    }

    async function requestJSON<T = any>(endPoint: string, method: HTTPMethodType = 'GET', body: any = null): Promise<T> {
        if (token) {
            await requestBase<any>(headers.json, '/auth/jwt/refresh', 'POST', null)
        }

        if (body) {
            return await requestBase<T>(headers.json, endPoint, method, JSON.stringify(body))
        } else {
            return await requestBase<T>(headers.json, endPoint, method, body)
        }
    }

    async function requestFormData<T = any>(endPoint: string, method: HTTPMethodType = 'GET', body: any = null): Promise<T> {
        if (token) {
            await requestBase<any>(headers.formData, '/auth/jwt/refresh', 'POST', null)
        }

        if (body) {
            return await requestBase<T>(headers.formData, endPoint, method, body)
        } else {
            return await requestBase<T>(headers.formData, endPoint, method, body)
        }    }

    return { requestJSON, requestFormData }
}

const userData: ICachedUserData | null = JSON.parse(localStorage.getItem('user-data') || 'null') 
const token: string | undefined = userData?.token

export const { requestJSON, requestFormData } = createRequest(headers)

export const { requestJSON: requestJSONAuth, requestFormData: requestFormDataAuth } = createRequest(headers, token)
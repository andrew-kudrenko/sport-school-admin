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
        console.log(e)
        throw e
    }
}

type IRequestHeaders = {
    json: any
    formData: any
}


function createAuthRequest() {
    const headers: IRequestHeaders = {
        json: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        formData: {
            'Accept': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        }
    }

    async function requestJSON<T = any>(endPoint: string, method: HTTPMethodType = 'GET', body: any = null): Promise<T> {
        try {
            const userData: ICachedUserData | null = JSON.parse(localStorage.getItem('credentials') || 'null')
            const token = userData?.token

            headers.json['Authorization'] = `Bearer ${token}`

        } catch (e) {
            console.log(e)
            // localStorage.removeItem('credentials')
        }

        if (body) {
            return await requestBase<T>(headers.json, endPoint, method, JSON.stringify(body))
        } else {
            return await requestBase<T>(headers.json, endPoint, method, body)
        }
    }

    async function requestFormData<T = any>(endPoint: string, method: HTTPMethodType = 'GET', body: any = null): Promise<T> {
        try {
            const userData: ICachedUserData | null = JSON.parse(localStorage.getItem('credentials') || 'null')
            const token = userData?.token

            headers.formData['Authorization'] = `Bearer ${token}`
        } catch (e) {
            console.log(e)
            // localStorage.removeItem('credentials')
        }

        if (body) {
            return await requestBase<T>(headers.formData, endPoint, method, body)
        } else {
            return await requestBase<T>(headers.formData, endPoint, method, body)
        }
    }

    return { requestJSON, requestFormData }
}

function createRequest() {
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

    async function requestJSON<T = any>(endPoint: string, method: HTTPMethodType = 'GET', body: any = null): Promise<T> {
        if (body) {
            return await requestBase<T>(headers.json, endPoint, method, JSON.stringify(body))
        } else {
            return await requestBase<T>(headers.json, endPoint, method, body)
        }
    }

    async function requestFormData<T = any>(endPoint: string, method: HTTPMethodType = 'GET', body: any = null): Promise<T> {
        if (body) {
            return await requestBase<T>(headers.formData, endPoint, method, body)
        } else {
            return await requestBase<T>(headers.formData, endPoint, method, body)
        }
    }

    return { requestJSON, requestFormData }
}

export const { requestJSON, requestFormData } = createRequest()

export const { requestJSON: requestJSONAuth, requestFormData: requestFormDataAuth } = createAuthRequest()
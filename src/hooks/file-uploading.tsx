import axios from 'axios'
import { useState, ChangeEvent, useEffect } from 'react'
import { Nullable } from '../types/common.types'
import { useHeaders } from './headers.hook'

const apiURL = 'http://localhost:8000'

export function useFileUploading(url: string) {
    const [file, setFile] = useState<Nullable<File>>(null)
    const [preview, setPreview] = useState<Nullable<string>>(null)
    const [formData, setFormData] = useState<Nullable<FormData>>(null)
    const [progress, setProgress] = useState(0)
    const [isInitial, setIsInitial] = useState(true)
    const [locked, setLocked] = useState(true)

    const headers = useHeaders()

    async function onUpload() {
        if (formData) {
            return await axios.post(apiURL.concat(url), formData, {
                headers,
                onUploadProgress: (progressEvent: any) => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
                    if (totalLength) {
                        console.log(Math.round((progressEvent.loaded * 100) / totalLength))
                        setProgress(Math.round((progressEvent.loaded * 100) / totalLength))
                    }
                }
            })
        }
    }

    async function onSelect(event: ChangeEvent<HTMLInputElement>) {
        if (event.target?.files) {
            setFile(event.target.files[0])
            setPreview(null)
            setIsInitial(false)
        }
    }

    function onClear() {
        setPreview(null)
        setFile(null)
        setFormData(null)
        setProgress(0)
    }

    useEffect(() => {
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            
            setFormData(formData)
            setPreview(`${isInitial ? apiURL : ''}${URL.createObjectURL(file)}`)
        }
    }, [file, isInitial])
    
    useEffect(() => {
        if (!isInitial && preview) {
            setLocked(progress < 100 ? true : false)
        }

        if (isInitial || !preview) {
            setLocked(false)
        }
    }, [isInitial, preview, progress])
    
    return { onUpload, progress, onSelect, onClear, preview, setPreview, locked }
}

export function useDocumentFileUploading(url: string) {
    const [file, setFile] = useState<Nullable<File>>(null)
    const [preview, setPreview] = useState<Nullable<string>>(null)
    const [formData, setFormData] = useState<Nullable<FormData>>(null)
    const [progress, setProgress] = useState(0)
    const [isInitial, setIsInitial] = useState(true)
    const [locked, setLocked] = useState(true)

    const headers = useHeaders()

    async function onUpload() {
        if (formData) {
            return await axios.post(apiURL.concat(url), formData, {
                headers,
                onUploadProgress: (progressEvent: any) => {
                    const totalLength = progressEvent.lengthComputable
                        ? progressEvent.total
                        : progressEvent.target.getResponseHeader('content-length') || progressEvent.target.getResponseHeader('x-decompressed-content-length')
                    if (totalLength) {
                        console.log(Math.round((progressEvent.loaded * 100) / totalLength))
                        setProgress(Math.round((progressEvent.loaded * 100) / totalLength))
                    }
                }
            })
        }
    }

    async function onSelect(event: ChangeEvent<HTMLInputElement>) {
        if (event.target?.files) {
            setFile(event.target.files[0])
            setPreview(null)
            setIsInitial(false)
        }
    }

    function onClear() {
        setPreview(null)
        setFile(null)
        setFormData(null)
        setProgress(0)
    }

    useEffect(() => {
        if (file) {
            const formData = new FormData()
            formData.append('file', file)
            
            setFormData(formData)
            setPreview(`${isInitial ? apiURL : ''}${URL.createObjectURL(file)}`)
        }
    }, [file, isInitial])
    
    useEffect(() => {
        if (!isInitial && preview) {
            setLocked(progress < 100 ? true : false)
        }

        if (isInitial || !preview) {
            setLocked(false)
        }
    }, [isInitial, preview, progress])
    
    return { onUpload, progress, onSelect, onClear, preview, setPreview, locked }
}
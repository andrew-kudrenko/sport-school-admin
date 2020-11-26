import { useParams } from 'react-router-dom'
import { IDType } from '../interfaces/entities.interfaces'

export function useIDParam(): string {
    const { id } = useParams<{ id?: IDType }>()

    return id ? id : ''
}
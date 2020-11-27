import { ChangeEvent } from "react"
import { Nullable } from "../types/common.types"

type EventHandlerType<T = any> = (value: T) => void

export function useFormHandlers() {
    function onChange(callback: EventHandlerType) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            callback(event.target.value)
        }
    }

    function onSelect(callback: EventHandlerType) {
        return (event: ChangeEvent<{ value: unknown }>) => {
            callback(String(event.target.value))
        }
    }

    function onFileChange(callback: EventHandlerType) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            callback(event.target.files)
        }
    }

    function onDateChange(callback: EventHandlerType) {
        return (date: Nullable<Date>) => {
            callback(date)
        }
    }

    function onChangeMultiple(callback: (value: any) => any) {
        return (event: React.ChangeEvent<{ value: unknown }>) => {
            callback(event.target.value as string[])
        }
    }

    return { onChange, onSelect, onFileChange, onDateChange, onChangeMultiple }
}
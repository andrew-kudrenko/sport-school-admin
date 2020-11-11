import { ChangeEvent } from "react"

type EventHandlerType<T = any> = (value: T) => void

export function useFormHandlers() {
    function onChange(callback: EventHandlerType) {
        return (event: ChangeEvent<HTMLInputElement>) => {
            callback(event.target.value)
        }
    }

    return { onChange }
}
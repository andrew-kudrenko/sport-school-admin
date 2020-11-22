import { useState } from "react"

type LocalStorageHookType<T> = [T, (value: T) => void, () => void]

export function useLocalStorage<T>(key: string, defaultValue: T): LocalStorageHookType<T> {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      console.error(e)
      return defaultValue
    }
  })

  const setValue = (value: T): void => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (e) {
      console.error(e)
    }
  }

  const removeItem = (): void => {
    window.localStorage.removeItem(key)
  }

  return [storedValue, setValue, removeItem]
}
import { useState } from "react"

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key)
      
      return item ? JSON.parse(item) : defaultValue
    } catch (e) {
      console.error(e)
      return defaultValue
    }
  })

  const setValue = (value: T) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      
      setStoredValue(valueToStore)

      window.localStorage.setItem(key, JSON.stringify(valueToStore))
    } catch (e) {
      console.error(e)
    }
  }

  return [storedValue, setValue]
}
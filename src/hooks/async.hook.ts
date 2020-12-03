import { useCallback, useEffect, useState } from "react"
import { Nullable } from "../types/common.types"

enum RunningStatus {
  Idle,
  Pending,
  Success,
  Error
}

export function useAsync<T = any>(asyncFunction: () => Promise<T>, immediate = true) {
  const [status, setStatus] = useState<RunningStatus>(RunningStatus.Idle)
  const [value, setValue] = useState<Nullable<T>>(null)
  const [error, setError] = useState<Nullable<string>>(null)
  const [done, setDone] = useState(false)

  const execute = useCallback(() => {
    setStatus(RunningStatus.Pending)
    setValue(null)
    setError(null)

    return asyncFunction()
      .then((response: T) => {
        setValue(response)
        setStatus(RunningStatus.Success)
      })
      .catch((error: Error | string) => {
        if (error instanceof Error) {
          setError(error.message)
        } else {
          setError(error)
        }

        setStatus(RunningStatus.Error)
      })
  }, [asyncFunction])

  useEffect(() => {
    if (immediate && !done) {
      execute()
      setDone(true)
    }
  }, [execute, immediate, done])

  return { execute, value, status, error, loading: status === RunningStatus.Pending }
}
import { useCallback, useEffect, useState } from "react";
import { Nullable } from "../types/common.types";

enum RunningStatus {
  Idle,
  Pending,
  Success,
  Error,
}

export function useAsync<T = any>(
  asyncFunction: () => Promise<T>,
  immediate = true
) {
  const [status, setStatus] = useState<RunningStatus>(RunningStatus.Idle);
  const [value, setValue] = useState<Nullable<T>>(null);
  const [error, setError] = useState<Nullable<string>>(null);
  const [done, setDone] = useState(false);

  const execute = async () => {
    try {
      setStatus(RunningStatus.Pending);
      setValue(null);
      setError(null);

      const response = await asyncFunction();

      setValue(response);
      setStatus(RunningStatus.Success);

      return response;
    } catch (e) {
      setError(e instanceof Error ? e.message : e);
      setStatus(RunningStatus.Error);
    }
  };

  useEffect(() => {
    if (immediate && !done) {
      execute().then(() => {
        setDone(true);
      });
    }
  }, [execute, immediate, done]);

  return {
    execute,
    value,
    status,
    error,
    loading: status === RunningStatus.Pending,
  };
}

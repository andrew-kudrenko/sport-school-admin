import { useCallback, useEffect } from "react";

export function useRefresh(callback: () => Promise<any>) {
  const refresh = useCallback(() => {
    callback();
  }, []);

  useEffect(refresh, []);
}

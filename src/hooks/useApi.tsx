import { useCallback, useState } from "react";
import { ApiError, OpenAPI } from "../api";

export function useApi() {
  const [error, setError] = useState<ApiError | undefined>(undefined);
  const [isLoading, setIsloading] = useState<boolean>(true);

  OpenAPI.BASE = "http://localhost:3000";
  const handleRequest = useCallback(async <T,>(request: Promise<T>) => {
    setIsloading(true);
    try {
      const response = await request;
      setError(undefined);
      return response;
    } catch (error: any) {
      setError(error);
    } finally {
      setIsloading(true);
    }
  }, []);

  function dismissError() {
    setError(undefined);
  }

  return { dismissError, error, isLoading, handleRequest };
}

export default useApi;

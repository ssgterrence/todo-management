import { useState, useEffect } from "react";
import type { IDuty } from "../types";
import { GET_DUTIES_ENDPOINT } from "../config/const";
import { env } from "../config/env";

export function useDuties() {
  const [duties, setDuties] = useState<IDuty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isBackendDown, setIsBackendDown] = useState<boolean>(false);

  useEffect(() => {
    const fetchDuties = async () => {
      setLoading(true);
      setError(null);
      setIsBackendDown(false);
      try {
        const res = await fetch(`${env.apiUrl}/${GET_DUTIES_ENDPOINT}`);
        if (!res.ok) throw new Error("failed to fetch duties");
        const data = await res.json();
        setDuties(data.data);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "unknown error";
        setError(errorMessage);
        if (
          err instanceof TypeError &&
          (errorMessage.includes("fetch") ||
            errorMessage.includes("Failed to fetch"))
        ) {
          setIsBackendDown(true);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDuties();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    setIsBackendDown(false);
    try {
      const res = await fetch(`${env.apiUrl}/${GET_DUTIES_ENDPOINT}`);
      if (!res.ok) throw new Error("failed to fetch duties");
      const data = await res.json();
      setDuties(data.data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "unknown error";
      setError(errorMessage);
      if (
        err instanceof TypeError &&
        (errorMessage.includes("fetch") ||
          errorMessage.includes("Failed to fetch"))
      ) {
        setIsBackendDown(true);
      }
    } finally {
      setLoading(false);
    }
  };

  return { duties, loading, error, isBackendDown, refetch, setDuties };
}

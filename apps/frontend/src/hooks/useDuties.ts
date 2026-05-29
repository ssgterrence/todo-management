import { useState, useEffect } from "react";
import type { IDuty } from "../types";
import { GET_DUTIES_ENDPOINT } from "../config/const";
import { env } from "../config/env";

export function useDuties() {
  const [duties, setDuties] = useState<IDuty[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDuties = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${env.apiUrl}/${GET_DUTIES_ENDPOINT}`);
        if (!res.ok) throw new Error("failed to fetch duties");
        const data = await res.json();
        setDuties(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchDuties();
  }, []);

  const refetch = async () => {
    setError(null);
    try {
      const res = await fetch(`${env.apiUrl}/${GET_DUTIES_ENDPOINT}`);
      if (!res.ok) throw new Error("failed to fetch duties");
      const data = await res.json();
      setDuties(data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "unknown error");
    }
  };

  return { duties, loading, error, refetch, setDuties };
}

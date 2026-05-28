import { CREATE_DUTY_ENDPOINT } from "../config/const";
import { env } from "../config/env";

const createDuty = async (title: string): Promise<void> => {
  const res = await fetch(`${env.apiUrl}/${CREATE_DUTY_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to create duty: ${res.status}`);
  }
};

export { createDuty };

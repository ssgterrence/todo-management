import {
  CREATE_DUTY_ENDPOINT,
  DELETE_DUTY_ENDPOINT,
  EDIT_DUTY_ENDPOINT,
} from "../config/const";
import { env } from "../config/env";

const createDuty = async (name: string): Promise<void> => {
  const res = await fetch(`${env.apiUrl}/${CREATE_DUTY_ENDPOINT}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to create duty: ${res.status}`);
  }
};

const deleteDuty = async (id: string): Promise<void> => {
  const res = await fetch(`${env.apiUrl}/${DELETE_DUTY_ENDPOINT}/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to delete duty: ${res.status}`);
  }
};
const editDuty = async (id: string, name: string): Promise<void> => {
  const res = await fetch(`${env.apiUrl}/${EDIT_DUTY_ENDPOINT}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to edit duty: ${res.status}`);
  }
};
export { createDuty, deleteDuty, editDuty };

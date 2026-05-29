import { useState } from "react";
import { message } from "antd";
import { editDuty } from "../apis/hub";

export function useInlineEdit(onSuccess: () => Promise<void>) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const startEdit = (id: string, name: string) => {
    setEditingId(id);
    setEditingText(name);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingText("");
  };

  const confirmEdit = async () => {
    if (!editingId || !editingText.trim()) {
      message.error("Name cannot be empty");
      return;
    }

    setSubmitting(true);
    try {
      await editDuty(editingId, editingText.trim());
      message.success("Duty updated");
      await onSuccess();
      setEditingId(null);
      setEditingText("");
    } catch (err) {
      message.error(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  return {
    editingId,
    editingText,
    submitting,
    setEditingText,
    startEdit,
    cancelEdit,
    confirmEdit,
  };
}

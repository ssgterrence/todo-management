import { Modal, message } from "antd";
import { deleteDuty } from "../apis/hub";

export function useDeleteDuty(onSuccess: () => Promise<void>) {
  const confirmDelete = (id: string) => {
    Modal.confirm({
      title: "Delete Duty",
      content: "Are you sure you want to delete this duty?",
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      centered: true,
      mask: { closable: false },
      onOk: async () => {
        try {
          await deleteDuty(id);
          message.success("Duty deleted");
          await onSuccess();
        } catch (err) {
          message.error(err instanceof Error ? err.message : "Delete failed");
        }
      },
    });
  };

  return { confirmDelete };
}

import { Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { createDuty, editDuty } from "../apis/hub";

type Props = {
  id?: string;
  title?: string;
  open: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
};
function AddDutyDialog({ id, title, open, onClose, onCreated }: Props) {
  const [form] = Form.useForm<{ title: string }>();
  const [submitting, setSubmitting] = useState(false);
  const handleFinish = async (values: { title: string }) => {
    setSubmitting(true);
    try {
      if (id) await editDuty(id, values.title);
      else await createDuty(values.title);
      message.success(id ? "Duty updated" : "Duty added");
      form.resetFields();
      onClose();
      await onCreated();
    } catch (err) {
      message.error(err instanceof Error ? err.message : "Request failed");
    } finally {
      setSubmitting(false);
    }
  };
  useEffect(() => {
    if (open) {
      form.setFieldsValue({ title: title ?? "" });
    }
  }, [open, title, form]);
  return (
    <Modal
      title={id ? "Edit Duty" : "Add Duty"}
      open={open}
      onCancel={onClose}
      okText={id ? "Save" : "Add"}
      confirmLoading={submitting}
      onOk={() => form.submit()}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddDutyDialog;

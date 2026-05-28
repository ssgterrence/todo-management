import { Form, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { createDuty } from "../apis/hub";

type Props = {
  title?: string;
  open: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
};
function AddDutyDialog({ title, open, onClose, onCreated }: Props) {
  const [form] = Form.useForm<{ title: string }>();
  const [submitting, setSubmitting] = useState(false);
  const handleFinish = async (values: { title: string }) => {
    setSubmitting(true);
    try {
      await createDuty(values.title);
      form.resetFields();
      onClose();
      await onCreated();
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
      title={title ? "Edit Duty" : "Add Duty"}
      open={open}
      onCancel={onClose}
      okText={title ? "Save" : "Add"}
      confirmLoading={submitting}
      onOk={() => form.submit()}
      destroyOnHidden
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="title"
          label="Title"
          rules={[{ required: true, message: "Please input the title!" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddDutyDialog;

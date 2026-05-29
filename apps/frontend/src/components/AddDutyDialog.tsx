import { Form, Input, Modal, message } from "antd";
import { useEffect, useState } from "react";
import { createDuty } from "../apis/hub";

type Props = {
  open: boolean;
  onClose: () => void;
  onCreated: () => Promise<void>;
};
function AddDutyDialog({ open, onClose, onCreated }: Props) {
  const [form] = Form.useForm<{ name: string }>();
  const [submitting, setSubmitting] = useState(false);
  const handleFinish = async (values: { name: string }) => {
    setSubmitting(true);
    try {
      await createDuty(values.name);
      message.success("Duty added");
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
      form.resetFields();
    }
  }, [open, form]);
  return (
    <Modal
      title="Add Duty"
      open={open}
      onCancel={onClose}
      okText="Add"
      confirmLoading={submitting}
      onOk={() => form.submit()}
      centered
      maskClosable={false}
      width={400}
    >
      <Form form={form} onFinish={handleFinish}>
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input the name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddDutyDialog;

import { Form, Input, Modal } from "antd";
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
      if (title && id) {
        await editDuty(id, values.title);
      } else {
        await createDuty(values.title);
        form.resetFields();
      }
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
          rules={[{ required: true, message: "Please input the title" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddDutyDialog;

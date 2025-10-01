import { Button, Form, Input, Modal } from "antd";

const AddUser = ({ onAddUser, openResponsive, setOpenResponsive }) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    setOpenResponsive(false);
  };

  const onFinish = (values) => {
    // const trimmedName = values.name.trim();
    onAddUser(values);
    form.resetFields();
  };

  return (
    <Modal
      title={<h3>Add User</h3>}
      centered
      open={openResponsive}
      onCancel={handleCancel}
      closable={false}
      footer={
        <Button
          type="ghost"
          htmlType="submit"
          form="register"
          className="nav-btn"
        >
          Add User
        </Button>
      }
      className="add-user-modal"
    >
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter your name" className="form-inputs" />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          tooltip="What do you want others to call you?"
          rules={[{ required: true, message: "Please input your username!" }]}
          hasFeedback
        >
          <Input placeholder="Enter your username" className="form-inputs" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            { type: "email", message: "The input is not valid E-mail!" },
            { required: true, message: "Please input your E-mail!" },
          ]}
          hasFeedback
        >
          <Input placeholder="xyz@gmail.com" className="form-inputs" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddUser;

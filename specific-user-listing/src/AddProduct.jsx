import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Upload,
  message,
  DatePicker,
  Modal,
} from "antd";
import { useNavigate } from "react-router-dom";

function AddProduct({
  onAddProduct,
  products = [],
  openResponsive,
  setOpenResponsive,
  userId,
}) {
  const [form] = Form.useForm();
  const [imageBase64, setImageBase64] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  const navigate = useNavigate();

  const success = () => {
    messageApi.open({
      type: "success",
      content: "Product has been added!",
    });
  };

  const getBase64 = (file, callback) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => callback(reader.result);
    reader.onerror = (error) => console.error("Error reading file", error);
  };

  const handleImageUpload = (file) => {
    getBase64(file, (base64) => {
      setImageBase64(base64);
    });
    return false;
  };

  const onFieldsChange = async () => {
    try {
      const values = await form.validateFields();
      const allFilled =
        values.name?.trim() !== "" &&
        values.date &&
        values.price &&
        imageBase64 !== "";

      setIsFormValid(allFilled);
    } catch (error) {
      setIsFormValid(false);
    }
  };

  const validateNoWhitespace = (fieldLabel = "This field") => {
    return (_, value) => {
      if (value && value.trim() !== "") {
        return Promise.resolve();
      }
      return Promise.reject(`${fieldLabel} cannot be empty or just spaces`);
    };
  };

  const handleInput = (e) => {
    const trimmedValue = e.target.value.trim();
    const duplicate = products.find(
      (p) =>
        p.name.toLowerCase() === trimmedValue.toLowerCase() &&
        p.userId === userId
    );
    if (duplicate) {
      form.setFields([
        {
          name: "name",
          errors: ["Product already exists!"],
        },
      ]);
      setIsFormValid(false);
      return;
    }

    form.setFields([
      {
        name: "name",
        errors: [],
      },
    ]);

    form.setFieldsValue({ name: trimmedValue });
    onFieldsChange();
  };

  const onFinish = (values) => {
    const trimmedName = values.name.trim();

    const duplicate = products.find(
      (p) => p.name === trimmedName && p.userId === userId
    );

    if (duplicate) {
      messageApi.open({
        type: "warning",
        content: "Product already exists!",
      });
      return;
    }

    const newProduct = {
      name: trimmedName,
      price: values.price,
      image: imageBase64,
      date: values.date ? values.date.format("YYYY-MM-DD") : undefined,
    };

    if (userId) {
      onAddProduct(newProduct, userId);
      success();
      form.resetFields();
      setImageBase64("");
      setIsFormValid(false);
    } else {
      messageApi.open({
        type: "error",
        content: "User ID not found. Please go back and select a user!",
      });
    }
    setOpenResponsive(false);
  };

  return (
    <>
      {contextHolder}

      <Modal
        title={<h3>Add Products</h3>}
        centered
        open={openResponsive}
        closable={false}
        onCancel={() => setOpenResponsive(false)}
        footer={[
          // <Button type="default" onClick={() => navigate("/user-list")}>
          //   Back
          // </Button>,
          <Button
            type="primary"
            htmlType="submit"
            form="register"
            className="nav-btn"
            disabled={!isFormValid}
          >
            Add
          </Button>,
        ]}
        className="add-user-modal"
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <Form
          form={form}
          name="register"
          onFinish={onFinish}
          layout="vertical"
          onValuesChange={onFieldsChange}
          scrollToFirstError
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                validator: validateNoWhitespace("Product name"),
              },
            ]}
          >
            <Input
              onBlur={handleInput}
              placeholder="Product name"
              className="form-inputs"
              style={{
                height: "50px",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Date"
            name="date"
            rules={[
              {
                required: true,
                message: "Date required!",
              },
            ]}
          >
            <DatePicker
              className="form-inputs"
              style={{
                height: "50px",
              }}
            />
          </Form.Item>

          <Form.Item
            label="Image"
            name="image"
            rules={[
              {
                required: true,
                message: "Please upload the product image!",
              },
            ]}
          >
            <Upload
              beforeUpload={handleImageUpload}
              showUploadList={false}
              listType="picture-card"
              style={{ width: "100%" }}
              className="form-inputs"
            >
              {imageBase64 ? (
                <img
                  src={imageBase64}
                  alt="Product"
                  style={{
                    width: "100%",
                    height: "100px",
                    borderRadius: "5px",
                  }}
                />
              ) : (
                <div>
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item
            label="Price"
            name="price"
            rules={[{ required: true, message: "Please input product price!" }]}
          >
            <InputNumber
              min={1000}
              placeholder="Product price"
              style={{
                height: "50px",
              }}
              className="form-inputs"
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
export default AddProduct;

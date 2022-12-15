import React from "react";
import { Button, Checkbox, Form, Input } from "antd";

import "./style.css";
import { useNavigate } from "react-router-dom";
import { Data } from "../data";

export const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    if (values.password !== values.confirmPassword) {
      closeErrorMessage();
      form.resetFields();
      return;
    }
    Data.users.push({ username: values.username, password: values.password });
    navigate("/");
  };

  const closeErrorMessage = () => {
    const message = document.getElementById("passwordError");
    if (message?.style.display === "none") {
      message.style.display = "block";
    }
    setTimeout(() => {
      if (message?.style.display === "block") {
        message.style.display = "none";
      }
    }, 1000);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form">
      <h1 style={{ alignItems: "center" }}>REGISTER</h1>
      <Form
        name="basic"
        form={form}
        labelCol={{ span: 9 }}
        wrapperCol={{ span: 6 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 9, span: 6 }}
        >
          <div className="login-bottom">
            <div></div>
            <a href="/">Go to Login!</a>
          </div>
        </Form.Item>
        <div
          id="passwordError"
          style={{ display: "none" }}
          className="errorMessage"
        >
          Passwords are not same!!!
        </div>
        <Form.Item wrapperCol={{ offset: 9, span: 6 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

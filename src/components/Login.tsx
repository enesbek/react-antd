import React from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { Data } from "../data";
import { useNavigate } from "react-router-dom";

import "./style.css";

export const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    var success = false;
    Data.users.forEach((user) => {
      if (
        user.username === values.username &&
        user.password === values.password
      ) {
        success = true;
      }
    });

    if (success) {
      navigate("/home");
    } else {
      form.resetFields();
      const message = document.getElementById("errorMessage");
      if (message?.style.display === "none") {
        message.style.display = "block";
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="login-form">
      <h1 style={{ alignItems: "center" }}>LOGIN</h1>
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
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 9, span: 6 }}
        >
          <div className="login-bottom">
            <div></div>
            <a href="/register">Go to Register!</a>
          </div>
        </Form.Item>
        <div
          id="errorMessage"
          style={{ display: "none" }}
          className="errorMessage"
        >
          Incorrect username or password.
        </div>
        <Form.Item wrapperCol={{ offset: 9, span: 6 }}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

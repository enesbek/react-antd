import React from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import CompanyTable from "./CompanyTable";

const { Header, Content, Footer } = Layout;

const navItems: MenuProps["items"] = ["Home", "Companies", "Products"].map(
  (key) => ({
    key,
    label: `${key}`,
  })
);

export const Companies = () => {
  const navigate = useNavigate();

  const menuClick = (goTo: string) => {
    navigate("/" + goTo.toLowerCase());
  };

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["Companies"]}
          items={navItems}
          onClick={(e) => {
            menuClick(e.key);
          }}
        />
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Layout style={{ padding: "24px 0", background: colorBgContainer }}>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <CompanyTable />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2022 Created by Enes Bek</Footer>
    </Layout>
  );
};

import React from "react";
import type { MenuProps } from "antd";
import { Layout, Menu, theme, Divider } from "antd";
import { CompanyTable } from "./CompanyTable";
import { LastAddedCompanies } from "./LastAddedCompanies";
import { Statistics } from "./Statistics";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer } = Layout;

const navItems: MenuProps["items"] = ["Home", "Companies", "Products"].map(
  (key) => ({
    key,
    label: `${key}`,
  })
);

export const Home = () => {
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const menuClick = (goTo: string) => {
    navigate("/" + goTo.toLowerCase());
  };

  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["Home"]}
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
            <Divider orientation="left" style={{ marginTop: "30px" }}>
              Last Added Companies
            </Divider>
            <LastAddedCompanies />
            <Divider />
            <Statistics />
          </Content>
        </Layout>
      </Content>
      <Footer style={{ textAlign: "center" }}>©2022 Created by Enes Bek</Footer>
    </Layout>
  );
};

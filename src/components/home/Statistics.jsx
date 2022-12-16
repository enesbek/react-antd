import React, { useEffect } from "react";
import { Button, Col, Row, Statistic } from "antd";
import CompanyData from "../../companyData.json";

var total = 0;

CompanyData.forEach((company) => {
  total += parseInt(company.User);
});

export const Statistics = () => (
  <Row gutter={8}>
    <Col span={4}>
      <Statistic title="Active Companies" value={CompanyData.length} />
    </Col>
    <Col span={4}>
      <Statistic title="Total Users" value={total} precision={2} />
    </Col>
  </Row>
);

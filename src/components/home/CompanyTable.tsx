import React from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import CompanyData from "../../companyData.json";
interface DataType {
  Id: number;
  Company_Name: string;
  Legal_Number: string;
  Country: string;
  User: string;
}

const columns: ColumnsType<DataType> = [
  { title: "Company Name", dataIndex: "Company_Name", key: "Company_Name" },
  { title: "Legal Number", dataIndex: "Legal_Number", key: "Legal_Number" },
  { title: "Country", dataIndex: "Country", key: "Country" },
  {
    title: "Active Users",
    dataIndex: "User",
    key: "User",
  },
];
const data: DataType[] = CompanyData;

export const CompanyTable = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  );
};

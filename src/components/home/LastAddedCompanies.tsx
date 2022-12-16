import React from "react";
import { Space, Table, Tag } from "antd";
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

const last3Company = CompanyData.slice(
  CompanyData.length - 3,
  CompanyData.length
);
const data: DataType[] = last3Company;

export const LastAddedCompanies = () => {
  return (
    <div>
      <Table columns={columns} dataSource={data} pagination={false} />
    </div>
  );
};

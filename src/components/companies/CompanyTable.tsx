import React, { useEffect, useState } from "react";
import {
  Button,
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
} from "antd";
import CompanyData from "../../companyData.json";
import Item from "antd/es/list/Item";

interface Item {
  Id: number;
  Company_Name: string;
  Legal_Number: string;
  Country: string;
  User: string;
  Website: string;
}

const originData: Item[] = CompanyData;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Item;
  index: number;
  children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const CompaniesTable: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState(0);
  const [deletingKey, setDeletingKey] = useState(0);

  useEffect(() => {}, [data]);

  const isEditing = (record: Item) => record.Id === editingKey;
  const isDeleting = (record: Item) => record.Id === deletingKey;

  const edit = (record: Partial<Item> & { Id: number }) => {
    form.setFieldsValue({
      Company_Name: "",
      Legal_Number: "",
      Country: "",
      User: "",
      Website: "",
      ...record,
    });
    setEditingKey(record.Id);
  };

  const deleteItem = (record: Partial<Item> & { Id: number }) => {
    setDeletingKey(record.Id);
  };

  const cancel = () => {
    setEditingKey(0);
  };

  const deleteConfirm = () => {
    var deletingIndex = 0;
    const newData = [...data];

    newData.forEach((company, index) => {
      if (company.Id === deletingKey) deletingIndex = index;
    });

    newData.splice(deletingIndex, 1);
    CompanyData.splice(deletingIndex, 1);

    setData(newData);
    setDeletingKey(0);
  };

  const save = async (key: React.Key) => {
    const row = (await form.validateFields()) as Item;

    const newData = [...data];
    const index = newData.findIndex((item) => key === item.Id);
    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    CompanyData[index] = newData[index];

    setData(newData);
    setEditingKey(0);
  };

  const addNewCompany = () => {
    const newData = [...data];
    const lastId = CompanyData[CompanyData.length - 1].Id + 1;
    newData.push({ Id: lastId, ...{} } as Item);
    setData(newData);
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "Company_Name",
      editable: true,
    },
    {
      title: "Legal Number",
      dataIndex: "Legal_Number",
      editable: true,
    },
    {
      title: "Country",
      dataIndex: "Country",
      editable: true,
    },
    {
      title: "User",
      dataIndex: "User",
      editable: true,
    },
    {
      title: "Website",
      dataIndex: "Website",
      editable: true,
    },
    {
      title: "Edit",
      render: (_: any, record: Item) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.Id)}
              style={{ marginRight: 8 }}
            >
              Save
            </Typography.Link>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== 0}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
        );
      },
    },
    {
      title: "Delete",
      render: (_: any, record: Item) => {
        const editable = isDeleting(record);
        return editable ? (
          <span>
            <Popconfirm title="Sure to delete?" onConfirm={deleteConfirm}>
              <a style={{ color: "red" }}>Delete</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={deletingKey !== 0}
            onClick={() => deleteItem(record)}
          >
            Delete
          </Typography.Link>
        );
      },
    },
  ];

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: Item) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <Form form={form} component={false}>
      <Table
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
      <Button type="primary" onClick={addNewCompany}>
        Add New Company
      </Button>
    </Form>
  );
};

export default CompaniesTable;

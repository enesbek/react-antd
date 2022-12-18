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
import ProductsData from "../../productData.json";

interface Product {
  Id: number;
  Product_Name: string;
  Category: string;
  Stock: number;
  Price: number;
  Company: string;
}

const productData: Product[] = ProductsData;

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Product;
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

const ProductTables: React.FC = () => {
  const [form] = Form.useForm();
  const [data, setData] = useState(productData);
  const [editingKey, setEditingKey] = useState(0);
  const [deletingKey, setDeletingKey] = useState(0);

  useEffect(() => {}, [data]);

  const isEditing = (record: Product) => record.Id === editingKey;
  const isDeleting = (record: Product) => record.Id === deletingKey;

  const edit = (record: Partial<Product> & { Id: number }) => {
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

  const deleteItem = (record: Partial<Product> & { Id: number }) => {
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
    ProductsData.splice(deletingIndex, 1);

    setData(newData);
    setDeletingKey(0);
  };

  const save = async (key: React.Key) => {
    const row = (await form.validateFields()) as Product;

    const newData = [...data];
    const index = newData.findIndex((item) => key === item.Id);
    const item = newData[index];

    newData.splice(index, 1, {
      ...item,
      ...row,
    });

    ProductsData[index] = newData[index];

    setData(newData);
    setEditingKey(0);
  };

  const addNewCompany = () => {
    const newData = [...data];
    const lastId = ProductsData[ProductsData.length - 1].Id + 1;
    newData.push({ Id: lastId, ...{} } as Product);
    setData(newData);
  };

  const columns = [
    {
      title: "Produc Name",
      dataIndex: "Product_Name",
      editable: true,
    },
    {
      title: "Category",
      dataIndex: "Category",
      editable: true,
    },
    {
      title: "Stock",
      dataIndex: "Stock",
      editable: true,
    },
    {
      title: "Price",
      dataIndex: "Price",
      editable: true,
    },
    {
      title: "Company",
      dataIndex: "Company",
      editable: true,
    },
    {
      title: "Edit",
      render: (_: any, record: Product) => {
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
      render: (_: any, record: Product) => {
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
      onCell: (record: Product) => ({
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

export default ProductTables;

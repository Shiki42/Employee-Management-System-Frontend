/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React from "react";
import { Form, Input, Upload, Button, DatePicker, Radio, Select, message, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { uploadFile} from "../../services/document";
import { useSelector } from "react-redux";
import styles from "./applicationForm.module.css"; // Assuming you have a CSS module for styling
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Field } from "../../interfaces/FormField.interface";
import { defaultFields } from "./profileFields";

interface ApplicationFormProps {
  onFinish: (values: any) => void;
  formData?: any;
  fields: Field[];
  form?:any;
  setFilesId?:any;
  disabled?: boolean;
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({ onFinish, formData, fields, form, setFilesId, disabled }) => {
  const user = useSelector((state:any) => state.user);

  const handleFileSubmit = async (info:any) => {
    const { status, response } = info.file;

    if (status === "uploading") {
      // File is uploading
    }
    if (status === "done") {

      if (response && response.documentId && response.name) {
        const field = response.name;
        setFilesId((prev:any) => {
          return { ...prev, [field]: response.documentId };
        });
        message.success(`${info.file.name} file uploaded successfully.`);
      } else {
        message.error(`${info.file.name} file upload failed.`);
      }
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  
  return (
    <Form
      form={form}
      name="applicationForm"
      onFinish={onFinish}
      layout="vertical"
      disabled={disabled}
      //initialValues={formData}
    >
      {fields.map((field, index) => (
        <Form.Item
          key={index}
          label={field.label}
          name={field.name}
          rules={field.rules}
          //initialValue={field.initialValue}
        >
          {field.type === "text" && <Input disabled={field.disabled} />}
          {field.type === "upload" && (
            <Upload
              action="http://localhost:3050/api/document"  
              data={{
                username: user.name,
                name: field.name
              }}
              onChange={handleFileSubmit}
              maxCount={1}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>)}
          {field.type === "datePicker" && <DatePicker />}
          {field.type === "radio" && (
            <Radio.Group options={field.options} />
          )}
          {field.type === "select" && (
            <Select>
              {field.options?.map((option, i) => (
                <Select.Option key={i} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      ))}
      <Form.List name="emergencyContacts">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, "name","firstName"]}
                  fieldKey={fieldKey ? [fieldKey.toString(), "firstName"] : undefined}
                  rules={[{ required: true, message: "Missing first name" }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name,"name", "lastName"]}
                  fieldKey={fieldKey ? [fieldKey.toString(), "lastName"] : undefined}
                  rules={[{ required: true, message: "Missing last name" }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "relationship"]}
                  fieldKey={fieldKey ? [fieldKey.toString(), "relationship"] : undefined}
                  rules={[{ required: true, message: "Missing relationship" }]}
                >
                  <Input placeholder="Relationship" />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Emergency Contact
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ApplicationForm;

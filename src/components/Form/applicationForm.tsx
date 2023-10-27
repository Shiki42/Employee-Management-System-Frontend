/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React from "react";
import { Form, Input, Upload, Button, DatePicker, Radio, Select, message, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
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


      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ApplicationForm;

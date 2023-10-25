/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Form, Input, Upload, Button, DatePicker, Radio, Select, message, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { uploadFile} from '../../services/document';
import { useSelector } from "react-redux";
import styles from './applicationForm.module.css'; // Assuming you have a CSS module for styling
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

interface FieldOption {
  label: string;
  value: string;
}

export interface Field {
  label: string;
  name: string[] | string;
  rules?: any[];
  type: 'text' | 'password' | 'upload' | 'datePicker' | 'radio' | 'select';
  options?: any[];
  initialValue?: any;
  disabled?: boolean;
}

interface ApplicationFormProps {
  onFinish: (values: any) => void;
  formData?: any;
  fields: Field[];
  form?:any;
  setFileId?:any;
}


export const defaultFields: Field[] = [
  // Name Section
  {
    label: 'First Name',
    name: ['name', 'firstName'],
    type: 'text',
    rules: [{ required: true, message: 'Please input your first name!' }],
  },
  {
    label: 'Last Name',
    name: ['name', 'lastName'],
    type: 'text',
    rules: [{ required: true, message: 'Please input your last name!' }],
  },
  {
    label: 'Middle Name',
    name: ['name', 'middleName'],
    type: 'text',
  },
  {
    label: 'Preferred Name',
    name: ['name', 'preferredName'],
    type: 'text',
  },
  // Profile Picture
  {
    label: 'Profile Picture',
    name: 'profilePicture',
    type: 'upload',
  },
  // Address Section
  {
    label: 'Building/Apt #',
    name: ['address', 'building'],
    type: 'text',
    rules: [{ required: true, message: 'Please input your building/apt #' }],
  },
  {
    label: 'Street Name',
    name: ['address', 'street'],
    type: 'text',
    rules: [{ required: true, message: 'Please input your street name!' }],
  },
  {
    label: 'City',
    name: ['address', 'city'],
    type: 'text',
    rules: [{ required: true, message: 'Please input your city!' }],
  },
  {
    label: 'State',
    name: ['address', 'state'],
    type: 'text',
    rules: [{ required: true, message: 'Please select your state!' }],
  },
  {
    label: 'ZIP Code',
    name: ['address', 'zip'],
    type: 'text',
    rules: [{ required: true, message: 'Please input your ZIP code!' }],
  },
  // Phone Numbers
  {
    label: 'Phone Number',
    name: 'phoneNumber',
    type: 'text',
    rules: [{ required: true, message: 'Please input your phone number!' }],
  },
  {
    label: 'Work Phone Number',
    name: 'workPhoneNumber',
    type: 'text',
  },
  // Email
  {
    label: 'Email',
    name: 'email',
    type: 'text',
    rules: [
      { required: true, message: 'Please input your email!' },
      { type: 'email', message: 'Invalid email format!' },
    ],
    initialValue: '',
    disabled: true,
  },
  // SSN, DOB, Gender
  {
    label: 'SSN',
    name: 'SSN',
    type: 'text',
    rules: [{ required: true, message: 'Please input your SSN!' }],
  },
  {
    label: 'Date of Birth',
    name: 'DOB',
    type: 'datePicker',
    rules: [{ required: true, message: 'Please select your date of birth!' }],
  },
  {
    label: 'Gender',
    name: 'gender',
    type: 'radio',
    options: [
      { label: 'Male', value: 'male' },
      { label: 'Female', value: 'female' },
      { label: 'I do not wish to answer', value: 'i do not wish to answer' },
    ],
    rules: [{ required: true, message: 'Please select your gender!' }],
  },
  // Work Authorization
  {
    label: 'Work Authorization',
    name: 'citizenship',
    type: 'select',
    options: [
      { label: 'Citizen', value: 'citizen' },
      { label: 'Green Card', value: 'green card' },
    ],
    rules: [{ required: true, message: 'Please select your work authorization!' }],
  },
  // Reference
  {
    label: 'Referrer First Name',
    name: ['referrer', 'name', 'firstName'],
    type: 'text',
    rules: [{ required: true, message: 'Please input the referrer\'s first name!' }],
  },
  {
    label: 'Referrer Last Name',
    name: ['referrer', 'name', 'lastName'],
    type: 'text',
    rules: [{ required: true, message: 'Please input the referrer\'s last name!' }],
  },
  {
    label: 'Referrer Relationship',
    name: ['referrer', 'relationship'],
    type: 'text',
    rules: [{ required: true, message: 'Please input your relationship with the referrer!' }],
  },
  // Emergency Contact
  // {
  //   label: 'Emergency Contact First Name',
  //   name: ['emergencyContact', 'name', 'firstName'],
  //   type: 'text',
  //   rules: [{ required: true, message: 'Please input the emergency contact\'s first name!' }],
  // },
  // {
  //   label: 'Emergency Contact Last Name',
  //   name: ['emergencyContact', 'name', 'lastName'],
  //   type: 'text',
  //   rules: [{ required: true, message: 'Please input the emergency contact\'s first name!' }],
  // },
  // {
  //   label: 'Emergency Contact Relationship',
  //   name: ['emergencyContact', 'relationship'],
  //   type: 'text',
  //   rules: [{ required: true, message: 'Please input your relationship with the emergency contact!' }],
  // }
];


const ApplicationForm: React.FC<ApplicationFormProps> = ({ onFinish, formData, fields, form, setFileId }) => {
  const user = useSelector((state:any) => state.user);

  const handleChange = async (info:any) => {
    const { status, response } = info.file;

    if (status === 'uploading') {
      // File is uploading
    }

    if (status === 'done') {
      // File uploaded successfully
      if (response && response.documentId) {
        setFileId(response.documentId); // Update fileId state
        message.success(`${info.file.name} file uploaded successfully.`);
      } else {
        message.error(`${info.file.name} file upload failed.`);
      }
    } else if (status === 'error') {
      // File upload failed
      message.error(`${info.file.name} file upload failed.`);
    }
  };
  
  return (
    <Form
      form={form}
      name="applicationForm"
      onFinish={onFinish}
      layout="vertical"
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
          {field.type === 'text' && <Input disabled={field.disabled} />}
          {field.type === 'upload' && (
            <Upload
            action="http://localhost:3050/api/document"  // Your specific API endpoint
            data={{
              username: user.name // Additional data
            }}
            onChange={handleChange}
            maxCount={1}
            >
            <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>)}
          {field.type === 'datePicker' && <DatePicker />}
          {field.type === 'radio' && (
            <Radio.Group options={field.options} />
          )}
          {field.type === 'select' && (
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
              <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                <Form.Item
                  {...restField}
                  name={[name, 'name','firstName']}
                  fieldKey={fieldKey ? [fieldKey.toString(), 'firstName'] : undefined}
                  rules={[{ required: true, message: 'Missing first name' }]}
                >
                  <Input placeholder="First Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name,'name', 'lastName']}
                  fieldKey={fieldKey ? [fieldKey.toString(), 'lastName'] : undefined}
                  rules={[{ required: true, message: 'Missing last name' }]}
                >
                  <Input placeholder="Last Name" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'relationship']}
                  fieldKey={fieldKey ? [fieldKey.toString(), 'relationship'] : undefined}
                  rules={[{ required: true, message: 'Missing relationship' }]}
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

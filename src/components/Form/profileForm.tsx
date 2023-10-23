/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Form, Input, Upload, Button, DatePicker, Radio, Select, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { FormInstance } from 'antd/lib/form/Form';

interface Field {
  name: string | string[];
  label: string;
  rules?: any;
  type: string;
  initialValue?: any;
  options?: { label: string; value: string }[];
}

interface ProfileFormProps {
  fields: Field[];
  form: FormInstance;
  sectionName: string;
}
export const ProfileForm: React.FC<ProfileFormProps> = ({ fields, form, sectionName }) => {
  const [isEditing, setIsEditing] = useState(false);

  const toggleEditing = () => {
    if (isEditing) {
      Modal.confirm({
        title: 'Discard changes?',
        content: 'Do you want to discard all of your changes?',
        onOk: () => setIsEditing(false),
      });
    } else {
      setIsEditing(true);
    }
  };

  const saveChanges = () => {
    // Save logic here
    setIsEditing(false);
  };

  return (
    <div className="profile-section">
      <h2>{sectionName}</h2>
      {isEditing ? (
        <Button onClick={toggleEditing}>Cancel</Button>
      ) : (
        <Button onClick={toggleEditing}>Edit</Button>
      )}
      {isEditing && <Button onClick={saveChanges}>Save</Button>}
      {fields.map((field, index) => (
        <Form.Item
          key={index}
          label={field.label}
          name={field.name}
          rules={field.rules}
          initialValue={field.initialValue}
        >
          {field.type === 'text' && <Input disabled={!isEditing} />}
          {field.type === 'upload' && <Upload><Button icon={<UploadOutlined />}>Upload</Button></Upload>}
          {field.type === 'datePicker' && <DatePicker disabled={!isEditing} />}
          {field.type === 'radio' && <Radio.Group options={field.options} disabled={!isEditing} />}
          {field.type === 'select' && (
            <Select disabled={!isEditing}>
              {field.options?.map((option:any, i:any) => (
                <Select.Option key={i} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      ))}
    </div>
  );
};

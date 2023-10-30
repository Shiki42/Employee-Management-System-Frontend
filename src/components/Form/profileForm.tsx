/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Form, Input, Upload, Button, DatePicker, Radio, Select, Modal, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { FormInstance } from "antd/lib/form/Form";
import { Field } from "../../interfaces/FormField.interface";
import { handleFileSubmit } from "./profileSharedModules";
interface ProfileFormProps {
  fields: Field[];
  sectionName: string;
  onFinish: (values: any) => void;
  form:any;
  sectionButtons?: boolean;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ fields, sectionName, onFinish,  form, sectionButtons}) => {
  const [isEditing, setIsEditing] = useState(false);
  const user = useSelector((state: any) => state.user);

  const toggleEditing = () => {
    if (isEditing) {
      Modal.confirm({
        title: "Discard changes?",
        content: "Do you want to discard all of your changes?",
        onOk: () => setIsEditing(false),
      });
    } else {
      setIsEditing(true);
    }
  };

  const saveChanges = () => {
    const fieldNames = fields.map((field) => field.name);

    const values = form.getFieldsValue(fieldNames);
    console.log("filterdvalues", values);
    onFinish(values);
    setIsEditing(false);
  };

  return (
    <div className="profile-section">
      <h2>{sectionName}</h2>

      {fields.map((field, index) => (
        <Form.Item
          key={index}
          label={field.label}
          name={field.name}
          rules={field.rules}
          // initialValue={field.initialValue}
        >
          {field.name === "email" ? (field.type === "text" && 
          <Input disabled={true} />) :
            (field.type === "text" && <Input disabled={sectionButtons && !isEditing} />)}
          {field.type === "upload" && (
            <Upload
              action="http://localhost:3050/api/document"
              data={{
                username: user.name,
                type: field.name,
              }}
              onChange={(info) => handleFileSubmit(info, form, field.name)}
              maxCount={1}
              disabled={sectionButtons && !isEditing}
            >
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          )}
          {field.type === "datePicker" && <DatePicker disabled={sectionButtons && !isEditing} />}
          {field.type === "radio" && <Radio.Group options={field.options} disabled={sectionButtons && !isEditing} />}
          {field.type === "select" && (
            <Select disabled={sectionButtons && !isEditing}>
              {field.options?.map((option: any, i: any) => (
                <Select.Option key={i} value={option.value}>
                  {option.label}
                </Select.Option>
              ))}
            </Select>
          )}
        </Form.Item>
      ))}
      {sectionButtons && (
        <>
          {isEditing ? (
            <Button onClick={toggleEditing}>Cancel</Button>
          ) : (
            <Button onClick={toggleEditing}>Edit</Button>
          )}
          {isEditing && <Button htmlType="submit" onClick={saveChanges}>Save</Button>}
        </>
      )}
    </div>
  );
};

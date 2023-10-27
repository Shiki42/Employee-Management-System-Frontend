/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../app/userSlice";

import { Form, Input, Button, Select, Upload, DatePicker, Radio, Space,message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { nameFields,addressFields,contactFields,employmentFields,emergencyContactFields } from "../../components/Form/profileFields";
import { ProfileForm } from "../../components/Form/profileForm"; 
import { getApplication,submitApplication } from "../../services/application";
import StatusTag from "../../components/StatusTag";

const EditApplication: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state:any) => state.user);

  const [filesId, setFilesId] = useState<any>({});
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({ email: user.email});
    async function fetchApplication() {
      if (user.applicationId) {
        setIsLoading(true);
        const response = await getApplication({ applicationId: user.applicationId });
        if (response.application) {
          setFormData(response.application);
        }
        if (response.application.status !== "rejected") {
          setFormDisabled(true);
        }
      }
      setIsLoading(false);

    }
    fetchApplication();
  }, [user]);

  useEffect(() => {
    form.setFieldsValue({...formData, DOB: formData.DOB ? moment(formData.DOB) : null});
  }, [formData]);

  const onFinish = async (values: any) => {
    try {
      values.profilePicture = filesId.profilePicture;
      values.driverLicense = filesId.driverLicense;
      values.visaStatus.optReceipt.docId = filesId.optReceipt;
      const response = await submitApplication({...values,username:user.name});

      dispatch(setCurrentUser({ applicationId: response._id, applicationStatus: response.status}));
      navigate("/");
      message.success("Application successfully edited.");
    } catch (err) {
      message.error("Error when updating Application");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (      
    <>
      {user.applicationStatus?<StatusTag status={user.applicationStatus} />:null}           
      <Form
        form={form}
        name="profilePage"
        onFinish={onFinish}
        layout="vertical"
        disabled={formDisabled}
      >
        <ProfileForm fields={nameFields} onFinish={onFinish} form={form} setFilesId={setFilesId} sectionName="Name" />
        <ProfileForm fields={addressFields}  onFinish={onFinish} form={form} sectionName="Address" />
        <ProfileForm fields={contactFields}  onFinish={onFinish} form={form} sectionName="Contact Info" />
        <ProfileForm fields={employmentFields}  onFinish={onFinish} form={form} sectionName="Employment" />
        {/* <ProfileForm fields={emergencyContactFields}  onFinish={onFinish} form={form} sectionName="Emergency Contact" /> */}
        {/* <ProfileForm fields={groupFieldsBySection('documents')} form={form} sectionName="Documents" /> */}

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
          <button type="submit">Save All</button>
        </Form.Item>
      </Form>
    </> 
  );
};

export default EditApplication;

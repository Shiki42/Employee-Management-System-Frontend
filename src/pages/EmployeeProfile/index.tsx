/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Button, Form, FormInstance, Modal, Input, Space, message } from "antd";
import { UploadOutlined, MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { ProfileForm } from "../../components/Form/profileForm"; 
import { Field } from "../../interfaces/FormField.interface";
import { nameFields,addressFields,contactFields,employmentFields,emergencyContactFields } from "../../components/Form/profileSharedModules";

import { getApplication,updateApplication } from "../../services/application";

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();
  const currentUser = useSelector((state:any) => state.user);
  const dispatch = useDispatch();

  const [fileId, setFileId] = useState<any>(null);
  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmergencyEditing, setIsEmergencyEditing] = useState(false);

  useEffect(() => {
    if (currentUser.applicationStatus !== "approved") {
      navigate("/application");
    }
  }, [currentUser, navigate]);


  useEffect(() => {
    form.setFieldsValue({ email: currentUser.email});
    async function fetchApplication() {
      try{
        if (currentUser.applicationId) {
          setIsLoading(true);
          const response = await getApplication({ applicationId: currentUser.applicationId });
          if (response.application) {
            setFormData(response.application);
          }

        }
        setIsLoading(false);
      } catch (err) {
        navigate("/error");
        console.log(err);
      }

    }
    fetchApplication();
  }, [currentUser]);

  useEffect(() => {
    console.log("formData",formData);
    if(!formData) return;
    form.setFieldsValue({
      ...formData,
      DOB: formData.DOB ? moment(formData.DOB) : null,
      workAuth: {
        ...formData.workAuth,
        StartDate: formData.workAuth.StartDate
          ? moment(formData.workAuth.StartDate)
          : null,
        EndDate: formData.workAuth.EndDate
          ? moment(formData.workAuth.EndDate)
          : null,
      },
    });
  }, [formData]);
  
  
  const toggleEmergencyEditing = () => {
    if (isEmergencyEditing) {
      Modal.confirm({
        title: "Discard changes?",
        content: "Do you want to discard all of your changes?",
        onOk: () => setIsEmergencyEditing(false),
      });
    } else {
      setIsEmergencyEditing(true);
    }
  };

  const saveEmergencyChanges = () => {
    const emergencyValues = form.getFieldValue("emergencyContacts");
    // Here you can make API calls to save data
    console.log("Emergency Contacts: ", emergencyValues);
    setIsEmergencyEditing(false);
  };

  const onFinish = async (values: any) => {
    try {
      //values.profilePicture = fileId;
  
      const response = await updateApplication({...values,username:currentUser.name, applicationId: currentUser.applicationId});
  
      message.success("Profile update edited.");
    } catch (err) {
      message.error("Error when updating profile");
    }
  };
  
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Form
      form={form}
      name="profilePage"
      onFinish={onFinish}
      layout="vertical"
    >
      <ProfileForm fields={nameFields} onFinish={onFinish} form={form} sectionButtons={true} sectionName="Name" />
      <ProfileForm fields={addressFields}  onFinish={onFinish} form={form} sectionButtons={true} sectionName="Address" />
      <ProfileForm fields={contactFields}  onFinish={onFinish} form={form} sectionButtons={true} sectionName="Contact Info" />
      <ProfileForm fields={employmentFields}  onFinish={onFinish} form={form} sectionButtons={true} sectionName="Employment" />
      <Form.List name="emergencyContacts">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space key={key} style={{ display: "flex", marginBottom: 8 }} align="baseline">
                {/* Add disabled={!isEmergencyEditing} to the Input components to disable them when not editing */}
                <Form.Item
                  {...restField}
                  name={[name, "name", "firstName"]}
                  fieldKey={fieldKey ? [fieldKey.toString(), "firstName"] : undefined}
                  rules={[{ required: true, message: "Missing first name" }]}
                >
                  <Input placeholder="First Name" disabled={!isEmergencyEditing} />
                </Form.Item>
                {/* ... other form items ... */}
                
                <Form.Item
                  {...restField}
                  name={[name, "name", "lastName"]}
                  fieldKey={fieldKey ? [fieldKey.toString(), "firstName"] : undefined}
                  rules={[{ required: true, message: "Missing last name" }]}
                >
                  <Input placeholder="Last Name" disabled={!isEmergencyEditing} />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "relationship"]}
                  fieldKey={fieldKey ? [fieldKey.toString(), "firstName"] : undefined}
                  rules={[{ required: true, message: "Missing relationship" }]}
                >
                  <Input placeholder="Relationship" disabled={!isEmergencyEditing} />
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />} disabled={!isEmergencyEditing}>
          Add Emergency Contact
              </Button>
            </Form.Item>
            {/* Edit/Save/Cancel Buttons */}
            {isEmergencyEditing ? (
              <Button onClick={toggleEmergencyEditing}>Cancel</Button>
            ) : (
              <Button onClick={toggleEmergencyEditing}>Edit</Button>
            )}
            {isEmergencyEditing && <Button onClick={saveEmergencyChanges}>Save</Button>}
          </>
        )}
      </Form.List>

      <Form.Item>
        <button type="submit">Save All</button>
      </Form.Item>
    </Form>
  );
};

export default ProfilePage;

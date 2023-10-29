/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";

import React from "react";
import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { Form, FormInstance, message } from "antd";
import { ProfileForm } from "../../components/Form/profileForm"; 
import { Field } from "../../interfaces/FormField.interface";
import { nameFields,addressFields,contactFields,employmentFields,emergencyContactFields } from "../../components/Form/profileFields";

import { getApplication,updateApplication } from "../../services/application";

const ProfilePage: React.FC = () => {
  const [form] = Form.useForm();

  
  const currentUser = useSelector((state:any) => state.user);
  const dispatch = useDispatch();

  const [fileId, setFileId] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue({ email: currentUser.email});
    async function fetchApplication() {
      if (currentUser.applicationId) {
        setIsLoading(true);
        const response = await getApplication({ applicationId: currentUser.applicationId });
        if (response.application) {
          setFormData(response.application);
        }
      }
      setIsLoading(false);
  
    }
    fetchApplication();
  }, [currentUser]);
  
  useEffect(() => {
    form.setFieldsValue({...formData, DOB: formData.DOB ? moment(formData.DOB) : null});
  }, [formData]);
  
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
      <ProfileForm fields={emergencyContactFields}  onFinish={onFinish} form={form} sectionButtons={true} sectionName="Emergency Contact" />
      {/* <ProfileForm fields={groupFieldsBySection('documents')} form={form} sectionName="Documents" /> */}

      <Form.Item>
        <button type="submit">Save All</button>
      </Form.Item>
    </Form>
  );
};

export default ProfilePage;

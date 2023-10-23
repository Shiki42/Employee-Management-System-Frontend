/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Form, FormInstance } from 'antd';
import { ProfileForm } from '../../components/Form/profileForm';  // Make sure to import ProfileForm
import { defaultFields, Field } from '../../components/Form/applicationForm';  // Your defaultFields array

const ProfilePage: React.FC = () => {
    const [form] = Form.useForm<FormInstance>();

    const onFinish = (values: any) => {
        console.log('Received values:', values);
    };

    const groupFieldsBySection = (section: string): Field[] => {
        return defaultFields.filter(field => field.name[0] === section || field.name === section);
    };

  return (
    <Form
      form={form}
      name="profilePage"
      onFinish={onFinish}
      layout="vertical"
    >
      <ProfileForm fields={groupFieldsBySection('name')} form={form} sectionName="Name" />
      <ProfileForm fields={groupFieldsBySection('address')} form={form} sectionName="Address" />
      <ProfileForm fields={groupFieldsBySection('contact')} form={form} sectionName="Contact Info" />
      <ProfileForm fields={groupFieldsBySection('employment')} form={form} sectionName="Employment" />
      <ProfileForm fields={groupFieldsBySection('emergencyContact')} form={form} sectionName="Emergency Contact" />
      <ProfileForm fields={groupFieldsBySection('documents')} form={form} sectionName="Documents" />

      <Form.Item>
        <button type="submit">Save All</button>
      </Form.Item>
    </Form>
  );
};

export default ProfilePage;

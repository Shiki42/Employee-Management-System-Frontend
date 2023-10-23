/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Upload, DatePicker, Radio, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate, useParams } from "react-router-dom";
import { getApplication,submitApplication } from '../../services/application';


const EditApplication: React.FC = () => {
    console.log("EditApplication");
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const { username, applicationId } = useParams()
    
    const [formData, setFormData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchApplication() {
            if (applicationId) {
                setIsLoading(true);
                const response = await getApplication({ applicationId });
                if(response.application){
                    setFormData(response.application);
                }               
            }
        }
        fetchApplication();
    }, []);


    useEffect(() => {
        console.log(formData)
        form.setFieldsValue({...formData, DOB: null});
    }, [formData]);

    const onFinish = async (values: any) => {
            try {
                    const response = await submitApplication(formData);
                    navigate((location as any).state?.from || '/');
                    message.success(`Application successfully edited.`);
                } catch (err) {
                    message.error("Error when updating Application");
                }
    }

    if (!formData) {
        return <div>Loading...</div>;
      }

    return (
        
        <Form
            form={form}
            name="editApplication"
            //initialValues={formData}
            onFinish={onFinish}
            layout="vertical"
        >
            {/* Name Section */}
            <Form.Item
                label="First Name"
                name={['name', 'firstName']}
                rules={[{ required: true, message: 'Please input your first name!' }]}
                initialValue = {formData?.name?.firstName}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Last Name"
                name={['name', 'lastName']}
                rules={[{ required: true, message: 'Please input your last name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Middle Name"
                name={['name', 'middleName']}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Preferred Name"
                name={['name', 'preferredName']}
            >
                <Input />
            </Form.Item>

            {/* Profile Picture */}
            <Form.Item
                label="Profile Picture"
                name="profilePicture"
            >
                <Upload>
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>

            {/* Address Section */}
            <Form.Item
                label="Building/Apt #"
                name={['address', 'building']}
                rules={[{ required: true, message: 'Please input your building/apt #' }]}
            >
                <Input />
            </Form.Item>
            {/* ... Add the rest of the address fields like street, city, etc ... */}
            <Form.Item
                label="Street Name"
                name={['address', 'street']}
                rules={[{ required: true, message: 'Please input your street name!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="City"
                name={['address', 'city']}
                rules={[{ required: true, message: 'Please input your city!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="State"
                name={['address', 'state']}
                rules={[{ required: true, message: 'Please select your state!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="ZIP Code"
                name={['address', 'zip']}
                rules={[{ required: true, message: 'Please input your ZIP code!' }]}
            >
                <Input />
            </Form.Item>

            {/* Phone Numbers */}
            <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: 'Please input your phone number!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Work Phone Number"
                name="workPhoneNumber"
            >
                <Input />
            </Form.Item>

            {/* Email */}
            <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                initialValue={'hushuyuan42@gmail.com'}
            >
                <Input disabled />
            </Form.Item>

            {/* SSN, DOB, Gender */}
            <Form.Item
                label="SSN"
                name="SSN"
                rules={[{ required: true, message: 'Please input your SSN!' }]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                label="Date of Birth"
                name="DOB"
                rules={[{ required: true, message: 'Please select your date of birth!' }]}
            >
                <DatePicker />
            </Form.Item>
            <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true, message: 'Please select your gender!' }]}
            >
                <Radio.Group>
                    <Radio value="male">Male</Radio>
                    <Radio value="female">Female</Radio>
                    <Radio value="i do not wish to answer">I do not wish to answer</Radio>
                </Radio.Group>
            </Form.Item>

            {/* Work Authorization */}
            <Form.Item
                label="Work Authorization"
                name="workAuth"
                rules={[{ required: true, message: 'Please select your work authorization!' }]}
            >
                <Select>
                    <Select.Option value="citizen">Citizen</Select.Option>
                    <Select.Option value="green card">Green Card</Select.Option>
                    {/* Add more options if needed */}
                </Select>
            </Form.Item>

            {/* Reference */}
            <Form.Item
                label="Referrer First Name"
                name={['referr', 'name', 'firstName']}
                rules={[{ required: true, message: 'Please input the referrer\'s first name!' }]}
            >
                <Input />
            </Form.Item>
            {/* ... Continue similarly for lastName, middleName, etc ... */}
            <Form.Item
                label="Referrer Relationship"
                name={['referr', 'relationship']}
                rules={[{ required: true, message: 'Please input your relationship with the referrer!' }]}
            >
                <Input />
            </Form.Item>

            {/* Emergency Contacts */}
            {/* As emergency contacts is an array, you might want to use dynamic form items with antd, or handle it manually with map and state. 
                 For brevity, I'll just show the structure for one emergency contact. */}
            <Form.Item
                label="Emergency Contact First Name"
                name={['emergencyContact', 'name', 'firstName']}
                rules={[{ required: true, message: 'Please input the emergency contact\'s first name!' }]}
            >
                <Input />
            </Form.Item>
            {/* ... Continue similarly for lastName, middleName, etc ... */}
            <Form.Item
                label="Emergency Contact Relationship"
                name={['emergencyContact', 'relationship']}
                rules={[{ required: true, message: 'Please input your relationship with the emergency contact!' }]}
            >
                <Input />
            </Form.Item>

            {/* Submit Button */}
            <Form.Item>
                <Button type="primary" htmlType="submit" onClick={onFinish}>
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default EditApplication;

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";

import { useSelector } from 'react-redux';

import { Form, Input, Button, Select, Upload, DatePicker, Radio, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { getApplication,submitApplication } from '../../services/application';
import ApplicationForm, {defaultFields} from '../../components/Form/applicationForm';

const EditApplication: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const user = useSelector((state:any) => state.user);
    
    const [formData, setFormData] = useState<any>({});
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchApplication() {
            if (user.applicationId) {
                setIsLoading(true);
                const response = await getApplication({ applicationId:user.applicationId });
                if(response.application){
                    setFormData(response.application);
                }               
            }
            setIsLoading(false);
        }
        fetchApplication();
    }, []);

    useEffect(() => {
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

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user.applicationId) {
        return (
            <ApplicationForm onFinish={onFinish} fields={defaultFields} form={form} />
        );
    }

    return (        
        <ApplicationForm onFinish={onFinish} fields={defaultFields} form={form} />
    );
};

export default EditApplication;

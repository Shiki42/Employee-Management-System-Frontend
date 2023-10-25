/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";


import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from '../../app/userSlice';

import { Form, Input, Button, Select, Upload, DatePicker, Radio, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { getApplication,submitApplication } from '../../services/application';
import ApplicationForm, {defaultFields} from '../../components/Form/applicationForm';
import StatusTag from '../../components/StatusTag';

const EditApplication: React.FC = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state:any) => state.user);

    const [fileId, setFileId] = useState<any>(null);
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
                if (response.application.status !== 'rejected') {
                    setFormDisabled(true);
                }
            }
            setIsLoading(false);

         }
        fetchApplication();
    }, [user]);

    useEffect(() => {
        form.setFieldsValue({...formData, DOB: null});
    }, [formData]);

    const onFinish = async (values: any) => {
            try {
                    values.profilePicture = fileId;

                    const response = await submitApplication({...values,username:user.name});

                    dispatch(setCurrentUser({ applicationId: response._id, applicationStatus: response.status}));
                    navigate('/');
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
            <ApplicationForm onFinish={onFinish} fields={defaultFields} form={form} setFileId={setFileId}  />
        );
    }

    return (      
        <>
        {user.applicationStatus?<StatusTag status={user.applicationStatus} />:null}           
        <ApplicationForm onFinish={onFinish} fields={defaultFields} form={form} setFileId={setFileId} disabled={formDisabled}/>
        </> 
    );
};

export default EditApplication;

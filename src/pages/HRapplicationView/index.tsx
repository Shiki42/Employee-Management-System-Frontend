/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from "moment";
import React, { useState, useEffect } from "react";

import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";

import { Form, Input, Button, Select, DatePicker, Radio, Space, message } from "antd";

import { ProfileForm } from "../../components/Form/profileForm";
import StatusTag from "../../components/StatusTag";
import { nameFields,addressFields,contactFields,referrerFields,
  employmentFields,emergencyContactFields } from "../../components/Form/profileSharedModules";

import { getProfileByEmployeeId} from "../../services/HR";

export default function HRapplicationView () {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  const [citizenshipStatus, setCitizenshipStatus] = useState<string | null>(null);
  const [visaStatus, setvisaStatus] = useState<string | null>(null);

  const [form] = Form.useForm();
  const [formData, setFormData] = useState<any>(null);

  const onCitizenshipStatusChange = (e: any) => {
    setCitizenshipStatus(e.target.value);
  };

  const onVisaStatusChange = (value:string) => {
    setvisaStatus(value);
  };


  useEffect(() => {
    async function fetchProfile() {
      try {
        if (!id) {
          navigate("/error");
        } else {
          const response = await getProfileByEmployeeId(id);
          console.log("response",response);
          setFormData(response.profile);
          setIsLoading(false);
          console.log(response);
        }
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    }
    fetchProfile();
        
  },[id]);

  useEffect(() => {
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

  return (
    <>
      {formData.Status?<StatusTag status={formData.Status} />:null}           
      <Form
        form={form}
        name="profilePage"
        onFinish={()=>{}}
        layout="vertical"
        disabled={true}
      >
        <ProfileForm fields={nameFields} onFinish={()=>{}} form={form}  sectionName="Name" />
        <ProfileForm fields={addressFields}  onFinish={()=>{}} form={form} sectionName="Address" />
        <ProfileForm fields={contactFields}  onFinish={()=>{}} form={form} sectionName="Contact Info" />
        <Form.Item
          name="citizenship"
          label="Permanent resident or citizen of the U.S.?"
        >
          <Radio.Group onChange={onCitizenshipStatusChange}>
            <Radio value="citizen">Citizen</Radio>
            <Radio value="green card">Green Card</Radio>
            <Radio value="no">No</Radio>
          </Radio.Group>          
        </Form.Item>
        {citizenshipStatus === "no" && ( 
          <div className="profile-section">
            <h2>Employment</h2>
          
            {/* Visa Type */}
            <Form.Item
              label="Visa Type"
              name={["workAuth", "type"]}
              rules={[{ required: true, message: "Please select your work authorization!" }]}
            >
              <Select onChange={onVisaStatusChange}>
                <Select.Option value="H1-B">H1-B</Select.Option>
                <Select.Option value="L2">L2</Select.Option>
                <Select.Option value="F1(CPT/OPT)">F1(CPT/OPT)</Select.Option>
                <Select.Option value="H4">H4</Select.Option>
                <Select.Option value="Other">Other</Select.Option>
              </Select>
            </Form.Item>
          
            {/* workAuth Start Date */}
            <Form.Item
              label="workAuth Start Date"
              name={["workAuth", "StartDate"]}
              rules={[{ required: true, message: "Please select your workAuth Start Date!" }]}
            >
              <DatePicker />
            </Form.Item>
          
            {/* workAuth End Date */}
            <Form.Item
              label="workAuth End Date"
              name={["workAuth", "EndDate"]}
              rules={[{ required: true, message: "Please select your workAuth End Date!" }]}
            >
              <DatePicker />
            </Form.Item>
          
            {visaStatus === "F1(CPT/OPT)" && ( <Form.Item
              label="optReceipt"
              name={["visaStatus", "optReceipt","docId"]}
              rules={[]}
            >
            </Form.Item> )}
  
            {visaStatus === "Other" && ( <Form.Item
              label="Other Visa Type"
              name={["workAuth", "Other"]}
            >
              <Input />
            </Form.Item> )}
              
          </div> )}
        {/* <ProfileForm fields={emergencyContactFields}  onFinish={onFinish} form={form} sectionName="Emergency Contact" /> */}
        {/* <ProfileForm fields={groupFieldsBySection('documents')} form={form} sectionName="Documents" /> */}
  
        <ProfileForm fields={referrerFields}  onFinish={()=>{}} form={form} sectionName="Referrer" />
        <Form.List name="emergencyContacts">
          {/* {(fields, { add, remove }) => ( */}
          {(fields) => (
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
                </Space>
              ))}

            </>
          )}
        </Form.List>
        <Form.Item>
          <button type="submit">Save All</button>
        </Form.Item>
      </Form>
    </> 
  );

}






/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import moment from "moment";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "../../app/userSlice";

import {
  Form,
  Input,
  Button,
  Select,
  Upload,
  DatePicker,
  Radio,
  Space,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  handleFileSubmit,
  nameFields,
  addressFields,
  contactFields,
  referrerFields,
  employmentFields,
  emergencyContactFields,
} from "../../components/Form/profileSharedModules";
import { ProfileForm } from "../../components/Form/profileForm";
import {
  getApplication,
  createApplication,
  updateApplication,
} from "../../services/application";

import StatusTag from "../../components/StatusTag";

const EditApplication: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);

  // const [filesId, setFilesId] = useState<any>({});
  const [formData, setFormData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);

  const [isOptReceiptUploaded, setOptReceiptUploaded] = useState(false);
  const [citizenshipStatus, setCitizenshipStatus] = useState<string | null>(
    null
  );
  const [visaStatus, setvisaStatus] = useState<string | null>(null);

  const onCitizenshipStatusChange = (e: any) => {
    setCitizenshipStatus(e.target.value);
  };

  const onVisaStatusChange = (value: string) => {
    setvisaStatus(value);
  };

  useEffect(() => {
    form.setFieldsValue({ email: user.email });
    async function fetchApplication() {
      try {
        if (user.applicationId) {
          setIsLoading(true);
          const response = await getApplication({
            applicationId: user.applicationId,
          });
          if (response.application) {
            setCitizenshipStatus(response.application.citizenship);
            setvisaStatus(response.application.workAuth.type);
            setFormData(response.application);
          }
          if (response.application.status !== "rejected") {
            setFormDisabled(true);
          }
        }
        setIsLoading(false);
      } catch (err) {
        navigate("/error");
        console.log(err);
      }
    }
    fetchApplication();
  }, [user]);

  useEffect(() => {
    console.log("formData", formData);
    if (!formData) return;
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
  }, [formData, citizenshipStatus, visaStatus]);

  const onFinish = async (values: any) => {
    console.log("user.applicationId", user.applicationId);
    console.log(user.applicationId === null);
    try {
      if (user.applicationId === null) {
        const response = await createApplication({
          ...values,
          username: user.name,
        });
        dispatch(
          setCurrentUser({
            applicationId: response._id,
            applicationStatus: response.status,
          })
        );
        message.success("Application successfully created.");
      } else {
        const response = await updateApplication({
          ...values,
          username: user.name,
          applicationId: user.applicationId,
        });
        dispatch(setCurrentUser({ applicationStatus: response.status }));
        message.success("Application successfully edited.");
      }
    } catch (err) {
      message.error("Error when updating Application");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {user.applicationStatus ? (
        <StatusTag status={user.applicationStatus} />
      ) : null}
      {formData?.feedback ? <>feedback: {formData?.feedback}</> : null}
      <Form
        form={form}
        name="profilePage"
        onFinish={onFinish}
        layout="vertical"
        disabled={formDisabled}
      >
        <ProfileForm
          fields={nameFields}
          onFinish={onFinish}
          form={form}
          sectionName="Name"
        />
        <ProfileForm
          fields={addressFields}
          onFinish={onFinish}
          form={form}
          sectionName="Address"
        />
        <ProfileForm
          fields={contactFields}
          onFinish={onFinish}
          form={form}
          sectionName="Contact Info"
        />
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
              rules={[
                {
                  required: true,
                  message: "Please select your work authorization!",
                },
              ]}
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
              rules={[
                {
                  required: true,
                  message: "Please select your workAuth Start Date!",
                },
              ]}
            >
              <DatePicker />
            </Form.Item>

            {/* workAuth End Date */}
            <Form.Item
              label="workAuth End Date"
              name={["workAuth", "EndDate"]}
              rules={[
                {
                  required: true,
                  message: "Please select your workAuth End Date!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || !getFieldValue(["workAuth", "StartDate"])) {
                      return Promise.resolve();
                    }
                    if (
                      getFieldValue(["workAuth", "StartDate"]).isBefore(value)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("End Date must be later than Start Date!")
                    );
                  },
                }),
              ]}
            >
              <DatePicker />
            </Form.Item>

            {user.visaStatus.optReceipt.status !== "pending" &&
            user.visaStatus.optReceipt.status !== "approved" &&
            !isOptReceiptUploaded ? (
              visaStatus === "F1(CPT/OPT)" && (
                <Form.Item
                  label="optReceipt"
                  name={["visaStatus", "optReceipt", "docId"]}
                  rules={
                    formDisabled
                      ? []
                      : [
                          {
                            required: true,
                            message: "Please upload your optReceipt!",
                          },
                        ]
                  }
                >
                  <Upload
                    action="http://localhost:3050/api/document"
                    data={{
                      username: user.name,
                      type: "optReceipt",
                    }}
                    onChange={(info) =>
                      handleFileSubmit(
                        info,
                        form,
                        ["visaStatus", "optReceipt"],
                        setOptReceiptUploaded
                      )
                    }
                    maxCount={1}
                  >
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </Form.Item>
              )
            ) : (
              <Form.Item>
                {" "}
                <>optReceipt uploaded</>
              </Form.Item>
            )}

            {visaStatus === "Other" && (
              <Form.Item label="Other Visa Type" name={["workAuth", "Other"]}>
                <Input />
              </Form.Item>
            )}
          </div>
        )}
        {/* <ProfileForm fields={emergencyContactFields}  onFinish={onFinish} form={form} sectionName="Emergency Contact" /> */}
        {/* <ProfileForm fields={groupFieldsBySection('documents')} form={form} sectionName="Documents" /> */}

        <ProfileForm
          fields={referrerFields}
          onFinish={onFinish}
          form={form}
          sectionName="Referrer"
        />
        <Form.List name="emergencyContacts">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Space
                  key={key}
                  style={{ display: "flex", marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    {...restField}
                    name={[name, "name", "firstName"]}
                    fieldKey={
                      fieldKey ? [fieldKey.toString(), "firstName"] : undefined
                    }
                    rules={[{ required: true, message: "Missing first name" }]}
                  >
                    <Input placeholder="First Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "name", "lastName"]}
                    fieldKey={
                      fieldKey ? [fieldKey.toString(), "lastName"] : undefined
                    }
                    rules={[{ required: true, message: "Missing last name" }]}
                  >
                    <Input placeholder="Last Name" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    name={[name, "relationship"]}
                    fieldKey={
                      fieldKey
                        ? [fieldKey.toString(), "relationship"]
                        : undefined
                    }
                    rules={[
                      { required: true, message: "Missing relationship" },
                    ]}
                  >
                    <Input placeholder="Relationship" />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
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

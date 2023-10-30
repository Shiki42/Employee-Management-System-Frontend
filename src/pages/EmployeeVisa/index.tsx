/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {setCurrentUser} from "../../app/userSlice";

import { Form, Button, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

import { getStatus } from "../../services/auth";
// Import your StatusTag component
import StatusTag from "../../components/StatusTag";

const VisaStatusManagement = () => {
  const user = useSelector((state: any) => state.user);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [visaStatus, setVisaStatus] = useState<any>({});

  useEffect(() => {
    //console.log("user",user);
    async function fetchStatus() {        
      try {
        if(user.token) {
          const newUserStatus = await getStatus({token:user.token});
          console.log("newUserStatus",newUserStatus);
          if (newUserStatus.visaStatus) {
            setVisaStatus(newUserStatus.visaStatus);
          }
        }  
      } catch (e) {
        console.error(e);
      }
      
    }
    fetchStatus();
  }, [dispatch,user]);
  
  

  const handleFileSubmit = async (info: any) => {
    const { status, response } = info.file;

    if (status === "uploading") {
      // File is uploading
    }
    if (status === "done") {
      if (response && response.type && response.documentId) {

        // dispatch(setCurrentUser({...user, visaStatus: {...user.visaStatus, [response.type]:{status:"pending",documentId:response.documentId}}}));
        dispatch(setCurrentUser({ visaStatus: {...user.visaStatus, [response.type]:{status:"pending",documentId:response.documentId}}}));
        message.success(`${info.file.name} file uploaded successfully.`);
        setTimeout(() => {
          console.log(user);
        },599);
      } else {
        message.error(`${info.file.name} file upload failed.`);
      }
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  if (user.workAuthType !== "F1(CPT/OPT)") {
    return <div>This page is only for users with OPT visas.</div>;
  }

  return (
    <div>
      <h1>Visa Status Management</h1>

      <h2>OPT Receipt</h2>
      <StatusTag status={visaStatus.optReceipt?.status} />
      <p>{visaStatus.optReceipt?.status === "pending" && "Waiting for HR to approve your OPT Receipt."}</p>
      <Form.Item label="OPT Receipt" name={["visaStatus", "optReceipt"]}>
        <Upload
          disabled={false}
          action="http://localhost:3050/api/document"
          data={{
            username: user.name,
            type: "optReceipt",
          }}
          onChange={handleFileSubmit}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <h2>OPT EAD</h2>
      <StatusTag status={visaStatus.optEad?.status} />
      <p>{visaStatus.optEad?.status === "pending" && "Waiting for HR to approve your OPT EAD."}</p>
      <Form.Item label="OPT EAD" name={["visaStatus", "optEad"]}>
        <Upload
          disabled={visaStatus.optReceipt?.status !== "approved"}
          action="http://localhost:3050/api/document"
          data={{
            username: user.name,
            type: "optEad",
          }}
          onChange={handleFileSubmit}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <h2>I-983</h2>
      <StatusTag status={visaStatus.i983?.status} />
      <p>{visaStatus.i983?.status === "pending" && "Waiting for HR to approve and sign your I-983."}</p>
      <Form.Item label="I-983" name={["visaStatus", "i983"]}>
        <Upload
          disabled={visaStatus.optEad?.status !== "approved"}
          action="http://localhost:3050/api/document"
          data={{
            username: user.name,
            type: "i983",
          }}
          onChange={handleFileSubmit}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>

      <h2>I-20</h2>
      <StatusTag status={visaStatus.i20?.status} />
      <p>{visaStatus.i20?.status === "pending" && "Waiting for HR to approve your I-20."}</p>
      <Form.Item label="I-20" name={["visaStatus", "i20"]}>
        <Upload
          disabled={visaStatus.i983?.status !== "approved"}
          action="http://localhost:3050/api/document"
          data={{
            username: user.name,
            type: "i20",
          }}
          onChange={handleFileSubmit}
          maxCount={1}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </div>
  );
};

export default VisaStatusManagement;

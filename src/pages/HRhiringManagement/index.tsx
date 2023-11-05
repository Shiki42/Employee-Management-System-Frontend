/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  Form,
  Table,
  Button,
  Modal,
  Input,
  message,
  Tooltip,
  notification,
} from "antd";

import {
  getAlltokens,
  getApplications,
  updateApplicationStatus,
} from "../../services/HR"; // replace with your actual API calls
import { invite } from "../../services/auth";
import { useNavigate } from "react-router";
const token_columns = [
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Registration Link",
    dataIndex: "link",
    key: "link",
    render: (text: string) => (
      <Tooltip title={text}>
        <div
          style={{
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "100px", // adjust based on your needs
          }}
        >
          {text}
        </div>
      </Tooltip>
    ),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
];

export default function HRhiringManagement() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [tokenHistory, setTokenHistory] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [currentApplicationId, setCurrentApplicationId] = useState("");
  const [applications, setApplications] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getAlltokens();
      console.log("result", result);
      setTokenHistory(result.tokens); // assuming result.data contains the token history
    };

    fetchData();
  }, []);

  const handleGenerateToken = async () => {
    if (!email) {
      notification.error({
        message: "Error",
        description: "Email is required!",
      });
      return;
    }

    try {
      const data = {
        email, // include email in your data payload
        // any other data for inviting a new employee
      };

      await invite(data);
      notification.success({
        message: "Success",
        description: "Email sent successfully!",
      });

      // Refresh token history
      const result = await getAlltokens();
      setTokenHistory(result.tokens);
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Failed to send email!",
      });
      navigate("/error");
    }
  };

  useEffect(() => {
    async function fetchApplications() {
      try {
        // Replace getEmployeesStatusOngoing with your actual API call
        const response = await getApplications();
        console.log("response", response);
        setApplications(response.applications);
      } catch (error) {
        console.log(error);
        navigate("/error");
      }
    }
    fetchApplications();
  }, []);

  const handleApproveReject = async (id: string, status: string) => {
    if (status === "rejected") {
      setModalVisible(true);
      setCurrentApplicationId(id);
      return;
    }

    if (status === "approved") {
      await updateStatus(id, status);
    }
  };

  const updateStatus = async (
    id: string,
    status: string,
    feedback: string = ""
  ) => {
    try {
      const reponse = await updateApplicationStatus({ id, status, feedback });
      const newApplications = applications.map((application) => {
        if (application.id === id) {
          return { ...application, status: status };
        }
        return application;
      });
      setApplications(newApplications);
    } catch (error) {
      console.log(error);
    }
  };

  const handleOk = async () => {
    setModalVisible(false);
    await updateStatus(currentApplicationId, "rejected", feedback);
    setFeedback(""); // Reset feedback
  };

  const handleCancel = () => {
    setModalVisible(false);
    setFeedback(""); // Reset feedback
  };

  const viewApplication = (id: string) => {
    const url = `/user/${id}/application`;
    window.open(url, "_blank");
  };
  //   userId: application.creator,
  //   id: application._id,
  //   name: application.name.firstName + ' ' + application.name.lastName,
  //   email: application.email,
  //   status: application.status,
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        {
          text: "Pending",
          value: "pending",
        },
        {
          text: "Approved",
          value: "approved",
        },
        {
          text: "Rejected",
          value: "rejected",
        },
      ],
      onFilter: (value: any, record: any) => record.status === value,
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        if (record.status === "pending") {
          return (
            <>
              <Button onClick={() => viewApplication(record.userId)}>
                View Application
              </Button>
              <Button
                onClick={() => handleApproveReject(record.id, "approved")}
              >
                Approve
              </Button>
              <Button
                onClick={() => handleApproveReject(record.id, "rejected")}
              >
                Reject
              </Button>
            </>
          );
        }
        return <>N/A</>;
      },
    },
  ];

  return (
    <div>
      <div>
        <Form>
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <Input
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: "200px" }} // Adjust the width as needed
            />
          </Form.Item>
        </Form>
        <Button type="primary" onClick={handleGenerateToken}>
          Generate token and send email
        </Button>
        <Table
          dataSource={tokenHistory}
          columns={token_columns}
          rowKey="token"
        />
      </div>
      <Modal
        title="Feedback"
        visible={modalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Input
          placeholder="Enter your feedback here"
          value={feedback}
          onChange={(e) => setFeedback(e.target.value)}
        />
      </Modal>
      <Table dataSource={applications} columns={columns} rowKey="id" />
    </div>
  );
}

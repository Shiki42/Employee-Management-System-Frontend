/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Button, Modal } from "antd";
import dayjs from "dayjs";
import {  updateEmpolyeeStatus, sendNotification, getEmployeesStatusOngoing } from "../../services/HR"; // replace with your actual API calls
import {getDocument} from "../../services/document";
// Interfaces
interface WorkAuth {
  type: string;
  StartDate: string;
  EndDate: string;
  Other?: string;
}

interface DocumentStatus {
  status: string;
  docId: string;
}

interface VisaStatus {
  status: string;
  optReceipt?: DocumentStatus;
  optEad?: DocumentStatus;
  i983?: DocumentStatus;
  i20?: DocumentStatus;
}

interface Employee {
  id: string;
  name: string;
  workAuth: WorkAuth;
  visaStatus: VisaStatus;
  email?: string;
}

const VisaStatusManagementPage: React.FC = () => {
  const [visaStatuses, setVisaStatuses] = useState<Employee[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchVisaStatuses() {
      try {
        // Replace getEmployeesStatusOngoing with your actual API call
        const response = await getEmployeesStatusOngoing();
        console.log("response",response);
        setVisaStatuses(response.visaStatuses);
      } catch (error) {
        console.log(error);
      }
    }
    fetchVisaStatuses();
  }, []);

  const handlePreview = async (docId: string) => {
    setCurrentDocId(docId);
    setModalVisible(true);
    const document = await getDocument(docId);
    // Display the document in a modal
  };

  const handleApproveReject = async (employee: Employee, decision: string) => {
    await updateEmpolyeeStatus({
      id: employee.id,
      type: employee.visaStatus.status,
      status: decision
    });
    // Refresh data or handle UI updates
  };

  const handleSendNotification = async (email: string) => {
    await sendNotification(email);
    // Handle UI updates or notifications
  };

  const previewDocument = async (docId: string) => {
    const document = await getDocument(docId);
    // Show the document in a modal
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Work Authorization",
      children: [
        {
          title: "Title",
          dataIndex: ["workAuth", "type"],
          key: "title",
        },
        {
          title: "Start/End date",
          render: (_: any, record: Employee) => (
            `${dayjs(record.workAuth.StartDate).format("YYYY-MM-DD")} - ${dayjs(record.workAuth.EndDate).format("YYYY-MM-DD")}`
          ),
          key: "dates",
        },
        {
          title: "Days Remaining",
          render: (_: any, record: Employee) => (
            dayjs(record.workAuth.EndDate).diff(dayjs(), "day")
          ),
          key: "remainingDays",
        },
      ],
    },
    {
      title: "Next Steps",
      dataIndex: ["visaStatus", "status"],
      key: "nextSteps",
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        const currentStatus = record.visaStatus[record.visaStatus.status];
        if (currentStatus?.status === "pending") {
          return (
            <>
              <Button onClick={() => previewDocument(record.visaStatus.optReceipt.docId)}>Preview Document</Button>
              <Button onClick={() => handlePreview(currentStatus.docId)}>Preview</Button>
              <Button onClick={() => handleApproveReject(record, "approved")}>Approve</Button>
              <Button onClick={() => handleApproveReject(record, "rejected")}>Reject</Button>
            </>
          );
        } else if (currentStatus?.status === "approved") {
          return (
            <Button onClick={() => handleSendNotification(record.email!)}>Send Notification</Button>
          );
        }
        return null;
      },
    },
  ];

  return (
    <div>
      <Table dataSource={visaStatuses} columns={columns} rowKey="id" />
      <Modal visible={modalVisible} onCancel={() => setModalVisible(false)}>
        {/* Your PDF preview logic here based on currentDocId */}
      </Modal>
    </div>
  );
};

export default VisaStatusManagementPage;

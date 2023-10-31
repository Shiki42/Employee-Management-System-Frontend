/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { Table, Button, Modal, message } from "antd";
import dayjs from "dayjs";
import { updateEmpolyeeStatus, sendNotification, getEmployeesStatusOngoing
  , getAllEmployeesStatus } from "../../services/HR"; 
import {getDocument} from "../../services/document";
import {previewDocument} from "../SharedModules";
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

const VisaStatusNextSteps = {
  "optReceipt": "optEad",
  "optEad": "i983",
  "i983": "i20",
  "i20": "approved",
};

const VisaStatusManagementPage: React.FC = () => {
  const [visaStatuses, setVisaStatuses] = useState<Employee[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentDocId, setCurrentDocId] = useState<string | null>(null);

  const [currentMode, setCurrentMode] = useState<"ongoing" | "all">("ongoing");

  const toggleMode = () => {
    setCurrentMode(currentMode === "ongoing" ? "all" : "ongoing");
  };
  
  useEffect(() => {
    async function fetchVisaStatuses() {
      let response;
      try {
        if (currentMode === "ongoing") {
          response = await getEmployeesStatusOngoing();
        } else {
          response = await getAllEmployeesStatus();
        }
        setVisaStatuses(response.visaStatuses);
      } catch (error) {
        console.log(error);
      }
    }
    fetchVisaStatuses();
  }, [currentMode]);

  const handleApproveReject = async (employee: Employee, decision: string) => {
    await updateEmpolyeeStatus({
      id: employee.id,
      type: employee.visaStatus.status,
      status: decision
    });
    // Refresh data or handle UI updates
  };

  const handleSendNotification = async (email: string) => {
    try {
      await sendNotification(email);
      message.success("Notification sent!");
    } catch (error) {
      message.error("Failed to send notification!");
    }
    
    // Handle UI updates or notifications
  };

  const ongoing_columns = [
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
            `${dayjs(record.workAuth.StartDate).format("YYYY-MM-DD")} To ${dayjs(record.workAuth.EndDate).format("YYYY-MM-DD")}`
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
      key: "nextSteps",
      render: (_: any, record: any) => {
        const currentStatusKey = record.visaStatus.status;
        const currentStatus = record.visaStatus[currentStatusKey as keyof typeof record.visaStatus];
        console.log(currentStatusKey,"currentStatus",currentStatus,currentStatus?.status);
        if(currentStatus?.status.trim().replace(/\s+/g, " ") === "need to upload".trim().replace(/\s+/g, " ")) {
          return (
            <>
              {currentStatusKey} waiting for upload
            </>);
        } else if (currentStatus?.status === "pending") {
          return (
            <>
              {currentStatusKey} pending, need review
            </>
          );
        } else if (currentStatus?.status === "approved") {
          const nextStep = VisaStatusNextSteps[currentStatusKey as keyof typeof VisaStatusNextSteps];
          return (
            <>
              {currentStatusKey} approved, waiting for {nextStep} upload
            </>
          );
        } else if (currentStatus?.status === "rejected") {
          return (
            <>
              {currentStatusKey} rejected, waiting for upload
            </>
          );
        } else if(record.visaStatus === "approved") {
          return (<>All approved</>) ;
        }
        return (<>Not upload any file</>) ;
      }
    },

    {
      title: "Action",
      key: "action",
      render: (_: any, record: any) => {
        console.log("action record",JSON.stringify(record));
        const currentStatus = record.visaStatus[record.visaStatus.status];
        if (currentStatus?.status === "pending") {
          return (
            <>
              <Button onClick={() => previewDocument(currentStatus.docId)}>Preview</Button>
              <Button color='green' onClick={() => handleApproveReject(record, "approved")}>Approve</Button>
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

  const all_columns = [
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
            `${dayjs(record.workAuth.StartDate).format("YYYY-MM-DD")} To ${dayjs(record.workAuth.EndDate).format("YYYY-MM-DD")}`
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
      title: "Preview",
      key: "preview",
      render: (_: any, record: any) => {
        // Logic to display preview buttons based on approved docIds
        const approvedDocs = Object.entries(record.visaStatus)
          .filter(([_, val]) => val?.status === "approved")
          .map(([key, val]) => ({
            name: key,
            docId: val?.docId,
          }));
        return (
          <>
            {approvedDocs.map((doc, index) => (
              <Button key={index} onClick={() => previewDocument(doc.docId)}>
                Preview {doc.name}
              </Button>
            ))}
          </>
        );
      },
    },

  ];

  return (
    <div>
      <Button onClick={toggleMode}>Ongoing / All</Button>
      <Table
        dataSource={visaStatuses}
        columns={currentMode === "ongoing" ? ongoing_columns : all_columns}
        rowKey="id"
      />
      <Modal visible={modalVisible} onCancel={() => setModalVisible(false)}>
        {/* Your PDF preview logic here based on currentDocId */}
      </Modal>
    </div>
  );
};

export default VisaStatusManagementPage;

import React from "react";
import { Tag } from "antd";

type Status = "approved" | "pending" | "rejected";

interface StatusTagProps {
  status: Status;
}

const StatusTag: React.FC<StatusTagProps> = ({ status }) => {
  let color = "";

  switch (status) {
    case "approved":
      color = "green";
      break;
    case "pending":
      color = "gold";
      break;
    case "rejected":
      color = "red";
      break;
    default:
      break;
  }

  return <Tag color={color}>{status}</Tag>;
};

export default StatusTag;

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-inner-declarations */
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { Table } from "antd";

import { getEmployeeProfiles } from "../../services/HR";



export default function HRProfilesManagement () {

  const navigate = useNavigate();
    
  const dispatch = useDispatch();
    
  const user = useSelector((state:any) => state.user);

  const [isLoading, setIsLoading] = useState(true);
  const [profiles, setProfiles] = useState<any>([]);
  useEffect(() => {
    try {
      async function fetchProfiles() {
        const response = await getEmployeeProfiles();
        setProfiles(response.profiles);
        console.log(response);
      }
      fetchProfiles();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  },[]);


  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (name: any) => `${name.firstName} ${name.lastName}`,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phone",
    },
    {
      title: "SSN",
      dataIndex: "SSN",
      key: "SSN",
    },
    {
      title: "Work Authorization",
      dataIndex: "workAuth",
      key: "workAuth",
      render: (workAuth: any) => workAuth.type,
    },
    {
      title: "Action",
      key: "action",
      render: (text: any, record: any) => (
        <a onClick={() => navigate(`/user/${record.creator}/profile`)}>View Profile</a>
      ),
    },
  ];

  if (isLoading) return <div>Loading...</div>;

  return (
    <Table dataSource={profiles} columns={columns} rowKey="creator" />
  );
}

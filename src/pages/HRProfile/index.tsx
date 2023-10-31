/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-inner-declarations */
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";


import { Card, Descriptions, Avatar, Spin } from "antd";

import { getProfileByEmployeeId } from "../../services/HR";

export default function HRProfilesManagement () {

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [profile, setProfile] = useState<any>({});

  useEffect(() => {
    try {
      async function fetchProfile() {
        const response = await getProfileByEmployeeId(id? id : "");
        setProfile(response.profile);
        console.log(response);
      }
      fetchProfile();
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  },[]);
    

  if (isLoading) return (<div>Loading...</div>);
    
  return (
    <>
      <Card title="Employee Profile">
        <Descriptions>
          <Descriptions.Item label="First Name">{profile.name?.firstName}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{profile.name?.lastName}</Descriptions.Item>
          <Descriptions.Item label="Middle Name">{profile.name?.middleName}</Descriptions.Item>
          <Descriptions.Item label="Preferred Name">{profile.name?.preferredName}</Descriptions.Item>
          <Descriptions.Item label="Email">{profile.email}</Descriptions.Item>
          <Descriptions.Item label="Phone Number">{profile.phoneNumber}</Descriptions.Item>
          <Descriptions.Item label="Status">{profile.status}</Descriptions.Item>
          <Descriptions.Item label="Building">{profile.address?.building}</Descriptions.Item>
          <Descriptions.Item label="Street">{profile.address?.street}</Descriptions.Item>
          <Descriptions.Item label="City">{profile.address?.city}</Descriptions.Item>
          <Descriptions.Item label="State">{profile.address?.state}</Descriptions.Item>
          <Descriptions.Item label="Zip">{profile.address?.zip}</Descriptions.Item>
          <Descriptions.Item label="Work Auth Type">{profile.workAuth?.type}</Descriptions.Item>
          <Descriptions.Item label="Work Auth Start Date">{profile.workAuth?.StartDate}</Descriptions.Item>
          <Descriptions.Item label="Work Auth End Date">{profile.workAuth?.EndDate}</Descriptions.Item>
          <Descriptions.Item label="Referrer">{profile.referrer?.name?.firstName} {profile.referrer?.name?.lastName}</Descriptions.Item>
          <Descriptions.Item label="Relationship with Referrer">{profile.referrer?.relationship}</Descriptions.Item>
          <Descriptions.Item label="SSN">{profile.SSN}</Descriptions.Item>
          <Descriptions.Item label="DOB">{profile.DOB}</Descriptions.Item>
          <Descriptions.Item label="Gender">{profile.gender}</Descriptions.Item>
          <Descriptions.Item label="Citizenship">{profile.citizenship}</Descriptions.Item>
          <Descriptions.Item label="Emergency Contacts">
            <div className="emergency-contacts">
              {profile.emergencyContacts?.map((contact: any, index: number) => (
                <div key={index} className="emergency-contact">
        Name: {contact.name.firstName} {contact.name.lastName}, Relationship: {contact.relationship}
                </div>
              ))}
            </div>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );

}

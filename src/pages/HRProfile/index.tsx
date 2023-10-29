/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-inner-declarations */
import { useParams } from "react-router-dom";

import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

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
      {JSON.stringify(profile)}
    </>
  );

}

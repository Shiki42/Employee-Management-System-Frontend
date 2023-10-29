/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-inner-declarations */
import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

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


  if (isLoading) return (<div>Loading...</div>);

  return (
    <div>
      <>
        {/* {JSON.stringify(profiles)} */}
      </>
      { profiles.map((profile:any,index:number) => 
        (
          <div key={index}>
            <a href={`/profile/${profile._id}`}>Name:{profile.name.firstName + " " + profile.name.lastName}</a>
                
                Email:{profile.email}
                Phone:{profile.phone}
                SSN:{profile.SSN}
                Work Authorization Title:{profile.workAuth.type}
          </div>
        )
      )}
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-inner-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {getEmployeesStatusOngoing} from "../../services/HR";

import { useState, useEffect } from "react";

import { useDispatch } from "react-redux";

export default function HRVisaStatusManagement () {

  const [visaStatuses, setVisaStatuses] = useState<any>([]);

  useEffect(() => {
    try {
      async function fetchVisaStatuses() {
        const response = await getEmployeesStatusOngoing();
        setVisaStatuses(response);
        console.log(response);
      }
      fetchVisaStatuses();
    } catch (error) {
      console.log(error);
    }
  },[]);

  return (
    <>
      {JSON.stringify(visaStatuses)}
    </>
  );

}

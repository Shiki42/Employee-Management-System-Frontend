import apiCall from "./api";


// return type: [Profiles]
export const getEmployeeProfiles = async () => {
  return await apiCall({
    url: "/api/profiles",
    method: "GET",
    data: null
  });
};

export const getProfileByEmployeeId = async (id:string) => {
  return await apiCall({
    url: `/api/user/${id}/profile`,
    method: "GET",
    data: null
  });
};

export const getProfileByProfileId = async (id:string) => {
  return await apiCall({
    url: `/api/application/${id}`,
    method: "GET",
    data: null
  });
};

export const getEmployeesStatusOngoing = async () => {
  return await apiCall({
    url: "/api/users/visaStatus/ongoing",
    method: "GET",
    data: null
  });
};

export const getAllEmployeesStatus = async () => {
  return await apiCall({
    url: "/api/users/visaStatus/all",
    method: "GET",
    data: null
  });
};

export const getApplications = async () => {
  return await apiCall({
    url: "/api/applications",
    method: "GET",
    data: null
  });
};

export const getAlltokens = async () => {
  return await apiCall({
    url: "/api/tokens",
    method: "GET",
    data: null
  });
};
export const updateEmpolyeeStatus = async (data: { id:string; type:string, status:string }) => {
  return await apiCall({
    url: `/api/user/${data.id}/visaStatus`,
    method: "PUT",
    data
  });
};

export const updateApplicationStatus = async (data: { id:string; status:string, feedback:string }) => {
  return await apiCall({
    url: "/api/applicationStatus",
    method: "POST",
    data
  });
};


export const sendNotification = async ( email:string ) => {
  return await apiCall({
    url: "/api/notification",
    method: "POST",
    data: {email}
  });
};

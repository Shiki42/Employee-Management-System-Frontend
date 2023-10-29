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

export const getEmployeesStatusOngoing = async () => {
  return await apiCall({
    url: "/api/users/visaStatus/ongoing",
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

export const sendNotification = async ( email:string ) => {
  return await apiCall({
    url: "/api/sendNotification",
    method: "POST",
    data: {email}
  });
};

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

import apiCall from "./api";


// return type: [Profiles]
export const getEmployeeProfiles = async () => {
  return await apiCall({
    url: "/api/profiles",
    method: "GET",
    data: null
  });
};

export const getEmployeeProfile = async (username:string) => {
  return await apiCall({
    url: `/api/user/${username}/profile`,
    method: "GET",
    data: null
  });
};

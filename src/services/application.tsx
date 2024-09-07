/* eslint-disable @typescript-eslint/no-explicit-any */
import apiCall from "./api";

export const getUserApplications = async (data: { userId: any; }) => {
  return await apiCall({
    url: `/api/user/${data.userId}/applications`,
    method: "GET",
    data: {}
  });
};

export const getApplication = async (data: { applicationId:string }) => {
  return await apiCall({
    url: `/api/application/${data.applicationId}`,
    method: "GET",
    data:null
  });
};

export const updateApplication = async (data: Record<string,unknown>) => {
  return await apiCall({
    url: `/api/application/${data.applicationId}`,
    method: "PUT",
    data
  });
};

export const createApplication = async (data: Record<string,unknown>) => {
  return await apiCall({
    url: "/api/application",
    method: "POST",
    data
  });
};

import apiCall from "./api";

export const updateProfile = async (data: Record<string,unknown>) => {
  console.log(data);
  return await apiCall({
    url: "/api/profile",
    method: "PUT",
    data
  });
};

/* eslint-disable @typescript-eslint/no-explicit-any */
import  apiCall  from "./api";

export const uploadFile = async (username: string, file: any) => {
  const formData = new FormData();
  formData.append("username", username);
  formData.append("document", file);

  console.log(Object.fromEntries(formData.entries()));
  return await apiCall({
    url: "/api/document",
    method: "POST",
    data: formData,

  });
};

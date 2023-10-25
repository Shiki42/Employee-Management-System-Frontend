import apiCall from "./api";

export const signUp = async (data:Record<string,unknown>) => {
  return await apiCall({
    url: "/api/user/signup",
    method: "POST",
    data,
  });
};

export const signIn = async (data:Record<string,unknown>) => {
  return await apiCall({
    url: "/api/user/signin",
    method: "POST",
    data
  });
};

export const invite = async (data:Record<string,unknown>) => {
  return await apiCall({
    url: "/api/user/invite",
    method: "POST",
    data
  });
};

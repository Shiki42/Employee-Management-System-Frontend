import apiCall from './api';

export const signUp = async (data:Record<string,unknown>) => {
  return await apiCall({
    url: '/api/users/signup',
    method: 'POST',
    data,
  });
};

export const signIn = async (data:Record<string,unknown>) => {
  return await apiCall({
    url: '/api/users/signin',
    method: 'POST',
    data
  });
};

export const invite = async (data:Record<string,unknown>) => {
    return await apiCall({
      url: '/api/users/invite',
      method: 'POST',
      data
    });
  };
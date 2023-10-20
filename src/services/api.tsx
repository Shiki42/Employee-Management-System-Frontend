const BASE_URL = 'http://localhost:3050';

export default async function apiCall({ url: apiUrl, method, data }: { url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', data: Record<string, unknown> }) {
  const url = new URL(apiUrl, BASE_URL).href;

const user = JSON.parse(localStorage.getItem('user')|| '{}');
const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json'
};
if (user?.token) {
    defaultHeaders['Authorization'] = `Bearer ${user.token}`;
}
const response = await fetch(url, {
    method,
    headers: {
        ...defaultHeaders,
        //...headers
    },
    body: JSON.stringify(data)
});
  if (!response.ok) {
    
    const  error  = await response.json();

    throw new Error(error.message);
  }
  const result = await response.json();
  return result;
}
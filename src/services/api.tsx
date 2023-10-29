const BASE_URL = "http://localhost:3050";

export default async function apiCall({ url: apiUrl, method, data, headers }: 
  { url: string, method: "GET" | "POST" | "PUT" | "DELETE", data: Record<string, unknown>|FormData|null , headers?: Record<string, string>}) {
  const url = new URL(apiUrl, BASE_URL).href;
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const defaultHeaders: Record<string, string> = data instanceof FormData ? {} : { "Content-Type": "application/json" };
  
  if (user?.token) {
    defaultHeaders["Authorization"] = `Bearer ${user.token}`;
  }
  
  const response = await fetch(url, {
    method,
    headers: {
      ...defaultHeaders,
      ...headers
    },
    body: data instanceof FormData ? data : (data ? JSON.stringify(data) : null)
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  const contentType = response.headers.get("content-type");

  if (contentType && contentType.includes("application/json")) {
    // If the response is JSON, parse it and return as usual
    const result = await response.json();
    return result;
  } else {
    // If the response is not JSON (e.g., a file), return the response directly
    return response.blob(); // You can also use .arrayBuffer() if needed
  }
}


const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000/api/v1";

function getAuthHeaders() {
  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}` }
    : {};
}

// PUBLIC_INTERFACE
const api = {
  get: async (url, options = {}) => {
    const headers = { ...(options.headers || {}), ...getAuthHeaders(), "Content-Type": "application/json" };
    const res = await fetch(`${BASE_URL}${url}`, { method: "GET", headers, ...options });
    if (!res.ok) throw new Error(await res.text());
    return await res.json().then((data) => ({ data }));
  },
  post: async (url, body, options = {}) => {
    const headers = { ...(options.headers || {}), ...getAuthHeaders(), "Content-Type": "application/json" };
    const res = await fetch(`${BASE_URL}${url}`, { method: "POST", body: JSON.stringify(body), headers, ...options });
    if (!res.ok) throw new Error(await res.text());
    return await res.json().then((data) => ({ data }));
  },
  put: async (url, body, options = {}) => {
    const headers = { ...(options.headers || {}), ...getAuthHeaders(), "Content-Type": "application/json" };
    const res = await fetch(`${BASE_URL}${url}`, { method: "PUT", body: JSON.stringify(body), headers, ...options });
    if (!res.ok) throw new Error(await res.text());
    return await res.json().then((data) => ({ data }));
  },
  delete: async (url, options = {}) => {
    const headers = { ...(options.headers || {}), ...getAuthHeaders(), "Content-Type": "application/json" };
    const res = await fetch(`${BASE_URL}${url}`, { method: "DELETE", headers, ...options });
    if (!res.ok) throw new Error(await res.text());
    return await res.json().then((data) => ({ data }));
  }
};

export default api;

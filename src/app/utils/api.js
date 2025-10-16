// lib/api.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://skgpsd.com/skgpsdbe/public/api/web";

// Generic API function
export async function apiCall(endpoint, method = "GET", body = null, token = null) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const options = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_BASE_URL}/${endpoint}`, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data?.message || JSON.stringify(data.errors || "API error"));
  }

  return data;
}

// Example reusable methods
export const AuthAPI = {
  register: (userData) => apiCall("customer-register", "POST", userData),
  login: (userData) => apiCall("login", "POST", userData),
  profile: (token) => apiCall("profile", "GET", null, token),
};

export const UserAPI = {
  list: (token) => apiCall("users", "GET", null, token),
  update: (id, data, token) => apiCall(`users/${id}`, "PUT", data, token),
};

export const OrderAPI = {
  // Save new order after payment
  saveOrder: (orderData, token = null) =>
    apiCall("save-order", "POST", orderData, token),

  // Optional: Fetch all user orders
  list: (userId, token = null) =>
    apiCall(`orders/${userId}`, "GET", null, token),

  // Optional: Fetch specific order
  getById: (orderId, token = null) =>
    apiCall(`orders/show/${orderId}`, "GET", null, token),
};
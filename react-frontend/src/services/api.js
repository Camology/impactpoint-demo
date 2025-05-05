// api.js - API service for backend communication
const API_BASE_URL = 'http://localhost:5000/api';

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }
    return await response.json();
  } catch (error) {
    throw error;
  }
};

// User authentication
export const loginUser = async (email) => {
  return apiRequest('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
};

// Get user information
export const getUserInfo = async (email) => {
  return apiRequest(`/users/${email}`);
};

// Get chart data based on user permissions
export const getChartData = async (permissions) => {
  const endpoint = permissions === 'admin'
    ? '/iris-data'
    : `/iris-data/variety/${permissions}`;
  return apiRequest(endpoint);
};
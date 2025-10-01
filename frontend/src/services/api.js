import { BASE_URL } from '../config';

// Generic API function
const apiCall = async (endpoint, options = {}) => {
  try {
    console.log('Making API call to:', `${BASE_URL}${endpoint}`);
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    
    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API Error:', response.status, errorText);
      throw new Error(`API Error: ${response.status} - ${errorText}`);
    }
    
    return response.status === 204 ? null : response.json();
  } catch (error) {
    console.error('Network error:', error);
    throw error;
  }
};

// User API
export const userAPI = {
  getAll: () => apiCall('/users'),
  create: (user) => apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(user),
  }),
  update: (id, user) => apiCall(`/users/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(user),
  }),
  delete: (id) => apiCall(`/users/${id}`, { method: 'DELETE' }),
};

// Job API
export const jobAPI = {
  getAll: () => apiCall('/jobs'),
  create: (job) => apiCall('/jobs', {
    method: 'POST',
    body: JSON.stringify(job),
  }),
  update: (id, job) => apiCall(`/jobs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(job),
  }),
  delete: (id) => apiCall(`/jobs/${id}`, { method: 'DELETE' }),
};

// Application API
export const applicationAPI = {
  getAll: () => apiCall('/applications'),
  create: (application) => apiCall('/applications', {
    method: 'POST',
    body: JSON.stringify(application),
  }),
  update: (id, application) => apiCall(`/applications/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(application),
  }),
  delete: (id) => apiCall(`/applications/${id}`, { method: 'DELETE' }),
};
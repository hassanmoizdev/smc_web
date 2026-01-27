// Base URL for API endpoints
// export const API_BASE_URL = 'https://sihs.edu.pk/api';
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
export const API_URL = process.env.API_URL || 'http://localhost:5000';
// Auth related endpoints
export const AUTH_API = {
    LOGIN: `${API_BASE_URL}/auth/login`,
    SIGNUP: `${API_BASE_URL}/auth/signup`,
    VERIFY: `${API_BASE_URL}/auth/verify`,
    PROFILE: `${API_BASE_URL}/auth/profile`,
};

// Site settings related endpoints
export const SETTINGS_API = {
    SITE: `${API_BASE_URL}/site-settings`,
    SLIDER: `${API_BASE_URL}/slider`,
};

// Content management endpoints
export const CONTENT_API = {
    EVENTS: `${API_BASE_URL}/events`,
    DOWNLOADS: {get: `${API_BASE_URL}/downloads`, post: `${API_BASE_URL}/downloads/add`},
    NOTIFICATIONS: `${API_BASE_URL}/notifications`,
    RESEARCH: `${API_BASE_URL}/research`,
};

// Helper function to build URLs with IDs
export const buildUrl = (baseUrl, id) => `${baseUrl}/${id}`;

// Reusable fetch configurations
export const defaultHeaders = {
    'Content-Type': 'application/json',
};

export const authHeaders = (token) => ({
    ...defaultHeaders,
    'Authorization': `Bearer ${token}`,
});

// Common request configurations
export const REQUEST_CONFIG = {
    GET: {
        method: 'GET',
        headers: defaultHeaders,
    },
    POST: (data) => ({
        method: 'POST',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }),
    PUT: (data) => ({
        method: 'PUT',
        method: 'PUT',
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }),
    DELETE: {
        method: 'DELETE',
        headers: defaultHeaders,
    },
};
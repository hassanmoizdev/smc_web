// Base URL for API endpoints
export const API_BASE_URL = "https://smc.switch2itech.cloud/api";
export const API_URL = 'https://smc.switch2itech.cloud';
// export const API_BASE_URL = 'http://localhost:5001/api';
// export const API_URL = 'http://localhost:5001';
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
    DOWNLOADS: { get: `${API_BASE_URL}/downloads`, post: `${API_BASE_URL}/downloads/add` },
    NOTIFICATIONS: `${API_BASE_URL}/notifications`,
    RESEARCH: `${API_BASE_URL}/research`,
    CONVOCATION: `${API_BASE_URL}/convocation`,
};

// Helper function to build URLs with IDs
export const buildUrl = (baseUrl, id) => `${baseUrl}/${id}`;

/** Turn DB path / Cloudinary URL into a browser-loadable URL */
export const resolveMediaUrl = (url) => {
    if (!url) return "";
    if (/^https?:\/\//i.test(url)) return url;
    const normalized = String(url).replace(/\\/g, "/");
    const uploadsIdx = normalized.toLowerCase().indexOf("/uploads/");
    if (uploadsIdx !== -1) {
        return `${API_URL}${normalized.slice(uploadsIdx)}`;
    }
    return `${API_URL}${normalized.startsWith("/") ? normalized : `/${normalized}`}`;
};

export const isPdfUrl = (url) => /\.pdf(\?|$)/i.test(url || "");

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
        headers: defaultHeaders,
        body: JSON.stringify(data),
    }),
    PATCH: (data) => ({
        method: 'PATCH',
        headers: defaultHeaders,
        body: data !== undefined ? JSON.stringify(data) : undefined,
    }),
    DELETE: {
        method: 'DELETE',
        headers: defaultHeaders,
    },
};
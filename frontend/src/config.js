// Base URL for API calls - uses environment variable or fallback
export const BASE_URL = process.env.REACT_APP_API_URL || 'https://mtaa-fundi-app.onrender.com/api';
console.log('API Base URL:', BASE_URL);
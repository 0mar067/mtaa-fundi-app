// Base URL for API calls - easily swappable for production
export const BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-render-app.onrender.com/api' 
  : 'http://localhost:5000/api';
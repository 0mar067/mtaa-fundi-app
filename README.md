#  Mtaa Fundi - Kenyan Job Portal

A modern full-stack web application built with React (frontend) and Flask (backend) for job management and applications in Kenya. Find your dream job with local companies and opportunities.

## Features

### Backend (Flask)
- ✅ Flask app factory pattern with `create_app()`
- ✅ SQLAlchemy with 3 models: User, Job, Application
- ✅ Many-to-many relationship between Users and Jobs (saved jobs)
- ✅ One-to-many relationships (User->Applications, Job->Applications)
- ✅ Marshmallow for JSON serialization and validation
- ✅ RESTful API with GET, POST, PATCH, DELETE endpoints
- ✅ Server-side validation (string format, number validation)
- ✅ Flask-CORS for frontend access
- ✅ Organized code structure in `/app` folder
- ✅ Deployment ready with `wsgi.py`, `requirements.txt`, `Procfile`

### Frontend (React)
- ✅ React app with React Router
- ✅ 3 client-side routes: Home, Jobs, Applications
- ✅ Navigation links between routes
- ✅ Formik forms with validation for all CRUD operations
- ✅ Fetch API integration with Flask backend
- ✅ Auto-refresh after successful operations
- ✅ Data display in cards/grids
- ✅ Configurable BASE_URL for easy deployment

## Project Structure

```
mtaa-fundi-app/
├── backend/
│   ├── app/
│   │   ├── __init__.py          # Flask app factory
│   │   ├── models.py            # SQLAlchemy models
│   │   ├── schemas.py           # Marshmallow schemas
│   │   └── routes.py            # API routes
│   ├── wsgi.py                  # WSGI entry point
│   ├── requirements.txt         # Python dependencies
│   └── Procfile                 # Render deployment
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Home.js           # User management
    │   │   ├── Jobs.js           # Job management
    │   │   └── Applications.js   # Application management
    │   ├── services/
    │   │   └── api.js            # API service functions
    │   ├── config.js             # BASE_URL configuration
    │   ├── App.js                # Main app with routing
    │   └── App.css               # Styling
    └── package.json
```

## Setup Instructions

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Create virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the application:
```bash
python wsgi.py
```

The backend will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## API Endpoints

### Users
- `GET /api/users` - Get all users
- `POST /api/users` - Create new user
- `PATCH /api/users/<id>` - Update user
- `DELETE /api/users/<id>` - Delete user

### Jobs
- `GET /api/jobs` - Get all jobs
- `POST /api/jobs` - Create new job
- `PATCH /api/jobs/<id>` - Update job
- `DELETE /api/jobs/<id>` - Delete job

### Applications
- `GET /api/applications` - Get all applications
- `POST /api/applications` - Create new application
- `PATCH /api/applications/<id>` - Update application
- `DELETE /api/applications/<id>` - Delete application

## Deployment

### Backend (Render)
1. Push code to GitHub
2. Connect repository to Render
3. Use `gunicorn wsgi:app` as start command
4. Update `config.js` with production API URL

### Frontend (Netlify/Vercel)
1. Build the app: `npm run build`
2. Deploy the `build` folder
3. Update BASE_URL in `config.js` for production

## Sample Data

The application includes Kenyan seed data:
- 2 sample job seekers (Wanjiku Mwangi, Brian Kiprotich)
- 3 sample jobs (Safaricom, Equity Bank, Jumia Kenya)
- 2 sample applications with Kenyan context
- Salaries in Kenyan Shillings (KES)
- Local phone number validation (07XXXXXXXX format)

## Technologies Used

### Backend
- Flask 2.3.3
- Flask-SQLAlchemy 3.0.5
- Flask-CORS 4.0.0
- Marshmallow 3.20.1
- Gunicorn 21.2.0

### Frontend
- React 18
- React Router DOM
- Formik (forms)
- Yup (validation)
- Fetch API (HTTP requests)
import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configuration
    database_url = os.environ.get('DATABASE_URL', 'sqlite:///app.db')
    # Fix for Render PostgreSQL URL
    if database_url.startswith('postgres://'):
        database_url = database_url.replace('postgres://', 'postgresql://', 1)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    
    # Import models
    from app.models import User, Job, Application
    
    # Register blueprints
    from app.routes import api
    app.register_blueprint(api, url_prefix='/api')
    
    # Health check route
    @app.route('/')
    def health_check():
        return {'message': 'Backend is running', 'status': 'ok'}, 200
    
    # Additional health check
    @app.route('/health')
    def health():
        return {'status': 'healthy'}, 200
    
    return app
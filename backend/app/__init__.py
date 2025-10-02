import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate

db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    # Configuration - Use SQLite for simplicity
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-secret-key')
    
    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app) # Initialize CORS
    
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
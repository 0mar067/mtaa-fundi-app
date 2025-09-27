from app import db
from datetime import datetime

# Association table for many-to-many relationship between users and jobs
user_job_association = db.Table('user_jobs',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('job_id', db.Integer, db.ForeignKey('jobs.id'), primary_key=True)
)

class User(db.Model):
    __tablename__ = 'users'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone = db.Column(db.String(20), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    applications = db.relationship('Application', backref='user', lazy=True, cascade='all, delete-orphan')
    saved_jobs = db.relationship('Job', secondary=user_job_association, back_populates='saved_by_users')

class Job(db.Model):
    __tablename__ = 'jobs'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    company = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(100), nullable=False)
    salary = db.Column(db.Integer, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    applications = db.relationship('Application', backref='job', lazy=True, cascade='all, delete-orphan')
    saved_by_users = db.relationship('User', secondary=user_job_association, back_populates='saved_jobs')

class Application(db.Model):
    __tablename__ = 'applications'
    
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    job_id = db.Column(db.Integer, db.ForeignKey('jobs.id'), nullable=False)
    cover_letter = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(50), default='pending')
    applied_at = db.Column(db.DateTime, default=datetime.utcnow)
from flask import Blueprint, request, jsonify
from app import db
from app.models import User, Job, Application
from app.schemas import UserSchema, JobSchema, ApplicationSchema
from marshmallow import ValidationError

api = Blueprint('api', __name__)

# Schema instances
user_schema = UserSchema()
users_schema = UserSchema(many=True)
job_schema = JobSchema()
jobs_schema = JobSchema(many=True)
application_schema = ApplicationSchema()
applications_schema = ApplicationSchema(many=True)

# Error handler
@api.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Resource not found'}), 404

@api.errorhandler(500)
def internal_error(error):
    return jsonify({'error': 'Internal server error'}), 500

# Test route
@api.route('/ping', methods=['GET'])
def ping():
    return jsonify({'message': 'pong'}), 200

# User routes
@api.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify(users_schema.dump(users)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/users', methods=['POST'])
def create_user():
    try:
        data = user_schema.load(request.json)
        user = User(**data)
        db.session.add(user)
        db.session.commit()
        return jsonify(user_schema.dump(user)), 201
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/users/<int:user_id>', methods=['PATCH'])
def update_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        data = user_schema.load(request.json, partial=True)
        for key, value in data.items():
            setattr(user, key, value)
        db.session.commit()
        return jsonify(user_schema.dump(user)), 200
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/users/<int:user_id>', methods=['DELETE'])
def delete_user(user_id):
    try:
        user = User.query.get_or_404(user_id)
        db.session.delete(user)
        db.session.commit()
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Job routes
@api.route('/jobs', methods=['GET'])
def get_jobs():
    try:
        jobs = Job.query.all()
        return jsonify(jobs_schema.dump(jobs)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/jobs', methods=['POST'])
def create_job():
    try:
        data = job_schema.load(request.json)
        job = Job(**data)
        db.session.add(job)
        db.session.commit()
        return jsonify(job_schema.dump(job)), 201
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/jobs/<int:job_id>', methods=['PATCH'])
def update_job(job_id):
    try:
        job = Job.query.get_or_404(job_id)
        data = job_schema.load(request.json, partial=True)
        for key, value in data.items():
            setattr(job, key, value)
        db.session.commit()
        return jsonify(job_schema.dump(job)), 200
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/jobs/<int:job_id>', methods=['DELETE'])
def delete_job(job_id):
    try:
        job = Job.query.get_or_404(job_id)
        db.session.delete(job)
        db.session.commit()
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Application routes
@api.route('/applications', methods=['GET'])
def get_applications():
    try:
        applications = Application.query.all()
        return jsonify(applications_schema.dump(applications)), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/applications', methods=['POST'])
def create_application():
    try:
        data = application_schema.load(request.json)
        application = Application(**data)
        db.session.add(application)
        db.session.commit()
        return jsonify(application_schema.dump(application)), 201
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/applications/<int:app_id>', methods=['PATCH'])
def update_application(app_id):
    try:
        application = Application.query.get_or_404(app_id)
        data = application_schema.load(request.json, partial=True)
        for key, value in data.items():
            setattr(application, key, value)
        db.session.commit()
        return jsonify(application_schema.dump(application)), 200
    except ValidationError as err:
        return jsonify({'errors': err.messages}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@api.route('/applications/<int:app_id>', methods=['DELETE'])
def delete_application(app_id):
    try:
        application = Application.query.get_or_404(app_id)
        db.session.delete(application)
        db.session.commit()
        return '', 204
    except Exception as e:
        return jsonify({'error': str(e)}), 500
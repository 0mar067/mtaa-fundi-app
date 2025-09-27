#!/usr/bin/env bash
# exit on error
set -o errexit

pip install --upgrade pip
pip install -r requirements.txt

# Create database tables
python -c "from wsgi import app; from app import db; app.app_context().push(); db.create_all()"
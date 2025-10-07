import os
from app import create_app, db
from app.models import User, Job, Application

app = create_app()

# Create tables and seed data
with app.app_context():
    try:
        db.create_all()
        print("Database tables created successfully")
        
        # Always recreate tables to ensure they exist
        db.drop_all()
        db.create_all()
        print("Database tables recreated")
        
        # Always add seed data
        print("Adding seed data...")
        # Seed users
        user1 = User(name="Wanjiku Mwangi", email="wanjiku@gmail.com", phone="0712345678")
        user2 = User(name="Brian Kiprotich", email="brian.kiprotich@yahoo.com", phone="0723456789")
        
        # Seed jobs
        job1 = Job(title="Software Developer", description="Develop mobile and web applications for fintech solutions in Kenya", 
                  company="Safaricom PLC", location="Nairobi", salary=120000)
        job2 = Job(title="Data Analyst", description="Analyze customer data and market trends for banking solutions", 
                  company="Equity Bank", location="Mombasa", salary=85000)
        job3 = Job(title="Digital Marketing Manager", description="Lead digital marketing campaigns for e-commerce platform", 
                  company="Jumia Kenya", location="Kisumu", salary=95000)
        
        db.session.add_all([user1, user2, job1, job2, job3])
        db.session.commit()
        
        # Seed applications
        app1 = Application(user_id=1, job_id=1, cover_letter="I am excited about this software developer position at Safaricom. With my experience in mobile app development and understanding of M-Pesa integration, I believe I can contribute significantly to your fintech innovations.")
        app2 = Application(user_id=2, job_id=2, cover_letter="My background in data analysis and experience with banking systems makes me an ideal candidate for this role at Equity Bank. I am passionate about using data to drive financial inclusion in Kenya.")
        
        db.session.add_all([app1, app2])
        db.session.commit()
        print("Seed data added successfully")
    except Exception as e:
        print(f"Database initialization error: {e}")

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)

# For gunicorn
application = app
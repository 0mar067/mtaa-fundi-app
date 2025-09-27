import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { applicationAPI, userAPI, jobAPI } from '../services/api';

// Validation schema for application form
const applicationSchema = Yup.object().shape({
  user_id: Yup.number().required('User is required'),
  job_id: Yup.number().required('Job is required'),
  cover_letter: Yup.string().min(50, 'Cover letter must be at least 50 characters').required('Cover letter is required'),
});

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [users, setUsers] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [appsData, usersData, jobsData] = await Promise.all([
        applicationAPI.getAll(),
        userAPI.getAll(),
        jobAPI.getAll()
      ]);
      setApplications(appsData);
      setUsers(usersData);
      setJobs(jobsData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateApplication = async (values, { resetForm }) => {
    try {
      await applicationAPI.create(values);
      resetForm();
      fetchData(); // Refresh data after creation
    } catch (error) {
      console.error('Error creating application:', error);
    }
  };

  const handleDeleteApplication = async (id) => {
    try {
      await applicationAPI.delete(id);
      fetchData(); // Refresh data after deletion
    } catch (error) {
      console.error('Error deleting application:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="applications">
      <h2> Job Applications</h2>
      
      {/* Application creation form */}
      <div className="form-section">
        <h3>Apply for a Job</h3>
        <Formik
          initialValues={{ user_id: 0, job_id: 0, cover_letter: '' }}
          validationSchema={applicationSchema}
          onSubmit={handleCreateApplication}
        >
          <Form className="application-form">
            <div className="form-group">
              <Field as="select" name="user_id">
                <option value={0}>Select Job Seeker</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name} ({user.email})
                  </option>
                ))}
              </Field>
              <ErrorMessage name="user_id" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field as="select" name="job_id">
                <option value={0}>Select Job</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} at {job.company}
                  </option>
                ))}
              </Field>
              <ErrorMessage name="job_id" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field 
                name="cover_letter" 
                as="textarea" 
                placeholder="Write your cover letter here (minimum 50 characters)..."
                rows={5}
              />
              <ErrorMessage name="cover_letter" component="div" className="error" />
            </div>
            <button type="submit">Apply Now</button>
          </Form>
        </Formik>
      </div>

      {/* Applications list */}
      <div className="applications-list">
        <h3>All Applications</h3>
        {applications.length === 0 ? (
          <p>No applications submitted yet.</p>
        ) : (
          <div className="applications-grid">
            {applications.map((app) => (
              <div key={app.id} className="application-card">
                <h4>Application #{app.id}</h4>
                <p><strong>Applicant:</strong> {app.user?.name || `User ID: ${app.user_id}`}</p>
                <p><strong>Job:</strong> {app.job?.title || `Job ID: ${app.job_id}`}</p>
                <p><strong>Company:</strong> {app.job?.company || 'N/A'}</p>
                <p><strong>Status:</strong> <span className={`status ${app.status}`}>{app.status}</span></p>
                <p><strong>Cover Letter:</strong></p>
                <div className="cover-letter">{app.cover_letter}</div>
                <p><strong>Applied:</strong> {app.applied_at ? new Date(app.applied_at).toLocaleDateString() : 'N/A'}</p>
                <button 
                  onClick={() => handleDeleteApplication(app.id)}
                  className="delete-btn"
                >
                  Delete Application
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { jobAPI } from '../services/api';

// Validation schema for job form
const jobSchema = Yup.object().shape({
  title: Yup.string().min(5, 'Title must be at least 5 characters').required('Title is required'),
  description: Yup.string().min(10, 'Description must be at least 10 characters').required('Description is required'),
  company: Yup.string().min(2, 'Company must be at least 2 characters').required('Company is required'),
  location: Yup.string().min(2, 'Location must be at least 2 characters').required('Location is required'),
  salary: Yup.number().min(10000, 'Salary must be at least KES 10,000').required('Salary is required'),
});

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingJob, setEditingJob] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const data = await jobAPI.getAll();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateJob = async (values, { resetForm }) => {
    try {
      await jobAPI.create(values);
      resetForm();
      fetchJobs(); // Refresh list after creation
    } catch (error) {
      console.error('Error creating job:', error);
    }
  };

  const handleUpdateJob = async (values, { resetForm }) => {
    try {
      await jobAPI.update(editingJob.id, values);
      setEditingJob(null);
      resetForm();
      fetchJobs(); // Refresh list after update
    } catch (error) {
      console.error('Error updating job:', error);
    }
  };

  const handleDeleteJob = async (id) => {
    try {
      await jobAPI.delete(id);
      fetchJobs(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting job:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="jobs">
      <h2>Available Jobs in Kenya</h2>
      
      {/* Job creation/edit form */}
      <div className="form-section">
        <h3>{editingJob ? 'Edit Job Posting' : 'Post New Job'}</h3>
        <Formik
          key={editingJob?.id || 'new'} // Force re-render when editing changes
          initialValues={editingJob || { title: '', description: '', company: '', location: '', salary: 0 }}
          validationSchema={jobSchema}
          onSubmit={editingJob ? handleUpdateJob : handleCreateJob}
        >
          <Form className="job-form">
            <div className="form-group">
              <Field name="title" placeholder="Job Title" />
              <ErrorMessage name="title" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field name="description" as="textarea" placeholder="Job Description" />
              <ErrorMessage name="description" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field name="company" placeholder="Company Name" />
              <ErrorMessage name="company" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field name="location" placeholder="Location" />
              <ErrorMessage name="location" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field name="salary" type="number" placeholder="Salary" />
              <ErrorMessage name="salary" component="div" className="error" />
            </div>
            <div className="form-buttons">
              <button type="submit">{editingJob ? 'Update Job' : 'Post Job'}</button>
              {editingJob && (
                <button type="button" onClick={() => setEditingJob(null)}>Cancel</button>
              )}
            </div>
          </Form>
        </Formik>
      </div>

      {/* Jobs list */}
      <div className="jobs-list">
        <h3>Current Job Openings</h3>
        {jobs.length === 0 ? (
          <p>No job openings available at the moment.</p>
        ) : (
          <div className="jobs-grid">
            {jobs.map((job) => (
              <div key={job.id} className="job-card">
                <h4>{job.title}</h4>
                <p><strong>Company:</strong> {job.company}</p>
                <p><strong>Location:</strong> {job.location}</p>
                <p><strong>Salary:</strong> KES {job.salary.toLocaleString()}</p>
                <p><strong>Description:</strong> {job.description}</p>
                <div className="job-actions">
                  <button onClick={() => setEditingJob(job)} className="edit-btn">Edit</button>
                  <button onClick={() => handleDeleteJob(job.id)} className="delete-btn">Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Jobs;
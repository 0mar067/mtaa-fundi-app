import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { userAPI } from '../services/api';

// Validation schema for user form
const userSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Name must be at least 2 characters').required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  phone: Yup.string().min(10, 'Phone must be at least 10 digits').required('Phone is required'),
});

const Home = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userAPI.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (values, { resetForm, setFieldError }) => {
    try {
      await userAPI.create(values);
      resetForm();
      fetchUsers(); // Refresh list after creation
      alert('User registered successfully!');
    } catch (error) {
      console.error('Error creating user:', error);
      if (error.message.includes('UNIQUE constraint failed: users.email')) {
        setFieldError('email', 'This email is already registered');
      } else {
        alert('Error creating user: ' + error.message);
      }
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await userAPI.delete(id);
      fetchUsers(); // Refresh list after deletion
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="home">
      <h2> Manage Job Seekers</h2>
      
      {/* User creation form */}
      <div className="form-section">
        <h3>Register New Job Seeker</h3>
        <Formik
          initialValues={{ name: '', email: '', phone: '' }}
          validationSchema={userSchema}
          onSubmit={handleCreateUser}
        >
          <Form className="user-form">
            <div className="form-group">
              <Field name="name" placeholder="Full Name" />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field name="email" type="email" placeholder="Email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>
            <div className="form-group">
              <Field name="phone" placeholder="Phone Number" />
              <ErrorMessage name="phone" component="div" className="error" />
            </div>
            <button type="submit">Register User</button>
          </Form>
        </Formik>
      </div>

      {/* Users list */}
      <div className="users-list">
        <h3>Registered Job Seekers</h3>
        {users.length === 0 ? (
          <p>No job seekers registered yet.</p>
        ) : (
          <div className="users-grid">
            {users.map((user) => (
              <div key={user.id} className="user-card">
                <h4>{user.name}</h4>
                <p>Email: {user.email}</p>
                <p>Phone: {user.phone}</p>
                <button 
                  onClick={() => handleDeleteUser(user.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
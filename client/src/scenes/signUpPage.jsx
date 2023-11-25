import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignupForm = () => {
  const navigate = useNavigate();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
    occupation: Yup.string().required('Required'),
  });

  // Formik hook setup
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      occupation: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // Your existing form submission logic
      try {
        const response = await fetch('http://localhost:3001/register/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        if (response.status === 200) {
          console.log('User registered successfully');
          navigate('/signIn');
        } else {
          console.error('User registration failed');
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    },
  });

  return (
    <div className="container mt-5">
      <h2 className='display-2 text-light'>Signup </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-light">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.name}
            className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="invalid-feedback">{formik.errors.name}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label text-light">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="invalid-feedback">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label text-light">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
          />
          {formik.touched.password && formik.errors.password ? (
            <div className="invalid-feedback">{formik.errors.password}</div>
          ) : null}
        </div>

        <div className="mb-3">
          <label htmlFor="occupation" className="form-label text-light">Occupation</label>
          <input
            type="text"
            id="occupation"
            name="occupation"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.occupation}
            className={`form-control ${formik.touched.occupation && formik.errors.occupation ? 'is-invalid' : ''}`}
          />
          {formik.touched.occupation && formik.errors.occupation ? (
            <div className="invalid-feedback">{formik.errors.occupation}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
};

export default SignupForm;

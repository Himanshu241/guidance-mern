import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
  
  
    const validationSchema = Yup.object({
      email: Yup.string().email('Invalid email address').required('Required'),
      password: Yup.string().required('Required'),
    });
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        // Your existing form submission logic
        try {
          setIsLoading(true);
          const response = await fetch('http://localhost:3001/login/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(values),
          });
          const res = await response.json();
          if (response.status === 401) {
            console.error(res);
          } else if (response.status === 200) {
            dispatch(
              setLogin({
                user: res.user,
                token: res.token,
              })
            );
            navigate('/home');
            console.log(res);
            setIsLoading(false);
          }
        } catch (error) {
          console.error('Login failed', error);
        }
      },
    });
    

    
        

    return (
      <div className="container mt-5">
        <h2 className='display-2 text-light'>Sign-In </h2>
        <form onSubmit={formik.handleSubmit}>
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
  <button type="submit" className="btn btn-primary">Submit</button>
</form>

  {isLoading && <div class="spinner center">
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
    <div class="spinner-blade"></div>
</div>}
      </div>
    );
};

export default SignInForm;

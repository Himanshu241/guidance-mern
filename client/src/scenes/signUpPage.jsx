import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
const SignupForm = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
      name: '',
      email: '',
      password: '',
      occupation:''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Send a POST request with formData to your backend API for user registration.
      try {
        const response = await fetch('http://localhost:3001/register/', {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
        
        if (response.status === 200) {
          console.log('User registered successfully');
          navigate('/signIn');
          }
          else {
          console.error('User registration failed');
          
        }
      } catch (error) {
        console.error('Error during registration:', error);
      }
    };

  return (
    <div className="container mt-5">
      <h2 className='display-2 text-light'>Signup </h2>
      <form>
  <div class="mb-3">
    <label for="name" class="form-label text-light">Name</label>
    <input type="text" onChange={handleChange} name='name' value={formData.name} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
    
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label text-light">email</label>
    <input type="email" onChange={handleChange} name='email' value={formData.email} class="form-control" id="exampleInputPassword1"></input>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label text-light">password</label>
    <input type="password" onChange={handleChange} name='password' value={formData.password}class="form-control" id="exampleInputPassword1"></input>
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label text-light">occupation</label>
    <input type="text" onChange={handleChange} name='occupation' value={formData.occupation} class="form-control" id="exampleInputPassword1"></input>
  </div>
  
  <button type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>
</form>
    </div>
  );
};

export default SignupForm;

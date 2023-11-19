import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setLogin } from '../state';
const SignInForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
      email: '',
      password: '',
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
      
        try {
          setIsLoading(true);
          const response = await fetch('http://localhost:3001/login/', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
          });
          const res = await response.json();
          if(response.status === 401){
            console.error(res);
          }
          else if(response.status === 200){

            dispatch(
              setLogin({
                user : res.user,
                token : res.token
              })
            )
            navigate('/home');
            
            console.log(res);
            setIsLoading(false);
          }
          
        } catch (error) {
          console.error('Login failed', error);
        }
    }
          
        

    return (
      <div className="container mt-5">
        <h2 className='display-2 text-light'>Sign-In </h2>
        <form>
    
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label text-light">email</label>
      <input type="email" onChange={handleChange} name='email' value={formData.email} class="form-control" id="exampleInputPassword1"></input>
    </div>
    <div class="mb-3">
      <label for="exampleInputPassword1" class="form-label text-light">password</label>
      <input type="password" onChange={handleChange} name='password' value={formData.password}class="form-control" id="exampleInputPassword1"></input>
    </div>
    
    
    <button type="submit" onClick={handleSubmit} class="btn btn-primary">Submit</button>
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

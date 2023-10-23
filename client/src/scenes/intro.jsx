import React from 'react';
import { useNavigate } from "react-router-dom";


const Intro = () => {
  const navigate = useNavigate();

  const handleSignIn=()=>{
      navigate('/signIn');
  }
  const handleSignUp = ()=>{
    navigate('/signUp');
  }

  return (
    <div>
        
        <div className='title-container '>
        <h1 class=" title"  >MargDarshan</h1>
        </div>
        <div className='intro-btn-container'>
          <button className="btn btn-primary btn-block" onClick={handleSignIn}>sign-in</button>
          <button className="btn btn-primary btn-block" onClick={handleSignUp}>sign-up</button>
        </div>
    </div>
  )
}

export default Intro
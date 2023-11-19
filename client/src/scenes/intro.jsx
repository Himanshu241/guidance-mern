import React from 'react';
import { useNavigate } from "react-router-dom";
import video from '../Logo/video1.mp4';


const Intro = () => {
  const navigate = useNavigate();

  const handleSignIn=()=>{
      navigate('/signIn');
  }
  const handleSignUp = ()=>{
    navigate('/signUp');
  }

  return (
    <div className='container'>
    <video src ={video} autoPlay muted loop/>
      <div className='border'>
      <div className='title-container mx-auto'>
      <button class="button title-text" data-text="Awesome">
    <span class="actual-text">&nbsp;MargDarshan&nbsp;</span>
    <span aria-hidden="true" class="hover-text">&nbsp;MargDarshan&nbsp;</span>
</button>

      </div>
    <div className='intro-btn-container'>
    <button type='button' className="btn btn-primary btn-block"  onClick={handleSignIn}>sign-in</button>
    {/* <br/> */}
    <button type='button' className="btn btn-primary btn-block"  onClick={handleSignUp}>sign-up</button>
    </div>
    </div>
    </div>
  )
}

export default Intro
import React from 'react';
import CustomButton from '../components/button'


const intro = () => {

  const handleSignIn=()=>{
      alert('sign in')
  }
  const handleSignUp = ()=>{
    alert('sign up')
  }

  return (
    <div>
        
        <h1 className='title' >MargDarshan</h1>
        <CustomButton color="#845ef7" onClick={handleSignUp} text="sign-up"></CustomButton>
        <CustomButton color="#845ef7" onClick={handleSignIn} text="sign-in"></CustomButton>

    </div>
  )
}

export default intro
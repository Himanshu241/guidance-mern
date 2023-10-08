import React from 'react';



const intro = () => {

  const handleSignIn=()=>{
      alert('sign in')
  }
  const handleSignUp = ()=>{
    alert('sign up')
  }

  return (
    <div>
        
        <div className='title-container '>
        <h1 class="typing-animation title" data-text-en="MargDarshan" t></h1>
        </div>
        <div className='intro-btn-container'>
          <button className="btn btn-primary btn-block" onClick={handleSignIn}>sign-in</button>
          <button className="btn btn-primary btn-block" onClick={handleSignUp}>sign-up</button>
        </div>
    </div>
  )
}

export default intro
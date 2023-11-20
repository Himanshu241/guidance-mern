import React from 'react';
import Feeds from '../widgets/feeds';
import Foot from '../widgets/Foot';
import AddQuestion from '../widgets/addquestion';
import Navbar from '../widgets/navbar';
import { useState } from 'react';
import { useSelector } from 'react-redux';

function Home() {
  const profile = useSelector((state)=>state.auth.user.profileImage);
  console.log(profile)
  
  return (
    <>
    <Navbar/>
   
    {/* Main body */}
    <div>
    {/* Feeds section */}
    <Feeds/>  

    {/* Add question button and overlay form */}
   

    

      {/* Footer section */}
    <Foot/>
    </div>
    </>
  )
}

export default Home;
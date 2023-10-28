import React from 'react'
import Foot from './Foot';
import { useState } from 'react';
import { UseSelector, useSelector } from 'react-redux/es/hooks/useSelector';
function Home() {
  const token = useSelector((state)=>state.token); 
  const userName = useSelector((state)=>state.user.name);
   
  return (
    <>
    <div className='text-white'>{token}</div>
    <div className='text-white'>{userName}</div>
    <Foot/>
    </>
  )
}

export default Home;
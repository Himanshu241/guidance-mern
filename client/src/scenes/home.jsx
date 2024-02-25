import React from 'react';
import Feeds from '../widgets/feeds';
import Foot from '../widgets/Foot';
import Navbar from '../widgets/navbar';

function Home() {
  return (
    <>
    <Navbar/>
    {/* Main body */}
    <div>
    {/* Feeds section */}
    <Feeds/>  
      {/* Footer section */}
    <Foot/>
    </div>
    </>
  )
}

export default Home;
import React from 'react';
import Feeds from '../widgets/feeds';
import Foot from '../widgets/Foot';
import AddQuestion from '../widgets/addquestion';
import Navbar from '../widgets/navbar';
import { useState } from 'react';

function Home() {
  const [showOverlay, setShowOverlay] = useState(false);
  
 
  
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  }
  return (
    <>
    <Navbar/>
   
    {/* Main body */}
    <div>
    {/* Feeds section */}
    <Feeds/>  

    {/* Add question button and overlay form */}
   

    <button type='button' className='adjust fixed-button btn btn-primary' onClick={toggleOverlay}>ADD A QUESTION</button>
    
      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
          <AddQuestion sharedState={showOverlay} updateSharedState={setShowOverlay}/> 
          <button type='button' className='close btn btn-danger' onClick={toggleOverlay}>Close</button>
          </div>
        </div>
      )}

      {/* Footer section */}
    <Foot/>
    </div>
    </>
  )
}

export default Home;
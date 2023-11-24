import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Navbar from '../widgets/navbar';
function MentorPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
const token = useSelector((state)=>state.auth.token);
  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/searchMentor?query=${searchQuery}`,{
        headers:{
            'Authorization':token
        }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Error searching users:', error);
    }
  };

  return (
    <>
    <Navbar/>
    <div className='center-search-container'>
     
    <div class="container-1">
<div class="search-container">
 <input class="input" type="text" placeholder="Search a mentor(Search by domain)"
          value={searchQuery}
          onChange={(e) => {setSearchQuery(e.target.value); handleSearch();}}/>
 <svg viewBox="0 0 24 24" class="search__icon">
   <g>
     <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
     </path>
   </g>
 </svg>
</div>
</div> 
<div style={{color:'white', fontSize:'18px'}}>Search by domain(Field of Expertise)..</div>
    </div>
    
    
    {searchResults.map((user)=>
    <div className='center-container'>
      <div className="card w-75 text-center mb-1">
      {/* green tick  */}
      
            <div style={{ position: 'absolute', top: '0', right: '0', marginRight: '10px', marginTop: '10px' }}>
              <div className="green-tick-container">
                <div className="green-tick">
                  <div className="tick-icon">&#10004;</div>
                </div>
              </div>
              <div style={{ color: 'green', fontSize: '14px' }}>Mentor</div>
            </div>
       

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        {user.profileImage && (
        <img
          src={`http://localhost:3001${user.profileImage}`}
          alt="Profile"
          style={{ width: '70px', height: '70px', borderRadius: '50%' }}
        />
      )}
          <h3 className='font-weight-bold text-uppercase'>{user.name}</h3>
        </div>
        <div className="card-header font-weight-bold">{user.occupation}</div>
        <div className="card-body">
          <h5 className="card-title">{user.bio}</h5>
          <button  className=' shadow__btn' >Connect</button>

          </div>
        </div>
      </div>
      )}
   
 </> 
  );
}

export default MentorPage;

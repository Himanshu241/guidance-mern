import React from 'react'
import Navbar from '../widgets/navbar'
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import logo from '../Logo/LOGO1.png'
function Profile() {
    const userId = useSelector((state)=>state.auth.user._id);
    const name = useSelector((state)=>state.auth.user.name);
    const email = useSelector((state)=>state.auth.user.email);
    const showLogo = useSelector((state)=>state.auth.user.isMentor);
    const occupation = useSelector((state)=>state.auth.user.occupation);
    const profileImage = useSelector((state)=>state.auth.user.profileImage)
    const bio = useSelector((state)=>state.auth.user.bio)

    const [isLoading, setIsLoading] = useState(false);
    const token = useSelector((state)=>state.auth.token);
    const [updateStatus, setUpdateStatus] = useState('');
    const [userData, setUserData] = useState({
        name: name,
        email: email,
        occupation: occupation,
        profileImage: null,
        bio:bio
      });
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
      };
    
      const handleFileChange = (e) => {
        const file = e.target.files[0];
        setUserData({ ...userData, profileImage: file });
      };
    
      const handleUpdateProfile = async () => {
        setIsLoading(true);
        const formData = new FormData();
    
        Object.keys(userData).forEach((key) => {
          formData.append(key, userData[key]);
        });
    
        try {
          const response = await axios.put(`http://localhost:3001/users/${userId}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization':token
            },
          });
    if(response.status === 200){
        setUpdateStatus('Updated Successfully');
        setIsLoading(false);
    }
          console.log('User profile updated successfully!');
        } catch (error) {
          console.error('Error updating user profile:', error);
          setIsLoading(false);
        }
      };

  return (
    <>
    <Navbar/>

    {/* Update Section */}
    {/* green tick  */}
    {showLogo && (
            <div style={{zIndex:'111', position: 'absolute', top: '0', right: '0', marginRight: '10px', marginTop: '10px' }}>
              <div className="green-tick-container">
                <div className="green-tick">
                  <div className="tick-icon">&#10004;</div>
                </div>
              </div>
              <div style={{ color: 'green', fontSize: '14px' }}>Mentor</div>
            </div>
          )}

 
    <div className='update-container center-container-update'>
      
      <h2 className='upload-title mb-5'>Update Profile</h2>
       
      <label className='update-label'>Profile Image:</label>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div
          style={{
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            overflow: 'hidden',
            marginRight: '10px',
          }}
        >
          {userData.profileImage && (
            <img
              src={URL.createObjectURL(userData.profileImage)}
              alt="Profile"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}
        </div>
        <label
          htmlFor="profileImageInput"
          style={{
            cursor: 'pointer',
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '5px',
          }}
        >
          Choose Image
        </label>
        <input
          type="file"
          id="profileImageInput"
          name="profileImage"
          style={{ display: 'none' }}
          onChange={handleFileChange}
          
        />
      </div>
      <br/>
      <label className='update-label'>Name :  </label>
      <input className='search-input' style={{marginBottom:'3%'}} type="text" name="name" value={userData.name} onChange={handleInputChange} />
      <br />

      <label className='update-label'>Email :  </label>
      <input className='search-input' style={{marginBottom:'3%'}} type="text" name="email" value={userData.email} onChange={handleInputChange} />
      <br />

      

      <label className='update-label'>Occupation :  </label>
      <input className='search-input' style={{marginBottom:'3%'}} type="text" name="occupation" value={userData.occupation} onChange={handleInputChange} />
      <br />
      <label className='update-label'>Bio :  </label>
      <textarea className='search-input' style={{marginBottom:'3%'}} value={userData.bio} type="text" name="bio"  onChange={handleInputChange} />
      <br />

      <button  className=' shadow__btn' onClick={handleUpdateProfile}>Update Profile</button>
      <div style={{marginTop:'4%'}}>
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
     
    <p className='display-upload-text'>{updateStatus}</p>
  </div>
    </div>
    
  
  
    </>
  )
}

export default Profile
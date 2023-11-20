import React from 'react';
import logo from '../Logo/LOGO1.png'
function AnswerWidget({ name, body, createdAt, profileImage, showLogo }) {
  return (
    <div className="container mt-4">
     
      <div className="card p-3 mb-2 bg-secondary text-white" style={{alignItems:'center', alignContent:'center'}}>
         {/* Logo based on showLogo prop */}
      {showLogo && (
          <div style={{ position: 'absolute', top: '10px', right: '10px' }}>
            <img
              src={logo} // Replace with the actual path to your logo image
              alt="Logo"
              style={{ width: '60px', height: '60px' }}
            />
          </div>
        )}
        <div className="card-body" style={{ display: 'flex', alignItems: 'center' }}>
          {profileImage && (
            <img
            src={`http://localhost:3001${profileImage}`}
              alt="Profile"
              style={{ width: '50px', height: '50px', borderRadius: '50%', marginRight: '10px' }}
            />
          )}
          <div>
            <h2 className="card-title">{name}</h2>
            <p className="card-text">{body}</p>
            <div className="card-footer text-muted">{createdAt.toLocaleString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerWidget;

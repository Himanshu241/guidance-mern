  import React from 'react';
  function AnswerWidget({ name, body, createdAt, profileImage, showLogo }) {
    return (
      <div className="container mt-4">
        <div className="card p-3 mb-2 bg-secondary text-white" style={{ alignItems: 'center', alignContent: 'center', position: 'relative' }}>
          {/* green tick  */}
          {showLogo && (
            <div style={{ position: 'absolute', top: '0', right: '0', marginRight: '10px', marginTop: '10px' }}>
              <div className="green-tick-container">
                <div className="green-tick">
                  <div className="tick-icon">&#10004;</div>
                </div>
              </div>
              <div style={{ color: 'green', fontSize: '14px' }}>Mentor</div>
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

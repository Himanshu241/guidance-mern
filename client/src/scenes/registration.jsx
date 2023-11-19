import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
function Registration() {

    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [displayText, setDisplayText] = useState('Input your files');
    const id = useSelector((state)=>state.auth.user._id);
    const token = useSelector((state)=>state.auth.token);

    
  
    const handleFileChange = (event) => {
      setFiles(event.target.files);
    };
  
    const handleUpload = async () => {
      try {
        setIsLoading(true);
        const formData = new FormData();
        
        formData.append('id',id);
        
  
        for (let i = 0; i < files.length; i++) {
          formData.append('pdf', files[i]);
        }
  
        const response = await axios.post(`http://localhost:3001/${id}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization':token
          },
        });
        if(response.status === 201){
          setDisplayText('Files Uploaded Successfully');
        }
  
        // Handle success, e.g., show a success message
        console.log('Files uploaded successfully');
        setIsLoading(false);
      } catch (error) {
        // Handle error, e.g., show an error message
        console.error('Error uploading files:', error.message);
      }
    };
  
    return (
      <div className='center-container-upload inline-element'>
       
        <h1 className='inline-element upload-title mb-5'>Select Relevant PDF files(Can select upto 5 files):</h1>
          <br/>
          <input className='inline-element mb-4' type="file" multiple onChange={handleFileChange} />
        <br />
        <button className="inline-element shadow__btn mb-5" onClick={handleUpload}>Upload</button>
       
        {isLoading? <div class="loader inline-element mb-3">
  <div class="cube">
    <div class="side front"></div>
    <div class="side back"></div>
    <div class="side top"></div>
    <div class="side bottom"></div>
    <div class="side left"></div>
    <div class="side right"></div>
  </div>
</div>: null}

      <div>
        <p className='display-upload-text'>{displayText}</p>
      </div>
      </div>
    );
  
}

export default Registration
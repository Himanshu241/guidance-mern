// addquestion.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';
const AddQuestion = ({ sharedState, updateSharedState, handleNewQuestionAdded }) => {

const userId = useSelector((state)=>state.auth.user._id);  
const name = useSelector((state)=>state.auth.user.name);
const token = useSelector((state)=>state.auth.token);
const profileImage = useSelector((state)=>state.auth.user.profileImage);
const isMentor = useSelector((state)=>state.auth.user.isMentor);

console.log(profileImage)
const [isLoading, setIsLoading] = useState(false);
  const [questionData, setQuestionData] = useState({
    name:'',
    title: '',
    body: '',
    tags: '',
    createdBy: '',
    profileImage:'',
    isMentor: false
    
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleAddQuestion = async () => {
    try {
      setIsLoading(true);
      // Use the state directly here
      const updatedQuestionData = {
        ...questionData,
        createdBy: userId,
        name: name,
        profileImage:profileImage,
        isMentor: isMentor
      };
  
      console.log(updatedQuestionData);
  
      const response = await axios.post('http://localhost:3001/question/', updatedQuestionData,{
        headers:{
          'Authorization': token
        }
      });
      
    
      
      // Handle the response as needed (e.g., show a success message, reset form)
      
      console.log('Question added successfully:', response.data);
      handleNewQuestionAdded();
      setIsLoading(false);
     
  
      // Reset the form
      setQuestionData({
        name: '',
        title: '',
        body: '',
        tags: '',
        createdBy: '',
        profileImage:'',
        isMentor:false
       
      });
    } catch (error) {
      console.error('Error adding question:', error);
      
    }

  };
  

  return (
    <div>
      <h2>Add a New Question</h2>
      <form>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={questionData.title}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Body:</label>
          <textarea
            name="body"
            value={questionData.body}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Tags (comma-separated):</label>
          <input
            type="text"
            name="tags"
            value={questionData.tags}
            onChange={handleInputChange}
          />
        </div>
        <button className='btn btn-success add-question' type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
      </form>
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
    </div>
  );
};

export default AddQuestion;

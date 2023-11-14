import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';

const AddQuestion = () => {

const userId = useSelector((state)=>state.user._id);  
  const [questionData, setQuestionData] = useState({
    title: '',
    body: '',
    tags: '',
    createdBy: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  const handleAddQuestion = async () => {
    try {
      setQuestionData({...questionData,createdBy:userId});  
      console.log(questionData)
      const response = await axios.post('http://localhost:3001/question/', questionData);
      
      // Handle the response as needed (e.g., show a success message, reset form)
      console.log('Question added successfully:', response.data);

      // Reset the form
      setQuestionData({
        title: '',
        body: '',
        tags: '',
        createdBy:''
      });
    } catch (error) {
      console.error('Error adding question:', error);
      // Handle error (e.g., show an error message)
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
        <button type="button" onClick={handleAddQuestion}>
          Add Question
        </button>
      </form>
    </div>
  );
};

export default AddQuestion;

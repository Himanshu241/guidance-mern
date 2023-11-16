import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function FeedPost({ questionId, name, title, body, tags, createdAt, answers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const userId = useSelector((state) => state.auth.user._id);
  const userName = useSelector((state) => state.auth.user.name);

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const id = questionId;

  const addAnswer = async (id, answerData) => {
    try {
      console.log(answerData);
      const response = await axios.post(`http://localhost:3001/question/${id}/answer`, answerData);

      // Handle the response as needed
      console.log('Answer added successfully:', response.data);
    } catch (error) {
      console.error('Error adding answer:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleAnswer = async (e) => {
    e.preventDefault();
    await addAnswer(id, { body: answer, name: userName, createdBy: userId });
  };

  const handleFullPost = () => {
    
  };

  return (
    <div className='center-container'>
      <div className="card w-75 text-center mb-1">
        <h3 className='font-weight-bold text-uppercase'>{name}</h3>
        <div className="card-header font-weight-bold">{title}</div>
        <div className="card-body">
          <h5 className="card-title">{body}</h5>
          <h3 className='font-weight-bold text-uppercase'>Answers</h3>
          <p className="card-text">{answers.map((answer, index) => <span key={index}>{answer.body}</span>)}</p>
          <button onClick={handleFullPost} className="btn btn-link mb-1">
            Show full post..
          </button>
          <div>
            <button onClick={toggleDiv} className="btn btn-success">
              Add an Answer
            </button>
            {isOpen && (
              <div className="slide-down-container">
                <form>
                  <label>
                    Enter your answer:
                    <textarea type="text" value={answer} onChange={handleInputChange} />
                  </label>
                  <button onClick={handleAnswer} className='btn btn-primary'>Submit</button>
                </form>
              </div>
            )}
          </div>
        </div>
        <div>{tags.map((tag, index) => <a key={index} href="#" className="badge badge-secondary m-1">{tag}</a>)}</div>
        <div className="card-footer text-muted">{createdAt}</div>
      </div>
    </div>
  );
}

export default FeedPost;

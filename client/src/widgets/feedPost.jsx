import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import AnswerWidget from './answerwidget';

function FeedPost({ questionId, name, title, body, tags, createdAt, answers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const userId = useSelector((state) => state.auth.user._id);
  const userName = useSelector((state) => state.auth.user.name);
  const token = useSelector((state)=>state.auth.token);
  const profileImage = useSelector((state)=>state.auth.user.profileImage);
  const [displayedAnswers, setDisplayedAnswers] = useState(2);
  console.log(profileImage)

  const toggleDiv = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setAnswer(e.target.value);
  };

  const id = questionId;

  const addAnswer = async (id, answerData) => {
    try {
      setIsLoading(true);
      const response = await axios.post(`http://localhost:3001/question/${id}/answer`, answerData, {
        headers: {
          'Authorization': token
        }
      });

      // Handle the response as needed
      console.log('Answer added successfully:', response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error adding answer:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const handleAnswer = async (e) => {
    e.preventDefault();
    await addAnswer(id, { body: answer, name: userName, createdBy: userId ,profileImage:profileImage});
    setIsOpen(!isOpen);
  };

  const handleFullPost = () => {
    setDisplayedAnswers(displayedAnswers + 2); 
  };

  return (
    <div className='center-container'>
      <div className="card w-75 text-center mb-1">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
          {profileImage && (
            <img
              src={`data:image/png;base64,${profileImage}`}
              alt="Profile"
              style={{ width: '70px', height: '70px', borderRadius: '50%', marginBottom: '10px' }}
            />
          )}
          <h3 className='font-weight-bold text-uppercase'>{name}</h3>
        </div>
        <div className="card-header font-weight-bold">{title}</div>
        <div className="card-body">
          <h5 className="card-title">{body}</h5>
          <h3 className='font-weight-bold text-uppercase'>Answers</h3>
          {answers.slice(0, displayedAnswers).map((answer, index) => (
            <span key={index}>
              <AnswerWidget name={answer.name} body={answer.body} createdAt={new Date(answer.createdAt)} profileImage={answer.profileImage}/>
            </span>
          ))}
          {answers.length > displayedAnswers && (
            <button onClick={handleFullPost} className="btn btn-link mb-1">
              Show more answers..
            </button>
          )}
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
            )}
          </div>
        </div>
        <div>{tags.map((tag, index) => <a key={index} href="#" className="badge badge-secondary m-1">{tag}</a>)}</div>
        <div className="card-footer text-muted">{createdAt.toLocaleString()}</div>
      </div>
    </div>
  );
}

export default FeedPost;

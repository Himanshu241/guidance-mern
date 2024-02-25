import React, { useEffect, useState } from 'react';
import FeedPost from './feedPost';
import axios from 'axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useNavigate } from 'react-router-dom';
import AddQuestion from './addquestion';

// Helper function to simulate a delay for the loading effect
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const Feeds = () => {
  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [newQuestionFlag, setNewQuestionFlag] = useState(false);
  const [newAnswerFlag, setNewAnswerFlag] = useState(false);
  const [showShimmer, setShowShimmer] = useState(true); 
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  const search = async () => {
    try {
      const response = await axios.get(`http://localhost:3001/${searchTerm}/search/`, {
        headers: {
          'Authorization': token
        }
      });
      setSearchResults(response.data);
      setQuestions(searchResults);
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  const myQuestionsPage = () => {
    navigate('/myQuestions');
  };

  useEffect(() => {
    const getQuestions = async () => {
      try {
        // Simulate a delay for the loading effect (you can adjust the delay time)
        await delay(1500);

        const response = await fetch('http://localhost:3001/getQuestions/', {
          headers: {
            'Authorization': token
          }
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setQuestions(data);
        setShowShimmer(false); // Turn off the shimmer effect
      } catch (error) {
        console.error('Error fetching items:', error);
      }
    };

    getQuestions();
  }, [newQuestionFlag, newAnswerFlag]);

  const handleNewQuestionAdded = () => {
    setNewQuestionFlag((prevFlag) => !prevFlag);
  };

  const handleNewAnswerAdded = () => {
    setNewAnswerFlag((prevState) => !prevState);
  };
  const [showOverlay, setShowOverlay] = useState(false);
  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <>
      <div className='center-search-container'>
        <div className="container-1">
          <div className="search-container">
            <input
              className="input"
              type="text"
              placeholder="Search a question"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); search(); }}
            />
            <svg viewBox="0 0 24 24" className="search__icon">
              <g>
                <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z">
                </path>
              </g>
            </svg>
          </div>
        </div>
      </div>
      <button type='button' className='adjust fixed-button-2 btn btn-primary' onClick={myQuestionsPage}>My Questions</button>

      {showShimmer ? (
        <div class="loader inline-element mb-3">
  <div class="cube">
    <div class="side front"></div>
    <div class="side back"></div>
    <div class="side top"></div>
    <div class="side bottom"></div>
    <div class="side left"></div>
    <div class="side right"></div>
  </div>
</div>
        
      ) : (
        // Render the actual content once the shimmer effect is turned off
        <div>
          {searchResults.length !== 0 ? searchResults.map(question => {
            return (
              <FeedPost
                key={question._id}  
                questionId={question._id}
                name={question.name}
                title={question.title}
                body={question.body}
                tags={question.tags}
                createdAt={new Date(question.createdAt)}
                profileImage={question.profileImage}
                answers={question.answers}
                showLogo={question.isMentor}
                handleNewAnswerAdded={handleNewAnswerAdded}
              />
            );
          })
            : questions.map(question => {
              return (
                <FeedPost
                  key={question._id}
                  questionId={question._id}
                  name={question.name}
                  title={question.title}
                  body={question.body}
                  tags={question.tags}
                  createdAt={new Date(question.createdAt)}
                  profileImage={question.profileImage}
                  answers={question.answers}
                  showLogo={question.isMentor}
                  handleNewAnswerAdded={handleNewAnswerAdded}
                />
              );
            })}
        </div>
      )}

      <button type='button' className='adjust fixed-button btn btn-primary' onClick={toggleOverlay}>ADD A QUESTION</button>

      {showOverlay && (
        <div className="overlay">
          <div className="overlay-content">
            <AddQuestion handleNewQuestionAdded={handleNewQuestionAdded} />
            <button type='button' className='close btn btn-danger' onClick={toggleOverlay}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

export default Feeds;

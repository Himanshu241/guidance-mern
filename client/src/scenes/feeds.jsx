import React, { useState, useEffect } from 'react';
import FeedPost from './feedPost';
const Feeds = () => {

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(()=>{
    const getQuestions=async()=>{
      try {
        const response = await fetch('http://localhost:3001/getQuestions/');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data)
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching items:', error);
        setError('Error fetching items. Please try again later.');
      } finally {
        setLoading(false);
      }
    }
    getQuestions();
  },[])
 return(
  <div>{questions.map(question=>{return <FeedPost key={question._id} 
    title={question.title} 
    body={question.body}
    tags={question.tags}
    createdAt={question.createdAt}
    answers={question.answers}/>})}</div>
  );
};

export default Feeds;

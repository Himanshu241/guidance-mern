import React, { useEffect, useState } from 'react';
import FeedPost from './feedPost';
import axios from 'axios';
import { useSelector } from 'react-redux/es/hooks/useSelector';
const Feeds = () => {

  const [questions, setQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const token = useSelector((state)=>state.auth.token);

  const search = async () => {
    try {
      console.log(searchTerm)
      const response = await axios.get(`http://localhost:3001/${searchTerm}/search/`,{
        headers:{
          'Authorization':token
        }
      } );
      setSearchResults(response.data);
      setQuestions(searchResults);
      console.log(questions)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };
  const getQuestions=async()=>{
    try {
      const response = await fetch('http://localhost:3001/getQuestions/',{
        headers:{
          'Authorization': token
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
     
      setQuestions(data);
    } catch (error) {
      console.error('Error fetching items:', error);

    } 
  }
  useEffect(()=>{
    getQuestions();
  },[questions])
 return(
  <>
   {/* Question Search Box */}
   <div className='center-search-container'>
   
       
       <input
         type="text"
         className='search-input'
         placeholder="Search a question"
         value={searchTerm}
         onChange={(e) => {setSearchTerm(e.target.value); search();}}
       />
       
     
   </div>

  <div>{searchTerm.length !==0 ?searchResults.map(question=>{return <FeedPost key={question._id} 
    questionId={question._id}
    name = {question.name}
    title={question.title} 
    body={question.body}
    tags={question.tags}
    createdAt={new Date(question.createdAt)}
    answers={question.answers}/>})
    : questions.map(question=>{return <FeedPost key={question._id} 
      questionId={question._id}
      name = {question.name}
      title={question.title} 
      body={question.body}
      tags={question.tags}
      createdAt={new Date(question.createdAt)}
      answers={question.answers}/>})}</div>
    </>
  );
};

export default Feeds;

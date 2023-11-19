import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
import {  useSelector } from 'react-redux/es/hooks/useSelector';
import FeedPost from '../widgets/feedPost';
import Navbar from '../widgets/navbar';
const MyQuestions= () =>{
    const name = useSelector((state)=>state.auth.user.name);
    const [myQuestions, setMyQuestions] = useState([]);
    const token = useSelector((state)=>state.auth.token)
    useEffect(()=>{
        const showMyQuestions = async()=>{
            try {
              const response = await axios.get(`http://localhost:3001/questions/${name}`,{
                headers:{
                  'Authorization':token
                }
              });
              setMyQuestions(response.data);
              console.log(myQuestions)
            } catch (error) {
              console.log(error);
            }
          };
          showMyQuestions();
    
    },[])
    
  return (
    <>
      <Navbar/>
      <div className='myQuestions-container'>
        {myQuestions.map(question=>{return <FeedPost key={question._id} 
        questionId={question._id}
        name = {question.name}
        title={question.title} 
        body={question.body}
        tags={question.tags}
        createdAt={new Date(question.createdAt)}
        answers={question.answers}/>})
}
</div>

</>
  )}; 

export default MyQuestions
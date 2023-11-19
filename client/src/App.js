import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import SignupForm from './scenes/signUpPage.jsx';
import Intro from './scenes/intro.jsx'
import SigninForm from './scenes/signInPage.jsx';
import './App.css'
import Home from './scenes/home.jsx';
import MyQuestions from './scenes/myquestions.jsx';
import Registration from './scenes/registration.jsx';
import Profile from './scenes/profile.jsx';
import { useSelector } from 'react-redux/es/hooks/useSelector.js';

function App() {
  const isAuth = Boolean(useSelector((state)=> state.auth.token));

  return (
    <>
    <div className='app' >
      <BrowserRouter>
        
        <Routes>
        <Route path="/home" element={isAuth ? <Home/> : <Intro/>}></Route>
            <Route path="/" element={<Intro/>}></Route>
            <Route path="/signUp" element={<SignupForm/>}></Route>
            <Route path="/signIn" element={<SigninForm/>}></Route>
            <Route path='/myQuestions' element={<MyQuestions/>}></Route>
            <Route path='/registrationPage' element={<Registration/>}></Route>
            <Route path='/profilePage' element={<Profile/>}></Route>
        </Routes>
       
      </BrowserRouter> 
     
    </div>
    </> 
  );
}

export default App;

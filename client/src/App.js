import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import SignupForm from './scenes/signUpPage.jsx';
import Intro from './scenes/intro.jsx'
import SigninForm from './scenes/signInPage.jsx';
import './App.css'
import Home from './scenes/home.jsx';
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
        </Routes>
       
      </BrowserRouter> 
     
    </div>
    </> 
  );
}

export default App;

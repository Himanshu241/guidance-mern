import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import SignupForm from './scenes/signUpPage.jsx';
import Intro from './scenes/intro.jsx'
import SignInForm from './scenes/signInPage.jsx';
import Home from './scenes/home.jsx';
import './App.css'
function App() {
  return (
    <div className='app' >
      <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<Intro/>}></Route>
            <Route path="/signUp" element={<SignupForm/>}></Route>
            <Route path="/signIn" element={<SignInForm/>}></Route>
            <Route path="/home" element={<Home/>}></Route>
        </Routes>
       
      </BrowserRouter>
    </div>
  );
}

export default App;

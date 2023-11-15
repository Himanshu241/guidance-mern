import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import SignupForm from './scenes/signUpPage.jsx';
import Intro from './scenes/intro.jsx'
import SigninForm from './scenes/signInPage.jsx';
import './App.css'
import Foot from './scenes/Foot.jsx';
import Home from './scenes/home.jsx';
function App() {
  return (
    <>
    <div className='app' >
      <BrowserRouter>
        
        <Routes>
        <Route path="/home" element={<Home/>}></Route>
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

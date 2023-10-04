import {BrowserRouter, Navigate, Routes, Route} from 'react-router-dom';
import SignupForm from './scenes/loginPage.jsx';
import Intro from './scenes/intro.jsx'
import './App.css'
function App() {
  return (
    <div className='app' >
      <BrowserRouter>
        
        <Routes>
            <Route path="/" element={<Intro/>}></Route>
            <Route path="/signUp" element={<SignupForm/>}></Route>
        </Routes>
       
      </BrowserRouter> 
    </div>
  );
}

export default App;

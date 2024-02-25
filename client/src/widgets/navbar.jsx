import React from 'react'
import { useNavigate } from 'react-router-dom';
import { setLogout } from '../state';
import { useSelector } from 'react-redux';

const Navbar = () =>{

    


    const navigate = useNavigate();

    const home=(e)=>{
        e.preventDefault();
        navigate('/home');
    }
    const registrationPortal=(e)=>{
        e.preventDefault();
        navigate('/registrationPage');
    }
    const profilePage=(e)=>{
        e.preventDefault();
        navigate('/profilePage');
    }
    const mentorPage=(e)=>{
        e.preventDefault();
        navigate('/mentorPage');
    }
    const logout=()=>{
        setLogout();
        navigate('/');
        console.log('*****************logged out**********************');
    };

   return(
        <>
        <div className="navbar">
            <ul>
                <li>
                    <i class="fa-solid fa-house"></i><a href="" onClick={home}> HOME</a>
                </li>
                <li>
                   <i class="fa-solid fa-user"></i> <a href="" onClick={profilePage}> PROFILE </a>
                </li>
                <li>
                <i class="fa-brands fa-glide-g"></i> <a href="" onClick={registrationPortal}>MENTOR REGISTRATION</a>
                </li>
            
                <button type="button" onClick={mentorPage} >SEARCH A MENTOR</button>
                <li style={{ position: 'absolute', right: 30 }}>
                <button type="button" onClick={logout} >LOGOUT</button>

                </li>
            </ul>
           
        </div>
        <br/>
        </>
    )
}

export default Navbar
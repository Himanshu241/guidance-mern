import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
function Navbar() {
    const navigate = useNavigate();
    const refresh=()=>{
        navigate('/home');
    }
    const registrationPortal=()=>{
        navigate('/registrationPage');
    }
    const profilePage=()=>{
        navigate('/profilePage');
    }

   return(
        <>
        <div className="navbar">
            <ul>
                <li>
                    <i class="fa-solid fa-house"></i><a href="" onClick={refresh}> HOME</a>
                </li>
                <li>
                   <i class="fa-solid fa-user"></i> <a href="" onClick={profilePage}> PROFILE </a>
                </li>
                <li>
                <i class="fa-brands fa-glide-g"></i> <a href="" onClick={registrationPortal}>MENTOR REGISTRATION</a>
                </li>
            <form action="">
            
                <input type="text"
                       placeholder=" Search Guide"
                       name="search"/>
                <button type="button">SEARCH</button>
            </form>
            </ul>
           
        </div>
        <br/>
        </>
    )
}

export default Navbar
import React from 'react'
import { useState } from 'react';
function Navbar() {
    
    const refresh=()=>{
        window.location.reload();
    }
   return(
        <>
        <div className="navbar">
            <ul>
                <li>
                    <i class="fa-solid fa-house"></i><a href="#" onClick={refresh}> HOME</a>
                </li>
                <li>
                   <i class="fa-solid fa-user"></i> <a href="#"> PROFILE </a>
                </li>
                <li>
                <i class="fa-brands fa-glide-g"></i> <a href="#">MENTOR</a>
                </li>
            <form action="#">
            
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
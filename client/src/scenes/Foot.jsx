import React from 'react';
const Foot = () =>{
     return(
         <>
         <div className="footer">
         <div className="col-1">
                 <h3> LINKS</h3>
                 <a href="#">ABOUT</a>
                 <a href="#">CONTACT</a>
                 <a href="#">TERMS AND SERVICES </a>
                 <a href="#">HELP</a>
             </div>
             <div className="col-2">
                <h3>NEWSLETTER</h3>
                 <form>
                     <input type="text" placeholder="Enter your Email" style={{backgroundColor:"white"}}/>
                     <br/>
                     <br/>
                      <button type="button">SUBSCRIBE NOW</button>   
                </form>
            </div>
             <div className="col-3">
                 <h3>CONTACT</h3>
                 <p>123,xyz ROAD <br/>SHIMLA ,HIMACHAL PRADESH</p>
             </div>
         </div>
         </>
  )
}
export default Foot;
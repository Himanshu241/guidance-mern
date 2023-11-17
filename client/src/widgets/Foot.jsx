function foot() {
    return (
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
                        <input type="email" placeholder="Enter your Email" style={{ backgroundColor: "white" }} required />
                        <br />
                        <br />
                        <button type="button">SUBSCRIBE NOW</button>
                    </form>
                </div>
                <div className="col-3">
                    <h3>CONTACT</h3>
                    <p>123,xyz ROAD <br />SHIMLA ,HIMACHAL PRADESH</p>
                    <div className="social-icon">
                    <i class="fa-brands fa-facebook"/>
                    <i class="fa-brands fa-x-twitter"/>
                    <i class="fa-brands fa-instagram"/>
                    <i class="fa-brands fa-linkedin"/>
                    <i class="fa-brands fa-youtube"/>
                    </div>               
                </div>
            </div>
        </>
    );
}
export default foot;
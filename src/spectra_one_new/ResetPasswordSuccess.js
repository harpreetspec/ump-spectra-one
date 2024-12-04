import React from "react";
import help from "../assets/images/help.svg";
import fb from "../assets/images/icon-fb.svg";
import insta from "../assets/images/icon-insta.svg";
import li from "../assets/images/icon-li.svg";
import twit from "../assets/images/icon-twit.svg";
import error from "../assets/images/error-cross.svg"
import chatcircle from "../assets/images/ChatCircle.svg"
import checksucess from "../assets/images/check-sucess.svg";
import checkwrong from "../assets/images/check-wrong.svg";
import { useNavigate } from "react-router-dom";


export default function ResetPasswordSuccess() {
    const navigate = useNavigate();

   function handleLoginBtnClick(){
    navigate("../")
    }

    function handleChatBox() {
        const chatBox = document.querySelector(".help-box")
      chatBox.classList.toggle("d-none");
    }
    const homeButton = () => {
      navigate("/");
  }




return(
    <section class="spectra-form">
    <header class="container">
      <div class="d-flex justify-content-between align-items-center">
        <a href=""  onClick={homeButton}  class="link-unstyled">
          <h2 class="text-uppercase">spectra</h2>
        </a>
      </div>
    </header>
    <div class="container">
      <div class="row spectra-row justify-content-center">
        <div class="col-lg-6 col-md-10 col-12">
          <div class="login-wrapper">
            <div class="heading mb-3 text-center">
              <div class="sub-heading">Reset Your Password</div>
              <p class="caption">We will get back to your account</p>
            </div>
            <div class="form-box px-4">
              <div class="form-box-content-wrapper">
                {/* <!-- Reset Password Success Box  --> */}
                <div class="instructions-box">
                  <div class="instruction-img">
                    <img src={checksucess} alt="" />
                  </div>
                  <div class="form-instruction my-4 p-0">
                    You have successfully reset your password. Please proceed
                    with the login.
                  </div>
                </div>
                <button
                  id="loginBtn"
                  type="submit"
                  class="spectra-btn mb-2 mt-4"
                  onClick={handleLoginBtnClick}
                >
                  Proceed to Login
                </button>
              </div>
            </div>
            <div class="copyright">
              Copyright<span style={{margin: "0 3px"}}>&#169;</span>2023. All
              Rights Reserved <br />
              <span style={{display: 'inline-block', marginTop:'10px'}}
                >spectra.co</span
              >
              <div class="icons">
                <a href="https://www.facebook.com/OnSpectra" target="_blank"
                  ><img src={fb} alt="fb"
                /></a>
                <a
                  href="https://www.instagram.com/on.spectra/"
                  target="_blank"
                  ><img src={insta} alt="insta"
                /></a>
                <a
                  href="https://www.linkedin.com/company/onspectra/mycompany/"
                  target="_blank"
                  ><img src={li} alt="li"
                /></a>
                <a href="https://twitter.com/OnSpectra" target="_blank"
                  ><img src={twit} alt="twit"
                /></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="help-box-wrapper">
      <div class="help-box d-none">
        <h3>Welcome to My Spectra! 👋</h3>
        <p>How can we help?</p>
        <button type="button">Chat with a Human</button>
        <button type="button">Contact Sales</button>
        <button type="button">FAQs</button>
      </div>
      <button id="chat-btn" class="" onClick={handleChatBox}>
        <img src={chatcircle} alt="" />
      </button>
    </div>
  </section>
)

}


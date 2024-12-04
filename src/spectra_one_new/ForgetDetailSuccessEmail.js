import React, { useState, useEffect } from 'react';
import "../assets/css/style.css"
import fb from "../assets/images/icon-fb.svg";
import insta from "../assets/images/icon-insta.svg";
import li from "../assets/images/icon-li.svg";
import twit from "../assets/images/icon-twit.svg";
import checksucess from "../assets/images/check-sucess.svg";
import chatcircle from "../assets/images/ChatCircle.svg"
import { useNavigate } from "react-router-dom";

export default function ForgetDetailsSuccessEmail() {
  const navigate = useNavigate();

    const handleChatBox = () =>{
        const chatBox = document.querySelector(".help-box");
        chatBox.classList.toggle("d-none");
    }

    const homeButton = () => {
      navigate("/");
  }

  function ProceedToLogin(params) {
    navigate("/");
  }

    return(
        <>
        <section class="spectra-form">
      <header class="container">
        <div class="d-flex justify-content-between align-items-center">
          <a href="" onClick={homeButton} class="link-unstyled">
            <h2 class="text-uppercase">spectra</h2>
          </a>
        </div>
      </header>
      <div class="container">
        <div class="row spectra-row justify-content-center">
          <div class="col-lg-6 col-md-10 col-12">
            <div class="login-wrapper">
              <div class="heading mb-3 text-center">
                <div class="sub-heading">Forgot Your Details?</div>
                <p class="caption">We will get back to your account</p>
              </div>
              <div class="form-box">
                <div class="form-box-content-wrapper">
                  <div class="instructions-box">
                    <div class="instruction-img">
                      <img src={checksucess} alt="" />
                    </div>
                    <div class="form-instruction mt-3 mb-3">
                    We have shared your login details on your registered email id and Registered Mobile Number.
                      {/* Email sent to you registered ID. <br />
                      Please check your email. */}
                    </div>
                  </div>
                  <button
                    id="loginBtn"
                    type="submit"
                    class="spectra-btn mb-2"
                    // onlick="handleLoginBtnClick(event)"
                    onClick={ProceedToLogin}
                  >
                  
                    Proceed to Login
                  </button>
                  <div class="resend mt-4 text-end">
                    {/* <a href="" class="text-white">Resend email</a> */}
                  </div>
                </div>
              </div>
              <div class="copyright">
                Copyright<span style={{margin: "0 3px"}}>&#169;</span>2023. All
                Rights Reserved <br />
                <span style={{ display: 'inline-block', marginTop: "10px" }}
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
          {/* <img src={chatcircle} alt="" /> */}
        </button>
      </div>
    </section>

        </>
    )

}
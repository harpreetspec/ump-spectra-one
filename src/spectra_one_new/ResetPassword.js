import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css"
import fb from "../assets/images/icon-fb.svg";
import insta from "../assets/images/icon-insta.svg";
import li from "../assets/images/icon-li.svg";
import twit from "../assets/images/icon-twit.svg";
import error from "../assets/images/error-cross.svg"
import chatcircle from "../assets/images/ChatCircle.svg"
import eyeClose from "../assets/images/eye-close.svg"
import eyeOpen from "../assets/images/eye-open.svg"






export default function ResetPassword() {

    const [currinputPassword, setCurrInputPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [correctPassword, setCorrectPassword] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [newPasswordeye, setNewPasswordeye] = useState(false);
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
    const navigate = useNavigate();

    function validateCurrPassword(e) {
        console.log("Valid");
        setCurrInputPassword(e.target.value)
        const currInputPassword2 = (e.target.value)
        const password = document.getElementById("password");
        const passwordError = document.getElementById("passwordError");
    
        if (currInputPassword2 == "") {
          passwordError.classList.remove("d-none");
          password.classList.add("error");
        } else {
          passwordError.classList.add("d-none");
          password.classList.remove("error");
        }
      }


      function passwordInstruction() {
        const instructionDiv = document.getElementById('password-instructions');
        instructionDiv.classList.remove('d-none');
    
        const password = document.getElementById("password");
        const passwordError = document.getElementById("passwordError");
    
        if (currinputPassword == "") {
            passwordError.classList.remove("d-none");
            password.classList.add("error");
          } else {
            passwordError.classList.add("d-none");
            password.classList.remove("error");
          }
      }


      function noInstruction() {
        const instructionDiv = document.getElementById('password-instructions');
        instructionDiv.classList.add('d-none');
      }


      function validateNewPassword() {
        var myInput = document.getElementById("newPassword");
        var both = document.getElementById("both");
        var number = document.getElementById("number");
        var length = document.getElementById("length");
        var progress = document.getElementById("progress-bar");
        let caseChecking = false;
        let numberChecking = false;
        let charChecking = false;
        // Validate lowercase letters
        var lowerCaseLetters = /[a-z]/g;
        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        // Validate both
        if (
          myInput.value.match(upperCaseLetters) &&
          myInput.value.match(lowerCaseLetters)
        ) {
          both.classList.remove("invalid");
          both.classList.add("valid");
          caseChecking = true;
          progress.style.width = "40%";
          progress.style.backgroundColor = "#F36F69";
          document.getElementById("progress-value").innerHTML = "40%";
          document.getElementById("strength").innerHTML = "Strength : Weak";
        } else {
          caseChecking = false;
          both.classList.remove("valid");
          both.classList.add("invalid");
        }
      
        // Validate numbers
        var numbers = /[0-9]/g;
        if (myInput.value.match(numbers)) {
          number.classList.remove("invalid");
          number.classList.add("valid");
          numberChecking = true;
          progress.style.width = "30%";
          progress.style.backgroundColor = "#F36F69";
          document.getElementById("progress-value").innerHTML = "30%";
          document.getElementById("strength").innerHTML = "Strength : Weak";
        } else {
          numberChecking = false;
          number.classList.remove("valid");
          number.classList.add("invalid");
        }
      
        // Validate length
        if (myInput.value.length >= 8) {
          length.classList.remove("invalid");
          length.classList.add("valid");
          charChecking = true;
          progress.style.width = "30%";
          progress.style.backgroundColor = "#F36F69";
          document.getElementById("progress-value").innerHTML = "30%";
          document.getElementById("strength").innerHTML = "Strength : Weak";
        } else {
          charChecking = false;
          length.classList.remove("valid");
          length.classList.add("invalid");
        }
      
        if (caseChecking && numberChecking) {
          progress.style.width = "70%";
          progress.style.backgroundColor = "#47A8C5";
          document.getElementById("progress-value").innerHTML = "70%";
          document.getElementById("strength").innerHTML = "Strength : Medium";
        }
      
        if (caseChecking && charChecking) {
          progress.style.width = "70%";
          progress.style.backgroundColor = "#47A8C5";
          document.getElementById("progress-value").innerHTML = "70%";
          document.getElementById("strength").innerHTML = "Strength : Medium";
        }
      
        if (numberChecking && charChecking) {
          progress.style.width = "70%";
          progress.style.backgroundColor = "#47A8C5";
          document.getElementById("progress-value").innerHTML = "70%";
          document.getElementById("strength").innerHTML = "Strength : Medium";
        }
      
        if (caseChecking && charChecking && numberChecking) {
          progress.style.width = "100%";
          progress.style.backgroundColor = "#47A8C5";
          document.getElementById("progress-value").innerHTML = "100%";
          document.getElementById("strength").innerHTML = "Strength : Strong";
        }
      
        if (
          caseChecking == false &&
          numberChecking == false &&
          charChecking == false
        ) {
          progress.style.width = "0%";
          document.getElementById("progress-value").innerHTML = "0%";
          document.getElementById("strength").innerHTML = "Strength : Weak";
        }
      }

      function confirmingPassword(e){
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        const confirmPassword2 = (e.target.value)
        setConfirmPassword(e.target.value)
        // console.log("newPassword",confirmPassword2);
    
          if (newPassword == confirmPassword2) {
            confirmPasswordError.classList.add("d-none");
    
              setCorrectPassword(true)
          } else {
              confirmPasswordError.classList.remove("d-none");
              setCorrectPassword(false)
          }
      }




    const handleChatBox = () =>{
        const chatBox = document.querySelector(".help-box");
        chatBox.classList.toggle("d-none");
    }


    function handleResetClick(e) {
        e.preventDefault();
        navigate("/reset-password-success");
    }
    
    const togglePasswordView = () => {
        setPasswordVisible(!passwordVisible);
      };

      const toggleNewPasswordView = () => {
        setNewPasswordeye(!newPasswordeye);
      };

      const toggleConfirmPasswordView = () => {
        setConfirmPasswordEye(!confirmPasswordEye);
      };

      const homeButton = () => {
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
                <div class="sub-heading">Reset Your Password</div>
                <p class="caption">We will get back to your account</p>
              </div>
              <div class="form-box px-0">
                {/* <!-- Reset Password Box  --> */}
                <div class="form-box-content-wrapper pt-0 pb-3">
                  <div class="tab-content" id="myTabContent">
                    <form action="" class="tab-form">
                      <div class="input-box form-floating password-input">
                        <img
                          src={passwordVisible ? eyeOpen: eyeClose}
                          alt=""
                          class="password-view-toggle"
                          onClick={togglePasswordView}
                         
                        />
                        <input
                          name="password"
                          id="password"
                          type={passwordVisible ? 'text' : 'password'}
                          placeholder="Current Password"
                          class="mt-2 form-control"
                        //   oninput="validateCurrPassword()"
                          maxlength="15"
                          autofocus
                          onChange={validateCurrPassword}
                          
                        />
                        <label for="password">Current Password</label>
                        <span id="passwordError" class="error d-none"
                          >Invalid Password. Try again</span
                        >
                      </div>

                      <div class="input-box form-floating password-input">
                        <img
                          src={newPasswordeye ? eyeOpen: eyeClose}
                          alt=""
                          class="password-view-toggle"
                          onClick={toggleNewPasswordView}
                        />
                        <input
                          name="password"
                          id="newPassword"
                          type={newPasswordeye ? 'text' : 'password'}
                          placeholder="New Password"
                          class="mt-2 form-control"
                          onFocus={passwordInstruction}
                          onBlur={noInstruction}
                          onKeyUp={validateNewPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          maxlength="15"
                        />
                        <label for="newPassword">New Password</label>
                         {/* <span id="newPasswordError" class="error d-none"
                          >Weak Password</span
                        >  */}
                      </div>
                      <div
                        class="d-flex justify-content-between mt-4 d-none password-instructions"
                        id="password-instructions"
                      >
                        <div>
                          <li
                            id="length"
                            class="validation-instructions invalid pb-2"
                          >
                            8 or more characters
                          </li>
                          <li
                            id="both"
                            class="validation-instructions invalid pb-2"
                          >
                            Upper and lowercase letters
                          </li>
                          <li
                            id="number"
                            class="validation-instructions invalid"
                          >
                            At least one number
                          </li>
                        </div>
                        <div class="progress-side">
                          <div class="progress">
                            <div
                              class="progress-bar"
                              id="progress-bar"
                              style={{width: "0%"}}
                              role="progressbar"
                              aria-label="Basic example"
                              aria-valuenow="30"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                          <div
                            class="d-flex flex-row justify-content-between progress-text pt-2"
                          >
                            <div id="strength">Strength : Weak</div>
                            <div id="progress-value">0%</div>
                          </div>
                        </div>
                      </div>

                      <div class="input-box form-floating password-input">
                        <img
                          src= {confirmPasswordEye ? eyeOpen: eyeClose}
                          alt=""
                          class="password-view-toggle"
                          onClick={toggleConfirmPasswordView}
                        />
                        <input
                          name="password"
                          id="confirmPassword"
                          type={confirmPasswordEye ? 'text' : 'password'}
                          placeholder="Confirm Password"
                          class="mt-2 form-control"
                          onChange={confirmingPassword}
                          maxlength="15"
                        />
                        <label for="">Confirm Password</label>
                        <span id="confirmPasswordError" class="error d-none"
                          >Password does not match. Try again</span
                        >
                      </div>

                      <button
                        id="resetBtn"
                        type="submit"
                        class="spectra-btn mb-1 mt-4"
                        onClick={handleResetClick}
                        disabled = {!currinputPassword || !correctPassword || !newPassword}
                      >
                        Reset
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div class="copyright">
                Copyright<span style={{ margin: "0 3px" }}>&#169;</span>2023. All
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
          <img src={chatcircle} alt="" />
        </button>
      </div>
    </section>       
        </>
    )
}
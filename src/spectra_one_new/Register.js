import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import "../assets/css/style.css"
import fb from "../assets/images/icon-fb.svg";
import insta from "../assets/images/icon-insta.svg";
import li from "../assets/images/icon-li.svg";
import twit from "../assets/images/icon-twit.svg";
import error from "../assets/images/error-cross.svg"
import chatcircle from "../assets/images/ChatCircle.svg"
import eyeClose from "../assets/images/eye-close.svg"
import eyeOpen from "../assets/images/eye-open.svg"
import eyeopendark from "../assets/images/eye-open-dark.svg";
import eyeclosedark from "../assets/images/eye-close-dark.svg";






export default function Register() {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const key = searchParams.get("key");
  const [username, setUsername] = useState();
  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [flagCheck, setflagCheck] = useState(false);
  const [userConfirmPassword, setUserConfirmPassword] = useState()
  const [confirmCheck, setConformCheck] = useState(false)
  const [currinputPassword, setCurrInputPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [correctPassword, setCorrectPassword] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordeye, setNewPasswordeye] = useState(false);
  const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
  const [passwordVisibility, setPasswordVisibility] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false
  });
  const navigate = useNavigate();

  


  useEffect(() => {
    const fetchRegistration = async () => {
    
      try {
        const apiUrl = process.env.REACT_APP_API_URL + '/getDecodecanid';

        const requestData = {
          encP : key
      }

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('result',result.data)
        setUsername(result.data)
       
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchRegistration();
  }, [key]);













  const togglePasswordVisibility = (fieldName) => {
    setPasswordVisibility((prevState) => ({
      ...prevState,
      [fieldName]: !prevState[fieldName]
    }));
  };

  const handleValiDateNewPassword = (event) => {

    const newPassword = event.target.value;
    setPassword(newPassword);

    const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@._])[a-zA-Z\d@._]{8,15}$/;
    // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@._])[A-Za-z\d@._]{8,15}$/;
    //         setValidPassword(regex.test(newPassword) && newPassword.length >= 8 && newPassword.length <= 15);

    setValidPassword(regex.test(newPassword) && !/\s/.test(newPassword));
    // setMyPassCheck(oldPassword !== newPassword)
    setflagCheck(true)
  };
  const handleKeyPress = (event) => {
    const { key } = event;
    if (key === ' ' || (/[^\w.@]/.test(key) && !/@|\.|_/.test(key))) {
      event.preventDefault();
    }
  }

  const handleConfirmPasswordFun = (event) => {

    setUserConfirmPassword(event.target.value)
    setConformCheck(true)
  }



  const UserChange = (e) => {
    
    setUsername(e.target.value)
  }

  


 

 
    const handleRegisterClick = async () => {
    
      try {
        const apiUrl = process.env.REACT_APP_API_URL + '/insertNewUserFromBw';

        const requestData = {
          service_id : username,
          password : userConfirmPassword
      }

        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestData),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const result = await response.json();
        console.log('result',result)
        if (result.meta.code == 200){
          navigate('/')
        }

       
      
       
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

   


  const homeButton = () => {
    navigate("/");
  }



  return (
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
                  <div class="sub-heading">Create Password</div>
                  <p class="caption">We will get back to your account</p>
                </div>
                <div class="form-box px-0">
                  {/* <!-- Create Password Box  --> */}
                  <div class="form-box-content-wrapper pt-0 pb-3">
                    <div class="tab-content" id="myTabContent">
                      <form action="" class="tab-form">


                        <div class="input-box form-floating password-input">

                          <input
                            name="username"
                            id="username"
                            type='username'
                            placeholder="Current Password"
                            class="mt-2 form-control"

                            autofocus
                            value={username}
                            onChange={UserChange}

                          />
                          <label for="password">Username</label>

                        </div>



                        {/*Validation Bar */}

                        <div
                          class="d-flex justify-content-between mt-4  password-instructions-profile-register"
                          id="password-instructions-profile-register"
                        >
                          <div>
                            <li id="length" className={`validation-instructions ${password.length >= 8 && password.length <= 15 ? 'valid' : 'invalid'} pb-2`}>
                              Minimum 8 characters & Maximum 15 characters
                            </li>
                            <li id="both" className={`validation-instructions ${/[A-Z]/.test(password) ? 'valid' : 'invalid'} pb-2`}>
                              Atleast one upper and one lowercase letters
                            </li>
                            <li id="number" className={`validation-instructions ${/\d/.test(password) ? 'valid' : 'invalid'} pb-2`}>
                              Atleast one number
                            </li>
                            <li id="special" className={`validation-instructions ${/[@._]/.test(password) ? 'valid' : 'invalid'}`}>
                              Only @ . or _  special characters are allowed
                            </li>
                          </div>

                        </div>
                        <br></br>
                        {/* end */}

                        <div class=" form-floating profile-password-input mb-5 my-2 pwd-container input-box form-floating password-input">
                          <img
                            src={passwordVisibility.newPassword ? eyeOpen : eyeClose}
                            alt=""
                            class="password-view-toggle"
                            onClick={() => togglePasswordVisibility('newPassword')}
                          />
                          <input
                            name="password"
                            id="newPassword"
                            type={passwordVisibility.newPassword ? 'text' : 'password'}
                            placeholder="Enter New Password"
                            // onKeyUp={validateNewPassword}

                            // onKeyDown={disableForbiddenKeys}
                            // onFocus={passwordInstruction}
                            // onBlur={noInstruction}
                            onKeyUp={handleValiDateNewPassword}
                            onKeyDown={handleKeyPress}
                            className="form-control"
                            maxLength="15"

                          />
                          <label className="newPassword" for="pincode newPassword">New Password</label>
                          {/* <div id="passwordError" class="error d-none">Invalid password. Please follow the password instructions below.</div> */}

                        </div>


                        <div class=" form-floating profile-password-input mb-5 my-2 password-input">
                          <img
                            src={passwordVisibility.confirmPassword ? eyeOpen : eyeClose}
                            alt=""
                            class="password-view-toggle"
                            onClick={() => togglePasswordVisibility('confirmPassword')}
                          />
                          <input
                            name="password"
                            id="confirmPassword"
                            type={passwordVisibility.confirmPassword ? 'text' : 'password'}
                            placeholder="Confirm Password"
                            class="mt-2 form-control"
                            // onChange={confirmingPassword}
                            maxlength="15"
                            // onKeyDown={disableForbiddenKeys}
                            onKeyUp={handleConfirmPasswordFun}
                          />
                          <label className="" htmlFor="pincode">Confirm Password</label>
                          {password != userConfirmPassword && confirmCheck && <span class="error"
                          >Confirm password does not match with new password</span
                          >}
                        </div>














                        <button
                          id="resetBtn"
                          type="button"
                          class="spectra-btn mb-1 mt-4"
                          onClick={handleRegisterClick}
                          disabled={!userConfirmPassword }
                        >
                          Register
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
                <div class="copyright">
                  Copyright<span style={{ margin: "0 3px" }}>&#169;</span>{new Date().getFullYear()}. All
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
        {/* <div class="help-box-wrapper">
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
      </div> */}
      </section>
    </>
  )
}
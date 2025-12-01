import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import "../assets/css/style.css"
import help from "../assets/images/help.svg";
import fb from "../assets/images/icon-fb.svg";
import insta from "../assets/images/icon-insta.svg";
import li from "../assets/images/icon-li.svg";
import twit from "../assets/images/icon-twit.svg";
import error from "../assets/images/error-cross.svg"
import chatcircle from "../assets/images/ChatCircle.svg"
import {
    getUserAvailiblity,
    forgetPasswordServiceID
} from "../function";

async function sendOtp(credentials) {
    return fetch(process.env.REACT_APP_API_URL + '/sendOtp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function ForgotDetails() {
    const navigate = useNavigate();
    const [getServideId, setServideId] = useState();
    const [getServideId2, setServideId2] = useState();
    const [pattern, setpattern] = useState();
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [mobileNum, setMobileNum] = useState();

    const handleSendEmailbtn = async (e) => {
        // e.preventDefault();
        // console.log('you clicked send email')    
        try {
            e.preventDefault();
            // console.log('you clicked send email');
            const userAvailiblityResponse = await getUserAvailiblity(getServideId);
            // console.log(userAvailiblityResponse); // serviceIdExistence
            if (userAvailiblityResponse.data === true) {
                navigate("/forgetDetailSuccess");
                const forgetPasswordResponse = await forgetPasswordServiceID(getServideId);
                // console.log("forgetPasswordResponse", forgetPasswordResponse);
            } else {
                setEmailError("Please enter a valid service ID")
            }

        } catch (error) {
            console.error(error);
        }

    }
    const handleSendUsername = async (e) => {
        // e.preventDefault();
        // console.log('you clicked send email')    
        try {
            e.preventDefault();
            // console.log('you clicked send email');
            const userAvailiblityResponse = await getUserAvailiblity(getServideId2);
            // console.log(userAvailiblityResponse); // serviceIdExistence
            if (userAvailiblityResponse.data === true) {
                navigate("/forgetDetailSuccess");
                const forgetPasswordResponse = await forgetPasswordServiceID(getServideId2);
                // console.log("forgetPasswordResponse", forgetPasswordResponse);
            } else {
                setUsernameError("Please enter a valid service ID")
            }

        } catch (error) {
            console.error(error);
        }

    }


    const handleEmailChange = (event) => {
        const value = event.target.value;
        setServideId(value)
        // console.log(value);
        !value && setEmailError(false)
        // alert(value)
        // email validation
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const isValid = regex.test(value);
        // setEmailError(isValid ? '' : 'Email ID does not exist. Try again');
    }

    const handleUsernameChange = (event) => {
        const value = event.target.value;
        setServideId2(value)
        // console.log(value);
        !value && setUsernameError(false)
        // alert(value)
        // email validation
        // const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // const isValid = regex.test(value);
        // setEmailError(isValid ? '' : 'Email ID does not exist. Try again');
    }

    const handleSubmitOtp = async e => {

        e.preventDefault();
        localStorage.setItem('mobileNum', mobileNum);
        const response = await sendOtp({
            "mobileNum": mobileNum,

        });
        if (response.meta.code == 200) {

            localStorage.setItem('data', response.data);

            navigate("/otpverification");
        }
        //console.log(mobileNum);
    }

    const handleChatBox = () => {
        const chatBox = document.querySelector(".help-box");
        chatBox.classList.toggle("d-none");
    }

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
                                    <div class="sub-heading">Forgot Your Details?</div>
                                    <p class="caption">We will get back to your account</p>
                                </div>
                                <div class="form-box">
                                    {/* Form-top Tab Buttons  */}
                                    <ul class="nav form-tabs row" id="myTab" role="tablist">
                                        <li class="w-50" role="presentation">
                                            <div
                                                class="tab-btn active"
                                                id="home-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#home"
                                                type="button"
                                                role="tab"
                                                aria-controls="home"
                                                aria-selected="true"
                                            >
                                                Service ID
                                            </div>
                                        </li>
                                        <li class="w-50" role="presentation">
                                            <div
                                                class="tab-btn"
                                                id="profile-tab"
                                                data-bs-toggle="tab"
                                                data-bs-target="#profile"
                                                type="button"
                                                role="tab"
                                                aria-controls="profile"
                                                aria-selected="false"
                                            >
                                                Username
                                            </div>
                                        </li>
                                    </ul>
                                    <div class="form-box-content-wrapper">
                                        <div class="tab-content" id="myTabContent">
                                            {/* Login ID Tab   */}
                                            <div
                                                class="tab-pane fade show active"
                                                id="home"
                                                role="tabpanel"
                                                aria-labelledby="home-tab"
                                                style={{ padding: "0px" }}
                                            >
                                                <form action="" class="pt-4 tab-form">
                                                    <div class="input-box form-floating">
                                                        <input
                                                            name="emailId"
                                                            id="emailId"
                                                            type="text"
                                                            placeholder="Enter Service ID"
                                                            class="form-control"
                                                            // maxlength="50"
                                                            // autofocus
                                                            value={getServideId}
                                                            // pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                                                            onChange={handleEmailChange}
                                                            onKeyDown={(e) => {
                                                                const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                                                                const isDigit = /\d/.test(e.key);
                                                                // Allow the input if the key pressed is a digit or an allowed key and the input length is less than 10, 
                                                                // or if the key pressed is the backspace key and the input length is greater than 0
                                                                if ((isDigit || allowedKeys.includes(e.key)) && (e.target.value.length < 10 || e.key === "Backspace")) {
                                                                    return true;
                                                                } else {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            oninput="validateMobileNumber(this)"
                                                            maxlength="10"
                                                            pattern="[0-9]{10}"
                                                            autofocus
                                                        />
                                                        <label for="email">Service ID</label>

                                                        {emailError && <span id="emailIdError" class="error">{emailError}</span>}
                                                        <button
                                                            id="error-cross-btn"
                                                            class="error-cross-btn d-none"
                                                        >
                                                            <img src={error} alt="" />
                                                        </button>
                                                    </div>

                                                    <button
                                                        id="sendBtn"
                                                        type="submit"
                                                        class="spectra-btn"
                                                        disabled={!getServideId}
                                                        onClick={handleSendEmailbtn}
                                                    >
                                                        Send
                                                    </button>
                                                </form>
                                            </div>

                                            {/* Mobile Tab  */}
                                            <div
                                                class="tab-pane fade"
                                                id="profile"
                                                role="tabpanel"
                                                aria-labelledby="profile-tab"
                                                style={{ padding: "0px" }}
                                            >
                                                <form action="" class="pt-4 tab-form">
                                                    <div class="input-box form-floating">
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Username"
                                                            class="mt-2 form-control"
                                                            id="mobileNo"
                                                            // onChange={e => setMobileNum(e.target.value)}
                                                            onChange={handleUsernameChange}
                                                            onKeyDown={(e) => {
                                                                const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                                                                const isDigit = /\d/.test(e.key);
                                                                // Allow the input if the key pressed is a digit or an allowed key and the input length is less than 10, 
                                                                // or if the key pressed is the backspace key and the input length is greater than 0
                                                                if ((isDigit || allowedKeys.includes(e.key)) && (e.target.value.length < 10 || e.key === "Backspace")) {
                                                                    return true;
                                                                } else {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                            oninput="validateMobileNumber(this)"
                                                            maxlength="10"
                                                            pattern="[0-9]{10}"
                                                            autofocus
                                                        />

                                                        <label for="mobileNo">Username</label>
                                                        {/* <span id="mobileError" class="error d-none">This mobile number is not registered. Try again</span> */}
                                                        {usernameError && <span id="emailIdError" class="error">{usernameError}</span>}

                                                    </div>

                                                    <button
                                                        id="sendOtpBtn"
                                                        type="submit"
                                                        class="spectra-btn"
                                                        // disabled={!mobileNum || mobileNum.length<10}
                                                        disabled={!getServideId2}
                                                        // onClick={handleSendEmailbtn}
                                                        onClick={handleSendUsername}
                                                    >
                                                        Send
                                                    </button>
                                                </form>
                                            </div>
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
                        {/* <img src={chatcircle} alt="" /> */}
                    </button>
                </div>
            </section>
        </>
    )
}
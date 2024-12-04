import React, { useState } from 'react';
import { useEffect } from 'react';
import fb from "../assets/images/icon-fb.svg";
import insta from "../assets/images/icon-insta.svg";
import li from "../assets/images/icon-li.svg";
import twit from "../assets/images/icon-twit.svg";
import error from "../assets/images/error-cross.svg"
import chatcircle from "../assets/images/ChatCircle.svg"
import checksucess from "../assets/images/check-sucess.svg";
import { useNavigate } from "react-router-dom";





async function sendOtp(credentials) {
    return fetch('https://oneml.spectra.co/sendOtp', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

export default function OtpVerification() {
    const [otp, setOtp] = useState();
    const [userotp, setUserotp] = useState();
    const [minutes, setMinutes] = useState(1);
    const [seconds, setSeconds] = useState(30);
    const [mobileNum, setMobileNum] = useState();
    const [otpCheck, setOtpCheck] = useState(false);
    const navigate = useNavigate();

    const handleChatBox = () => {
        const chatBox = document.querySelector(".help-box");
        chatBox.classList.toggle("d-none");
    }
    // get otp from localStorage
    useEffect(() => {
        let otpGenerated = localStorage.getItem('data');
        setOtp(otpGenerated);
        console.log("otp", otp);
    });

    //timer logic

    useEffect(() => {
        const interval = setInterval(() => {
          if (seconds > 0) {
            setSeconds(seconds - 1);
          }
      
          if (seconds === 0) {
            if (minutes === 0) {
              clearInterval(interval);
            } else {
              setSeconds(59);
              setMinutes(minutes - 1);
            }
          }
        }, 1000);
      
        return () => {
          clearInterval(interval);
        };
      }, [seconds]);

    //    verify otp
    const handleverifyOtp = async e => {

        e.preventDefault();


        if (otp == userotp) {
            // swal("Success", "OTP verified successfully", "success", {
            //   buttons: false,
            //   timer: 2000,
            // })
            // .then((value) => {
            navigate("/forgetDetailSuccessMobile");
            // localStorage.setItem('accessToken', response['accessToken']);
            // localStorage.setItem('user', JSON.stringify(response['user']));
            // window.location.href = "/profile";
            //});
        }
        else {
            // swal("Failed", "Invalid Creds", "error");
            setOtpCheck(true);

        }
    }

    const resendOTP = async e => {
        e.preventDefault();
        localStorage.removeItem('data');
        let mobileno = localStorage.getItem('mobileNum');
        setMobileNum(mobileno);
        const response = await sendOtp({
            "mobileNum": mobileNum,

        });

        if (response.meta.code == 200) {

            localStorage.setItem('data', response.data);

        }
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
                                    <div class="form-box-content-wrapper">
                                        <div class="instructions-box">
                                            <div class="instruction-img">
                                                <img src={checksucess} alt="" />
                                            </div>
                                            <div class="form-instruction mt-4">
                                                4-digit OTP has been sent on your registered mobile number
                                                for verification.
                                            </div>
                                            <div class="otp-timer text-white mt-3">
                                                {seconds > 0 || minutes > 0 ? (
                                                    <p style={{ color: "white" }}>
                                                        Time Left: {minutes < 10 ? `0${minutes}` : minutes}:
                                                        {seconds < 10 ? `0${seconds}` : seconds}
                                                    </p>
                                                ) : (
                                                    <p>Didn't recieve code?</p>
                                                )}
                                            </div>
                                        </div>
                                        {/* OTP Box */}
                                        <form action="" class="pt-4 tab-form">
                                            <div class="d-flex flex-column align-content-between">
                                                <div class="input-box form-floating w-100">
                                                    <input
                                                        type="number"
                                                        id="otp"
                                                        placeholder="Enter 4-digit OTP"
                                                        class="mt-2 form-control"

                                                        maxlength="4"
                                                        pattern="[0-9]{6}"
                                                        autofocus
                                                        onChange={e => setUserotp(e.target.value)}
                                                        onKeyDown={(e) => {
                                                            const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
                                                            const isDigit = /\d/.test(e.key);
                                                            // Allow the input if the key pressed is a digit or an allowed key and the input length is less than 10, 
                                                            // or if the key pressed is the backspace key and the input length is greater than 0
                                                            if ((isDigit || allowedKeys.includes(e.key)) && (e.target.value.length < 4 || e.key === "Backspace")) {
                                                                return true;
                                                            } else {
                                                                e.preventDefault();
                                                            }
                                                        }}
                                                    />
                                                    <label for="otp">Enter 4-digit OTP</label>
                                                    {otpCheck && <span id="otpError" class="error  text-start"
                                                    >Invalid OTP</span
                                                    >}
                                                </div>
                                            </div>

                                            <button
                                                id="otpValidBtn"
                                                type="button"
                                                class="spectra-btn"
                                                //   onclick="location.href='./forgot-details-success-mobile.html'"
                                                //   disabled
                                                disabled={!userotp || userotp.length < 4}
                                                onClick={handleverifyOtp}

                                            >
                                                Send
                                            </button>

                                            <div
                                                class="d-flex align-items-center justify-content-between mt-3"
                                            >
                                                <div class="bottom-link">
                                                    <a
                                                        href="" 
                                                        // onclick="storeTabIndex('mobile')"
                                                        onClick={homeButton}
                                                    >
                                                        <span class="text-decoration-underline">Back</span></a
                                                    >
                                                </div>
                                                <div class="bottom-link" id="resendOtpLink">
                                                    <a href="" onClick={resendOTP}
                                                    ><span class="text-decoration-underline"
                                                    >Resend OTP</span
                                                        ></a
                                                    >
                                                </div>
                                            </div>
                                        </form>
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


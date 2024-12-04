import React, { useState, useEffect, useRef } from 'react';
import "../assets/css/style.css";
import { makeStyles } from '@material-ui/core/styles';
import { useNavigate } from "react-router-dom";
import fb from "../assets/images/icon-fb.svg";
import insta from "../assets/images/icon-insta.svg";
import li from "../assets/images/icon-li.svg";
import twit from "../assets/images/icon-twit.svg";
import eyeClose from "../assets/images/eye-close.svg"
import eyeOpen from "../assets/images/eye-open.svg"
import chatcircle from "../assets/images/ChatCircle.svg"
import help from "../assets/images/help.svg";
import { Link } from 'react-router-dom';
import captcha from "../assets/images/captcha-placeholder.png"

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundSize: 'cover',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

async function loginUser(credentials) {
    return fetch(process.env.REACT_APP_API_URL + '/getEntityCredentials', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

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

async function getAccountDetailsByMobileNumber(credentials) {
    return fetch(process.env.REACT_APP_API_URL + '/getAccountDetailsByMobileNumber', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}


const generateCaptchaText = () => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaText = "";
    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        captchaText += characters.charAt(randomIndex);
    }
    return captchaText;
};

//for mobile captcha
const generateCaptchaTextMob = () => {
    const charactersMob = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let captchaTextMob = "";
    for (let i = 0; i < 6; i++) {
        const randomIndexMob = Math.floor(Math.random() * charactersMob.length);
        captchaTextMob += charactersMob.charAt(randomIndexMob);
    }
    return captchaTextMob;
};

const drawCaptchaText = (ctx, text) => {
    ctx.font = "40px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 132, 41);
};

//for mobile

const drawCaptchaTextMob = (ctx, text) => {
    ctx.font = "40px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, 132, 41);
};



export default function Signin() {
    const classes = useStyles();
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [mobileNum, setMobileNum] = useState();
    const [loginErrorMsg, setLoginErrorMsg] = useState(false);
    const [mobErrorMsg, setMobErrorMsg] = useState(false)
    const [confirmPasswordEye, setConfirmPasswordEye] = useState(false);
    const navigate = useNavigate();
    const [isRevealPwd, setIsRevealPwd] = useState(false);
    const [windowSize, setWindowSize] = useState([
        window.innerWidth,
        window.innerHeight,
    ]);
    const [rememberMe, setRememberMe] = useState(false);
    // for captcha login
    const [captchaText, setCaptchaText] = useState("");
    const [userInput, setUserInput] = useState("");
    const [isMatched, setIsMatched] = useState(false);
    const [wrongAttempts, setWrongAttempts] = useState(0);
    const maxWrongAttempts = 3;

    // for captcha mobile
    const [captchaTextMob, setCaptchaTextMob] = useState("");
    const [userInputMob, setUserInputMob] = useState("");
    const [isMatchedMob, setIsMatchedMob] = useState(false);
    const [wrongAttemptsMob, setWrongAttemptsMob] = useState(0);
    const maxWrongAttemptsMob = 3;


    const canvasRef = useRef(null);
    const canvasRefMob = useRef(null);
    //remember me
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe');

        if (storedRememberMe && storedUsername && storedPassword) {
            setUserName(storedUsername);
            setPassword(storedPassword);
            setRememberMe(true);

        }
        // Check if user is already logged in
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        if (isLoggedIn) {
            navigate('/dashboard');
        }
    }, []);

    //canvas for login captcha
    useEffect(() => {
        const generateCaptchaBackgroundImage = (canvas) => {
            const ctx = canvas.getContext("2d");
            const width = canvas.width;
            const height = canvas.height;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Set background color
            ctx.fillStyle = "#212529"; // Replace with your desired background color
            ctx.fillRect(0, 0, width, height);

            // Draw lines
            // const numLines = 20;
            // const lineColor = "#142379";
            // ctx.strokeStyle = lineColor;
            // ctx.lineWidth = 1;
            // for (let i = 0; i < numLines; i++) {
            //     const x1 = Math.random() * width;
            //     const y1 = Math.random() * height;
            //     const x2 = Math.random() * width;
            //     const y2 = Math.random() * height;
            //     ctx.beginPath();
            //     ctx.moveTo(x1, y1);
            //     ctx.lineTo(x2, y2);
            //     ctx.stroke();
            // }
            // Draw border
            ctx.strokeStyle = '#FFFFFF'; // Border color
            ctx.lineWidth = 2; // Border width
            ctx.strokeRect(0, 0, canvas.width, canvas.height);

            // Draw text
            drawCaptchaText(ctx, captchaText);
        };

        const canvas = canvasRef.current;
        if (canvas) {
            generateCaptchaBackgroundImage(canvas);
        }
    }, [captchaText]);

    //canvas for mobile captcha
    useEffect(() => {
        const generateCaptchaBackgroundImageMob = (canvas) => {
            const ctx = canvas.getContext("2d");
            const width = canvas.width;
            const height = canvas.height;

            // Clear canvas
            ctx.clearRect(0, 0, width, height);

            // Set background color
            ctx.fillStyle = "#212529"; // Replace with your desired background color
            ctx.fillRect(0, 0, width, height);

            // Draw lines
            // const numLines = 20;
            // const lineColor = "#142379";
            // ctx.strokeStyle = lineColor;
            // ctx.lineWidth = 1;
            // for (let i = 0; i < numLines; i++) {
            //     const x1 = Math.random() * width;
            //     const y1 = Math.random() * height;
            //     const x2 = Math.random() * width;
            //     const y2 = Math.random() * height;
            //     ctx.beginPath();
            //     ctx.moveTo(x1, y1);
            //     ctx.lineTo(x2, y2);
            //     ctx.stroke();
            // }
            // Draw border
            ctx.strokeStyle = '#FFFFFF'; // Border color
            ctx.lineWidth = 2; // Border width
            ctx.strokeRect(0, 0, canvas.width, canvas.height);
            // Draw text
            drawCaptchaTextMob(ctx, captchaTextMob);
        };

        const canvas = canvasRefMob.current;
        if (canvas) {
            generateCaptchaBackgroundImageMob(canvas);
        }
    }, [captchaTextMob]);

    //captcha logic for login
    useEffect(() => {
        const storedAttempts = sessionStorage.getItem("wrongAttempts");
        if (storedAttempts) {
            setWrongAttempts(parseInt(storedAttempts));
        }
    }, []);

    useEffect(() => {
        if (wrongAttempts >= maxWrongAttempts) {
            setCaptchaText(generateCaptchaText());
        }
    }, [wrongAttempts]);

    //end

    //captcha logic for mobile
    useEffect(() => {
        const storedAttemptsMob = sessionStorage.getItem("wrongAttemptsMob");
        if (storedAttemptsMob) {
            setWrongAttemptsMob(parseInt(storedAttemptsMob));
        }
    }, []);

    useEffect(() => {
        if (wrongAttemptsMob >= maxWrongAttemptsMob) {
            setCaptchaTextMob(generateCaptchaTextMob());
        }
    }, [wrongAttemptsMob]);
    //end
    //window size
    useEffect(() => {
        const handleWindowResize = () => {
            setWindowSize([window.innerWidth, window.innerHeight]);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    });
    //end

    useEffect(() => {
        changeGreetings()
    })

    const handleUserInput = (event) => {
        setUserInput(event.target.value);
    };
    const handleUserInputMob = (event) => {
        setUserInputMob(event.target.value);
    };

    //store tab index
    function storeTabIndex(tabName) {
        sessionStorage.setItem("activeTab", tabName);
      }

      useEffect(() => {
        const activeTab = sessionStorage.getItem('activeTab');
        const mobileTab = document.querySelector('#profile-tab');
        const loginTab = document.querySelector('#home-tab');
        const loginPanel = document.querySelector('#home');
        const mobilePanel = document.querySelector('#profile');
    
        if (activeTab === 'mobile') {
          mobileTab.classList.add('active');
          loginTab.classList.remove('active');
          loginPanel.classList.remove('show');
          loginPanel.classList.remove('active');
          mobilePanel.classList.add('show');
          mobilePanel.classList.add('active');
        } else {
          mobileTab.classList.remove('active');
          loginTab.classList.add('active');
          loginPanel.classList.add('show');
          loginPanel.classList.add('active');
          mobilePanel.classList.remove('show');
          mobilePanel.classList.remove('active');
        }
      }, []);

      
     

    //onclick of login
    const handleSubmit = async e => {

        e.preventDefault();
        const response = await loginUser({
            "userName": username,

        });
        console.log("response", response);

        if (wrongAttempts >= maxWrongAttempts) {
            if (response.data.credentialValue === password) {
                console.log("userInput", userInput);
                if (userInput === captchaText) {
                    console.log("inside captcha if");
                    setIsMatched(true);
                    setWrongAttempts(0);
                    localStorage.setItem('credentialKey', response.data.credentialKey);
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    navigate("/dashboard");
                    localStorage.setItem('width', windowSize[0]);
                    localStorage.setItem('height', windowSize[1]);

                    // Check if Remember Me checkbox is checked
                    if (rememberMe) {
                        localStorage.setItem('username', username);
                        localStorage.setItem('password', password);
                        localStorage.setItem('isLoggedIn', true);
                    } else {
                        localStorage.removeItem('username');
                        localStorage.removeItem('password');
                    }

                    // navigate('/dashboard');
                    console.log("Width: ", windowSize[0]);
                    console.log("Height: ", windowSize[1]);
                } else {
                    console.log("inside captcha else");
                    setIsMatched(false);
                    setWrongAttempts(wrongAttempts + 1);
                    setLoginErrorMsg(true);
                }
            } else {
                setWrongAttempts(wrongAttempts + 1);
                setLoginErrorMsg(true);
            }
        } else {
            if (response.data.credentialValue === password) {
                localStorage.setItem('credentialKey', response.data.credentialKey);
                navigate("/dashboard");
                localStorage.setItem('width', windowSize[0]);
                localStorage.setItem('height', windowSize[1]);

                // Check if Remember Me checkbox is checked
                if (rememberMe) {
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    localStorage.setItem('isLoggedIn', true);
                } else {
                    localStorage.removeItem('username');
                    localStorage.removeItem('password');

                }

                console.log("Width: ", windowSize[0]);
                console.log("Height: ", windowSize[1]);
            } else {
                setWrongAttempts(wrongAttempts + 1);
                setLoginErrorMsg(true);
            }
        }

    }
    //function to send otp
    const handleSubmitOtp = async e => {

        e.preventDefault();
        localStorage.setItem('mobileNum', mobileNum);
        const validMobNumber = await getAccountDetailsByMobileNumber({
            "mobileNo": mobileNum,
        });
        console.log("number checked");
        if (wrongAttemptsMob >= maxWrongAttemptsMob) {
            if (validMobNumber.meta.code == 200) {
                if (userInputMob === captchaTextMob) {
                    const response = await sendOtp({
                        "mobileNum": mobileNum,

                    });
                    if (response.meta.code == 200) {

                        localStorage.setItem('data', response.data);
                        storeTabIndex("home")
                        navigate("/otp");
                    }
                } else {
                    console.log("inside captcha mob else");
                    setIsMatchedMob(false);
                    setWrongAttemptsMob(wrongAttemptsMob + 1);
                    setMobErrorMsg(true);
                }
            } else {
                console.log("inside captcha mob else");
                setWrongAttemptsMob(wrongAttemptsMob + 1);
                setMobErrorMsg(true);
            }
        } else {
            if (validMobNumber.meta.code == 200) {


                const response = await sendOtp({
                    "mobileNum": mobileNum,

                });
                if (response.meta.code == 200) {

                    localStorage.setItem('data', response.data);
                    storeTabIndex("home")
                    navigate("/otp");
                }
            } else {
                console.log("mob not exist");
                setWrongAttemptsMob(wrongAttemptsMob + 1);
                setMobErrorMsg(true)
            }
            //console.log(mobileNum);

        }

    }

    //greeting meesage
    function changeGreetings() {
        const greetings = document.querySelector(".heading .sub-heading");
        const date = new Date();
        const hours = date.getHours();
        if (hours >= 0 && hours < 12) {
            greetings.textContent = "Good Morning!";
        } else if (hours >= 12 && hours < 16) {
            greetings.textContent = "Good Afternoon!";
        } else if (hours >= 16 && hours < 24) {
            greetings.textContent = "Good Evening!";
        }

    }
    ;

    function handleChatBox() {
        const chatBox = document.querySelector(".help-box")
        chatBox.classList.toggle("d-none");
    }

    const toggleConfirmPasswordView = () => {
        setConfirmPasswordEye(!confirmPasswordEye);
    };
    const homeButton = () => {
        navigate("/");
    }
    //for login
    useEffect(() => {
        sessionStorage.setItem("wrongAttempts", wrongAttempts);
    }, [wrongAttempts]);
    //end
    //for mobile
    useEffect(() => {
        sessionStorage.setItem("wrongAttemptsMob", wrongAttemptsMob);
    }, [wrongAttemptsMob]);
    //end

    return (
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
                                <div class="sub-heading">Good Morning!</div>
                                <p class="caption">Please share your login details</p>
                            </div>
                            <div class="form-box">
                                {/* <!-- Form-top Tab Buttons  --> */}
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
                                            Login ID
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
                                            Mobile OTP
                                        </div>
                                    </li>
                                </ul>
                                <div class="form-box-content-wrapper">
                                    <div class="tab-content" id="myTabContent">
                                        {/* <!-- Login ID Tab  --> */}
                                        <div
                                            class="tab-pane fade show active"
                                            id="home"
                                            role="tabpanel"
                                            aria-labelledby="home-tab"
                                        >
                                            <form action="" class="pt-4 tab-form" onSubmit={handleSubmit}>
                                                <div class="input-box form-floating">
                                                    <input
                                                        name="loginId"
                                                        id="loginId"
                                                        type="text"
                                                        placeholder="Enter login ID"
                                                        className="myinputFormControl input-username form-control"
                                                        onChange={e => setUserName(e.target.value)}
                                                        maxlength="15"
                                                        autofocus
                                                    />
                                                    <label for="loginId">Enter Login ID</label>
                                                    {/* {loginErrorMsg && <span id="loginError" class="error"
                                                    >Login ID does not exist. Try again</span
                                                    >} */}
                                                </div>

                                                <div class="input-box form-floating password-input">
                                                    <img
                                                        src={confirmPasswordEye ? eyeOpen : eyeClose}
                                                        alt=""
                                                        class="password-view-toggle"
                                                        onClick={toggleConfirmPasswordView}
                                                    />

                                                    <input
                                                        name="password"
                                                        id="password"
                                                        // type="password"
                                                        type={confirmPasswordEye ? 'text' : 'password'}
                                                        // value={password}
                                                        placeholder="Enter password"
                                                        className=" myinputFormControl input-username form-control"
                                                        onChange={e => setPassword(e.target.value)}
                                                        maxlength="15"
                                                    />
                                                    <label for="password">Enter Password</label>
                                                    {loginErrorMsg && <span id="loginError" class="error"
                                                    >Incorrect Username or Password. Try again</span
                                                    >}
                                                </div>

                                                {wrongAttempts >= maxWrongAttempts && <div class="captcha d-flex flex-column">
                                                    <span className="captcha d-flex flex-column"> <canvas ref={canvasRef} width={264} height={83} /></span>



                                                    <div class="input-box form-floating">
                                                        <input
                                                            name="captcha"
                                                            id="captcha"
                                                            type="text"
                                                            placeholder="Enter captcha"
                                                            className="myinputFormControl form-control "
                                                            value={userInput}

                                                            onChange={handleUserInput}
                                                            maxlength="15"
                                                        />
                                                        <label for="captcha">Enter captcha</label>
                                                        {wrongAttempts > maxWrongAttempts && !isMatched && (<span id="captchaError" class="error"
                                                        >Incorrect Captcha</span
                                                        >)}
                                                    </div>
                                                </div>}

                                                <div
                                                    class="d-flex justify-content-end gap-3 align-items-center"
                                                >
                                                    <label for="checkbox" class="spectra-checkbox">
                                                        <input
                                                            type="checkbox"
                                                            name=""
                                                            class=""
                                                            id="checkbox"
                                                            checked={rememberMe}
                                                            onChange={() => setRememberMe(!rememberMe)}
                                                        />
                                                        <span class="checkmark"></span>
                                                        <p class="">Remember me</p>
                                                    </label>
                                                </div>

                                                <button
                                                    id="loginBtn"
                                                    type="submit"
                                                    class="spectra-btn"
                                                    disabled={!username || !password}
                                                >
                                                    Login
                                                </button>
                                            </form>
                                        </div>

                                        {/* <!-- Mobile Tab  --> */}
                                        <div
                                            class="tab-pane fade"
                                            id="profile"
                                            role="tabpanel"
                                            aria-labelledby="profile-tab"
                                        >
                                            <form action="" class="pt-4 tab-form">
                                                <div class="input-box form-floating">
                                                    <input
                                                        type="tel"
                                                        placeholder="Enter Mobile Number"
                                                        className = "myinputFormControl mt-2 form-control"
                                                        id="mobileNo"
                                                        maxlength="10"
                                                        pattern="[0-9]{10}"
                                                        autofocus
                                                        onChange={e => setMobileNum(e.target.value)}
                                                        // onkeypress="return event.charCode >= 48 && event.charCode <= 57 && this.value.length < 10"
                                                        // onKeyDown={handleKeyPress}
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

                                                    />

                                                    <label for="mobileNo">Mobile No</label>
                                                    {mobErrorMsg && <span id="mobileError" class="error"
                                                    >This mobile number is not registered. Try
                                                        again</span
                                                    >}
                                                </div>

                                                {wrongAttemptsMob >= maxWrongAttemptsMob && <div class="captcha d-flex flex-column">
                                                    <span className="captcha d-flex flex-column"> <canvas ref={canvasRefMob} width={264} height={83} /></span>
                                                    <div class="input-box form-floating">
                                                        <input
                                                            name="captcha"
                                                            id="captcha"
                                                            type="text"
                                                            placeholder="Enter captcha"
                                                            class="form-control"
                                                            value={userInputMob}

                                                            onChange={handleUserInputMob}

                                                            maxlength="15"
                                                        />
                                                        <label for="captcha">Enter captcha</label>
                                                        {wrongAttemptsMob > maxWrongAttemptsMob && !isMatchedMob && (<span id="captchaError" class="error"
                                                        >Incorrect Captcha</span
                                                        >)}
                                                    </div>
                                                </div>}

                                                <button
                                                    id="sendOtpBtn"
                                                    type="submit"
                                                    class="spectra-btn"
                                                    disabled={!mobileNum || mobileNum.length < 10}
                                                    onClick={handleSubmitOtp}
                                                >
                                                    Send OTP
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div
                                        class="d-flex align-items-center justify-content-between mt-3"
                                    >
                                        <div class="bottom-link">
                                            <Link to="/ForgotDetails" > <span class="text-decoration-underline"
                                            >Forgot details ?</span
                                            ></Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="copyright">
                                Copyright<span style={{ margin: "0 3px" }}>&#169;</span>2023. All
                                Rights Reserved <br />
                                <span style={{ display: 'inline-block', marginTop: '10px' }}
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
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
import CryptoJS from 'crypto-js';
import { deviceDetect, mobileModel } from "react-device-detect"
import {
    getSolutionLists,
    getCustomerAccountDetail,
    sendMailS1,
    getEntityCredentials,
    insertNewUserFromBw,
    getAccountDetailsByMobileNumber,
    updatePasswordByServiceId,
    updateMobileByServiceId,
    getUserByCanId
} from '../function';
import Cookies from 'js-cookie';
import { isArray } from 'jquery';
import { Password } from '@mui/icons-material';
import queryString from "query-string";

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
    return fetch(process.env.REACT_APP_API_URL + '/login', {
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

async function checkMobileNumber(credentials) {
    return fetch(process.env.REACT_APP_API_URL + '/checkMobileNumber', {
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



export default function Login({ setAivisCheck }) {
    // localStorage.clear();
    // sessionStorage.clear();
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
    const [ip, setIp] = useState('');
    // for captcha mobile
    const [captchaTextMob, setCaptchaTextMob] = useState("");
    const [userInputMob, setUserInputMob] = useState("");
    const [isMatchedMob, setIsMatchedMob] = useState(false);
    const [wrongAttemptsMob, setWrongAttemptsMob] = useState(0);
    const maxWrongAttemptsMob = 3;
    const cdr = localStorage.getItem("cd");
    // const cd = atob(localStorage.getItem("cd")).split(':');

    const canvasRef = useRef(null);
    const canvasRefMob = useRef(null);

    useEffect(() => {
        let isMounted = true; // Flag to prevent state updates if the component is unmounted
    
        const loginByUrl = async () => {
            try {
                const { id } = queryString.parse(window.location.search);
                // console.log("Url username", username);
    
                if (id) {
                    const response = await getUserByCanId({
                        userName: id,
                        ip: ip,
                        user_device_os: deviceDetect().osName || deviceDetect().os,
                    });
    
                    if (isMounted) {
                        // console.log("response", response);
    
                        if (response.meta.code === 200) {
                            if (response.data[0].crm_group_id === "GIndividual") {
                                const solutionListApiCall = await getSolutionLists(
                                    "GIndividual",
                                    "CIndividual",
                                    response.data[0].crm_location_id
                                );
                                if (solutionListApiCall.meta.code === 200) {
                                    localStorage.setItem(
                                        "segmentCheckHBB",
                                        solutionListApiCall.data[0].SegmentName
                                    );
                                }
                            } else {
                                localStorage.setItem("segmentCheckHBB", "NA");
                            }
    
                            localStorage.setItem("credentialKey", response.data[0].service_id);
                            localStorage.setItem("crm_group_id", response.data[0].crm_group_id);
                            localStorage.setItem("crm_company_id", response.data[0].crm_company_id);
                            localStorage.setItem("crm_location_id", response.data[0].crm_location_id);
                            localStorage.setItem("crm_role", response.data[0].crm_role);
                            localStorage.setItem("company_name", response.data[0].company_name);
    
                            const aivisCheck = response.data[0].prod_segment;
                            setAivisCheck(aivisCheck);
                            sessionStorage.setItem("tp", aivisCheck);
                            navigate("/dashboard");
    
                            localStorage.setItem("width", windowSize[0]);
                            localStorage.setItem("height", windowSize[1]);
                        }
                    }
                }
            } catch (error) {
                if (isMounted) {
                    console.error("Error fetching data:", error);
                }
            }
        };
    
        loginByUrl();
    
        return () => {
            isMounted = false; // Prevent state updates if unmounted
        };
    }, [navigate, setAivisCheck, ip, windowSize]);
    


    //remember me
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        const storedPassword = localStorage.getItem('password');
        const storedRememberMe = localStorage.getItem('rememberMe');
        // const storedUsername = Cookies.get('userName');
        // const storedPassword = Cookies.get('password');
        // const storedRememberMe = Cookies.get('rememberMe');

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
    // user ip
    useEffect(() => {
        const fetchIp = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                // console.log("ip data",data.ip);
                setIp(data.ip);
            } catch (error) {
                console.error('Error fetching the IP address:', error);
            }
        };

        fetchIp();
    }, []);

    useEffect(() => {
        const rememberMeCheck = async () => {
            // console.log("cddddd", cdr);            
            if (cdr) {
                let cd = atob(cdr).split(':');
                // console.log(cd);
                
                // const custDeatail = await getCustomerAccountDetail(cd[0]);
                // console.log("wertyui",custDeatail.data.subsDetails[0].pkgname);
                // const str = custDeatail.data.subsDetails[0].pkgname;
                // const parts = str.split("_");
                // const aivisCheck = parts.find(part => part === "AIVIS");
                // setAivisCheck(aivisCheck);
                // sessionStorage.setItem("tp", aivisCheck);

                const response = await loginUser({
                    "userName": cd[0],
                    "password": cd[1],
                    "ip": ip,
                    "user_device_os": deviceDetect().osName ? deviceDetect().osName : deviceDetect().os
                });

                // console.log("response", response);

                if (response.meta.code === 200) {
                    if (response.data[0].crm_group_id == "GIndividual") {
                        let solutionListApiCall = await getSolutionLists("GIndividual", "CIndividual", response.data[0].crm_location_id);
                        if (solutionListApiCall.meta.code == 200) {
                            localStorage.setItem('segmentCheckHBB', solutionListApiCall.data[0].SegmentName);
                        }
                    } else {
                        localStorage.setItem('segmentCheckHBB', "NA");
                    }
                    localStorage.setItem('credentialKey', response.data[0].service_id);
                    localStorage.setItem('crm_group_id', response.data[0].crm_group_id);
                    localStorage.setItem('crm_company_id', response.data[0].crm_company_id);
                    localStorage.setItem('crm_location_id', response.data[0].crm_location_id);
                    localStorage.setItem('crm_role', response.data[0].crm_role);
                    localStorage.setItem('company_name', response.data[0].company_name);

                    const aivisCheck = response.data[0].prod_segment;
                    setAivisCheck(aivisCheck);
                    sessionStorage.setItem("tp", aivisCheck);
                    navigate("/dashboard");

                    localStorage.setItem('width', windowSize[0]);
                    localStorage.setItem('height', windowSize[1]);

                    // console.log("Width: ", windowSize[0]);
                    // console.log("Height: ", windowSize[1]);
                }
                
            }
        }
        rememberMeCheck()
    }, [cdr])

    //onclick of login
    const handleSubmit = async e => {
        e.preventDefault();
        // alert(rememberMe) 

        let response = await loginUser({
            "userName": username,
            "password": password,
            "ip": ip,
            "user_device_os": deviceDetect().osName ? deviceDetect().osName : deviceDetect().os
        });
        // console.log("response1", response);
        // If User not exist in Spectra DB
        if(response.meta.code == 404 || response.meta.code == 403) {
            // console.log("qwertyu");
            try{
            let getCredentials = await getEntityCredentials(username);
            let canId = (getCredentials.data.actIds[0]).split("-")[0];
            // console.log("getCredentials404", canId);
            if(getCredentials?.data.credentialValue == password){
            let userEntry = await insertNewUserFromBw({username: canId, password: getCredentials.data.credentialValue});
            // console.log("userEntry", getCredentials.data.actIds[0]);
            response = await loginUser({
                "userName": canId,
                "password": password,
                "ip": ip,
                "user_device_os": deviceDetect().osName ? deviceDetect().osName : deviceDetect().os
            });
            
            if(getCredentials?.data?.credentialValue == password) {
                // Update Password 
                await updatePasswordByServiceId({
                    "service_id": canId,
                    "password": password
                });
                // console.log("UpdatePassword");
                response = await loginUser({
                    "userName": canId,
                    "password": password,
                    "ip": ip,
                    "user_device_os": deviceDetect().osName ? deviceDetect().osName : deviceDetect().os
                });
            }
            } 
        }catch(error){
            console.error(error);            
        }
        }



        // console.log("response2", response); return

        if (wrongAttempts >= maxWrongAttempts) {
            if (response.meta.code === 200) {
                // console.log("userInput", userInput);
                if (userInput === captchaText) {
                    // console.log("inside captcha if");
                    setIsMatched(true);
                    setWrongAttempts(0);
                    if (response.data[0].crm_group_id == "GIndividual") {
                        let solutionListApiCall = await getSolutionLists("GIndividual", "CIndividual", response.data[0].crm_location_id);
                        if (solutionListApiCall.meta.code == 200) {
                            localStorage.setItem('segmentCheckHBB', solutionListApiCall.data[0].SegmentName);
                        }
                    } else {
                        localStorage.setItem('segmentCheckHBB', "NA");
                    }
                    localStorage.setItem('credentialKey', response.data[0].service_id);
                    localStorage.setItem('username', username);
                    localStorage.setItem('password', password);
                    localStorage.setItem('crm_group_id', response.data[0].crm_group_id);
                    localStorage.setItem('crm_company_id', response.data[0].crm_company_id);
                    localStorage.setItem('crm_location_id', response.data[0].crm_location_id);
                    localStorage.setItem('crm_role', response.data[0].crm_role);
                    localStorage.setItem('company_name', response.data[0].company_name);

                    const aivisCheck = response.data[0].prod_segment;
                    setAivisCheck(aivisCheck);
                    sessionStorage.setItem("tp", aivisCheck);

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
                    // console.log("Width: ", windowSize[0]);
                    // console.log("Height: ", windowSize[1]);
                } else {
                    // console.log("inside captcha else");
                    setIsMatched(false);
                    setWrongAttempts(wrongAttempts + 1);
                    setLoginErrorMsg(true);
                }
            }else {
                setWrongAttempts(wrongAttempts + 1);
                setLoginErrorMsg(true);

                
                const apiFailureDetails = {
                    API_Name: "login", // Name of the API where failure occurred
                    Request: {
                        "userName": username,
                        "password": password,
                        "ip": ip,
                        "user_device_os": deviceDetect().osName ? deviceDetect().osName : deviceDetect().os
                    },
                    Date: new Date().toISOString(),
                    Message: response.meta?.Message || 'No message provided',
                    res: response.data || {}
                };
                const emailBody = `
API Failure Report
--------------------
API Name: ${apiFailureDetails.API_Name} (Login1.js)
Request:
${JSON.stringify(apiFailureDetails.Request, null, 2)}
Response:
${JSON.stringify(apiFailureDetails.res, null, 2)}
Message: ${apiFailureDetails.Message}
Date: ${apiFailureDetails.Date}
`;
                try {
                    const response = await fetch(process.env.REACT_APP_API_URL + '/sendMailS1', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            text: emailBody, // Send the structured email body
                            subject: "Login"
                        })
                    });
                    const data = await response.json();
                    // console.log("Mail sent successfully:", data);
                } catch (mailError) {
                    console.error("Failed to send mail:", mailError);
                }

            }
        } else {
            if (response.meta.code === 200) {
                if (response.data[0].crm_group_id == "GIndividual") {
                    let solutionListApiCall = await getSolutionLists("GIndividual", "CIndividual", response.data[0].crm_location_id);
                    if (solutionListApiCall.meta.code == 200) {
                        localStorage.setItem('segmentCheckHBB', solutionListApiCall.data[0].SegmentName);
                    }
                } else {
                    localStorage.setItem('segmentCheckHBB', "NA");
                }
                localStorage.setItem('credentialKey', response.data[0].service_id);
                localStorage.setItem('crm_group_id', response.data[0].crm_group_id);
                localStorage.setItem('crm_company_id', response.data[0].crm_company_id);
                localStorage.setItem('crm_location_id', response.data[0].crm_location_id);
                localStorage.setItem('crm_role', response.data[0].crm_role);
                localStorage.setItem('company_name', response.data[0].company_name);

                const aivisCheck = response.data[0].prod_segment;
                setAivisCheck(aivisCheck);
                sessionStorage.setItem("tp", aivisCheck);

                navigate("/dashboard");

                localStorage.setItem('width', windowSize[0]);
                localStorage.setItem('height', windowSize[1]);

                // Check if Remember Me checkbox is checked
                if (rememberMe) {
                    let cd = username + ':' + password;
                    localStorage.setItem("cd", btoa(cd));
                } else {
                    localStorage.removeItem("cd");
                }

                // console.log("Width: ", windowSize[0]);
                // console.log("Height: ", windowSize[1]);
            }else {
                setWrongAttempts(wrongAttempts + 1);
                setLoginErrorMsg(true);

                
                const apiFailureDetails = {
                    API_Name: "login", // Name of the API where failure occurred
                    Request: {
                        "userName": username,
                        "password": password,
                        "ip": ip,
                        "user_device_os": deviceDetect().osName ? deviceDetect().osName : deviceDetect().os
                    },
                    Date: new Date().toISOString(),
                    Message: response.meta?.Message || 'No message provided',
                    res: response.data || {}
                };
                const emailBody = `
API Failure Report
--------------------
API Name: ${apiFailureDetails.API_Name} (Login1.js)
Request:
${JSON.stringify(apiFailureDetails.Request, null, 2)}
Response:
${JSON.stringify(apiFailureDetails.res, null, 2)}
Message: ${apiFailureDetails.Message}
Date: ${apiFailureDetails.Date}
`;
                try {
                    const response = await fetch(process.env.REACT_APP_API_URL + '/sendMailS1', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            text: emailBody, // Send the structured email body
                            subject: "Login"
                        })
                    });
                    const data = await response.json();
                    // console.log("Mail sent successfully:", data);
                } catch (mailError) {
                    console.error("Failed to send mail:", mailError);
                }

            }
        }

    }
    //function to send otp
    const handleSubmitOtp = async e => {
        e.preventDefault();
        localStorage.setItem('mobileNum', mobileNum);
        let validMobNumber = await checkMobileNumber({
            "mobileNo": mobileNum,
        });

        // console.log("number checked", validMobNumber);
        
        if(validMobNumber.meta.code !== 200){
            try{
            let checkAndUpdateMobile = await updateMobileByServiceId(mobileNum); 
            // console.log(checkAndUpdateMobile);       return
            let actDetail = await getAccountDetailsByMobileNumber(mobileNum);
            
            // console.log("actDetail", actDetail?.data[0].actid);
            if (actDetail?.data.length > 0) {
                for (const data of actDetail.data) {
                    try {
                        let getCredentials = await getEntityCredentials(data.actid);
                        let canId = (getCredentials.data.actIds[0]).split("-")[0];
                        // console.log("getCredentials404", canId);
                        let userEntry = await insertNewUserFromBw({ username: canId, password: getCredentials.data.credentialValue });
                        // console.log("userEntry", userEntry.data);

                    } catch (error) {
                        console.log(error.message);
                    }
                };
                validMobNumber = await checkMobileNumber({
                    "mobileNo": mobileNum,
                });
            }
        }catch(error){
            console.error(error);            
        }
        }

        // console.log("number checked", validMobNumber); return


        if (wrongAttemptsMob >= maxWrongAttemptsMob) {
            if (validMobNumber.meta.code == 200) {
                if (userInputMob === captchaTextMob) {
                    const response = await sendOtp({
                        "mobileNum": mobileNum,

                    });
                    if (response.meta.code == 200) {
                        // console.log("otp", JSON.stringify(response.data));
                        let secretKey = 'Spectra';
                        let encryptedOTP = CryptoJS.AES.encrypt(response.data, secretKey).toString();
                        // console.log("encryptedOTP", encryptedOTP);
                        localStorage.setItem('data', encryptedOTP);

                        navigate("/otp");
                    }
                } else {
                    // console.log("inside captcha mob else");
                    setIsMatchedMob(false);
                    setWrongAttemptsMob(wrongAttemptsMob + 1);
                    setMobErrorMsg(true);
                }
            } else {
                // console.log("inside captcha mob else");
                setWrongAttemptsMob(wrongAttemptsMob + 1);
                setMobErrorMsg(true);
            }
        } else {
            if (validMobNumber.meta.code == 200) {


                const response = await sendOtp({
                    "mobileNum": mobileNum,

                });
                if (response.meta.code == 200) {
                    // console.log("otp", JSON.stringify(response.data));
                    let secretKey = 'Spectra';
                    // console.log("before");
                    const dataString = JSON.stringify(response.data);
                    let encryptedOTP = CryptoJS.AES.encrypt(dataString, secretKey).toString();
                    // console.log("encrypt");
                    // console.log("encryptedOTP", encryptedOTP);
                    localStorage.setItem('data', encryptedOTP);
                    // localStorage.setItem('data', response.data);

                    navigate("/otp");
                }
            } else {
                    // console.log("mob not exist");
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

    };

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
                                            class="tab-pane fade show active pb-3"
                                            id="home"
                                            role="tabpanel"
                                            aria-labelledby="home-tab"
                                            style={{padding: "0px"}}
                                        >
                                            <form action="" class="pt-4 tab-form" onSubmit={handleSubmit}>
                                                <div class="input-box form-floating">
                                                    <input
                                                        name="loginId"
                                                        id="loginId"
                                                        type="text"
                                                        placeholder="Enter login ID"
                                                        class="form-control"
                                                        onChange={e => setUserName(((e.target.value).trim()).split("-")[0])}
                                                        maxlength="15"
                                                        autofocus
                                                    />
                                                    <label for="loginId">Enter Login ID</label>
                                                    {/* {loginErrorMsg && <span id="loginError" class="error"
                                                    >Incorrect Username or Password. Try again</span
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
                                                        class="form-control"
                                                        onChange={e => setPassword((e.target.value).trim())}
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
                                                            class="form-control"
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
                                                    disabled={!username || !password || username.length < 5 }   // username.startsWith('00')
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
                                            style={{padding: "0px"}}
                                        >
                                            <form action="" class="pt-4 tab-form">
                                                <div class="input-box form-floating">
                                                    <input
                                                        type="tel"
                                                        placeholder="Enter Mobile Number"
                                                        class="mt-2 form-control"
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
                                Copyright<span style={{ margin: "0 3px" }}>&#169;</span>{new Date().getFullYear()}. All
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
                <button id="chat-btn" class=""
                    onClick={handleChatBox}>
                    {/* <img src={chatcircle} alt="" /> */}
                </button>

            </div>
        </section>
    )
}
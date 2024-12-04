import React, { useState, useEffect, useRef } from 'react';
import Header from '../spectra_one_new/Header';
import Footer from '../spectra_one_new/Footer';
import SideBar from '../spectra_one_new/Sidebar';
import eyeopendark from "../assets/images/eye-open-dark.svg";
import eyeclosedark from "../assets/images/eye-close-dark.svg";
import { useNavigate } from 'react-router-dom';
import "../assets/css/dashboard.css";
import Swal from 'sweetalert2';
import HeaderHbb from "../spectra_one_new/HeaderHbb"



export default function PasswordManagement() {
    const navigate = useNavigate();
    // ishan
const [myPassCheck,setMyPassCheck] = useState(false);
    // end
    const [updateValue, setUpdateValue] = useState([]);
    const [currinputPassword, setCurrInputPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [correctPassword, setCorrectPassword] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState();
    const [check1, setCheck1] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [flagCheck, setflagCheck] = useState(false);
    const [userConfirmPassword, setUserConfirmPassword] = useState()
    const [confirmCheck, setConformCheck] = useState(false)

    const [passwordVisibility, setPasswordVisibility] = useState({
        oldPassword: false,
        newPassword: false,
        confirmPassword: false
    });
    const segment = localStorage.getItem('segment');



    const handleSaveChange = async () => {
        console.log("oldPassword",oldPassword)
        console.log("newpassword",password)
        console.log("confirmpassword",userConfirmPassword)
    
        if (password == userConfirmPassword) {
           
    
    
            const url = process.env.REACT_APP_API_URL + '/updatePassword';
            const data = {
                "old_password": oldPassword,
    
                "new_password": password,
    
                "service_id": localStorage.getItem("credentialKey")
            };
    
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            console.log("updatePassword", result.data);
            if (result.meta.code === 200 ) {
                            Swal.fire({
                                icon: 'success', // The type of the message (success, error, warning, info, question)
                                title: 'Password Updated Successfully', // The title of the message
                                text: 'Your password has been updated successfully.', // The content of the message
                                confirmButtonColor: '#3085d6', // Color of the confirm button (OK button)
                                confirmButtonText: 'OK', // Text to be shown on the confirm button
                              })
                              const url = 'https://custappmw.spectra.co/index.php';
                              const data = {
                                "Action": "resetpasswordspectraone",
                                "Authkey": "AdgT68HnjC8U5S3TkehEqlkd4",
                                "canID": localStorage.getItem("credentialKey"),
                                "username": localStorage.getItem("credentialKey"),
                                "oldPassword": oldPassword,
                                "newPassword": password
                              };
                      
                              const response = await fetch(url, {
                                  method: 'POST',
                                  headers: {
                                      'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify(data)
                              });
                              const result = await response.json();
                            localStorage.removeItem('credentialKey');
                
                            localStorage.removeItem('crm_group_id');
                
                            localStorage.removeItem('crm_company_id');
                
                            localStorage.removeItem('crm_location_id');
                
                            localStorage.removeItem('crm_role');
                
                            localStorage.removeItem('company_name');
                
                            localStorage.removeItem('username');
                
                            localStorage.removeItem('password');
                
                            localStorage.removeItem('isLoggedIn');
                
                
                
                
                            // Redirect the user to the login page
                
                            navigate('/');
                         
                        } else {
                            console.log("case 2")
                            Swal.fire({
                                icon: 'error', // The type of the message (success, error, warning, info, question)
                                title: 'Old Password Does Not Match', // The title of the message
                                text: 'Please make sure you entered the correct old password.', // The content of the message
                                confirmButtonColor: '#d33', // Color of the confirm button (OK button)
                                confirmButtonText: 'OK', // Text to be shown on the confirm button
                              });
                
                
                        }
                
             
            } else {
                console.log("case 1")
                Swal.fire({
                    icon: 'error', // The type of the message (success, error, warning, info, question)
                    title: 'New Password and Confirm Password does not Match', // The title of the message
                    text: 'Please make sure you entered the correct old password.', // The content of the message
                    confirmButtonColor: '#d33', // Color of the confirm button (OK button)
                    confirmButtonText: 'OK', // Text to be shown on the confirm button
                  });
    
    
            }
     }

    function passwordInstruction() {
        const instructionDiv = document.getElementById('password-instructions-profile');
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
        const instructionDiv = document.getElementById('password-instructions-profile');
        // instructionDiv.classList.add('d-none');
    }

    function disableForbiddenKeys(e) {
        const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
        const isAllowed = /[a-zA-Z0-9@_.]/.test(e.key);
        const inputField = e.target;
        const errorMessage = document.getElementById("passwordError");


        if ((isAllowed || allowedKeys.includes(e.key)) && (inputField.value.length < 15 || e.key === "Backspace")) {
            errorMessage.textContent = ""; // Clear the error message
            errorMessage.classList.add("d-none"); // Hide the error message
            return true;
        } else {
            if (!isAllowed) {
                errorMessage.textContent = "Invalid character. Use characters [ @, . , _ only.";
            } else {
                errorMessage.textContent = "Invalid password. Try again.";
            }
            errorMessage.classList.remove("d-none"); // Show the error message
            e.preventDefault();
        }
    }
    const handleValiDateNewPassword = (event) => {

        const newPassword = event.target.value;
        setPassword(newPassword);

        const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@._])[a-zA-Z\d@._]{8,15}$/;
        // /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@._])[A-Za-z\d@._]{8,15}$/;
//         setValidPassword(regex.test(newPassword) && newPassword.length >= 8 && newPassword.length <= 15);

        setValidPassword(regex.test(newPassword) && !/\s/.test(newPassword)  );
        setMyPassCheck(oldPassword !== newPassword)
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


    function validateNewPassword(e) {
        const newpass = e.target.value;
        setNewPassword(newpass)
        if (currinputPassword == newPassword) {
            setCheck1(true)
        } else {
            console.log("check 1 not succesul")
        }
        console.log("11", e.target.value)
        var myInput = document.getElementById("newPassword");
        var both = document.getElementById("both");
        var number = document.getElementById("number");
        var length = document.getElementById("length");


        // var progress = document.getElementById("progress-bar");
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

        } else {
            charChecking = false;
            length.classList.remove("valid");
            length.classList.add("invalid");

        }



    }
    const togglePasswordVisibility = (fieldName) => {
        setPasswordVisibility((prevState) => ({
            ...prevState,
            [fieldName]: !prevState[fieldName]
        }));
    };

    function validateCurrPassword(e) {
        console.log("old password label", e.target.value);
        setCurrInputPassword(e.target.value)
        // const currInputPassword2 = (e.target.value)
        // const password = document.getElementById("password");
        // const passwordError = document.getElementById("passwordError");

        // if (currInputPassword2 == "" || currInputPassword2 == newPassword) {
        //     passwordError.classList.remove("d-none");
        //     password.classList.add("error");
        // } else {
        //     passwordError.classList.add("d-none");
        //     password.classList.remove("error");
        // }

    }
    function confirmingPassword(e) {
        const confirmPasswordError = document.getElementById("confirmPasswordError");
        const confirmPassword2 = (e.target.value)
        setConfirmPassword(e.target.value)
        console.log("confirmPassword", confirmPassword2);

        if (newPassword == confirmPassword2) {
            confirmPasswordError.classList.add("d-none");

            setCorrectPassword(true)
        } else {
            confirmPasswordError.classList.remove("d-none");
            setCorrectPassword(false)
        }
    }







    return (

        <section className="section-dashboard">
            <div className="">
                <div className="d-flex justify-content-end">
                    {/* SIDE NAVBAR  */}
                    <SideBar />
                    {/* top header */}
                    {/* <Header /> */}
                    {segment != "HBB" && <Header />}
                    {segment == "HBB" && <HeaderHbb />}
                    {/* My ACCOUNTS  */}
                    <div className="dashboard-main">
                        <div className="dashboard-content">
                            <div className="profile-main-wrapper">
                                <div className="account-tab-heading mb-4"></div>
                                <div className="admin-panel-wrapper account-tab-container">
                                    <div className="admin-panel-header">
                                        <div className="heading d-flex align-items-center">
                                            Change Password
                                        </div>
                                    </div>
                                    <div className="admin-panel-data d-flex align-items-center justify-content-center">
                                        <form className="change-password-form mt-3 mb-5">



                                            <div class="profile-input form-floating profile-password-input mb-5 my-2 password-input">
                                                <img
                                                    src={passwordVisibility.oldPassword ? eyeopendark : eyeclosedark}


                                                    alt=""
                                                    class="password-view-toggle"
                                                    onClick={() => togglePasswordVisibility('oldPassword')}

                                                />
                                                <input
                                                    name="password"
                                                    id="password"
                                                    type={passwordVisibility.oldPassword ? 'text' : 'password'}
                                                    placeholder="Enter Old Password"
                                                    class="form-control"
                                                    maxlength="15"
                                                    autofocus
                                                    onChange={(event) => setOldPassword(event.target.value)}


                                                />
                                                <label className="profile-La" for="oldPassword password">Old Password</label>
                                                {!validPassword && flagCheck && !myPassCheck &&<span class="error"
                                                >Old and New password should not be same</span
                                                >}
                                            </div>

                                             {/* progress bar */}

                                             <div
                                             class="d-flex justify-content-between mt-4  password-instructions-profile"
                                             id="password-instructions-profile"
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
                                        

                                            <div class="profile-input form-floating profile-password-input mb-5 my-2 pwd-container input-box form-floating password-input">
                                                <img
                                                    src={passwordVisibility.newPassword ? eyeopendark : eyeclosedark}
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
                                                <label className="profile-La" for="pincode newPassword">New Password</label>
                                                {/* <div id="passwordError" class="error d-none">Invalid password. Please follow the password instructions below.</div> */}

                                            </div>
                                            {/* progress bar */}

                                        

                                            {/* end */}
                                            <br></br>


                                            <div class="profile-input form-floating profile-password-input mb-5 my-2 password-input">
                                                <img
                                                    src={passwordVisibility.confirmPassword ? eyeopendark : eyeclosedark}
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
                                                <label className="profile-La" htmlFor="pincode">Confirm Password</label>
                                                {password != userConfirmPassword && confirmCheck && <span class="error"
                                                >Confirm password does not match with new password</span
                                                >}
                                            </div>

                                        </form>
                                    </div>
                                    <hr style={{ border: "1px solid #F9F9F9", margin: 0 }} />

                                    {/* <hr style="background-color: transparent; padding:0;"> */}

                                    <ddubbton className="admin-panel-data base d-flex align-items-center justify-content-between">
                                        <button className="admin-back-btn cancel">
                                            <a href="./dashboard">Cancel</a>
                                        </button>
                                        <button className="admin-download-btn admin-share-btn save" onClick={handleSaveChange}  >
                                            <a  >Save</a>
                                        </button>
                                    </ddubbton>
                                </div>
                            </div>
                            {/* FOOTER START  */}
                            <Footer />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
} 

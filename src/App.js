import React, { Component, useState } from 'react';
import { useEffect } from 'react';
import logo from './logo.svg';
import '../src/assets/css/App.css'
import Login from './spectra_one_new/Login'
import Login1 from './spectra_one_new/Login1'
import Otp from './spectra_one_new/Otp';
import Dashboard from './spectra_one_new/Dashboard';
// import DashboardAvs from './aivis/dashboardAvs.js'
import DashboardAvs from './spectra_one_new/DashboardAvs.js';
import Notification from './Notification';
// import ForgotDetails from './spectra_one/ForgotDetails';
import ForgetDetails from './spectra_one_new/ForgetDetails'
import ForgetDetailsSuccessEmail from './spectra_one_new/ForgetDetailSuccessEmail'
import ForgetDetailsSuccessMobile from './spectra_one_new/ForgetDetailSuccessMobile'
import OtpVerification from './spectra_one_new/OtpVerification';
// import ForgotDetailsSuccess from './spectra_one/ForgotDetailsSuccess';
import { BrowserRouter, Routes, Route, Navigate  } from "react-router-dom";
import ResetPassword from './spectra_one_new/ResetPassword'
import ResetPasswordSuccess from './spectra_one_new/ResetPasswordSuccess'
import './firebase.js'
// import DashboardBackup from './spectra_one_new/DashboardBackup';
import EncryptDecryptComponent from './spectra_one_new/YourComponent '
import PrivateRoute from './PrivateRoute';
import AccountDetails from './spectra_one_new/AccountDetails';
import ServiceRequest from './spectra_one_new/ServiceRequest';
import ServiceRequestAvs from './spectra_one_new/ServiceRequestAvs';
import SupportRequest from './spectra_one_new/Support';

import PaymentDetailsInvoice from './helper/AccountDetailsHelper/PaymentDetailsInvoice';

import ViewUserDetails from './helper/AccountDetailsHelper/ViewUserDetails';
import PasswordManagement from "./helper/PasswordManagement";
import ForgetDetailsSuccess from './spectra_one_new/ForgetDetailSuccessEmail';
import PrivacyPolicy from './spectra_one_new/PrivacyPolicy';
import TermsandCondition from './spectra_one_new/TermsAndCondition';
import Register from './spectra_one_new/Register.js';
import AccountDetailsAvs from './aivis/AccountDetailsAvs.js'
import GetMacAddress from './spectra_one_new/getMacAdd.js'
import Test from './test.js'

function App() {
  const tp = sessionStorage.getItem('tp');
  const [getAivisCheck, setAivisCheck] = useState(tp??null);
  const [credentialKey, setCredentialKey] = useState(null);
  
  // useEffect(() => {
  //   console.log('getAivisCheck', getAivisCheck);
  // }, [getAivisCheck]);

  const handleLogin = (key) => {
    let abc = sessionStorage.getItem('credentialKey');
    setCredentialKey(abc);
  };
  return (

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login1 setAivisCheck={setAivisCheck}/>} />
        <Route path="/getMacAddress" element={<GetMacAddress />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/yourComponent" element={<EncryptDecryptComponent />} />
        <Route path="/dashboard" element={getAivisCheck=="AIVIS"?<DashboardAvs/>:<Dashboard />} />
        <Route path="/accountDetails" element={<AccountDetails />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        {/* <Route path="/dashboardbackup" element={<DashboardBackup />} /> */}
        <Route path="/forgotDetails" element={<ForgetDetails />} />
        <Route path="/forgetDetailSuccess" element={<ForgetDetailsSuccess />} />
        <Route path="/forgetDetailSuccessEmail" element={<ForgetDetailsSuccessEmail />} />
        <Route path="/forgetDetailSuccessMobile" element={<ForgetDetailsSuccessMobile />} />
        <Route path="/otpverification" element={<OtpVerification />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/reset-password-success" element={<ResetPasswordSuccess />} />
        {/* <Route path="/forgotDetailsSuccess" element={<ForgotDetailsSuccess />} /> */}
        <Route path="/paymentDetailsInvoice" element={<PaymentDetailsInvoice />} />
        <Route path="/viewUserDetails" element={<ViewUserDetails />} />
        <Route path="/servicerequests" element={getAivisCheck=="AIVIS"?<ServiceRequestAvs /> : <ServiceRequest />} />
        <Route path="/support" element={<SupportRequest />} />
        <Route path="/passwordmanagement" element={<PasswordManagement />} />
        <Route path="/termsandcondition" element={< TermsandCondition />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>

  );
}

export default App;

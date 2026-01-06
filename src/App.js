import React, { Suspense, useEffect, useState, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";

/* ===========================
   EXISTING (2nd App.js) IMPORTS
   ⚠️ DO NOT TOUCH
=========================== */
import logo from './logo.svg';
import '../src/assets/css/App.css'
import Login from './spectra_one_new/Login'
import Login1 from './spectra_one_new/Login1'
import Otp from './spectra_one_new/Otp';
import Dashboard from './spectra_one_new/Dashboard';
import UmpDashboard from './pages/Dashboard';
import DashboardAvs from './spectra_one_new/DashboardAvs.js';
import Notification from './Notification';
import ForgetDetails from './spectra_one_new/ForgetDetails'
import ForgetDetailsSuccessEmail from './spectra_one_new/ForgetDetailSuccessEmail'
import ForgetDetailsSuccessMobile from './spectra_one_new/ForgetDetailSuccessMobile'
import OtpVerification from './spectra_one_new/OtpVerification';
import ResetPassword from './spectra_one_new/ResetPassword'
import ResetPasswordSuccess from './spectra_one_new/ResetPasswordSuccess'
import './firebase.js'
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

/* ===========================
   NEW (1st App.js) IMPORTS
=========================== */
import AppLayout from './components/AppLayout';
import ErrorBoundary from './components/ErrorBoundary';
import RouteLoader from './components/RouteLoader';
import SupportChatbot from './components/SupportChatbot';
import CustomerViewBanner from './components/CustomerViewBanner';
import { useAuth } from './context/AuthContext';
import { useCustomerView } from './context/CustomerViewContext';
import { Permissions, InternalPermissions, UserTypes } from './utils/accessLevels';
import { routes } from './config/routes';

import './components/Badge.css';
import './pages/Dashboard.css';
import './pages/Internal/InternalDashboard.css';
import './pages/Internal/SiteManagement.css';
import './pages/Internal/CustomerManagement.css';
import './pages/UserManagement/UserManagement.css';
import './pages/DeviceManagement/DeviceList.css';
import './pages/Reports/ReportDashboard.css';
import './pages/KnowledgeCenter/KnowledgeHome.css';
import './pages/ActivityLogs/ActivityLogs.css';

const LoginUMP = lazy(() => import('./pages/Auth/Login'));
const ForgotDetailsUMP = lazy(() => import('./pages/Auth/ForgotDetails'));

/* ===========================
   FIRST APP LOGIC (UMP)
=========================== */

const PrivateRouteUMP = ({ requiredPermission, children, fallbackMessage }) => {
  const { currentUser, isAuthenticated, userPermissions } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/ump/login" state={{ from: location }} replace />;
  }

  let permissions = userPermissions;

  if (!permissions || Object.keys(permissions).length === 0) {
    if (currentUser?.userType === UserTypes.INTERNAL) {
      permissions = InternalPermissions[currentUser.role];
    } else {
      permissions = Permissions[currentUser?.accessLevel]?.[currentUser?.role];
    }
  }

  if (!permissions || permissions[requiredPermission]) {
    return children;
  }

  return <Navigate to="/ump/dashboard" replace />;
};

const ScrollToTopUMP = () => {
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location.pathname]);
  return null;
};

const CustomerViewModeHandler = () => {
  const { isImpersonating } = useCustomerView();
  useEffect(() => {
    document.body.classList.toggle('customer-view-active', isImpersonating);
  }, [isImpersonating]);
  return <CustomerViewBanner />;
};

const AuthenticatedUMP = () => (
  <>
    <AppLayout>
      <Suspense fallback={<RouteLoader />}>
        <Routes>
          <Route path="/" element={<Navigate to="dashboard" replace />} />
          {routes.map(route => (
            <Route
              key={route.path}
              path={route.path.replace('/', '')}
              element={
                <PrivateRouteUMP requiredPermission={route.requiredPermission}>
                  <route.component />
                </PrivateRouteUMP>
              }
            />
          ))}
        </Routes>
      </Suspense>
    </AppLayout>
    <SupportChatbot />
  </>
);

/* ===========================
   FINAL APP (MERGED)
=========================== */

function App() {
  const tp = sessionStorage.getItem('tp');
  const [getAivisCheck, setAivisCheck] = useState(tp ?? null);

  return (
    <BrowserRouter>
      <Routes>

        {/* ===== EXISTING ROUTES (UNCHANGED) ===== */}
        <Route path="/" element={<Login1 setAivisCheck={setAivisCheck} />} />
        <Route path="/getMacAddress" element={<GetMacAddress />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/yourComponent" element={<EncryptDecryptComponent />} />
        <Route path="/dashboard" element={getAivisCheck === "AIVIS" ? <DashboardAvs /> : <Dashboard />} />
        <Route path="/ump/dashboard" element={<UmpDashboard />} />
        <Route path="/accountDetails" element={<AccountDetails />} />
        <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route path="/forgotDetails" element={<ForgetDetails />} />
        <Route path="/forgetDetailSuccess" element={<ForgetDetailsSuccess />} />
        <Route path="/forgetDetailSuccessEmail" element={<ForgetDetailsSuccessEmail />} />
        <Route path="/forgetDetailSuccessMobile" element={<ForgetDetailsSuccessMobile />} />
        <Route path="/otpverification" element={<OtpVerification />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/reset-password-success" element={<ResetPasswordSuccess />} />
        <Route path="/paymentDetailsInvoice" element={<PaymentDetailsInvoice />} />
        <Route path="/viewUserDetails" element={<ViewUserDetails />} />
        <Route path="/servicerequests" element={getAivisCheck === "AIVIS" ? <ServiceRequestAvs /> : <ServiceRequest />} />
        <Route path="/support" element={<SupportRequest />} />
        <Route path="/passwordmanagement" element={<PasswordManagement />} />
        <Route path="/termsandcondition" element={<TermsandCondition />} />
        <Route path="/register" element={<Register />} />
        <Route path="/test" element={<Test />} />

        {/* ===== NEW UMP APP ===== */}
        <Route path="/ump/login" element={<LoginUMP />} />
        <Route path="/ump/forgot-details" element={<ForgotDetailsUMP />} />
        <Route path="/ump/*" element={
          <>
            <ScrollToTopUMP />
            <CustomerViewModeHandler />
            <AuthenticatedUMP />
          </>
        } />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/assets/css/index.css'
import App from './App';
// import Counter from './spectra_one/Counter';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

// Disable F12, Ctrl+Shift+I, Ctrl+U, Right-click
import disableDevtool from 'disable-devtool';

// ===== Wifi Portal Snippet =====
import './components/Button.css'; // Global button styles
import { AuthProvider } from './context/AuthContext';
import { AccessLevelViewProvider } from './context/AccessLevelViewContext';
import { UserProvider } from './context/UserContext';
import { LoadingProvider } from './context/LoadingContext';
import { SegmentProvider } from './context/SegmentContext';
import { ThemeProvider } from './context/ThemeContext';
import { ScheduledTasksProvider } from './context/ScheduledTasksContext';
import { CustomerViewProvider } from './context/CustomerViewContext';
// =========== Wifi Portal Snippet ======

// Initialize i18n before App
import './i18n';

// Initialize Chart.js configuration globally
import './config/chartConfig';

function isDevUser() {
  // Allow access if URL has devAccess=true (e.g. ?devAccess=true)
  console.log(window.location.search);
  if (window.location.search.includes('key=!@3$%')) {
    // console.log(window.location.search);    
    sessionStorage.setItem('key', '!@3$%');
    return true;
  }
  // Allow if localStorage has saved the dev flag
  return sessionStorage.getItem('key') === '!@3!@$%';
}

if (window.location.hostname === "one.spectra.co" && window.top === window.self && !isDevUser()) {
  disableDevtool(); // <-- Block DevTools here
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <ThemeProvider>
    <AuthProvider>
      <ScheduledTasksProvider>
        <AccessLevelViewProvider>
          <SegmentProvider>
            <CustomerViewProvider>
              <UserProvider>
                <LoadingProvider>
                  <App />
                </LoadingProvider>
              </UserProvider>
            </CustomerViewProvider>
          </SegmentProvider>
        </AccessLevelViewProvider>
      </ScheduledTasksProvider>
    </AuthProvider>
  </ThemeProvider>
  // </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

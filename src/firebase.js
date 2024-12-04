// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAStKRZXnohUx4kvw5NbjF8Yol0-ynD4yQ",
  authDomain: "spectra-one.firebaseapp.com",
  projectId: "spectra-one",
  storageBucket: "spectra-one.appspot.com",
  messagingSenderId: "153493250311",
  appId: "1:153493250311:web:5decd57324385561c965a2",
  measurementId: "G-3K2X7YF3QX"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging();
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      // console.log("payload", payload)
      resolve(payload);
    });
  });
export const requestForToken = () => {
  return getToken(messaging, { vapidKey: "BHTBSpRWY5FMY-FE7UWgDOuDqg4CaR2DVA6PlowSR3HXeqnbfRULLzaDg1HGSQF91HsgXU6NYTwGoL0SDs16c6Y" })
    .then((currentToken) => {
      if (currentToken) {
        // console.log('current token for client: ', currentToken);
        localStorage.setItem('gmcToken', currentToken);
        
        // Perform any other neccessary action with the token
      } else {
        // Show permission request UI
        // console.log('No registration token available. Request permission to generate one.');
      }
    })
    .catch((err) => {
      console.error('An error occurred while retrieving token. ', err);
    });
};

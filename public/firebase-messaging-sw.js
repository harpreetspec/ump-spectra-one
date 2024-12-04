// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: `AIzaSyAStKRZXnohUx4kvw5NbjF8Yol0-ynD4yQ`,
  authDomain: `spectra-one.firebaseapp.com`,
  projectId: `spectra-one`,
  storageBucket: `spectra-one.appspot.com`,
  messagingSenderId: `153493250311`,
  appId: `1:153493250311:web:5decd57324385561c965a2`,
  measurementId: `G-3K2X7YF3QX`,
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message ', payload);
 // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle,
    notificationOptions);
});
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js');



// Initialize Firebase app
firebase.initializeApp({
  apiKey: "AIzaSyAgvhe8SFjfvLGakEN6ZFRD8qKrGvh7A9A",
  authDomain: "myclass-6cf84.firebaseapp.com",
  projectId: "myclass-6cf84",
  storageBucket: "myclass-6cf84.appspot.com",
  messagingSenderId: "520136229549",
  appId: "1:520136229549:web:73a8c2529e61a8aa817c24",
  measurementId: "G-6LXQP37V9P"
});


const messaging = firebase.messaging();

// Background message handler
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

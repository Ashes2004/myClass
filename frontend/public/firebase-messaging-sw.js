importScripts(
    "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js"
  );
  importScripts(
    "https://www.gstatic.com/firebasejs/10.12.3/firebase-messaging.js"
  );
firebase.initializeApp({
    apiKey: "AIzaSyAgvhe8SFjfvLGakEN6ZFRD8qKrGvh7A9A",
    authDomain: "myclass-6cf84.firebaseapp.com",
    projectId: "myclass-6cf84",
    storageBucket: "myclass-6cf84.appspot.com",
    messagingSenderId: "520136229549",
    appId: "1:520136229549:web:73a8c2529e61a8aa817c24",
    measurementId: "G-6LXQP37V9P"
});

// Retrieve an instance of Firebase Messaging so that it can handle background


messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });
// messages.
const messaging = firebase.messaging();
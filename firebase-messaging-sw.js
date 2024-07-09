/*eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp(
 {
  apiKey: "AIzaSyCTLYl6HFoxvnEzrTRQWb1yovvCr_UyfZg",
  authDomain: "spotkr-78da0.firebaseapp.com",
  projectId: "spotkr-78da0",
  storageBucket: "spotkr-78da0.appspot.com",
  messagingSenderId: "322887063378",
  appId: "1:322887063378:web:99746053108798b6accc8b",
  measurementId: "G-KK9RCJ9T93"
}
);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
        body: payload.notification.body,
        icon: '/favicon.ico',
        data: payload.data,
    };

    self.registration.showNotification(notificationTitle, notificationOptions);

    const channel = new BroadcastChannel('firebase-messaging-sw');
    channel.postMessage(payload);
});

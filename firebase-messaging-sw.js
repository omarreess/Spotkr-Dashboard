/*eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.10/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyBQaGZVcHdT1Kj0Jptw1HFcFD8V4E8K1xU",
    authDomain: "wadgt-customer.firebaseapp.com",
    projectId: "wadgt-customer",
    storageBucket: "wadgt-customer.appspot.com",
    messagingSenderId: "459996235838",
    appId: "1:459996235838:web:28da293fde681a06ed296f",
    measurementId: "G-0MEG7FYLW2"
});

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

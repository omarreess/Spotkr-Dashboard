import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import toastFactory from "../../../utility/factories/toastFactory";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAllNotificationsAction, setUnreadNotificationsCountAction } from "../../notification/redux/notifications";
import DateFactory from "../../../utility/factories/DateFactory";
import {generateNotificationUrl} from "../../notification/helpers/notificationHelper";

const useFirebaseLogic = () => {
    const vapidKey = 'BHDCqj_CpoMfDkxIf1QCIIKdyyLCE81nF5h6C6D54ZXv7vxnDi2o_WrPnlxpCAr857wKM4EOIdRvUbg06EbUWM8';
    const firebaseConfig = {
      apiKey: "AIzaSyCTLYl6HFoxvnEzrTRQWb1yovvCr_UyfZg",
      authDomain: "spotkr-78da0.firebaseapp.com",
      projectId: "spotkr-78da0",
      storageBucket: "spotkr-78da0.appspot.com",
      messagingSenderId: "322887063378",
      appId: "1:322887063378:web:99746053108798b6accc8b",
      measurementId: "G-KK9RCJ9T93"
    };

    const [fcmToken, setFcmToken] = useState(null);
    const [notification, setNotification] = useState({});
    const dispatch = useDispatch();
    const notifications = useSelector(state => state.notificationReducer.all.data);
    const unreadNotifications = useSelector(state => state.notificationReducer.unreadCount);

    const app = initializeApp(firebaseConfig);
    const messaging = getMessaging(app);

    const requestNotificationPermission = async () => {
        try {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                const token = await getToken(messaging, { vapidKey });
                setFcmToken(token);
            } else {
                toastFactory.error('You should allow notifications to receive messages');
            }
        } catch (error) {
            toastFactory.error('Error occurred while getting FCM token', error);
        }
    };

    const buildNotificationObject = (notification) => {
        return {
            id: notification.data.id,
            title: notification.notification.title,
            body: notification.notification.body,
            image: notification.notification.image,
            created_at: DateFactory.createInstance().currentIsoDate(),
            seen: false,
            data: notification.data,
            url: generateNotificationUrl(notification)
        };
    };

    const getUniqueNotifications = (notificationId) => {
        return notifications.filter(item => item.id !== notificationId);
    };

    const syncNotificationsState = (notification, allNotificationsMeta, updateAllNotificationsPaginationObject) => {
        const allNotifications = [
            buildNotificationObject(notification),
            ...getUniqueNotifications(notification.data.id)
        ];

        dispatch(setAllNotificationsAction(allNotifications));
        dispatch(setUnreadNotificationsCountAction(unreadNotifications + 1));
        updateAllNotificationsPaginationObject(allNotifications.length,  allNotificationsMeta.total + 1);
    };

    const onMessageListener = (callback) => {
        onMessage(messaging, callback);
    };

    const handleFcmNotifications = () => {
        const channel = new BroadcastChannel('firebase-messaging-sw');
        channel.onmessage = (event) => {
            setNotification({...event.data});
            console.log('Message received from service worker background : ', event.data);
        };
    };

    return {
        fcmToken,
        notificationObject: notification,
        setNotificationObject: setNotification,
        onMessageListener,
        requestNotificationPermission,
        handleFcmNotifications,
        getUniqueNotifications,
        syncNotificationsState
    };
};

export default useFirebaseLogic;

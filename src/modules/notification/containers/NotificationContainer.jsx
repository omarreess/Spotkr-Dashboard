import useNotificationLogic from "../hooks/useNotificationLogic";
import {useEffect} from "react";
import {formatUnreadNotificationsCount} from "../helpers/notificationHelper";
import useFirebaseLogic from "../../firebase/hooks/useFirebaseLogic";
import {isObjEmpty} from "../../../utility/Utils";
import Sound from "../assets/notification-sound.mp3";
import NotificationView from "../views/NotificationView.jsx";

// const NotificationView = lazy(() => import('../views/NotificationView'));

const NotificationContainer = () => {
    const {
        getAllNotifications,
        unreadNotificationsCount,
        deleteOneNotification,
        deleteAllNotifications,
        readOneNotification,
        readAllNotifications,
        handleNotificationClick,
        fetchNextPage,
        updateNotificationsTime,
        updateAllNotificationsPaginationObject,
        allNotification,
        unreadNotifications,
        readAllLoading,
        nextPageLoading,
        allNotificationsLoading,
        isDeleting,
        allNotificationsMeta
    } = useNotificationLogic();

    const {
        onMessageListener,
        syncNotificationsState,
        setNotificationObject,
        notificationObject
    } = useFirebaseLogic();

    useEffect(() => {
        unreadNotificationsCount();
        getAllNotifications();
    }, []);


    useEffect(() => {
        onMessageListener((payload) => {
            setNotificationObject({...payload});
        })
    }, []);

    useEffect(() => {
        const channel = new BroadcastChannel('firebase-messaging-sw');
        channel.onmessage = (event) => {
            setNotificationObject({...event.data});
        };

        return () => {
            channel.close();
        };
    }, []);

    useEffect(() => {
        if (!isObjEmpty(notificationObject)) {
            console.log(notificationObject)
            syncNotificationsState(notificationObject, allNotificationsMeta, updateAllNotificationsPaginationObject);
            const audio = new Audio(Sound);
            const isPlaying = audio.currentTime > 0 && !audio.paused && !audio.ended
                && audio.readyState > audio.HAVE_CURRENT_DATA;

            if (!isPlaying) {
                audio.play();
            }
        }

    }, [notificationObject]);

    return <NotificationView
        updateNotificationsTime={updateNotificationsTime}
        nextPageLoading={nextPageLoading}
        allNotificationsLoading={allNotificationsLoading}
        fetchNextPage={fetchNextPage}
        isDeleting={isDeleting}
        notifications={allNotification}
        handleDeletingOneNotification={deleteOneNotification}
        handleDeletingAllNotification={deleteAllNotifications}
        handleReadingOneNotification={readOneNotification}
        handleReadingAllNotification={readAllNotifications}
        handleNotificationClick={handleNotificationClick}
        unreadNotificationsCount={formatUnreadNotificationsCount(unreadNotifications)}
        readAllNotificationLoading={readAllLoading}
    />;
};

export default NotificationContainer;
import axiosInstance from "../../../axiosInstance";
import {
    setAllNotificationMetaAction,
    setAllNotificationsAction,
    setAllNotificationsLoading,
    setAllNotificationsNextPageLoading,
    setReadAllNotificationLoading,
    setReadOneNotificationLoadingAction,
    setUnreadNotificationCountLoading,
    setUnreadNotificationsCountAction
} from "../redux/notifications";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import {generateNotificationUrl} from "../helpers/notificationHelper";
import {useNavigate} from "react-router-dom";
import {isObjEmpty} from "../../../utility/Utils";

const useNotificationLogic = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isDeleting, setIsDeleting] = useState(false)
    const selector = useSelector(state => state.notificationReducer),
        allNotification = selector.all.data,
        allNotificationsMeta = selector.all.meta,
        nextPageLoading = selector.nextPageLoading,
        allNotificationsLoading = selector.showAllLoading,
        unreadNotifications = selector.unreadCount,
        readAllLoading = selector.readAllLoading,
        unreadNotificationsLoading = selector.unreadCountLoading;

    const appendUrlToNotifications = (notifications) => {
        const tmpNotifications = [...notifications]
        return tmpNotifications.map((item) => {
            return {...item, url: generateNotificationUrl(item)}
        })
    }

    const updateNotificationsTime = () => {
        dispatch(setAllNotificationsAction([...allNotification]))
    }

    const getAllNotifications = (params = {}, shouldSetData = true) => {
        params = isObjEmpty(params) ? {per_page: 10} : params

        if (allNotification.length === 0) {
            dispatch(setAllNotificationsLoading(true))

            axiosInstance.get('/notifications', {params})
                .then((result) => {
                    if (shouldSetData) {
                        dispatch(setAllNotificationsAction(appendUrlToNotifications(result.data.data)))
                    }

                    dispatch(setAllNotificationMetaAction({...result.data.meta, per_page: 10}))
                })
                .finally(() => dispatch(setAllNotificationsLoading(false)))
        }
    }

    const updateAllNotificationsPaginationObject = (allNotificationsLength = undefined, total = undefined, lastPage = undefined, currentPage = undefined) => {
        allNotificationsLength = allNotificationsLength === undefined ? allNotification.length : allNotificationsLength
        total = total === undefined ? allNotificationsMeta.total : total
        lastPage = lastPage === undefined ? Math.ceil(total / 10) : lastPage
        currentPage = currentPage === undefined ?  Math.floor(allNotificationsLength / 10) : currentPage;

        if (!currentPage) {
            currentPage = 1;
        }

        // if(currentPage > lastPage) {
        //     currentPage = lastPage
        // }

        if (!lastPage) {
            lastPage = 1
        }

        console.log('total', total, lastPage, currentPage, allNotificationsLength)
        const updated = {
            last_page: lastPage,
            total,
            current_page: currentPage,
            per_page: 10
        }


        dispatch(setAllNotificationMetaAction({...allNotificationsMeta, ...updated}))
    }

    const shouldFetchNextPage = () => {
        console.log('hi in should fetch next page')
        console.log('nextPageLoading', nextPageLoading)
        console.log('all loading', allNotificationsLoading)
        console.log('all loading', allNotificationsMeta)
        console.log('')

        return nextPageLoading === false
            && allNotificationsLoading === false
            && !!allNotification[0]
            && allNotificationsMeta.currentPage < allNotificationsMeta.lastPage
    }

    const fetchNextPage = () => {
        if (shouldFetchNextPage()) {
            dispatch(setAllNotificationsLoading(true))
            dispatch(setAllNotificationsNextPageLoading(true))

            axiosInstance
                .get('/notifications', {params: {per_page: 10, page: allNotificationsMeta.currentPage + 1}})
                .then((result) => {
                    const tmpNotifications = [...allNotification, ...appendUrlToNotifications(result.data.data)]
                    const uniqueIds = {}
                    const uniqueNotifications = []

                    tmpNotifications.forEach((notification) => {
                        if (!uniqueIds[notification.id]) {
                            uniqueIds[notification.id] = true
                            uniqueNotifications.push(notification);
                        }
                    })

                    dispatch(setAllNotificationsAction(uniqueNotifications))
                    dispatch(setAllNotificationMetaAction({...result.data.meta, per_page: 10 }))
                })
                .finally(() => {
                    dispatch(setAllNotificationsLoading(false))
                    dispatch(setAllNotificationsNextPageLoading(false))
                })
        }

    }

    const unreadNotificationsCount = () => {
        dispatch(setUnreadNotificationCountLoading(true))

        axiosInstance
            .get('notifications/unread_notifications_count')
            .then((result) => {
                dispatch(setUnreadNotificationsCountAction(result.data.data.unreadNotificationsCount))
            })
            .finally(() => dispatch(setUnreadNotificationCountLoading(false)))
    }

    const deleteOneNotification = (index) => {
        let item = allNotification[index],
            tmpNotifications = [...allNotification],
            tmpAllNotifications = [...allNotification],
            tmpCount = unreadNotifications

        tmpNotifications.splice(index, 1)

        setIsDeleting(true)
        dispatch(setAllNotificationsAction(tmpNotifications))
        dispatch(setUnreadNotificationsCountAction(tmpCount - (item.seen === false ? 1 : 0)))

        axiosInstance
            .delete(`/notifications/${item.id}`)
            .then(() => updateAllNotificationsPaginationObject(
                allNotification.length - 1,
                allNotificationsMeta.total - 1
            ))
            .catch(() => {
                dispatch(setUnreadNotificationsCountAction(tmpCount))
                dispatch(setAllNotificationsAction(tmpAllNotifications))
            })
            .finally(() => {
                item = tmpNotifications = tmpAllNotifications = tmpCount = null;
                setIsDeleting(false)
            })
    }

    const deleteAllNotifications = () => {
        let tmpNotifications = [...allNotification],
            tmpCount = unreadNotifications

        setIsDeleting(true)
        dispatch(setAllNotificationsAction([]))
        dispatch(setUnreadNotificationsCountAction(0))

        axiosInstance.delete('/notifications')
            .then(() => updateAllNotificationsPaginationObject(0, 0, 1, 1))
            .catch(() => {
                dispatch(setAllNotificationsAction(tmpNotifications))
                dispatch(setUnreadNotificationsCountAction(tmpCount))
            })
            .finally(() => {
                tmpNotifications = tmpCount = null;
                setIsDeleting(false)
            })
    }

    const readOneNotification = (index) => {
        let item = allNotification[index]

        if (item !== undefined) {
            let tmpNotifications = [...allNotification],
                tmpAllNotifications = [...allNotification],
                tmpCount = unreadNotifications

            item = {...item, ...{seen: true}}

            tmpAllNotifications = tmpAllNotifications.map((notification) => (notification.id === item.id ? item : notification))

            dispatch(setAllNotificationsAction(tmpAllNotifications))
            dispatch(setUnreadNotificationsCountAction(tmpCount - 1))

            setReadOneNotificationLoadingAction(true)

            axiosInstance
                .patch(`/notifications/${item.id}`)
                .then(() => dispatch(setUnreadNotificationsCountAction(unreadNotifications - 1)))
                .catch(() => {
                    dispatch(setAllNotificationsAction(tmpNotifications))
                    dispatch(setUnreadNotificationsCountAction(tmpCount))
                })
                .finally(() => {
                    item = tmpAllNotifications = tmpNotifications = tmpCount = null
                    setReadOneNotificationLoadingAction(false)
                })
        }
    }


    const readAllNotifications = () => {
        let tmpNotifications = [...allNotification],
            tmpCount = unreadNotifications,
            tmpAllNotifications = [...allNotification]

        tmpAllNotifications = tmpAllNotifications.map((notification) => ({...notification, ...{seen: true}}))

        dispatch(setAllNotificationsAction(tmpAllNotifications))
        dispatch(setUnreadNotificationsCountAction(0))

        dispatch(setReadAllNotificationLoading(true))

        axiosInstance.patch('/notifications')
            .catch(() => {
                dispatch(setAllNotificationsAction(tmpNotifications))
                dispatch(setUnreadNotificationsCountAction(tmpCount))
            })
            .finally(() => {
                tmpNotifications = tmpCount = tmpAllNotifications = null;
                dispatch(setReadAllNotificationLoading(false))
            })
    }

    const handleNotificationClick = async (event, index, url, isSeen) => {
        event.preventDefault()

        console.log(index, url, isSeen)
        if (!isSeen) {
            readOneNotification(index)
        }

        if (url) {
            navigate(url, {replace: true})
        }
    }

    return {
        getAllNotifications,
        unreadNotificationsCount,
        deleteOneNotification,
        deleteAllNotifications,
        readOneNotification,
        readAllNotifications,
        fetchNextPage,
        updateNotificationsTime,
        handleNotificationClick,
        updateAllNotificationsPaginationObject,
        allNotification,
        allNotificationsLoading,
        unreadNotifications,
        unreadNotificationsLoading,
        readAllLoading,
        nextPageLoading,
        isDeleting,
        allNotificationsMeta
    }
}

export default useNotificationLogic;
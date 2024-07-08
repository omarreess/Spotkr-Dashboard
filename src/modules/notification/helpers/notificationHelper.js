import NotificationTypeEnum from "../enums/NotificationTypeEnum";
import {parseRoute} from "../../../utility/helpers/routeHelper";

export const formatUnreadNotificationsCount = (value) => {
    return value === 0 ? null : (value > 99 ? `99+` : value)
}

export const generateNotificationUrl = (notificationObject) => {
    const type = notificationObject.data.type;

    switch (type) {
        // case NotificationTypeEnum.OfferRequestCreated:
        //     return parseRoute(offerRequestsRoutes.SHOW, {id: notificationObject.data.model_id})
        // case NotificationTypeEnum.SupportChat:
        //     return parseRoute()

    }

    return null;
}
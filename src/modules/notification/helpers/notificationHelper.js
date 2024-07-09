import NotificationTypeEnum from "../enums/NotificationTypeEnum";
import {parseRoute} from "../../../utility/helpers/routeHelper";

export const formatUnreadNotificationsCount = (value) => {
    return value === 0 ? null : (value > 99 ? `99+` : value)
}

export const generateNotificationUrl = (notificationObject) => {
    const type = notificationObject.data.type;

    switch (type) {
        case NotificationTypeEnum.ACTIVITY_CREATED:
            return parseRoute("thirdParty/3/activities/show/:id", {id: notificationObject.data.model_id})
        case NotificationTypeEnum.ACTIVITY_UPDATED:
            return parseRoute()

    }

    return null;
}
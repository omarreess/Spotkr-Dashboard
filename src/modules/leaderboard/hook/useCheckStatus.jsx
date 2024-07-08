import React from 'react'
import { ORDERS_STATE_ENUM } from '../pages/interface'
import Badge from '../pages/badge'

const useCheckStatus = ({status}) => {
    switch(status){
        case ORDERS_STATE_ENUM.CANCELED:
            return <Badge background={"#777777"} title={"Canceled"}/>;
        case ORDERS_STATE_ENUM.COMPLETED:
            return <Badge background={"#00a934"} title={"Completed"}/>;
        case ORDERS_STATE_ENUM.PAYMENT_DONE:
            return <Badge background={"#e4a11b"} title={"Payment done"}/>;
        case ORDERS_STATE_ENUM.PINDING:
            return <Badge background={"#2d9499"} title={"Pending"}/>;
        case ORDERS_STATE_ENUM.REFUNDED:
            return <Badge background={"#992d2d"} title={"Refunded"}/>;
        default: return null
    }


}

export default useCheckStatus

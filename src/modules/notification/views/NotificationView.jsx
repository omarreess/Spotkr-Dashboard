// ** React Imports
import {Fragment, useEffect, useState} from 'react'

// ** Custom Components
// ** Third Party Components
import classnames from 'classnames'
import PerfectScrollbar from 'react-perfect-scrollbar'
import {Bell, Trash, X} from 'react-feather'

// ** Reactstrap Imports
import {Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, Spinner, UncontrolledDropdown} from 'reactstrap'
import PropTypes from "prop-types";
import DateFactory from "../../../utility/factories/DateFactory";

const NotificationView = ({
                              notifications,
                              handleDeletingAllNotification,
                              handleReadingOneNotification,
                              handleDeletingOneNotification,
                              handleReadingAllNotification,
                              handleNotificationClick,
                              unreadNotificationsCount,
                              readAllNotificationLoading,
                              fetchNextPage,
                              nextPageLoading,
                              allNotificationsLoading,
                              isDeleting,
                              updateNotificationsTime
                          }) => {

    const renderNotificationItems = () => {
        return (
            <PerfectScrollbar
                component='li'
                className='media-list scrollable-container'
                onYReachEnd={fetchNextPage}
                options={{
                    wheelPropagation: false
                }}
            >
                {notifications.map((item, index) => {
                    return (
                        <a
                            key={index}
                            className='d-flex'
                            href={item.switch ? '#' : '/'}
                            onClick={e => {
                                if (!item.switch) {
                                    e.preventDefault()
                                }
                            }}
                        >
                            <div
                                className={classnames('list-item d-flex', {
                                    'align-items-start': !item.switch,
                                    'align-items-center': item.switch
                                })}
                            >

                                <Fragment>
                                    <div className='d-flex align-self-center me-1'>
                                        <Bell size={25}/>
                                    </div>
                                    <div className='list-item-body flex-grow-1'
                                         onClick={(event) => handleNotificationClick(event, index, item.url, item.seen)}>
                                        <p className='media-heading'>
                                            <span className='fw-bolder'>{item.title}</span>
                                        </p>
                                        <small className='notification-text'>{item.body}</small>
                                        <div
                                            className={'font-weight-bold font-small-3'}>{DateFactory.createInstance(item.created_at).diffForHumans()}</div>
                                    </div>
                                    <div className='d-flex flex-column align-items-center'>
                                        {!item.seen && <span className='bullet bullet-sm bullet-primary mb-1'
                                                             onClick={() => handleReadingOneNotification(index)}></span>}
                                        <X size={18} onClick={() => handleDeletingOneNotification(index)}/>
                                    </div>
                                </Fragment>

                            </div>
                        </a>
                    )
                })}
                {nextPageLoading &&
                    <div className={'d-flex justify-content-center align-items-center'}><Spinner color='primary'
                                                                                                 className={'text-center'}>Loading</Spinner>
                    </div>}
            </PerfectScrollbar>
        )
    }
    /*eslint-enable */


    const [renderedNotifications, setRenderedNotifications] = useState([])

    useEffect(() => {
        if (
            (!!notifications[0] && allNotificationsLoading === false)
            || nextPageLoading === true
            || isDeleting

        ) {
            setRenderedNotifications(renderNotificationItems())
        }
    }, [allNotificationsLoading, notifications]);

    return (
        <UncontrolledDropdown tag='li' className='dropdown-notification nav-item me-25' onToggle={(e, isOpen) => {
            if (isOpen) {
                updateNotificationsTime()
            }
        }}>
            <DropdownToggle tag='a' className='nav-link' href='/' onClick={(e) => e.preventDefault()}>
                <Bell size={21}/>

                {unreadNotificationsCount && <Badge pill color='danger' className='badge-up'>
                    {unreadNotificationsCount}
                </Badge>}
            </DropdownToggle>
            <DropdownMenu end tag='ul' className='dropdown-menu-media mt-0'>
                <li className='dropdown-menu-header'>
                    <DropdownItem className='d-flex' tag='div' header>
                        <h4 className='notification-title mb-0 me-auto'>Notifications</h4>
                        <a href='/' onClick={!!notifications[0] ? handleDeletingAllNotification : () => {
                        }}><Trash size={18}/></a>
                    </DropdownItem>
                </li>
                {renderedNotifications}
                <li className='dropdown-menu-footer'>
                    <Button color='primary' block onClick={handleReadingAllNotification}
                            disabled={unreadNotificationsCount === null || readAllNotificationLoading || !!!notifications[0]}>
                        Read all notifications
                    </Button>
                </li>
            </DropdownMenu>
        </UncontrolledDropdown>
    )
}

NotificationView.propTypes = {
    notifications: PropTypes.array,
    unreadNotificationsCount: PropTypes.number,
    handleReadingOneNotification: PropTypes.func.isRequired,
    handleReadingAllNotification: PropTypes.func.isRequired,
    handleDeletingOneNotification: PropTypes.func.isRequired,
    handleDeletingAllNotification: PropTypes.func.isRequired,
    handleNotificationClick: PropTypes.func.isRequired,
    fetchNextPage: PropTypes.func,
    nextPageLoading: PropTypes.bool
}

export default NotificationView

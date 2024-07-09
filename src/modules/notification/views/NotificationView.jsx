// ** React Imports
import { Fragment, useEffect, useState } from "react";
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Custom Components
// ** Third Party Components
import classnames from "classnames";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Bell, Trash, X } from "react-feather";

// ** Reactstrap Imports
import {
  Badge,
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";
import PropTypes from "prop-types";
import DateFactory from "../../../utility/factories/DateFactory";
import { generateNotificationUrl } from "../helpers/notificationHelper";

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
  updateNotificationsTime,
}) => {
  const renderNotificationItems = () => {
    return (
      <PerfectScrollbar
        component="li"
        className="media-list scrollable-container"
        onYReachEnd={fetchNextPage}
        options={{
          wheelPropagation: true,
        }}
      >
        {notifications.map((item, index) => {
          console.log(item)
          return (
            <a
              key={index}
              className="flex gap-[10px]"
              href={item.switch ? "#" : "/"}
              onClick={(e) => {
                if (!item.switch) {
                  e.preventDefault();
                }
              }}
            >
              <div
                className={`${classnames("list-item d-flex", {
                  "align-items-start": !item.switch,
                  "align-items-center": item.switch,
                })} gap-[10px] w-full p-1`}
              >
                <div onClick={()=>generateNotificationUrl(item)} style={{background: item.seen ? "rgba(209, 213, 219, .5)" : "white"}}
                className="flex border rounded-md p-1">
                  <div className="d-flex text-red-600 align-self-center me-1">
                    <Bell size={25} />
                  </div>
                  <div
                    className="list-item-body flex-grow-1"
                    onClick={(event) =>
                      handleNotificationClick(event, index, item.url, item.seen)
                    }
                  >
                    <p className="media-heading">
                      <span className="fw-bolder text-red-400">{item.title}</span>
                    </p>
                    <small className="notification-text text-black">{item.body}</small>
                    <div className={"font-weight-bold font-small-3"}>
                      {DateFactory.createInstance(
                        item.created_at
                      ).diffForHumans()}
                    </div>
                  </div>
                  <div className="d-flex flex-column align-items-center">
                    {!item.seen && (
                      <span
                        className="bullet bullet-sm bullet-primary mb-1"
                        onClick={() => handleReadingOneNotification(index)}
                      ></span>
                    )}
                    <X
                    className="text-red-500"
                      size={18}
                      onClick={() => handleDeletingOneNotification(index)}
                    />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
        {nextPageLoading && (
          <div className={"d-flex justify-content-center align-items-center"}>
            <Spinner color="primary" className={"text-center"}>
              Loading
            </Spinner>
          </div>
        )}
      </PerfectScrollbar>
    );
  };
  /*eslint-enable */
console.log(nextPageLoading, "nextPageLoading")
  const [renderedNotifications, setRenderedNotifications] = useState([]);

  useEffect(() => {
    if (
      (!!notifications[0] && allNotificationsLoading === false) ||
      nextPageLoading === true ||
      isDeleting
    ) {
      setRenderedNotifications(renderNotificationItems());
    }
  }, [allNotificationsLoading, notifications]);

  return (
    <UncontrolledDropdown
      tag="li"
      className="dropdown-notification nav-item me-25 list-none mt-3 mx-4"
      onToggle={(e, isOpen) => {
        if (isOpen) {
          updateNotificationsTime();
        }
      }}
    >
      <DropdownToggle
        tag="a"
        className="!list-none nav-link"
        href="/"
        onClick={(e) => e.preventDefault()}
      >
        <Bell size={25} className="mb-3" />

        {unreadNotificationsCount && (
          <Badge pill color="danger" className="badge-up list-none ml-1 absolute top-7 animate-bounce right-[2.8px]">
            {unreadNotificationsCount}
          </Badge>
        )}
      </DropdownToggle>
      <DropdownMenu end tag="ul" className="dropdown-menu-media mt-0 shadow-md">
        <li className="dropdown-menu-header shadow-md !rounded-md">
          <DropdownItem className="d-flex gap-28 rounded-md" tag="div" header>
            <h4 className="notification-title mb-0 me-auto">Notifications</h4>
            <a
              href="/"
              onClick={
                !!notifications[0] ? handleDeletingAllNotification : () => {}
              }
              className="mt-2 text-red-500"
            >
              <Trash size={18} />
            </a>
          </DropdownItem>
        </li>
        {renderedNotifications}
        <li className="dropdown-menu-footer">
          <Button
            className="bg-red-500"
            block
            onClick={handleReadingAllNotification}
            disabled={
              unreadNotificationsCount === null ||
              readAllNotificationLoading ||
              !!!notifications[0]
            }
          >
            Read all notifications
          </Button>
        </li>
      </DropdownMenu>
    </UncontrolledDropdown>
  );
};

NotificationView.propTypes = {
  notifications: PropTypes.array,
  unreadNotificationsCount: PropTypes.number,
  handleReadingOneNotification: PropTypes.func.isRequired,
  handleReadingAllNotification: PropTypes.func.isRequired,
  handleDeletingOneNotification: PropTypes.func.isRequired,
  handleDeletingAllNotification: PropTypes.func.isRequired,
  handleNotificationClick: PropTypes.func.isRequired,
  fetchNextPage: PropTypes.func,
  nextPageLoading: PropTypes.bool,
};

export default NotificationView;

import { useState } from 'react';
import NofificationCard from './NofificationCard';
import NotificationButton from './notificationButton';
import PerfectScrollbar from 'react-perfect-scrollbar'
import useNotificationLogic from '../../modules/notification-test/hooks/useNotificationLogic';

function NofificationDropdown({
  notifications,
  handleDeletingAllNotification,
  handleReadingOneNotification,
  handleDeletingOneNotification,
  handleReadingAllNotification,
  unreadNotificationsCount,
  readAllNotificationLoading,
  fetchNextPage,
  nextPageLoading,
  allNotificationsLoading,
  isDeleting
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
    console.log(data, "Nofification")
  return (
    <div className="flex justify-center">
      <div className="relative">
        <NotificationButton dropdownOpen={dropdownOpen} setDropdownOpen={setDropdownOpen}/>

        {dropdownOpen && <div onClick={() => setDropdownOpen(!dropdownOpen)} className="fixed inset-0 h-full w-full z-10"></div>}

        {dropdownOpen && (
          <PerfectScrollbar
                component='li'
                className='media-list scrollable-container'
                onYReachEnd={fetchNextPage}
                options={{
                    wheelPropagation: false
                }}
            >
          <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-[99999999] overflow-hidden" style={{ width: '20rem' }}>
            <div className="py-2 overflow-x-hidden overflow-y-scroll h-[300px]">
                <NofificationCard/>
                <NofificationCard/>
                <NofificationCard/>
                <NofificationCard/>
                <NofificationCard/>
                <NofificationCard/>
                <NofificationCard/>
                <NofificationCard/>
                <NofificationCard/>
                <NofificationCard/>
                <NofificationCard/>
            </div>
          </div>
          </PerfectScrollbar>
        )}
      </div>
    </div>
  );
}

export default NofificationDropdown;

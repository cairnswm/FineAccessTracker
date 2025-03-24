import React from 'react';
import RecentActivityTable from '../dashboard/RecentActivityTable';

const ActivityTab = ({ application, activityData }) => {
  return (
    <RecentActivityTable activities={activityData} />
  );
};

export default ActivityTab;
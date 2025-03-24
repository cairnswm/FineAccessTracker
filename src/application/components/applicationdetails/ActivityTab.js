import React from 'react';
import ActivityTable from '../tracking/ActivityTable';

const ActivityTab = ({ application, activityData }) => {
  return (
    <ActivityTable 
      activities={activityData}
      title={`Recent Activity for ${application.name}`}
      showApplicationColumn={false}
    />
  );
};

export default ActivityTab;
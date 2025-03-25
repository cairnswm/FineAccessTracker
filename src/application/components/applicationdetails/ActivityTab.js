import React from "react";
import RecentActivityTable from "../dashboard/RecentActivityTable";
import ComingSoon from "../../../auth/components/comingsoon";

const ActivityTab = ({ application, activityData }) => {
  return (
    <>
      <RecentActivityTable activities={activityData} />
      <ComingSoon more="Event level tracking coming soon, allowing you to track custom events and actions on your site." />
    </>
  );
};

export default ActivityTab;

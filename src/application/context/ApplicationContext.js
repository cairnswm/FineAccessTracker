import React, { createContext } from "react";
import { ApplicationsProvider } from "./ApplicationsContext";
import { PageTrackingProvider } from "./PageTrackingContext";
import { ItemTrackingProvider } from "./ItemTrackingContext";
import { ActivityTrackingProvider } from "./ActivityTrackingContext";
import { UsersProvider } from "./UsersContext";

// Create a combined context for backward compatibility
const ApplicationContext = createContext(null);

export const ApplicationProvider = ({ children }) => {
  return (
    <ApplicationsProvider>
      <PageTrackingProvider>
        <ItemTrackingProvider>
          <ActivityTrackingProvider>
            <UsersProvider>
              {children}
            </UsersProvider>
          </ActivityTrackingProvider>
        </ItemTrackingProvider>
      </PageTrackingProvider>
    </ApplicationsProvider>
  );
};

// Re-export all the individual context hooks for direct use
export { useApplications } from "./ApplicationsContext";
export { usePageTracking } from "./PageTrackingContext";
export { useItemTracking } from "./ItemTrackingContext";
export { useActivityTracking } from "./ActivityTrackingContext";
export { useApplicationUsers } from "./UsersContext";

export default ApplicationContext;

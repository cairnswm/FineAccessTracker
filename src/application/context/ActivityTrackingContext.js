import React, { createContext, useState, useContext, useEffect } from "react";
import mockActivityTracking from "../data/mockActivityTracking";
import { useApplications } from "./ApplicationsContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTenant } from "../../auth/hooks/useTenant";
import { combineUrlAndPath } from "../../auth/utils/combineUrlAndPath";
import { REACT_APP_ACCESS_API } from "../../env";

const ActivityTrackingContext = createContext(null);

export const useActivityTracking = () => {
  const context = useContext(ActivityTrackingContext);
  if (context === undefined) {
    throw new Error("useActivityTracking must be used within an ActivityTrackingProvider");
  }
  return context;
};

export const ActivityTrackingProvider = ({ children }) => {
  const [activityTracking, setActivityTracking] = useState(mockActivityTracking);
  const [loading, setLoading] = useState(false);
  const { activeApplicationId } = useApplications();
  const { token } = useAuth();
  const { tenant } = useTenant();

  
  const fetchActivityTracking = async () => {
    if (!activeApplicationId || !token) return;
    
    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${activeApplicationId}/events?limit=100`), 
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'App_id': tenant
          }
        }
      );
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      setActivityTracking(data);
    } catch (error) {
      console.error("Error fetching activity tracking:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    
    fetchActivityTracking();
  }, [activeApplicationId, token, tenant]);

  // Activity tracking operations
  const getActivityTracking = (filters = {}) => {
    let filtered = [...activityTracking];
    
    if (filters.applicationId) {
      filtered = filtered.filter(activity => 
        activity.application_id === parseInt(filters.applicationId)
      );
    }
    
    if (filters.type) {
      filtered = filtered.filter(activity => activity.type === filters.type);
    }
    if (filters.page) {
      filtered = filtered.filter(activity => activity.page === filters.page);
    }
    
    if (filters.itemId) {
      filtered = filtered.filter(activity => activity.itemId === filters.itemId);
    }

    // Sort by timestamp (most recent first)
    return filtered.sort((a, b) => 
      new Date(b.timestamp) - new Date(a.timestamp)
    );
  };

  const addActivityTracking = (newActivity) => {
    const activityWithId = {
      ...newActivity,
      id: activityTracking.length > 0 ? Math.max(...activityTracking.map(a => a.id)) + 1 : 1,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19)
    };
    setActivityTracking([activityWithId, ...activityTracking]);
  };

  return (
    <ActivityTrackingContext.Provider 
      value={{ 
        activityTracking,
        getActivityTracking,
        addActivityTracking,
        loading
      }}
    >
      {children}
    </ActivityTrackingContext.Provider>
  );
};

export default ActivityTrackingContext;

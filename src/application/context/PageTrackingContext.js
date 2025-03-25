import React, { createContext, useState, useContext, useEffect } from "react";
import mockPageTracking from "../data/mockPageTracking";
import { useApplications } from "./ApplicationsContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTenant } from "../../auth/hooks/useTenant";
import { REACT_APP_ACCESS_API } from "../../env";

const PageTrackingContext = createContext(null);

export const usePageTracking = () => {
  const context = useContext(PageTrackingContext);
  if (context === undefined) {
    throw new Error("usePageTracking must be used within a PageTrackingProvider");
  }
  return context;
};

export const PageTrackingProvider = ({ children }) => {
  const [pageTracking, setPageTracking] = useState(mockPageTracking);
  const [loading, setLoading] = useState(false);
  const { activeApplicationId } = useApplications();
  const { token } = useAuth();
  const { tenant } = useTenant();

  const fetchPageData = async (applicationId) => {
    if (!applicationId || !token) return;
    
    setLoading(true);
    try {
      // Fetch summary data
      const summaryResponse = await fetch(combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${applicationId}/page`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'App_id': tenant
        }
      });
      
      if (!summaryResponse.ok) {
        throw new Error(`API request failed with status ${summaryResponse.status}`);
      }
      
      const summaryData = await summaryResponse.json();
      
      // Fetch day by day data
      const dayByDayResponse = await fetch(combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${applicationId}/pagebyday`), {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
          'App_id': tenant
        }
      });
      
      if (!dayByDayResponse.ok) {
        throw new Error(`API request failed with status ${dayByDayResponse.status}`);
      }
      
      const dayByDayData = await dayByDayResponse.json();
      
      // Process and combine the data
      const processedData = summaryData.map(page => {
        // Find day by day data for this page
        const pageDetailData = dayByDayData.filter(item => 
          item.page === page.page && item.applicationId === parseInt(applicationId)
        );
        
        return {
          ...page,
          applicationId: parseInt(applicationId),
          dailyData: pageDetailData
        };
      });
      
      // Update state with the fetched data
      setPageTracking(processedData);
    } catch (error) {
      console.error("Error fetching page tracking data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeApplicationId) {
      fetchPageData(activeApplicationId);
    }
  }, [activeApplicationId, token, tenant]);

  // Page tracking operations
  const getPageTrackingByAppId = (applicationId) => {
    return pageTracking.filter(page => page.applicationId === parseInt(applicationId));
  };

  const addPageTracking = (newPageTracking) => {
    setPageTracking([...pageTracking, newPageTracking]);
  };

  const updatePageTracking = (applicationId, page, updatedData) => {
    setPageTracking(pageTracking.map(p => 
      (p.applicationId === parseInt(applicationId) && p.page === page) 
        ? { ...p, ...updatedData } 
        : p
    ));
  };

  const deletePageTracking = (applicationId, page) => {
    setPageTracking(pageTracking.filter(p => 
      !(p.applicationId === parseInt(applicationId) && p.page === page)
    ));
  };

  return (
    <PageTrackingContext.Provider 
      value={{ 
        pageTracking,
        getPageTrackingByAppId,
        addPageTracking,
        updatePageTracking,
        deletePageTracking,
        fetchPageData,
        loading
      }}
    >
      {children}
    </PageTrackingContext.Provider>
  );
};

export default PageTrackingContext;

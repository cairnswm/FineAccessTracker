import React, { createContext, useState, useContext, useEffect } from "react";
import mockItemTracking from "../data/mockItemTracking";
import { useApplications } from "./ApplicationsContext";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTenant } from "../../auth/hooks/useTenant";
import { REACT_APP_ACCESS_API } from "../../env";

const ItemTrackingContext = createContext(null);

export const useItemTracking = () => {
  const context = useContext(ItemTrackingContext);
  if (context === undefined) {
    throw new Error("useItemTracking must be used within an ItemTrackingProvider");
  }
  return context;
};

export const ItemTrackingProvider = ({ children }) => {
  const [itemTracking, setItemTracking] = useState(mockItemTracking);
  const [loading, setLoading] = useState(false);
  const { activeApplicationId } = useApplications();
  const { token } = useAuth();
  const { tenant } = useTenant();

  const fetchItemData = async (applicationId) => {
    if (!applicationId || !token) return;
    
    setLoading(true);
    try {
      // Fetch summary data
      const summaryResponse = await fetch(combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${applicationId}/item`), {
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
      const dayByDayResponse = await fetch(combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${applicationId}/itembyday`), {
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
      const processedData = summaryData.map(item => {
        // Find day by day data for this item
        const itemDetailData = dayByDayData.filter(detail => 
          detail.itemId === item.itemId && 
          detail.page === item.page && 
          detail.applicationId === parseInt(applicationId)
        );
        
        return {
          ...item,
          applicationId: parseInt(applicationId),
          dailyData: itemDetailData
        };
      });
      
      // Update state with the fetched data
      setItemTracking(processedData);
    } catch (error) {
      console.error("Error fetching item tracking data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeApplicationId) {
      fetchItemData(activeApplicationId);
    }
  }, [activeApplicationId, token, tenant]);

  // Item tracking operations
  const getItemTrackingByAppIdAndPage = (applicationId, page) => {
    return itemTracking.filter(item => 
      item.applicationId === parseInt(applicationId) && item.page === page
    );
  };

  const addItemTracking = (newItemTracking) => {
    setItemTracking([...itemTracking, newItemTracking]);
  };

  const updateItemTracking = (applicationId, page, itemId, updatedData) => {
    setItemTracking(itemTracking.map(item => 
      (item.applicationId === parseInt(applicationId) && item.page === page && item.itemId === itemId) 
        ? { ...item, ...updatedData } 
        : item
    ));
  };

  const deleteItemTracking = (applicationId, page, itemId) => {
    setItemTracking(itemTracking.filter(item => 
      !(item.applicationId === parseInt(applicationId) && item.page === page && item.itemId === itemId)
    ));
  };

  return (
    <ItemTrackingContext.Provider 
      value={{ 
        itemTracking,
        getItemTrackingByAppIdAndPage,
        addItemTracking,
        updateItemTracking,
        deleteItemTracking,
        fetchItemData,
        loading
      }}
    >
      {children}
    </ItemTrackingContext.Provider>
  );
};

export default ItemTrackingContext;

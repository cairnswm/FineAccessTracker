import React, { createContext, useState, useContext } from "react";
import mockApplications from "../data/mockApplications";
import mockPageTracking from "../data/mockPageTracking";
import mockItemTracking from "../data/mockItemTracking";

const ApplicationContext = createContext(null);

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplications must be used within an ApplicationProvider");
  }
  return context;
};

export const ApplicationProvider = ({ children }) => {
  // Separate states for different tracking levels
  const [applications, setApplications] = useState(mockApplications);
  const [pageTracking, setPageTracking] = useState(mockPageTracking);
  const [itemTracking, setItemTracking] = useState(mockItemTracking);
  const [loading, setLoading] = useState(false);

  // Application CRUD operations
  const addApplication = (newApplication) => {
    const applicationWithId = {
      ...newApplication,
      id: applications.length > 0 ? Math.max(...applications.map(app => app.id)) + 1 : 1,
      createdAt: new Date().toISOString().split('T')[0],
      stats: {
        totalVisits: 0,
        uniqueVisitors: 0,
        bounceRate: "0%",
        avgSession: "0m 0s"
      }
    };
    setApplications([...applications, applicationWithId]);
    return applicationWithId;
  };

  const updateApplication = (id, updatedData) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, ...updatedData } : app
    ));
  };

  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
    // Also delete related page and item tracking data
    setPageTracking(pageTracking.filter(page => page.applicationId !== id));
    setItemTracking(itemTracking.filter(item => item.applicationId !== id));
  };

  const getApplication = (id) => {
    return applications.find(app => app.id === parseInt(id));
  };

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
    // Also delete related item tracking data
    setItemTracking(itemTracking.filter(item => 
      !(item.applicationId === parseInt(applicationId) && item.page === page)
    ));
  };

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
    <ApplicationContext.Provider 
      value={{ 
        // Application data and operations
        applications, 
        addApplication,
        updateApplication,
        deleteApplication,
        getApplication,
        
        // Page tracking data and operations
        pageTracking,
        getPageTrackingByAppId,
        addPageTracking,
        updatePageTracking,
        deletePageTracking,
        
        // Item tracking data and operations
        itemTracking,
        getItemTrackingByAppIdAndPage,
        addItemTracking,
        updateItemTracking,
        deleteItemTracking,
        
        loading
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;
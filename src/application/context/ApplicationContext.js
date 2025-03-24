import React, { createContext, useState, useContext } from "react";
import mockApplications from "../data/mockApplications";

const ApplicationContext = createContext(null);

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error("useApplications must be used within an ApplicationProvider");
  }
  return context;
};

export const ApplicationProvider = ({ children }) => {
  const [applications, setApplications] = useState(mockApplications);
  const [loading, setLoading] = useState(false);

  // Add a new application
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

  // Update an existing application
  const updateApplication = (id, updatedData) => {
    setApplications(applications.map(app => 
      app.id === id ? { ...app, ...updatedData } : app
    ));
  };

  // Delete an application
  const deleteApplication = (id) => {
    setApplications(applications.filter(app => app.id !== id));
  };

  // Get a single application by ID
  const getApplication = (id) => {
    return applications.find(app => app.id === parseInt(id));
  };

  return (
    <ApplicationContext.Provider 
      value={{ 
        applications, 
        loading,
        addApplication,
        updateApplication,
        deleteApplication,
        getApplication
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
};

export default ApplicationContext;
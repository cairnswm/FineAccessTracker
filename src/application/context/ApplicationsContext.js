import React, { createContext, useState, useContext, useEffect } from "react";
import { combineUrlAndPath } from "../../auth/utils/combineUrlAndPath";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTenant } from "../../auth/hooks/useTenant";
import { REACT_APP_ACCESS_API } from "../../env";

const ApplicationsContext = createContext(null);

export const useApplications = () => {
  const context = useContext(ApplicationsContext);
  if (context === undefined) {
    throw new Error(
      "useApplications must be used within an ApplicationsProvider"
    );
  }
  return context;
};

export const ApplicationsProvider = ({ children }) => {
  const { user, token } = useAuth();
  const { tenant } = useTenant();

  const [applications, setApplications] = useState([]);
  const [analytics, setAnalytics] = useState([]);
  const [dailyAnalytics, setDailyAnalytics] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeApplicationId, setActiveApplicationId] = useState(null);
  const [countryAnalytics, setCountryAnalytics] = useState([]);

  const fetchCountryAnalytics = async (appId) => {
    if (!appId || !token) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${appId}/bycountry`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            App_id: tenant,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setCountryAnalytics(data);
    } catch (error) {
      console.error("Error fetching country analytics:", error);
    } finally {
      setLoading(false);
    }
  }
  const fetchDailyAnalytics = async (appId) => {
    if (!appId || !token) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${appId}/sitebyday`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            App_id: tenant,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setDailyAnalytics(data);
    } catch (error) {
      console.error("Error fetching daily analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async (appId) => {
    if (!appId || !token) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${appId}/site`),
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            App_id: tenant,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setAnalytics(data);
    } catch (error) {
      console.error("Error fetching analytics:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchApplications = async () => {
      if (!user || !token) return;

      setLoading(true);
      try {
        const response = await fetch(
          combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/user/${user.id}/applications`),
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              App_id: tenant,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`API request failed with status ${response.status}`);
        }

        const data = await response.json();
        setApplications(data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [user, token, tenant]);

  useEffect(() => {
    if (activeApplicationId) {
      fetchAnalytics(activeApplicationId);
      fetchDailyAnalytics(activeApplicationId);
      fetchCountryAnalytics(activeApplicationId);
    }
  }, [activeApplicationId]);

  // Application CRUD operations
  const addApplication = async (newApplication) => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(
       combineUrlAndPath(REACT_APP_ACCESS_API,"api/api.php/createApplication"),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            App_id: tenant,
          },
          body: JSON.stringify(newApplication),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      const applicationWithId = {
        ...newApplication,
        id: data.id,
        api_key: data.api_key,
        totalVisits: 0,
        uniqueVisitors: 0,
        visitsToday: 0,
        visitsYesterday: 0,
        visitsTheWeek: 0,
        avgSession: "00:00:00.0000",
        lastUpdated: new Date().toISOString().split("T")[0],
        createdAt: new Date().toISOString().split("T")[0],
      };
      setApplications([...applications, applicationWithId]);

      return applicationWithId;
    } catch (error) {
      console.error("Error adding application:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplication = async (id, updatedData) => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API,`api/api.php/application/${id}`),
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            App_id: tenant,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      setApplications(
        applications.map((app) => (app.id === id ? { ...app, ...data } : app))
      );
    } catch (error) {
      console.error("Error updating application:", error);
    } finally {
      setLoading(false);
    }
    setApplications(
      applications.map((app) =>
        app.id === id ? { ...app, ...updatedData } : app
      )
    );
  };

  const deleteApplication = async (id) => {
    if (!token) return;

    setLoading(true);
    try {
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API,"api/api.php/deleteApplication"),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            App_id: tenant,
          },
          body: JSON.stringify({ id }),
        }
      );

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting application:", error);
    } finally {
      setLoading(false);
    }
    setApplications(applications.filter((app) => app.id !== id));
    setActiveApplicationId(null);
  };

  const getApplication = (id) => {
    return applications.find((app) => app.id === parseInt(id));
  };

  return (
    <ApplicationsContext.Provider
      value={{
        // Application data and operations
        applications,
        addApplication,
        updateApplication,
        deleteApplication,
        getApplication,

        // Analytics data and operations
        analytics,
        dailyAnalytics,
        countryAnalytics,

        // Active application
        activeApplicationId,
        setActiveApplicationId,

        loading,
      }}
    >
      {children}
    </ApplicationsContext.Provider>
  );
};

export default ApplicationsContext;

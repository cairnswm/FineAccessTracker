import React, { createContext, useState, useContext, useEffect } from "react";
import { combineUrlAndPath } from "../../auth/utils/combineUrlAndPath";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTenant } from "../../auth/hooks/useTenant";
import { REACT_APP_ACCESS_API } from "../../env";
import mockCampaigns from "../data/mockCampaigns";

const CampaignContext = createContext(null);

export const useCampaigns = () => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error("useCampaigns must be used within a CampaignProvider");
  }
  return context;
};

export const CampaignProvider = ({ children }) => {
  const { user, token } = useAuth();
  const { tenant } = useTenant();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [campaignClicksData, setCampaignClicksData] = useState([]);

  const fetchCampaigns = async () => {
    if (!user || !token) return;

    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would fetch from the API
      // For now, we'll use mock data
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API, `api/api.php/user/${user.id}/campaigns`),
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
      setCampaigns(data);

      // Using mock data for now
      // setCampaigns(mockCampaigns);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setError("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
  };

  const fetchCampaignClicksData = async (campaignId) => {
    try {
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API, `api/api.php/campaign/${campaignId}/clicks`),
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
      setCampaignClicksData(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setError("Failed to fetch campaigns");
    } finally {
      setLoading(false);
    }
   
  };

  useEffect(() => {
    fetchCampaigns();
  }, [user, token, tenant]);

  useEffect(() => {
    if (activeCampaign) {
      fetchCampaignClicksData(activeCampaign.id);
    }
  }, [activeCampaign]);

  const addCampaign = async (newCampaign) => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would send to the API
      // const response = await fetch(
      //   combineUrlAndPath(REACT_APP_ACCESS_API, "api/api.php/createCampaign"),
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //       App_id: tenant,
      //     },
      //     body: JSON.stringify(newCampaign),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error(`API request failed with status ${response.status}`);
      // }

      // const data = await response.json();

      // Mock implementation
      const campaignWithId = {
        ...newCampaign,
        id: Math.max(...campaigns.map((c) => c.id), 0) + 1,
      };

      setCampaigns([...campaigns, campaignWithId]);
      return campaignWithId;
    } catch (error) {
      console.error("Error adding campaign:", error);
      setError("Failed to add campaign");
    } finally {
      setLoading(false);
    }
  };

  const updateCampaign = async (id, updatedData) => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would send to the API
      // const response = await fetch(
      //   combineUrlAndPath(REACT_APP_ACCESS_API, `api/api.php/campaign/${id}`),
      //   {
      //     method: "PUT",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //       App_id: tenant,
      //     },
      //     body: JSON.stringify(updatedData),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error(`API request failed with status ${response.status}`);
      // }

      // Mock implementation
      setCampaigns(
        campaigns.map((campaign) =>
          campaign.id === id ? { ...campaign, ...updatedData } : campaign
        )
      );

      return campaigns.find((campaign) => campaign.id === id);
    } catch (error) {
      console.error("Error updating campaign:", error);
      setError("Failed to update campaign");
    } finally {
      setLoading(false);
    }
  };

  const deleteCampaign = async (id) => {
    if (!token) return;

    setLoading(true);
    setError(null);

    try {
      // In a real implementation, this would send to the API
      // const response = await fetch(
      //   combineUrlAndPath(REACT_APP_ACCESS_API, "api/api.php/deleteCampaign"),
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //       App_id: tenant,
      //     },
      //     body: JSON.stringify({ id }),
      //   }
      // );

      // if (!response.ok) {
      //   throw new Error(`API request failed with status ${response.status}`);
      // }

      // Mock implementation
      setCampaigns(campaigns.filter((campaign) => campaign.id !== id));
    } catch (error) {
      console.error("Error deleting campaign:", error);
      setError("Failed to delete campaign");
    } finally {
      setLoading(false);
    }
  };

  const getCampaign = (id) => {
    return campaigns.find((campaign) => campaign.id === parseInt(id));
  };

  const setActiveCampaignById = (id) => {
    const campaign = campaigns.find((c) => c.id === id);
    setActiveCampaign(campaign || null);
  };

  return (
    <CampaignContext.Provider
      value={{
        campaigns,
        loading,
        error,
        fetchCampaigns,
        addCampaign,
        updateCampaign,
        deleteCampaign,
        getCampaign,
        activeCampaign,
        setActiveCampaignById,
        campaignClicksData,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export default CampaignContext;

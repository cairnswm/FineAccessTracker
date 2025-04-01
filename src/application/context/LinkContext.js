import React, { createContext, useState, useContext, useEffect } from "react";
import { combineUrlAndPath } from "../../auth/utils/combineUrlAndPath";
import { useAuth } from "../../auth/hooks/useAuth";
import { useTenant } from "../../auth/hooks/useTenant";
import { REACT_APP_ACCESS_API } from "../../env";
import mockLinks from "../data/mockLinks";
import { useCampaigns } from "./CampaignContext";

const LinkContext = createContext(null);

export const useLinks = () => {
  const context = useContext(LinkContext);
  if (context === undefined) {
    throw new Error("useLinks must be used within a LinkProvider");
  }
  return context;
};

export const LinkProvider = ({ children }) => {
  const { user, token } = useAuth();
  const { tenant } = useTenant();
  const { activeCampaign } = useCampaigns();

  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchLinks = async (campaignId = null) => {
    if (!user || !token) return;

    setLoading(true);
    setError(null);
    
    try {
      const endpoint = `api/api.php/campaign/${campaignId}/links`;
      
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API, endpoint),
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
      setLinks(data);
      
    } catch (error) {
      console.error("Error fetching links:", error);
      setError("Failed to fetch links");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && token && tenant) {
      fetchLinks(activeCampaign?.id || null);
    }
  }, [user?.id, token, tenant, activeCampaign?.id]);

  const addLink = async (newLink) => {
    if (!token) return;

    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would send to the API
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API, "api/api.php/insertLink"),
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            App_id: tenant,
          },
          body: JSON.stringify(newLink),
        }
      );
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Link added:", data);
      
      // Mock implementation
      const linkWithId = {
        ...newLink,
        id: data.id,
        short_code: data.short_code,
      };
      
      setLinks([...links, linkWithId]);
      return linkWithId;
    } catch (error) {
      console.error("Error adding link:", error);
      setError("Failed to add link");
    } finally {
      setLoading(false);
    }
  };

  const updateLink = async (id, updatedData) => {
    if (!token) return;

    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would send to the API
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API, `api/api.php/link/${id}`),
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
      
      setLinks(
        links.map((link) => 
          link.id === id ? { ...link, ...updatedData } : link
        )
      );
      
      return links.find(link => link.id === id);
    } catch (error) {
      console.error("Error updating link:", error);
      setError("Failed to update link");
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (id) => {
    if (!token) return;

    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would send to the API
      const response = await fetch(
        combineUrlAndPath(REACT_APP_ACCESS_API, `api/api.php/link/${id}`),
        {
          method: "DELETE",
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

      console.log("Link deleted:", id);
      
      setLinks(links.filter((link) => link.id !== id));
    } catch (error) {
      console.error("Error deleting link:", error);
      setError("Failed to delete link");
    } finally {
      setLoading(false);
    }
  };

  const getLink = (id) => {
    return links.find((link) => link.id === parseInt(id));
  };

  const getLinkByShortCode = (shortCode) => {
    return links.find((link) => link.short_code === shortCode);
  };

  const getClicksForLink = (linkId) => {
    const link = links.find((link) => link.id === parseInt(linkId));
    return link ? link.clicks : [];
  };

  const addClickToLink = async (linkId, clickData) => {
    if (!token) return;

    setLoading(true);
    setError(null);
    
    try {
      // In a real implementation, this would send to the API
      // const response = await fetch(
      //   combineUrlAndPath(REACT_APP_ACCESS_API, `api/api.php/link/${linkId}/click`),
      //   {
      //     method: "POST",
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //       "Content-Type": "application/json",
      //       App_id: tenant,
      //     },
      //     body: JSON.stringify(clickData),
      //   }
      // );
      
      // if (!response.ok) {
      //   throw new Error(`API request failed with status ${response.status}`);
      // }
      
      // const data = await response.json();
      
      // Mock implementation
      const linkIndex = links.findIndex((link) => link.id === parseInt(linkId));
      
      if (linkIndex === -1) {
        throw new Error(`Link with ID ${linkId} not found`);
      }
      
      const newClick = {
        ...clickData,
        id: Math.max(...links[linkIndex].clicks.map(c => c.id), 0) + 1,
        link_id: parseInt(linkId),
        created_at: new Date().toISOString()
      };
      
      const updatedLinks = [...links];
      updatedLinks[linkIndex] = {
        ...updatedLinks[linkIndex],
        clicks: [...updatedLinks[linkIndex].clicks, newClick]
      };
      
      setLinks(updatedLinks);
      return newClick;
    } catch (error) {
      console.error("Error adding click:", error);
      setError("Failed to add click");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LinkContext.Provider
      value={{
        links,
        loading,
        error,
        addLink,
        updateLink,
        deleteLink,
        getLink,
        getLinkByShortCode,
        getClicksForLink,
        addClickToLink
      }}
    >
      {children}
    </LinkContext.Provider>
  );
};

export default LinkContext;

import React, { useEffect } from "react";
import { useCampaigns } from "../context/CampaignContext";

const LinkGraph = ({ id }) => {
  const { setActiveLinkId, linkClicksData } = useCampaigns();

  useEffect(() => {
    setActiveLinkId(id);
    return () => setActiveLinkId(null);
  }, [id, setActiveLinkId]);

  // Render the graph using linkClicksData
  return (
    <div>
      {/* Render your graph here using linkClicksData */}
    </div>
  );
};

export default LinkGraph;
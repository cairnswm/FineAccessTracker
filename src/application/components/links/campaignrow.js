import React from "react";
import { Button } from "react-bootstrap";

const CampaignRow = ({ 
  campaign, 
  getApplicationName, 
  linkCount, 
  onViewLinks, 
  onEdit, 
  onDelete 
}) => {
  return (
    <tr>
      <td>{campaign.name}</td>
      <td>{getApplicationName(campaign.application_id)}</td>
      <td>{linkCount}</td>
      <td>
        <Button 
          variant="outline-primary" 
          size="sm" 
          className="me-1" 
          onClick={() => onViewLinks(campaign.id)}
        >
          View Links
        </Button>
        <Button 
          variant="outline-secondary" 
          size="sm" 
          className="me-1" 
          onClick={() => onEdit(campaign)}
        >
          Edit
        </Button>
        <Button 
          variant="outline-danger" 
          size="sm" 
          onClick={() => onDelete(campaign.id)}
        >
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default CampaignRow;

import React from "react";
import { Button } from "react-bootstrap";

const LinkRow = ({ 
  link, 
  getCampaignName, 
  getClickCount, 
  formatDate, 
  onEdit, 
  onDelete 
}) => {
  return (
    <tr>
      <td>{link.title}</td>
      <td><code>{link.short_code}</code></td>
      <td>
        <a href={link.destination} target="_blank" rel="noopener noreferrer">
          {link.destination.length > 30 ? link.destination.substring(0, 30) + "..." : link.destination}
        </a>
      </td>
      <td>{getCampaignName(link.campaign_id)}</td>
      <td>{link.total_clicks}</td>
      <td>{link.unique_clicks}</td>
      <td>
        <Button variant="outline-primary" size="sm" className="me-1" onClick={() => onEdit(link)}>
          Edit
        </Button>
        <Button variant="outline-danger" size="sm" onClick={() => onDelete(link.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
};

export default LinkRow;

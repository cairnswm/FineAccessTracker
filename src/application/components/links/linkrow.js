import React from "react";
import { Button } from "react-bootstrap";
import { Copy, GraphUp, Pencil, Trash } from "react-bootstrap-icons";

const LinkRow = ({ 
  link, 
  getCampaignName, 
  onEdit, 
  onDelete,
  onGraph 
}) => {
  return (
    <tr>
      <td>{link.title}</td>
      <td><code>{link.short_code}</code>
      <Button 
        variant="outline-secondary" 
        size="sm" 
        className="ms-2" 
        onClick={() => navigator.clipboard.writeText(`https://accesself.co.za/l/${link.short_code}`)}
      >
        <Copy />
      </Button>
      </td>
      <td>
        <a href={link.destination} target="_blank" rel="noopener noreferrer">
          {link.destination?.length > 30 ? link.destination.substring(0, 30) + "..." : link.destination}
        </a>
      </td>
      <td>{getCampaignName(link.campaign_id)}</td>
      <td>{link.total_clicks}</td>
      <td>{link.unique_clicks}</td>
      <td>
        <Button variant="outline-primary" size="sm" className="me-1" onClick={() => onEdit(link)}>
          <Pencil />
        </Button>
        <Button variant="outline-danger" size="sm" className="me-1" onClick={() => onDelete(link.id)}>
          <Trash />
        </Button>
        <Button variant="outline-danger" size="sm" onClick={() => onGraph(link.id)}>
          <GraphUp />
        </Button>
      </td>
    </tr>
  );
};

export default LinkRow;

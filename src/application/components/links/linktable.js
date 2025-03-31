import React from "react";
import { Table } from "react-bootstrap";
import LinkRow from "./linkrow";

const LinkTable = ({ 
  links, 
  getCampaignName, 
  getClickCount, 
  formatDate, 
  onEditLink, 
  onDeleteLink 
}) => {
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Short Code</th>
          <th>Destination</th>
          <th>Campaign</th>
          <th>Clicks</th>
          <th>Expires</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {links.map(link => (
          <LinkRow 
            key={link.id}
            link={link}
            getCampaignName={getCampaignName}
            getClickCount={getClickCount}
            formatDate={formatDate}
            onEdit={onEditLink}
            onDelete={onDeleteLink}
          />
        ))}
      </tbody>
    </Table>
  );
};

export default LinkTable;

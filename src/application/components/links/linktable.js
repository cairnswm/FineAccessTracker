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
  if (!links || links.length === 0) {
    return <p>No links available.</p>;
  }
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>Title</th>
          <th>Short Code</th>
          <th>Destination</th>
          <th>Campaign</th>
          <th>Clicks</th>
          <th>Unique</th>
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

import React, { useState } from 'react';
import { Nav, Tab } from 'react-bootstrap';

const TabMenu = ({ tabs, defaultActiveKey }) => {
  const [activeKey, setActiveKey] = useState(defaultActiveKey || tabs[0].key);
  
  return (
    <Tab.Container activeKey={activeKey} onSelect={(k) => setActiveKey(k)}>
      <Nav variant="tabs" className="mb-3">
        {tabs.map(tab => (
          <Nav.Item key={tab.key}>
            <Nav.Link eventKey={tab.key}>{tab.title}</Nav.Link>
          </Nav.Item>
        ))}
      </Nav>
      <Tab.Content>
        {tabs.map(tab => (
          <Tab.Pane key={tab.key} eventKey={tab.key}>
            {tab.content}
          </Tab.Pane>
        ))}
      </Tab.Content>
    </Tab.Container>
  );
};

export default TabMenu;
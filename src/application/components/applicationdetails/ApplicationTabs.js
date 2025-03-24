import React from 'react';
import { Nav } from 'react-bootstrap';
import { BarChartFill, FileEarmarkText, ClockFill, CodeSlash, PeopleFill } from 'react-bootstrap-icons';

const ApplicationTabs = ({ activeTab, onTabSelect }) => {
  return (
    <Nav variant="tabs">
      <Nav.Item>
        <Nav.Link 
          eventKey="overview" 
          active={activeTab === 'overview'}
          onClick={() => onTabSelect('overview')}
          className="d-flex align-items-center"
        >
          <BarChartFill className="me-2" />
          <span>Overview</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          eventKey="tracking" 
          active={activeTab === 'tracking'}
          onClick={() => onTabSelect('tracking')}
          className="d-flex align-items-center"
        >
          <FileEarmarkText className="me-2" />
          <span>Tracking Data</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          eventKey="activity" 
          active={activeTab === 'activity'}
          onClick={() => onTabSelect('activity')}
          className="d-flex align-items-center"
        >
          <ClockFill className="me-2" />
          <span>Activity</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          eventKey="integration" 
          active={activeTab === 'integration'}
          onClick={() => onTabSelect('integration')}
          className="d-flex align-items-center"
        >
          <CodeSlash className="me-2" />
          <span>Integration</span>
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link 
          eventKey="users" 
          active={activeTab === 'users'}
          onClick={() => onTabSelect('users')}
          className="d-flex align-items-center"
        >
          <PeopleFill className="me-2" />
          <span>Users</span>
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export default ApplicationTabs;

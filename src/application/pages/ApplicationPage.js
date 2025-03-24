import React, { useState } from 'react';
import { Row, Col, Button, Tab } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useApplications } from '../context/ApplicationContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';

// Import the component tabs
import ApplicationTabs from '../components/applicationdetails/ApplicationTabs';
import OverviewTab from '../components/applicationdetails/OverviewTab';
import TrackingDataTab from '../components/applicationdetails/TrackingDataTab';
import ActivityTab from '../components/applicationdetails/ActivityTab';
import IntegrationTab from '../components/applicationdetails/IntegrationTab';
import NotFoundView from '../components/applicationdetails/NotFoundView';

const ApplicationPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { 
    getApplication, 
    getPageTrackingByAppId, 
    getItemTrackingByAppIdAndPage,
    getActivityTracking
  } = useApplications();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedPage, setSelectedPage] = useState(null);
  
  const application = getApplication(id);
  
  if (!application) {
    return <NotFoundView />;
  }
  
  const applicationId = parseInt(id);
  const pageTrackingData = getPageTrackingByAppId(applicationId);
  const itemTrackingData = selectedPage 
    ? getItemTrackingByAppIdAndPage(applicationId, selectedPage) 
    : [];
  const activityData = getActivityTracking({ applicationId }).slice(0, 10);
  
  const handleViewItems = (page) => {
    setSelectedPage(page);
  };
  
  const handleBackToPages = () => {
    setSelectedPage(null);
  };
  
  const handleTabSelect = (tab) => {
    setActiveTab(tab);
  };
  
  const renderActiveTab = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewTab 
            application={application} 
            pageTrackingData={pageTrackingData} 
            activityData={activityData} 
          />
        );
      case 'tracking':
        return (
          <TrackingDataTab 
            applicationId={applicationId}
            pageTrackingData={pageTrackingData}
            itemTrackingData={itemTrackingData}
            selectedPage={selectedPage}
            onViewItems={handleViewItems}
            onBackToPages={handleBackToPages}
          />
        );
      case 'activity':
        return (
          <ActivityTab 
            application={application} 
            activityData={activityData} 
          />
        );
      case 'integration':
        return (
          <IntegrationTab 
            apiKey={application.apiKey} 
          />
        );
      default:
        return <OverviewTab application={application} />;
    }
  };
  
  return (
    <PageLayout>
      <PageMenu />
      <Row className="mb-4">
        <Col>
          <h1>{application.name}</h1>
          <p className="lead">{application.description}</p>
        </Col>
        <Col xs="auto">
          <Button 
            variant="outline-secondary" 
            onClick={() => navigate('/applications')}
            className="d-flex align-items-center"
          >
            <span>Back to Applications</span>
          </Button>
        </Col>
      </Row>
      
      <Row className="mb-4">
        <Col>
          <ApplicationTabs 
            activeTab={activeTab} 
            onTabSelect={handleTabSelect} 
          />
        </Col>
      </Row>
      
      <Row>
        <Col>
          {renderActiveTab()}
        </Col>
      </Row>
    </PageLayout>
  );
};

export default ApplicationPage;
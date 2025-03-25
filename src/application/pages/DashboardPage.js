import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import { usePageTracking } from '../context/ApplicationContext';
import { useItemTracking } from '../context/ApplicationContext';
import { useActivityTracking } from '../context/ApplicationContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import TrackingChart from '../components/tracking/TrackingChart';
import ActivityTable from '../components/tracking/ActivityTable';
import { 
  BarChartFill, 
  PeopleFill, 
  GeoAltFill, 
  ClockFill, 
  Calendar3, 
  ArrowUpRight,
  ArrowDownRight,
  Globe2
} from 'react-bootstrap-icons';

const DashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { applications, analytics } = useApplications();
  const { pageTracking } = usePageTracking();
  const { itemTracking } = useItemTracking();
  const { getActivityTracking } = useActivityTracking();
  
  const [selectedApp, setSelectedApp] = useState('all');
  const [timeRange, setTimeRange] = useState('7');
  
  // Calculate total stats across all applications or for selected application
  const calculateTotalStats = () => {
    if (selectedApp === 'all') {
      return {
        totalVisits: analytics.reduce((sum, a) => sum + a.totalVisits, 0),
        uniqueVisitors: analytics.reduce((sum, a) => sum + a.uniqueVisitors, 0),
        bounceRate: Math.round(analytics.reduce((sum, a) => {
          const rate = parseInt(a.bounceRate);
          return sum + rate;
        }, 0) / (analytics.length || 1)) + '%',
        avgSession: "2m 45s" // This would be calculated properly in a real implementation
      };
    } else {
      return analytics;
    }
  };
  
  const stats = calculateTotalStats();
  
  // Prepare data for charts
  const getTopPagesData = () => {
    let filteredPages = pageTracking;
    
    if (selectedApp !== 'all') {
      filteredPages = pageTracking.filter(page => page.applicationId === parseInt(selectedApp));
    }
    
    return filteredPages
      .sort((a, b) => b.visits - a.visits)
      .slice(0, 5)
      .map(page => ({
        label: page.title,
        value: page.visits
      }));
  };
  
  const getTopItemsData = () => {
    let filteredItems = itemTracking;
    
    if (selectedApp !== 'all') {
      filteredItems = itemTracking.filter(item => item.applicationId === parseInt(selectedApp));
    }
    
    return filteredItems
      .sort((a, b) => b.views - a.views)
      .slice(0, 5)
      .map(item => ({
        label: item.title,
        value: item.views
      }));
  };
  
  // Get recent activity data from context
  const getRecentActivity = () => {
    const filters = {};
    
    if (selectedApp !== 'all') {
      filters.applicationId = parseInt(selectedApp);
    }
    
    return getActivityTracking(filters).slice(0, 10); // Get the 10 most recent activities
  };
  
  return (
    <PageLayout>
      <PageMenu />
      <Row className="mb-4">
        <Col>
          <h1>Analytics Dashboard</h1>
          <p className="lead">Monitor and analyze your application usage data.</p>
        </Col>
        <Col xs="auto" className="d-flex">
          <Form.Select 
            className="me-2"
            value={selectedApp}
            onChange={(e) => setSelectedApp(e.target.value)}
          >
            <option value="all">All Applications</option>
            {applications.map(app => (
              <option key={app.id} value={app.id}>{app.name}</option>
            ))}
          </Form.Select>
          
          <Form.Select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="custom">Custom range</option>
          </Form.Select>
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted">Total Visits</div>
                <BarChartFill size={20} className="text-primary" />
              </div>
              <h3 className="mb-0">{stats.totalVisits.toLocaleString()}</h3>
              <div className="small text-success mt-2">
                <ArrowUpRight /> 12% from last period
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted">Unique Visitors</div>
                <PeopleFill size={20} className="text-success" />
              </div>
              <h3 className="mb-0">{stats.uniqueVisitors.toLocaleString()}</h3>
              <div className="small text-success mt-2">
                <ArrowUpRight /> 8% from last period
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted">Bounce Rate</div>
                <Calendar3 size={20} className="text-warning" />
              </div>
              <h3 className="mb-0">{stats.bounceRate}</h3>
              <div className="small text-danger mt-2">
                <ArrowDownRight /> 3% from last period
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={3}>
          <Card className="h-100 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-2">
                <div className="text-muted">Avg. Session</div>
                <ClockFill size={20} className="text-danger" />
              </div>
              <h3 className="mb-0">{stats.avgSession}</h3>
              <div className="small text-success mt-2">
                <ArrowUpRight /> 5% from last period
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col md={8}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Traffic Overview</Card.Title>
              <div className="text-center py-5">
                {/* In a real implementation, this would be a chart */}
                <div className="bg-light p-3 rounded">
                  <div className="d-flex justify-content-between mb-2">
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
                    <div>Sun</div>
                  </div>
                  <div className="progress" style={{ height: '30px' }}>
                    <div className="progress-bar" style={{ width: '15%' }}></div>
                    <div className="progress-bar bg-success" style={{ width: '20%' }}></div>
                    <div className="progress-bar bg-info" style={{ width: '10%' }}></div>
                    <div className="progress-bar bg-warning" style={{ width: '25%' }}></div>
                    <div className="progress-bar bg-danger" style={{ width: '15%' }}></div>
                    <div className="progress-bar bg-secondary" style={{ width: '8%' }}></div>
                    <div className="progress-bar bg-dark" style={{ width: '7%' }}></div>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Top Locations</Card.Title>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  United States
                  <span className="badge bg-primary rounded-pill">45%</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  United Kingdom
                  <span className="badge bg-primary rounded-pill">20%</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Canada
                  <span className="badge bg-primary rounded-pill">15%</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Australia
                  <span className="badge bg-primary rounded-pill">10%</span>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Germany
                  <span className="badge bg-primary rounded-pill">5%</span>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row className="g-4 mb-4">
        <Col md={6}>
          <TrackingChart 
            title="Top Pages" 
            data={getTopPagesData()}
          />
        </Col>
        <Col md={6}>
          <TrackingChart 
            title="Top Items" 
            data={getTopItemsData()}
          />
        </Col>
      </Row>
      
      <Row className="g-4">
        <Col md={12}>
          <ActivityTable 
            activities={getRecentActivity()} 
            title="Recent Activity"
          />
        </Col>
      </Row>
    </PageLayout>
  );
};

export default DashboardPage;

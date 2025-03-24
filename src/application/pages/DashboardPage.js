import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Form, Table, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import { useApplications } from '../context/ApplicationContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import TrackingChart from '../components/tracking/TrackingChart';
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
  const { applications, pageTracking, itemTracking } = useApplications();
  
  const [selectedApp, setSelectedApp] = useState('all');
  const [timeRange, setTimeRange] = useState('7');
  
  // Calculate total stats across all applications or for selected application
  const calculateTotalStats = () => {
    if (selectedApp === 'all') {
      return {
        totalVisits: applications.reduce((sum, app) => sum + app.stats.totalVisits, 0),
        uniqueVisitors: applications.reduce((sum, app) => sum + app.stats.uniqueVisitors, 0),
        bounceRate: Math.round(applications.reduce((sum, app) => {
          const rate = parseInt(app.stats.bounceRate);
          return sum + rate;
        }, 0) / applications.length) + '%',
        avgSession: "2m 45s" // This would be calculated properly in a real implementation
      };
    } else {
      const app = applications.find(a => a.id === parseInt(selectedApp));
      return app ? app.stats : { totalVisits: 0, uniqueVisitors: 0, bounceRate: "0%", avgSession: "0m 0s" };
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
  
  // Get recent activity data
  const getRecentActivity = () => {
    // In a real implementation, this would fetch actual activity data
    // For this mock, we'll create some sample data
    const mockActivity = [
      {
        application: "E-commerce Website",
        page: "products",
        timestamp: "2023-05-15 14:32:45",
        ipAddress: "192.168.1.1",
        location: "New York, US",
        device: "Desktop - Chrome"
      },
      {
        application: "E-commerce Website",
        page: "cart",
        timestamp: "2023-05-15 14:30:12",
        ipAddress: "192.168.1.1",
        location: "New York, US",
        device: "Desktop - Chrome"
      },
      {
        application: "Mobile App",
        page: "dashboard",
        timestamp: "2023-05-15 14:28:55",
        ipAddress: "10.0.0.2",
        location: "London, UK",
        device: "Mobile - Safari"
      },
      {
        application: "Company Blog",
        page: "articles",
        timestamp: "2023-05-15 14:25:33",
        ipAddress: "172.16.0.5",
        location: "Toronto, CA",
        device: "Tablet - Firefox"
      }
    ];
    
    if (selectedApp !== 'all') {
      const app = applications.find(a => a.id === parseInt(selectedApp));
      return mockActivity.filter(activity => activity.application === app?.name);
    }
    
    return mockActivity;
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
          <Card className="shadow-sm">
            <Card.Body>
              <Card.Title>Recent Activity</Card.Title>
              <Table responsive className="mt-3">
                <thead>
                  <tr>
                    <th>Application</th>
                    <th>Page</th>
                    <th>Timestamp</th>
                    <th>IP Address</th>
                    <th>Location</th>
                    <th>Device</th>
                  </tr>
                </thead>
                <tbody>
                  {getRecentActivity().map((activity, index) => (
                    <tr key={index}>
                      <td>{activity.application}</td>
                      <td>{activity.page}</td>
                      <td>{activity.timestamp}</td>
                      <td>{activity.ipAddress}</td>
                      <td>{activity.location}</td>
                      <td>{activity.device}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </PageLayout>
  );
};

export default DashboardPage;
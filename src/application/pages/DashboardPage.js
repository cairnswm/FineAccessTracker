import React from 'react';
import { Container, Row, Col, Card, Button, Form, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
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
  return (
    <PageLayout>
      <PageMenu />
      <Row className="mb-4">
        <Col>
          <h1>Analytics Dashboard</h1>
          <p className="lead">Monitor and analyze your application usage data.</p>
        </Col>
        <Col xs="auto">
          <Form.Select className="mb-3">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 90 days</option>
            <option>Custom range</option>
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
              <h3 className="mb-0">0</h3>
              <div className="small text-success mt-2">
                <ArrowUpRight /> 0% from last period
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
              <h3 className="mb-0">0</h3>
              <div className="small text-success mt-2">
                <ArrowUpRight /> 0% from last period
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
              <h3 className="mb-0">0%</h3>
              <div className="small text-danger mt-2">
                <ArrowDownRight /> 0% from last period
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
              <h3 className="mb-0">0m 0s</h3>
              <div className="small text-success mt-2">
                <ArrowUpRight /> 0% from last period
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
              <div className="text-center py-5 text-muted">
                <BarChartFill size={40} className="mb-3" />
                <p>No data available yet. Add the tracking component to your application to start collecting data.</p>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4}>
          <Card className="shadow-sm h-100">
            <Card.Body>
              <Card.Title>Top Locations</Card.Title>
              <div className="text-center py-5 text-muted">
                <Globe2 size={40} className="mb-3" />
                <p>Geographic data will appear here once you start tracking.</p>
              </div>
            </Card.Body>
          </Card>
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
                  <tr className="text-center text-muted">
                    <td colSpan="6">No activity data available yet</td>
                  </tr>
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
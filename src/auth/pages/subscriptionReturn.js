import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import PageLayout from '../components/pagelayout';
import BackBar from '../components/backbar';

const SubscriptionsReturn = () => {
  return (
    <PageLayout>
      <BackBar />
      <Card>
        <Card.Header>

          Thank you for your Payment
          </Card.Header>
          <Card.Body>
            You subscription will be loaded as a soon as we recieve your payment.
          </Card.Body>
          <Card.Body>
            <Link to="/subscriptions">Return to Subscriptions</Link>
            <Link to="/home">Return to Home</Link>
          </Card.Body>
      </Card>
    </PageLayout>
  );
};

export default SubscriptionsReturn;

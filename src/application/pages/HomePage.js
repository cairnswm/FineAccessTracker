import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../auth/context/AuthContext';
import PageLayout from '../../auth/components/pagelayout';
import PageMenu from '../components/pagemenu';
import MobileMenu from '../components/mobilemenu';

const HomePage = () => {
  return <PageLayout>
    <MobileMenu />
  </PageLayout>
};

export default HomePage;

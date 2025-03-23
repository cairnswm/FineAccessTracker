import React from 'react';
import { Container, Card, Table } from 'react-bootstrap';
import { useSettings } from '../context/SettingsContext';
import ComingSoon from '../components/comingsoon';
import PageLayout from '../components/pagelayout';
import BackBar from '../components/backbar';

const Admin = () => {
  const { settings } = useSettings();

  return (
    <PageLayout>
      <BackBar />
      <ComingSoon />      
    </PageLayout>
  );
};

export default Admin;

import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PageLayout from '../../../auth/components/pagelayout';
import PageMenu from '../../components/pagemenu';

const NotFoundView = () => {
  const navigate = useNavigate();
  
  return (
    <PageLayout>
      <PageMenu />
      <div className="text-center py-5">
        <h2>Application not found</h2>
        <Button 
          variant="primary" 
          className="mt-3 d-inline-flex align-items-center"
          onClick={() => navigate('/home')}
        >
          <span>Back to Home</span>
        </Button>
      </div>
    </PageLayout>
  );
};

export default NotFoundView;
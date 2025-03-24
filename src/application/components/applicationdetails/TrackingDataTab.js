import React from 'react';
import PageTrackingTable from '../tracking/PageTrackingTable';
import ItemTrackingTable from '../tracking/ItemTrackingTable';

const TrackingDataTab = ({ applicationId, pageTrackingData, itemTrackingData, selectedPage, onViewItems, onBackToPages }) => {
  return (
    <>
      {selectedPage ? (
        <ItemTrackingTable 
          applicationId={applicationId}
          page={selectedPage}
          itemTracking={itemTrackingData}
          onBack={onBackToPages}
        />
      ) : (
        <PageTrackingTable 
          applicationId={applicationId}
          pageTracking={pageTrackingData}
          onViewItems={onViewItems}
        />
      )}
    </>
  );
};

export default TrackingDataTab;
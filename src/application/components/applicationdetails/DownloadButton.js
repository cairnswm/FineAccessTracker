import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Download, Check } from 'react-bootstrap-icons';

const DownloadButton = ({ content, filename }) => {
  const [downloaded, setDownloaded] = useState(false);
  
  const handleDownload = () => {
    // Create a blob with the content
    const blob = new Blob([content], { type: 'text/javascript' });
    
    // Create a URL for the blob
    const url = URL.createObjectURL(blob);
    
    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    
    // Append the anchor to the body
    document.body.appendChild(a);
    
    // Trigger a click on the anchor
    a.click();
    
    // Remove the anchor from the body
    document.body.removeChild(a);
    
    // Revoke the URL to free up memory
    URL.revokeObjectURL(url);
    
    // Set downloaded state to true
    setDownloaded(true);
    
    // Reset downloaded state after 2 seconds
    setTimeout(() => {
      setDownloaded(false);
    }, 2000);
  };
  
  return (
    <Button 
      variant={downloaded ? "success" : "primary"} 
      onClick={handleDownload}
      className="d-flex align-items-center"
    >
      {downloaded ? (
        <>
          <Check className="me-2" />
          <span>Downloaded</span>
        </>
      ) : (
        <>
          <Download className="me-2" />
          <span>Download Component</span>
        </>
      )}
    </Button>
  );
};

export default DownloadButton;
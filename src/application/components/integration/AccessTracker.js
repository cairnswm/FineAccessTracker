import React, { useEffect, useRef } from 'react';

/**
 * AccessTracker - A component to track page views and item interactions
 * 
 * @param {Object} props
 * @param {string} props.apiKey - Your Access Tracker API key
 * @param {string} props.page - The page identifier (e.g., "products", "cart")
 * @param {string} [props.itemId] - Optional item identifier for tracking specific items
 * @param {string} props.title - Human-readable title for the page or item
 * @param {Object} [props.data] - Optional additional data to track (e.g., user info, context)
 * @param {React.ReactNode} props.children - The content to render inside the tracker
 */
const AccessTracker = ({ 
  page, 
  itemId, 
  title, 
  data = {}, 
  children 
}) => {
  // Use a ref to track if the component has already sent the tracking data
  const hasTracked = useRef(false);
  const apiKey = "caa1f4d6-caa1f4d7-411a-97bf-8b5fa72a1b0d";
  
  
  // Debounce timer reference
  const timerRef = useRef(null);

  useEffect(() => {
    // Skip if already tracked or missing required props
    if (hasTracked.current || !apiKey) {
      return;
    }

    // Clear any existing timer
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    // Set a debounce timer for 500ms
    timerRef.current = setTimeout(() => {
      // Track the view
      trackView();
      // Mark as tracked to prevent duplicate tracking
      hasTracked.current = true;
    }, 500);

    // Cleanup function to clear the timer if component unmounts
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [page, itemId, title]);

  const trackView = async () => {
    try {
      // Determine if this is a page view or item view
      const eventType = itemId ? 'item' : 'page';
      
      // Prepare the payload
      const payload = {
        page,
        title,
        timestamp: new Date().toISOString(),
        ...data
      };
      
      // Add itemId if available
      if (itemId) {
        payload.itemId = itemId;
      }

      const trackerUrl = 'https://accesself.co.za/php/api/track.php';
      // const trackerUrl = 'http://localhost/AccessTracker/php/api/track.php';

      // Send the tracking data to the API
      const response = await fetch(trackerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': `${apiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error('Access Tracker: Failed to track view');
      }
    } catch (error) {
      console.error('Access Tracker: Error tracking view', error);
    }
  };

  // Simply render the children - the tracker is invisible
  return <>{children}</>;
};

export default AccessTracker;
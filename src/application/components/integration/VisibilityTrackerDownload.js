import React, { useEffect, useRef } from 'react';

/**
 * VisibilityTracker - A component that tracks when elements become visible in the viewport
 * 
 * Uses Intersection Observer API to efficiently detect when elements enter the viewport
 * and only sends tracking data when items are actually seen by the user.
 * 
 * @param {Object} props
 * @param {string} props.apiKey - Your Access Tracker API key
 * @param {string} props.page - The page identifier (e.g., "products", "blog")
 * @param {string} props.itemId - Item identifier for tracking specific items
 * @param {string} props.title - Human-readable title for the item
 * @param {Object} [props.data] - Optional additional data to track
 * @param {number} [props.threshold=0.5] - Visibility threshold (0-1) that triggers tracking
 * @param {boolean} [props.trackOnce=true] - Whether to track only the first time item becomes visible
 * @param {React.ReactNode} props.children - The content to render and track
 */
const VisibilityTracker = ({ 
  apiKey, 
  page, 
  itemId, 
  title, 
  data = {}, 
  threshold = 0.5,
  trackOnce = true,
  children 
}) => {
  const elementRef = useRef(null);
  const hasTracked = useRef(false);
  const observerRef = useRef(null);

  // If no API key is provided, try to use the current application's API key
  // This is a placeholder that will be replaced with the actual API key when downloaded
  const effectiveApiKey = apiKey || "CURRENT_APP_API_KEY";

  useEffect(() => {
    // Skip if missing required props
    if (!effectiveApiKey || !page || !itemId) {
      console.warn('VisibilityTracker: Missing required props (apiKey, page, or itemId)');
      return;
    }

    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      console.warn('VisibilityTracker: IntersectionObserver not supported in this browser');
      // Fallback to immediate tracking
      trackItemView();
      hasTracked.current = true;
      return;
    }

    // Create the intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          // Check if the element is intersecting (visible)
          if (entry.isIntersecting) {
            // If trackOnce is true and we've already tracked, skip
            if (trackOnce && hasTracked.current) {
              return;
            }
            
            // Track the view
            trackItemView();
            
            // Mark as tracked
            hasTracked.current = true;
            
            // If we only need to track once, unobserve the element
            if (trackOnce) {
              observerRef.current.unobserve(entry.target);
            }
          }
        });
      },
      { threshold }
    );

    // Start observing the element
    if (elementRef.current) {
      observerRef.current.observe(elementRef.current);
    }

    // Cleanup function
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [effectiveApiKey, page, itemId, title, threshold, trackOnce]);

  const trackItemView = async () => {
    try {
      // Prepare the payload
      const payload = {
        page,
        itemId,
        title,
        timestamp: new Date().toISOString(),
        viewType: 'visible', // Indicate this was tracked when visible
        ...data
      };

      // Send the tracking data to the API
      const response = await fetch('https://accesself.co.za/php/api/track.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${effectiveApiKey}`
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        console.error('VisibilityTracker: Failed to track item view');
      }
    } catch (error) {
      console.error('VisibilityTracker: Error tracking item view', error);
    }
  };

  // Wrap children in a div that we can observe
  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
};

export default VisibilityTracker;
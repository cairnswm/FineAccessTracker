/**
 * Gets the application name from its ID
 * @param {Array} applications - The list of applications
 * @param {number} applicationId - The application ID to look up
 * @returns {string} The application name or "Unknown Application" if not found
 */
export const getApplicationNameById = (applications, applicationId) => {
  const app = applications.find(app => app.id === applicationId);
  return app ? app.name : "Unknown Application";
};

/**
 * Formats a timestamp for display
 * @param {string} timestamp - The timestamp to format
 * @returns {string} The formatted timestamp
 */
export const formatTimestamp = (timestamp) => {
  if (!timestamp) return "";
  
  // In a real implementation, you might use a library like date-fns or moment
  // This is a simple implementation for the mock
  return timestamp;
};
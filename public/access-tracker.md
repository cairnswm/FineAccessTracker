# Access Tracker Documentation

## Overview
The Access Tracker system is designed to log and manage events related to user activity, errors, and page tracking. It consists of three main PHP files:

1. `track.php`
2. `error.php`
3. `bulk.php`

Each file serves a specific purpose in the tracking system.

---

## `track.php`

### Purpose
The `track.php` file is responsible for tracking user activity and page visits. It logs events such as site visits, page views, and item interactions.

### Key Features
- Retrieves API key from headers or domain.
- Determines the type of event (`site`, `page`, `item`, or `error`) based on input parameters.
- Prevents duplicate tracking for site visits within the same day.
- Inserts event data into the `events` database table.

### Input Parameters
- `user_id`: The ID of the user.
- `id`: The ID of the item being tracked.
- `page`: The page being visited.
- `domain`: The domain of the application.
- `error`: Error message, if applicable.

### Output
- JSON response indicating success or error.

---

## `error.php`

### Purpose
The `error.php` file is designed to log error events. It captures detailed information about errors encountered by users or the system.

### Key Features
- Retrieves API key from headers or domain.
- Logs error events with detailed information such as page, item ID, user ID, and error message.
- Inserts error data into the `events` database table.

### Input Parameters
- `user_id`: The ID of the user.
- `id`: The ID of the item related to the error.
- `page`: The page where the error occurred.
- `domain`: The domain of the application.
- `error`: Error message.
- `data`: Additional data related to the error.
- `message`: Custom message describing the error.

### Output
- JSON response with logged error details.

---

## `bulk.php`

### Purpose
The `bulk.php` file handles bulk tracking of events. It is used to log multiple events in a single request.

### Key Features
- Validates input data to ensure it is an array of events.
- Retrieves API key from headers.
- Determines the type of each event (`site`, `page`, `item`, or `error`) based on input data.
- Prevents duplicate tracking for site visits within the same day.
- Inserts multiple event records into the `events` database table in a single query.

### Input Parameters
- `data`: An array of event objects, each containing:
  - `page`: The page being visited.
  - `id`: The ID of the item being tracked.
  - `error`: Error message, if applicable.

### Output
- JSON response indicating success or error.

---

## Common Functionality

### API Key Retrieval
All three files retrieve the API key from headers or domain to authenticate requests.

### Database Interaction
Each file interacts with the `events` database table to log event data. Prepared statements are used to ensure security and prevent SQL injection.

### Error Handling
Errors during database operations or invalid input are handled gracefully, with appropriate HTTP response codes and JSON error messages.

---

## Security Considerations
- API key validation ensures that only authorized requests are processed.
- Prepared statements prevent SQL injection.
- IP address tracking adds an additional layer of event context.

---

## Conclusion
The Access Tracker system provides a robust mechanism for logging user activity, errors, and page tracking. By leveraging these three files, applications can gain valuable insights into user behavior and system performance.

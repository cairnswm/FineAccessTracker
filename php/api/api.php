<?php

include_once dirname(__FILE__) . "/../corsheaders.php";
include_once dirname(__FILE__) . "/../gapiv2/dbconn.php";
include_once dirname(__FILE__) . "/../gapiv2/v2apicore.php";
include_once dirname(__FILE__) . "/../utils.php";
include_once dirname(__FILE__) . "/../security/security.config.php";

// Get authentication details
$appid = getAppId();
$token = getToken();

if (validateJwt($token, false) == false) {
    http_response_code(401);
    echo json_encode([
        'error' => true,
        'message' => 'Unauthorized'
    ]);
    die();
}

$user = getUserFromToken($token);
$userid = $user->id;


// Define the configurations
$accessTrackerConfig = [
    "user" => [
        "tablename" => "applications",
        "key" => "user_id",
        "select" => ["id", "user_id", "name", "api_key", "created_at", "modified_at"],
        "create" => false,
        "update" => [],
        "delete" => false,
        "subkeys" => [
            "applications" => [
                "tablename" => "application",
                "key" => "user_id",
                "select" => "getApplicationsForUser",
            ],
            "campaigns" => [
                "tablename" => "campaigns",
                "key" => "user_id",
                "select" => "getCampaignsForUser",
            ],
        ]
    ],

    "application" => [
        "tablename" => "applications",
        "key" => "id",
        "select" => ["id", "user_id", "name", "api_key", "created_at", "modified_at"],
        "create" => ["user_id", "name", "api_key"],
        "update" => ["name"],
        "delete" => true,
        "beforeselect" => "",
        "beforecreate" => "",
        "beforeupdate" => "",
        "beforedelete" => "",
        "subkeys" => [
            "events" => [
                "tablename" => "events",
                "key" => "application_id",
                "select" => "getEvents",
                "beforeselect" => ""
            ],
            "analytics" => [
                "tablename" => "analytics",
                "key" => "application_id",
                "select" => ["id", "application_id", "date", "total_visits", "unique_visitors", "avg_session_duration", "views_in_order", "latest_views", "views_per_day", "created_at", "modified_at"],
                "beforeselect" => ""
            ],
            "users" => [
                "tablename" => "application_users",
                "key" => "application_id",
                "select" => ["id", "application_id", "user_id", "email", "firstname", "lastname", "role", "created_at", "modified_at"],
                "beforeselect" => ""
            ],
            "invitations" => [
                "tablename" => "invitations",
                "key" => "application_id",
                "select" => ["id", "application_id", "email", "role", "token", "accepted", "sent_at", "accepted_at", "created_at", "modified_at"],
                "beforeselect" => ""
            ],
            "invites" => [
                "tablename" => "invitations",
                "key" => "application_id",
                "select" => ["id", "application_id", "user_id", "email", "role", "token", "accepted", "sent_at", "accepted_at", "created_at", "modified_at"],
                "beforeselect" => ""
            ],
            "site" => [
                "tablename" => "pages",
                "key" => "application_id",
                "select" => "getSiteEvents",
                "beforeselect" => ""
            ],
            "sitebyday" => [
                "tablename" => "pages",
                "key" => "application_id",
                "select" => "getSiteEventsByDay",
                "beforeselect" => ""
            ],
            "page" => [
                "tablename" => "pages",
                "key" => "application_id",
                "select" => "getPageEvents",
                "beforeselect" => ""
            ],
            "pagebyday" => [
                "tablename" => "pages",
                "key" => "application_id",
                "select" => "getPageEventsByDay",
                "beforeselect" => ""
            ],
            "item" => [
                "tablename" => "pages",
                "key" => "application_id",
                "select" => "getItemEvents",
                "beforeselect" => ""
            ],
            "itembyday" => [
                "tablename" => "pages",
                "key" => "application_id",
                "select" => "getItemEventsByDay",
                "beforeselect" => ""
            ],
            "bycountry" => [
                "tablename" => "pages",
                "key" => "application_id",
                "select" => "getMostActiveCountries",
                "beforeselect" => ""
            ]
        ]
    ],

    "event" => [
        "tablename" => "events",
        "key" => "id",
        "select" => ["id", "application_id", "event_date", "ip_address", "page", "item_id", "type", "data", "created_at", "modified_at"],
        "create" => ["application_id", "event_date", "ip_address", "page", "item_id", "type", "data"],
        "update" => [],
        "delete" => false,
        "beforeselect" => "",
        "beforecreate" => "",
        "beforeupdate" => "",
        "beforedelete" => ""
    ],

    "analytics" => [
        "tablename" => "analytics",
        "key" => "id",
        "select" => ["id", "application_id", "date", "total_visits", "unique_visitors", "avg_session_duration", "views_in_order", "latest_views", "views_per_day", "created_at", "modified_at"],
        "create" => ["application_id", "date", "total_visits", "unique_visitors", "avg_session_duration", "views_in_order", "latest_views", "views_per_day"],
        "update" => false,
        "delete" => false,
        "beforeselect" => "",
        "beforecreate" => "",
        "beforeupdate" => "",
        "beforedelete" => ""
    ],

    "location" => [
        "tablename" => "ip_geolocation_cache",
        "key" => "id",
        "select" => ["id", "ip_address", "country", "region", "city", "last_updated", "created_at", "modified_at"],
        "create" => ["ip_address", "country", "region", "city", "last_updated"],
        "update" => ["country", "region", "city", "last_updated"],
        "delete" => false,
        "beforeselect" => "",
        "beforecreate" => "",
        "beforeupdate" => "",
        "beforedelete" => ""
    ],
    "campaign" => [
        "tablename" => "campaigns",
        "key" => "id",
        "select" => ["id", "name", "user_id", "application_id", "created_at", "modified_at"],
        "create" => ["name", "user_id", "application_id"],
        "update" => ["name"],
        "delete" => true,
        "beforeselect" => "",
        "beforecreate" => "",
        "beforeupdate" => "",
        "beforedelete" => "",
        "subkeys" => [
            "links" => [
                "tablename" => "links",
                "key" => "campaign_id",
                "select" => ["id", "campaign_id", "short_code", "destination", "title", "expires_at"],
            ],
            "clicks" => [
                "tablename" => "clicks",
                "key" => "campaign_id",
                "select" => "getClicksForCampaign",
            ],
        ]
    ],
    "link" => [
        "tablename" => "links",
        "key" => "id",
        "select" => ["id", "user_id", "campaign_id", "short_code", "destination", "title", "expires_at"],
        "create" => ["campaign_id", "short_code", "destination", "title", "expires_at"],
        "update" => ["short_code", "destination", "title", "expires_at"],
        "delete" => true,
        "beforeselect" => "",
        "beforecreate" => "",
        "beforeupdate" => "",
        "beforedelete" => "",
        "subkeys" => [
            "visits" => [
                "tablename" => "clicks",
                "key" => "link_id",
                "select" => ["id", "link_id", "ip_address", "user_agent", "referer", "created_at"],
            ],
        ]
    ],
    "post" => [
        "createApplication" => "insertApplication",
        "decodeApiKey" => "reverseApiKey",
        "deleteApplication" => "deleteApplication"

    ]
];

runAPI($accessTrackerConfig);

function beforeCreateSeries($config, $data)
{
    global $userid;

    // Set the user_id to the current user
    $data['user_id'] = $userid;

    return [$config, $data];
}

function checkSeriesSecurity($config, $id = null, $data = null)
{
    global $userid;

    if ($id) {
        // For specific document, check if user is the owner or has access through DocumentOwnership
        $config['where']['user_id'] = $userid;
    } else {
        // For listing documents, only show those owned by the user or shared with them
        $config['where']['user_id'] = $userid;
    }

    return [$config, $id, $data];
}

function generateAudio($data)
{
    $episodeId = $data['episode_id'];
    $sequence = $data['sequence'];
    $character = $data['character'];
    $instructions = $data['instructions'];
    $text = $data['text'];
    $audio = [
        'episode_id' => $episodeId,
        'sequence' => $sequence,
        'character' => $character,
        'instructions' => $instructions,
        'text' => $text,
        'url' => 'https://klokoapp.com/audio/' . $episodeId . '/' . $sequence . '.mp3'
    ];

    return $audio;

}

function generateFinal($data)
{
    $episodeId = $data['episode_id'];
    $final = [
        'episode_id' => $episodeId,
        'url' => 'https://klokoapp.com/final/' . $episodeId . '.mp3'
    ];

    return $final;

}

function generateScript($data)
{
    $episodeId = $data['episode_id'];
    $characters = $data['characters'];
    $background = $data['background'];
    $script = [
        'episode_id' => $episodeId,
        'characters' => $characters,
        'background' => $background,
        'script' => ""
    ];

    return $script;

}

function getApplicationsForUser($config, $id)
{
    global $gapiconn;

    $query = "SELECT 
    a.id AS id,
    a.name,
    a.description,
    a.api_key,
    COUNT(e.id) AS totalVisits,
    COUNT(DISTINCT e.ip_address) AS uniqueVisitors,
    COUNT(DISTINCT CASE WHEN e.event_date = CURDATE() THEN e.ip_address END) AS visitsToday,
    COUNT(DISTINCT CASE WHEN e.event_date = CURDATE() - INTERVAL 1 DAY THEN e.ip_address END) AS visitsYesterday,
    COUNT(DISTINCT CASE WHEN e.event_date >= CURDATE() - INTERVAL 7 DAY THEN e.ip_address END) AS visitsTheWeek,
             SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, e.created_at, e.modified_at))) AS avgSession,
             Max(e.modified_at) AS lastUpdated,
    a.created_at 
FROM applications a
LEFT JOIN application_users au ON a.id = au.application_id
LEFT JOIN events e ON e.application_id = a.id
WHERE a.user_id = ? OR au.user_id = ?
GROUP BY a.id;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('ss', $config['where']['user_id'], $config['where']['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}

function getEvents($config, $id)
{
    global $gapiconn;
    $query = "SELECT 
    e.id,
    e.application_id,
    e.page,
    e.item_id,
    e.type,
    e.ip_address,
    e.event_date,
    e.modified_at,
    geo.country AS country_code,
    c.country_name
FROM events e
LEFT JOIN ip_geolocation_cache geo
  ON e.ip_address = geo.ip_address
LEFT JOIN apps_countries c
  ON geo.country = c.country_code
WHERE e.application_id = ?
ORDER BY e.modified_at DESC
LIMIT 100;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('s', $config['where']['application_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}
function getSiteEvents($config, $id)
{
    global $gapiconn;
    $query = "SELECT
            application_id applicationId,
            COUNT(*) AS totalVisits,
            COUNT(DISTINCT ip_address) AS uniqueVisitors,
            MAX(event_date) AS lastUpdated,
             SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, created_at, modified_at))) AS avgSession
        FROM events
        WHERE application_id = ?
        GROUP BY application_id;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('s', $config['where']['application_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}
function getSiteEventsByDay($config, $id)
{
    global $gapiconn;
    $query = "SELECT
    application_id applicationId,
    DATE(created_at) AS visitDate,
    COUNT(*) AS totalVisits,
    COUNT(DISTINCT ip_address) AS uniqueVisitors,
    MAX(created_at) AS lastUpdated,
     SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, created_at, modified_at))) AS avgSession
FROM events
WHERE application_id = ?
GROUP BY application_id, DATE(created_at)
ORDER BY visitDate;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('s', $config['where']['application_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}

function getPageEvents($config, $id)
{
    global $gapiconn;
    $query = "SELECT
            application_id applicationId, page, page title,
            COUNT(*) AS totalVisits,
            COUNT(DISTINCT ip_address) AS uniqueVisitors,
            MAX(event_date) AS lastUpdated
        FROM events
        WHERE type = 'page'
        AND application_id = ?
        GROUP BY application_id, page;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('s', $config['where']['application_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}
function getPageEventsByDay($config, $id)
{
    global $gapiconn;
    $query = "SELECT
    application_id applicationId, page, page title,
    DATE(created_at) AS visitDate,
    COUNT(*) AS totalVisits,
    COUNT(DISTINCT ip_address) AS uniqueVisitors,
    MAX(created_at) AS lastUpdated
FROM events
WHERE type = 'page'
  AND application_id = ?
GROUP BY application_id, page, DATE(created_at)
ORDER BY visitDate;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('s', $config['where']['application_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}

function getItemEvents($config, $id)
{
    global $gapiconn;
    $query = "SELECT
            application_id applicationId, page, page title, item_id,
            COUNT(*) AS totalVisits,
            COUNT(DISTINCT ip_address) AS uniqueVisitors,
            MAX(event_date) AS lastUpdated
        FROM events
        WHERE type = 'item'
        AND application_id = ?
        GROUP BY application_id, page, item_id;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('s', $config['where']['application_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}
function getItemEventsByDay($config, $id)
{
    global $gapiconn;
    $query = "SELECT
    application_id applicationId, page, page title, item_id,
    DATE(created_at) AS visitDate,
    COUNT(*) AS totalVisits,
    COUNT(DISTINCT ip_address) AS uniqueVisitors,
    MAX(created_at) AS lastUpdated
FROM events
WHERE type = 'item'
  AND application_id = ?
GROUP BY application_id, page, item_id, DATE(created_at)
ORDER BY visitDate;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('s', $config['where']['application_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}

function reverseApiKey($fields)
{
    $id = $fields['apikey'];
    return decodeApiKey($id);
}

function insertApplication($fields)
{
    global $gapiconn, $userid;

    $query = "INSERT INTO applications (user_id, name, description) VALUES (?, ?, ?)";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param("iss", $userid, $fields['name'], $fields['description']);
    $stmt->execute();

    $appId = $stmt->insert_id;
    $stmt->close();

    $apiKey = createApiKey($appId);

    $updateQuery = "UPDATE applications SET api_key = ? WHERE id = ?";
    $stmt = $gapiconn->prepare($updateQuery);
    $stmt->bind_param("si", $apiKey, $appId);
    $stmt->execute();
    $stmt->close();

    return [
        'id' => $appId,
        'api_key' => $apiKey
    ];
}

function createApiKey($id)
{
    // Generate a full UUID (random 16 bytes)
    $data = random_bytes(16);
    $uuid = vsprintf('%08s-%04s-%04x-%04x-%012x', [
        bin2hex(substr($data, 0, 4)),           // first 8 chars
        bin2hex(substr($data, 4, 2)),           // 4 chars
        (hexdec(bin2hex(substr($data, 6, 2))) & 0x0fff) | 0x4000, // version 4
        (hexdec(bin2hex(substr($data, 8, 2))) & 0x3fff) | 0x8000, // variant
        hexdec(bin2hex(substr($data, 10, 6)))   // 12 chars
    ]);

    // Extract and transform
    $parts = explode('-', $uuid);
    $base = $parts[0];                     // First 8 characters
    $baseInt = hexdec($base);
    $encodedInt = $baseInt + $id;
    $encoded = strtolower(str_pad(dechex($encodedInt), 8, '0', STR_PAD_LEFT));

    // Replace second part of UUID with encoded value
    $parts[1] = $encoded;
    return implode('-', $parts);
}

function decodeApiKey($guid)
{
    $parts = explode('-', $guid);
    if (count($parts) < 2) {
        throw new Exception("Invalid GUID format.");
    }

    $base = $parts[0];
    $encoded = $parts[1];

    $baseInt = hexdec($base);
    $encodedInt = hexdec($encoded);

    return $encodedInt - $baseInt;
}

function deleteApplication($fields)
{
    global $gapiconn;

    $appId = $fields['id'];

    // Delete from invitations
    $query = "DELETE FROM invitations WHERE application_id = ?";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param("i", $appId);
    $stmt->execute();
    $stmt->close();

    // Delete from application_users
    $query = "DELETE FROM application_users WHERE application_id = ?";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param("i", $appId);
    $stmt->execute();
    $stmt->close();

    // Delete from events
    $query = "DELETE FROM events WHERE application_id = ?";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param("i", $appId);
    $stmt->execute();
    $stmt->close();

    // Delete from analytics
    $query = "DELETE FROM analytics WHERE application_id = ?";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param("i", $appId);
    $stmt->execute();
    $stmt->close();

    // Finally, delete from applications
    $query = "DELETE FROM applications WHERE id = ?";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param("i", $appId);
    $stmt->execute();
    $stmt->close();

    return [
        'id' => $appId,
        'deleted' => true
    ];
}


function getMostActiveCountries($config, $id)
{
    global $gapiconn;
    $query = "SELECT 
    c.country_name,
    c.country_code,
    COUNT(DISTINCT CASE WHEN e.event_date >= CURDATE() - INTERVAL 30 DAY THEN e.ip_address END) AS ip_last_30_days,
    COUNT(DISTINCT CASE WHEN e.event_date >= CURDATE() - INTERVAL 7 DAY THEN e.ip_address END) AS ip_last_7_days,
    COUNT(DISTINCT CASE WHEN e.event_date = CURDATE() - INTERVAL 1 DAY THEN e.ip_address END) AS ip_yesterday,
    COUNT(DISTINCT CASE WHEN e.event_date = CURDATE() THEN e.ip_address END) AS ip_today
FROM events e
JOIN ip_geolocation_cache geo
  ON e.ip_address = geo.ip_address
JOIN apps_countries c
  ON geo.country = c.country_code
WHERE 
    e.application_id = ? AND
    e.event_date >= CURDATE() - INTERVAL 30 DAY
GROUP BY c.country_code, c.country_name
ORDER BY ip_last_30_days DESC;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('s', $config['where']['application_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}

function getCampaignsForUser($config, $id)
{
    global $gapiconn;

    $query = "SELECT 
    c.id,
    c.name,
    c.created_at,
    c.application_id,
    a.name AS application_name,
    a.description AS application_description,
    COALESCE(SUM(click_counts.total_clicks), 0) AS total_clicks,
    COALESCE(SUM(click_counts.unique_clicks), 0) AS unique_clicks
FROM campaigns c
LEFT JOIN applications a ON c.application_id = a.id
LEFT JOIN application_users au ON a.id = au.application_id
LEFT JOIN (
    SELECT 
        l.campaign_id,
        COUNT(*) AS total_clicks,
        COUNT(DISTINCT cl.ip_address) AS unique_clicks
    FROM clicks cl
    JOIN links l ON cl.link_id = l.id
    WHERE cl.created_at >= CURDATE() - INTERVAL ? DAY
    GROUP BY l.campaign_id
) AS click_counts ON click_counts.campaign_id = c.id
WHERE a.user_id = ? OR au.user_id = ?
GROUP BY c.id
ORDER BY c.created_at DESC;
";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('iss', 30, $config['where']['user_id'], $config['where']['user_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}

function getClicksForCampaign($config, $id)
{
    global $gapiconn;

    $query = "SELECT
    DATE(c.created_at) AS click_date,
    COUNT(*) AS total_clicks,
    COUNT(DISTINCT c.ip_address) AS unique_clicks
FROM
    clicks c
JOIN
    links l ON c.link_id = l.id
WHERE
    l.campaign_id = ?
    AND c.created_at >= CURDATE() - INTERVAL 30 DAY
GROUP BY
    DATE(c.created_at)
ORDER BY
    click_date DESC;";
    $stmt = $gapiconn->prepare($query);
    $stmt->bind_param('s', $config['where']['campaign_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}
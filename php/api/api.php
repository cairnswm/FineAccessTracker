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
            ]
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
                "select" => ["id", "application_id", "event_date", "ip_address", "page", "item_id", "type", "data", "created_at", "modified_at"],
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
//     $query = "SELECT 
//     a.id AS application_id,
//     a.name,
//     a.description,
//     COUNT(e.id) AS totalVisits,
//     COUNT(DISTINCT e.ip_address) AS uniqueVisitors,
//     a.created_at 
// FROM applications a
// LEFT JOIN application_users au ON a.id = au.application_id
// LEFT JOIN events e ON e.application_id = a.id AND e.modified_at >= NOW() - INTERVAL 1 DAY
// WHERE a.user_id = ? OR au.user_id = ?
// GROUP BY a.id;";
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

function createApiKey($id) {
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

function decodeApiKey($guid) {
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


<?php

include_once dirname(__FILE__) . '/../corsheaders.php';
include_once dirname(__FILE__) . "/../utils.php";
include_once dirname(__FILE__) . "/../trackerconfig.php";
include_once dirname(__FILE__) . "/ipinfo.php";
include_once dirname(__FILE__) . "/functions/apikey.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$input = json_decode(file_get_contents('php://input'), true);

if (!isset($input['data']) || !is_array($input['data'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid input. Expected an array of page and id.']);
    exit;
}

$headers = getallheaders();
$apikey = isset($headers['apikey']) ? $headers['apikey'] : '';
if (empty($apikey)) {
    $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
    if (stripos($authHeader, 'Bearer ') === 0) {
        $apikey = trim(substr($authHeader, 7));
    }
}

if (empty($apikey)) {
    http_response_code(403);
    echo json_encode(['error' => 'API key is required.']);
    exit;
}

$appid = decodeApiKey($apikey);

$ip_address = $_SERVER['REMOTE_ADDR'];

$mysqli = new mysqli($trackerconfig['server'], $trackerconfig['username'], $trackerconfig['password'], $trackerconfig['database']);
if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}

$values = [];
$placeholders = [];

foreach ($input['data'] as $entry) {
    if (!isset($entry['page']) && !isset($entry['id']) && !isset($entry['error'])) {
        continue;
    }

    $page = isset($entry['page']) ? $entry['page'] : '';
    $itemid = isset($entry['id']) ? $entry['id'] : '';
    $error = isset($entry['error']) ? $entry['error'] : '';
    $itemtype = 'site';

    if (!empty($page)) {
        $itemtype = 'page';
    }

    if (!empty($itemid)) {
        $itemtype = 'item';
    }

    if (!empty($error)) {
        $itemtype = 'error';
    }

    if ($itemtype === 'site' && empty($page)) {
        $today = date('Y-m-d');
        $checkSql = "SELECT id FROM events WHERE application_id = ? AND type = 'site' AND ip_address = ? AND DATE(event_date) = ?";
        $checkStmt = $mysqli->prepare($checkSql);
        if ($checkStmt === false) {
            die('Prepare failed: ' . $mysqli->error);
        }
        $checkStmt->bind_param('sss', $appid, $ip_address, $today);
        $checkStmt->execute();
        $checkStmt->store_result();
        if ($checkStmt->num_rows > 0) {
            $checkStmt->close();
            continue;
        }
        $checkStmt->close();
    }

    $values[] = $appid;
    $values[] = $itemtype;
    $values[] = $page;
    $values[] = $itemid;
    $values[] = $error;
    $values[] = $ip_address;
    $placeholders[] = '(?, ?, ?, ?, ?, ?)';
}

if (!empty($placeholders)) {
    $sql = "INSERT INTO events (application_id, type, page, item_id, message, ip_address) VALUES " . implode(', ', $placeholders);
    $stmt = $mysqli->prepare($sql);
    if ($stmt === false) {
        die('Prepare failed: ' . $mysqli->error);
    }

    $stmt->bind_param(str_repeat('s', count($values)), ...$values);

    if (!$stmt->execute()) {
        die('Execute failed: ' . $stmt->error);
    }

    $stmt->close();
}

$mysqli->close();

http_response_code(200);
echo json_encode(['status' => 'success']);

?>

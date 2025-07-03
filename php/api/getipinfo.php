<?php

include_once dirname(__FILE__) . '/../utils.php';
include_once dirname(__FILE__) . '/../trackerconfig.php';

$ip_address = getParam('ip', '');

if (empty($ip_address)) {
    http_response_code(400);
    echo json_encode(['error' => 'IP address is required']);
    exit;
}

$mysqli = new mysqli($trackerconfig['server'], $trackerconfig['username'], $trackerconfig['password'], $trackerconfig['database']);

if ($mysqli->connect_error) {
    die('Connection failed: ' . $mysqli->connect_error);
}

$sql = 'SELECT data FROM ip_geolocation_cache WHERE ip_address = ?';
$stmt = $mysqli->prepare($sql);

if ($stmt === false) {
    die('Prepare failed: ' . $mysqli->error);
}

$stmt->bind_param('s', $ip_address);
$stmt->execute();
$stmt->bind_result($data);

if ($stmt->fetch()) {
    echo $data;
} else {
    http_response_code(404);
    echo json_encode(['error' => 'IP address not found']);
}

$stmt->close();
$mysqli->close();

?>

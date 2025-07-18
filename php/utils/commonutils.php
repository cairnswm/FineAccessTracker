<?php

function getApiKeyFromHeaders($headers) {
    $apikey = isset($headers['apikey']) ? $headers['apikey'] : '';
    if (empty($apikey)) {
        $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
        if (stripos($authHeader, 'Bearer ') === 0) {
            $apikey = trim(substr($authHeader, 7));
        }
    }
    return $apikey;
}

function getApiKeyFromDatabase($domain, $trackerconfig) {
    $mysqli = new mysqli($trackerconfig['server'], $trackerconfig['username'], $trackerconfig['password'], $trackerconfig['database']);
    if ($mysqli->connect_error) {
        die("Connection failed: " . $mysqli->connect_error);
    }
    $sql = "SELECT api_key FROM applications WHERE domain = ?";
    $stmt = $mysqli->prepare($sql);
    if ($stmt === false) {
        die("Prepare failed: " . $mysqli->error);
    }
    $stmt->bind_param("s", $domain);
    $stmt->execute();
    $stmt->bind_result($dbApiKey);
    $apikey = null;
    if ($stmt->fetch()) {
        $apikey = $dbApiKey;
    }
    $stmt->close();
    $mysqli->close();
    return $apikey;
}

?>

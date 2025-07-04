<?php

include_once dirname(__FILE__) . "/../corsheaders.php";
include_once dirname(__FILE__) . "/../utils.php";
include_once dirname(__FILE__) . "/../trackerconfig.php";

// Get the IP address from the request parameters or use the remote address
$ip = isset($_GET['ip']) ? $_GET['ip'] : $_SERVER['REMOTE_ADDR'];

// Connect to the database
$mysqli = new mysqli($trackerconfig['server'], $trackerconfig['username'], $trackerconfig['password'], $trackerconfig['database']);

if ($mysqli->connect_error) {
    http_response_code(500);
    echo json_encode(["error" => "Database connection failed: " . $mysqli->connect_error]);
    exit;
}

// Query the database for the IP address
$query = "SELECT country, region, city FROM ip_geolocation_cache WHERE ip_address = ?";
$stmt = $mysqli->prepare($query);
$stmt->bind_param("s", $ip);
$stmt->execute();

// Bind result variables
$country = null;
$region = null;
$city = null;

$stmt->bind_result($country, $region, $city);
$recordFound = $stmt->fetch();
$stmt->close();

// If no record exists, return empty fields
if (!$recordFound) {
    $country = "";
    $region = "";
    $city = "";
}

// Close the database connection
$mysqli->close();

// Return the data as JSON
echo json_encode([
    "ip" => $ip, // Include the IP address in the response
    "country" => $country,
    "region" => $region,
    "city" => $city
]);
exit;
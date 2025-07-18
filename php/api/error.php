<?php

include_once dirname(__FILE__) . "/../corsheaders.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once dirname(__FILE__) . "/../utils.php";
include_once dirname(__FILE__) . "/../trackerconfig.php";
include_once dirname(__FILE__) . "/ipinfo.php";
include_once dirname(__FILE__) . "/functions/apikey.php";

$headers = getallheaders();
$apikey = isset($headers['apikey']) ? $headers['apikey'] : '';
if (empty($apikey)) {
  $authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : '';
  if (stripos($authHeader, 'Bearer ') === 0) {
    $apikey = trim(substr($authHeader, 7));
  }
}

$user_id = getParam("user_id", "");
$itemid = getParam("id", "");
$page = getParam("page", "error");
$domain = getParam("domain", "");
$error = getParam("error", "");
$data = getParam("data", "");
$message = getParam("message", "");
$ip_address = $_SERVER['REMOTE_ADDR'];
$out = ["page" => $page, "itemid" => $itemid, "user_id" => $user_id, "ip_address" => $ip_address, "data" => $data, "message" => $message];

if (empty($apikey) && !empty($domain)) {
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
  if ($stmt->fetch()) {
    $apikey = $dbApiKey;
  }
  $stmt->close();
  $mysqli->close();
}

$appid = decodeApiKey($apikey);

$itemtype = "error";

$out["type"] = $itemtype;

if ($itemtype != "") {
  $mysqli = new mysqli($trackerconfig['server'], $trackerconfig['username'], $trackerconfig['password'], $trackerconfig['database']);

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "INSERT INTO events (application_id, event_type, type, page, item_id, message, data, ip_address) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  $stmt = $mysqli->prepare($sql);
  if ($stmt === false) {
    die("Prepare failed: " . $mysqli->error);
  }

  $stmt->bind_param("ssssssss", $appid, "error", $itemtype, $page, $itemid, $message, $data, $ip_address);

  if (!$stmt->execute()) {
    die("Execute failed: " . $stmt->error);
  }

  $result = $stmt->get_result();
  $stmt->close();

  updateIpAddress($ip_address);

  $mysqli->close();
  $out["data"] = $result;
} else {
  $out["error"] = "All parameters are required!";
}
http_response_code(200);
echo json_encode($out);

?>

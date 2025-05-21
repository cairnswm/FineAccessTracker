<?php

include_once dirname(__FILE__) . "/../corsheaders.php";

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


include_once dirname(__FILE__) . "/../utils.php";
include_once dirname(__FILE__) . "/../trackerconfig.php";
include_once dirname(__FILE__) . "/ipinfo.php";

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
$page = getParam("page", "");
$domain = getParam("domain", "");
$error = getParam("error", "");
$ip_address = $_SERVER['REMOTE_ADDR'];
$out = ["page" => $page, "itemid" => $itemid, "user_id" => $user_id, "ip_address" => $ip_address];

if (empty($apikey) && !empty($domain)) {
  // if ($domain === "localhost") {
  //   http_response_code(403);
  //   echo json_encode(["error" => "API key required for localhost domain"]);
  //   exit;
  // }
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


$itemtype = "site";

if (isset($page) && $page != "") {
  $itemtype = "page";
}

if (isset($itemid) && $itemid != "") {
  $itemtype = "item";
}

if (isset($error) && $error != "") {
  $itemtype = "error";
}

$out["type"] = $itemtype;

if ($itemtype != "") {
  $mysqli = new mysqli($trackerconfig['server'], $trackerconfig['username'], $trackerconfig['password'], $trackerconfig['database']);

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $message = $error;


  if ($itemtype === "site" && empty($page)) {
    $today = date('Y-m-d');
    $checkSql = "SELECT id FROM events WHERE application_id = ? AND type = 'site' AND ip_address = ? AND DATE(event_date) = ?";
    $checkStmt = $mysqli->prepare($checkSql);
    if ($checkStmt === false) {
      die("Prepare failed: " . $mysqli->error);
    }
    $checkStmt->bind_param("sss", $appid, $ip_address, $today);
    $checkStmt->execute();
    $checkStmt->store_result();
    if ($checkStmt->num_rows > 0) {
      $checkStmt->close();
      $out["data"] = "Already tracked today";
      $mysqli->close();
      http_response_code(200);
      echo json_encode($out);
      exit;
    }
    $checkStmt->close();
  }
  
  $sql = "INSERT INTO events (application_id, type, page, item_id, message, ip_address) VALUES (?, ?, ?, ?, ?, ?)";
      // ON DUPLICATE KEY UPDATE count = count + 1";

  $stmt = $mysqli->prepare($sql);
  if ($stmt === false) {
    die("Prepare failed: " . $mysqli->error);
  }

  $stmt->bind_param("ssssss", $appid, $itemtype, $page, $itemid, $message, $ip_address);

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

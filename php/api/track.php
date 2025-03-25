<?php

include_once dirname(__FILE__)."/../utils.php";
include_once dirname(__FILE__)."/../trackerconfig.php";


function getIpInfo($ipAddress) {
  $token = 'd4ca2fb7404647';
  $url = "http://ipinfo.io/{$ipAddress}?token={$token}";

  $ch = curl_init();
  curl_setopt($ch, CURLOPT_URL, $url);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  $response = curl_exec($ch);
  curl_close($ch);

  return json_decode($response, true);
}
function updateIpAddress($ipAddress)
{
    global $mysqli;

    // Check if the IP address exists and is not older than 30 days
    $query = "SELECT id, last_updated FROM ip_geolocation_cache WHERE ip_address = ?";
    $stmt = $mysqli->prepare($query);
    $stmt->bind_param("s", $ipAddress);
    $stmt->execute();
    $result = $stmt->get_result();
    $row = $result->fetch_assoc();
    $stmt->close();

    $currentDate = new DateTime();
    $updateRequired = false;

    if ($row) {
        $lastUpdated = new DateTime($row['last_updated']);
        $interval = $currentDate->diff($lastUpdated);
        if ($interval->days > 30) {
            $updateRequired = true;
        }
    } else {
        $updateRequired = true;
    }

    if ($updateRequired) {
        // Generate random data for country, region, and city
        $ipInfo = getIpInfo($ipAddress);
        $country = isset($ipInfo['country']) ? $ipInfo['country'] : 'Unknown';
        $region = isset($ipInfo['region']) ? $ipInfo['region'] : 'Unknown';
        $city = isset($ipInfo['city']) ? $ipInfo['city'] : 'Unknown';

        if ($row) {
            // Update existing record
            $query = "UPDATE ip_geolocation_cache SET country = ?, region = ?, city = ?, last_updated = NOW() WHERE id = ?";
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param("sssi", $country, $region, $city, $row['id']);
        } else {
            // Insert new record
            $query = "INSERT INTO ip_geolocation_cache (ip_address, country, region, city, last_updated) VALUES (?, ?, ?, ?, NOW())";
            $stmt = $mysqli->prepare($query);
            $stmt->bind_param("ssss", $ipAddress, $country, $region, $city);
        }

        $stmt->execute();
        $stmt->close();
    }
}

$headers = getallheaders();
$apikey = isset($headers['apikey']) ? $headers['apikey'] : '';

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

$appid = decodeApiKey($apikey);
$user_id = getParam("user_id", "");
$itemid = getParam("id", "");
$page = getParam("page", "");
$ip_address = $_SERVER['REMOTE_ADDR'];
$out = ["page"=>$page, "itemid"=>$itemid, "user_id"=>$user_id, "ip_address"=>$ip_address];

$itemtype = "site";

if (isset($page) && $page != "") {
  $itemtype = "page";
}

if (isset($itemid) && $itemid != "") {
  $itemtype = "item";
}

$out["type"] = $itemtype;

if ($itemtype != "") {
  $mysqli = new mysqli($trackerconfig['server'], $trackerconfig['username'], $trackerconfig['password'], $trackerconfig['database']);

  if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
  }

  $sql = "INSERT INTO events (application_id, type, page, item_id, ip_address) VALUES (?, ?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE count = count + 1";

  $stmt = $mysqli->prepare($sql);
  if ($stmt === false) {
    die("Prepare failed: " . $mysqli->error);
  }

  $stmt->bind_param("sssss", $appid, $itemtype, $page, $itemid, $ip_address);

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
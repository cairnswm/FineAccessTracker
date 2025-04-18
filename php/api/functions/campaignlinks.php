<?php

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

function getCampaignClicksPerLink($config, $id)
{
    global $gapiconn;

    $query = "SELECT 
    l.id,
    l.short_code,
    l.title,
    l.destination,
    l.campaign_id,
    COALESCE(click_counts.total_clicks, 0) AS total_clicks,
    COALESCE(click_counts.unique_clicks, 0) AS unique_clicks
FROM links l
LEFT JOIN campaigns c ON l.campaign_id = c.id
LEFT JOIN applications a ON c.application_id = a.id
LEFT JOIN (
    SELECT 
        cl.link_id,
        COUNT(*) AS total_clicks,
        COUNT(DISTINCT cl.ip_address) AS unique_clicks
    FROM clicks cl
    WHERE cl.created_at >= CURDATE() - INTERVAL ? DAY
    GROUP BY cl.link_id
) AS click_counts ON click_counts.link_id = l.id
WHERE l.campaign_id = ?
ORDER BY l.created_at DESC;";
    $stmt = $gapiconn->prepare($query);
    $days = 30;
    $stmt->bind_param('ss', $days, $config['where']['campaign_id']);
    $stmt->execute();
    $result = $stmt->get_result();
    $rows = [];
    while ($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
    $stmt->close();

    return $rows;
}

function insertLink($data)
{
    global $gapiconn, $userid;

    // Helper function to generate a unique 6-character shortcode
    function generateUniqueShortCode($gapiconn) {
        $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        $length = 6;
        do {
            $short_code = '';
            for ($i = 0; $i < $length; $i++) {
                $short_code .= $characters[rand(0, strlen($characters) - 1)];
            }

            // Check uniqueness
            $checkStmt = $gapiconn->prepare("SELECT id FROM links WHERE short_code = ?");
            $checkStmt->bind_param("s", $short_code);
            $checkStmt->execute();
            $checkStmt->store_result();
        } while ($checkStmt->num_rows > 0);
        $checkStmt->close();

        return $short_code;
    }

    $short_code = generateUniqueShortCode($gapiconn);

    $query = "INSERT INTO links (
        user_id,
        campaign_id,
        short_code,
        destination,
        title,
        click_limit,
        expires_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?)";

    $stmt = $gapiconn->prepare($query);

    $user_id = $userid;
    $campaign_id = $data['campaign_id'] ?? 0;
    $destination = $data['destination'] ?? '';
    $title = $data['title'] ?? null;
    $click_limit = $data['click_limit'] ?? null;
    $expires_at = $data['expires_at'] ?? null;

    $stmt->bind_param(
        "iisssis",
        $user_id,
        $campaign_id,
        $short_code,
        $destination,
        $title,
        $click_limit,
        $expires_at
    );

    if ($stmt->execute()) {
        $insert_id = $stmt->insert_id;
        $stmt->close();
        return [
            'success' => true,
            'id' => $insert_id,
            'short_code' => $short_code
        ];
    } else {
        $error = $stmt->error;
        $stmt->close();
        return [
            'success' => false,
            'error' => $error
        ];
    }
}

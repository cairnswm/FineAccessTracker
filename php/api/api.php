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
$klokoconfigs = [
    "user" => [
        'tablename' => 'series',
        'key' => 'user_id',
        'select' => [],
        'create' => false,
        'update' => false,
        'delete' => false,
        
        'subkeys' => [
            'series' => [
                "table_name" => "series",
                "key" => "user_id",
                "select" => ["id", "user_id", "name", "description", "image", "genre"],
            ],
        ]

    ],
    "series" => [
        'tablename' => 'series',
        'key' => 'id',
        'select' => ["id", "user_id", "name", "description", "image", "genre"],
        'create' => ["user_id", "name", "description", "image", "genre"],
        'update' => ["user_id", "name", "description", "image", "genre"],
        'delete' => true,
        'beforeselect' => '',
        'beforecreate' => '',
        'beforeupdate' => '',
        'beforedelete' => '',
        'subkeys' => [
            'episodes' => [
                'tablename' => 'episode',
                'key' => 'series_id',
                'select' => ['id', 'series_id', "sequence", "name", "description", "image", "script", "characters"],
                'beforeselect' => ''
            ]
        ]
    ],
    "episode" => [
        'tablename' => 'episode',
        'key' => 'id',
        'select' => ['id', 'series_id', "sequence", "name", "description", "background", "image", "script", "characters"],
        'create' => ['series_id', "sequence", "name", "description", "background", "image", "script", "characters"],
        'update' => ['series_id', "sequence", "name", "description", "background", "image", "script", "characters"],
        'delete' => true,
        'beforeselect' => '',
        'beforecreate' => '',
        'beforeupdate' => '',
        'beforedelete' => '',
        'subkeys' => [
            'audio' => [
                'tablename' => 'audio',
                'key' => 'episode_id',
                'select' => ['id', 'episode_id', 'sequence', 'character', 'instructions', 'text', 'url'],
                'beforeselect' => ''
            ],
            'final' => [
                'tablename' => 'final',
                'key' => 'episode_id',
                'select' => ['id', 'episode_id', 'url'],
                'beforeselect' => ''
            ]
        ]
    ],
    
    "post" => [
        "generateScript" => "generateScript",
        "generateAudio" => "generateAudio",
        "generateFinal" => "generateFinal"
    ]
];



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
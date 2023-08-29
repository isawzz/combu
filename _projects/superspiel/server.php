<?php

// Placeholder data structure
$players = [];

function generateRandomPlayerData($goalPosition) {
    $id = dechex(rand(0x000000, 0xFFFFFF));
    return [
        'id' => $id, //rand(1, 10),
        'color' => '#' . $id, //dechex(rand(0x000000, 0xFFFFFF)),
        'goalPosition' => $goalPosition,
        'piecePosition' => [
            'x' => rand(0, 500), // assuming canvas width is 500 for simplicity
            'y' => rand(0, 500)  // assuming canvas height is 500
        ]
    ];
}
function readPlayerData() {
    $playerData = [];

    if (file_exists('playerdata.json')) {
        $playerData = json_decode(file_get_contents('playerdata.json'), true);
    }

    return $playerData;
}
function savePlayerData($playerData) {
    file_put_contents('playerdata.json', json_encode($playerData));
}

// Handle client update
if (isset($_GET['startGame'])) {
    // Clear player data for a new game
    $playerData = [];
    savePlayerData($playerData);
    echo json_encode(['players' => $playerData]);
    exit;
} else if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $playerData = readPlayerData();

    // update playerData
    $data = json_decode(file_get_contents('php://input'), true);

    if ($data['isNewPlayer']) {
        $playerData[] = generateRandomPlayerData($data['goalPosition']);
    } else {
        // Update the player data
        foreach ($players as &$player) {
            if ($player['id'] == $data['id']) {
                $player['goalPosition'] = $data['goalPosition'];
                $player['piecePosition'] = $data['piecePosition'];
                break;
            }
        }
    }

    echo json_encode(['players' => $players]);
    exit;
}

// Your other server code...
?>

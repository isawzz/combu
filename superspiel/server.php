<?php
function readPlayerData() {
    $allPlayers = [];

    if (file_exists('playerdata.json')) {
        $allPlayers = json_decode(file_get_contents('playerdata.json'), true);
    }

    return $allPlayers;
}
function savePlayerData($allPlayers) {
    file_put_contents('playerdata.json', json_encode($allPlayers));
}
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
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    $allPlayers = readPlayerData();

    // update allPlayers
    $data = json_decode(file_get_contents('php://input'), true);
    $thisPlayer = $data['thisPlayer'];
    $cmd = $data['cmd'];
    if ($cmd == 'join') {
        //$newPlayer = generateRandomPlayerData($thisPlayer['goalPosition']);
        $id = $thisPlayer['id'];
        $allPlayers[$id] = $thisPlayer;
    } else if ($cmd == 'start') {
        $allPlayers = [];
    } else {
        $id = $thisPlayer['id'];
        $allPlayers[$id]['goalPosition'] = $thisPlayer['goalPosition'];
        $allPlayers[$id]['piecePosition'] = $thisPlayer['piecePosition'];
    }

    savePlayerData($allPlayers);
    echo json_encode(['allPlayers' => $allPlayers,'data' => $data]);
    exit;
}

?>

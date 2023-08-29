<?php
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

$playerData = readPlayerData();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_GET['startGame'])) {
        // Clear player data for a new game
        $playerData = [];
        savePlayerData($playerData);
    }

    $playerId = $_POST['playerId'];
    $x = $_POST['x'];
    $y = $_POST['y'];
    $color = $_POST['color'];

    if (!isset($playerData[$playerId])) {
        // New player joining the game
        $playerData[$playerId] = ['x' => $x, 'y' => $y, 'color' => $color];
        savePlayerData($playerData);
    }

    // Return updated positions and colors for all players
    echo json_encode($playerData);
}
?>

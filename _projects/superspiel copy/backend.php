<?php
// backend.php

// Function to read player data from the JSON file
function readPlayerData() {
    $playerData = [];

    if (file_exists('playerdata.json')) {
        $playerData = json_decode(file_get_contents('playerdata.json'), true);
    }

    return $playerData;
}

// Function to save player data to the JSON file
function savePlayerData($playerData) {
    file_put_contents('playerdata.json', json_encode($playerData));
}

$playerData = readPlayerData();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $playerId = $_POST['playerId'];
    $x = $_POST['x'];
    $y = $_POST['y'];

    $playerData[$playerId] = ['x' => $x, 'y' => $y];
    savePlayerData($playerData);

    // Return updated positions for all players
    echo json_encode($playerData);
}

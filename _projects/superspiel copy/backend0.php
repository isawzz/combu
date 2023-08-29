<?php

// backend.php
$playerData = []; // Store player positions

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $playerId = $_POST['playerId'];
    $x = $_POST['x'];
    $y = $_POST['y'];

    $playerData[$playerId] = ['x' => $x, 'y' => $y];

    // Return updated positions for all players
    echo json_encode($playerData);
}

<?php
// Filename: server.php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $timestamp = $data['timestamp'];
    $message = $data['message'];
    $windowId = $data['windowId'];  // capture the unique ID

    // Append message, timestamp, and unique ID to CSV
    $handle = fopen('messages.csv', 'a');
    fputcsv($handle, [$timestamp, $message, $windowId]);
    fclose($handle);

    echo json_encode(['status' => 'success']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'download') {
    header('Content-Type: application/json');

    $messages = [];
    if (file_exists('messages.csv')) {
        $handle = fopen('messages.csv', 'r');
        while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $messages[] = [
                'timestamp' => $row[0],
                'message' => $row[1],
                'windowId' => $row[2]
            ];
        }
        fclose($handle);
    }

    echo json_encode($messages);
    exit;
}
?>


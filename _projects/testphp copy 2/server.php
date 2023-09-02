<?php
// Filename: server.php

// This is a simple example and does not include proper error handling or input validation.

$data = json_decode(file_get_contents("php://input"), true);

$timestamp = $data['timestamp'];
$message = $data['message'];

// Check if the CSV file exists and read its content
$messages = [];
if (file_exists('messages.csv')) {
    $handle = fopen('messages.csv', 'r');
    while (($row = fgetcsv($handle, 1000, ",")) !== FALSE) {
        $messages[] = [
            'timestamp' => $row[0],
            'message' => $row[1]
        ];
    }
    fclose($handle);
}

$messages[] = [
    'timestamp' => $timestamp,
    'message' => $message
];

// Sort messages by timestamp
usort($messages, function ($a, $b) {
    return $a['timestamp'] <=> $b['timestamp'];
});

// Save messages to the CSV file
$handle = fopen('messages.csv', 'w');
foreach ($messages as $message) {
    fputcsv($handle, [$message['timestamp'], $message['message']]);
}
fclose($handle);

echo json_encode(['status' => 'success']);
?>

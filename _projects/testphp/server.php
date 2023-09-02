<?php
// Filename: server.php

// This is a simple example and does not include proper error handling or input validation.

$data = json_decode(file_get_contents("php://input"), true);

$timestamp = $data['timestamp'];
$message = $data['message'];

// For this example, we'll save the messages to a file. In a real application, you'd probably use a database.
$fileContents = file_exists('messages.txt') ? file_get_contents('messages.txt') : '';
$messages = $fileContents ? json_decode($fileContents, true) : [];

$messages[] = [
    'timestamp' => $timestamp,
    'message' => $message
];

// Sort messages by timestamp
usort($messages, function ($a, $b) {
    return $a['timestamp'] <=> $b['timestamp'];
});

file_put_contents('messages.txt', json_encode($messages));

echo json_encode(['status' => 'success']);
?>

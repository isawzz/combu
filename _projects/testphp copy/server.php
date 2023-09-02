<?php
// Filename: server.php

require 'vendor/autoload.php'; // If you installed the component via Composer

use Symfony\Component\Yaml\Yaml;

// This is a simple example and does not include proper error handling or input validation.

$data = json_decode(file_get_contents("php://input"), true);

$timestamp = $data['timestamp'];
$message = $data['message'];

// Load messages from the YAML file.
$fileContents = file_exists('messages.yaml') ? file_get_contents('messages.yaml') : '';
$messages = $fileContents ? Yaml::parse($fileContents) : [];

$messages[] = [
    'timestamp' => $timestamp,
    'message' => $message
];

// Sort messages by timestamp
usort($messages, function ($a, $b) {
    return $a['timestamp'] <=> $b['timestamp'];
});

// Save messages to the YAML file
file_put_contents('messages.yaml', Yaml::dump($messages));

echo json_encode(['status' => 'success']);
?>

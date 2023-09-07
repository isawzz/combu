<?php
// Filename: server.php

function fileAppend($filename,$row){
    $handle = fopen('messages.csv', 'a');
    fputcsv($handle, $row);
    fclose($handle);
}

session_start();

$posted = $_SERVER['REQUEST_METHOD'] === 'POST' ? json_decode(file_get_contents("php://input"), true) : [];

//echo json_encode(['posted' => $posted, 'session' => $_SESSION]); exit;

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($posted['action']) && $posted['action'] === 'updatePositions') {
	//echo json_encode(['posted' => $posted, 'session' => $_SESSION]); exit;
	$data = $posted;
	$timestamp = $data['timestamp'];
	$message = $data['message'];
	$goal = $data['goal'];
	$pos = $data['pos'];
	$userId = $data['name'];  // capture the unique ID

	//fileAppend('messages.csv',[$timestamp, $message, $userId]); // Append message, timestamp, and unique ID to CSV
	$_SESSION[$userId] = [
		'timestamp' => $timestamp,
		'goal' => $goal,
		'pos' => $pos,
		'color' => $data['color'],
		// 'message' => $message
	];

	// Check if 'users' session array exists, if not, create it
	if (!isset($_SESSION['users'])) {
		$_SESSION['users'] = [];
	}

	// If the userId is not already in the users array, add it
	if (!in_array($userId, $_SESSION['users'])) {
			$_SESSION['users'][] = $userId;
	}

	echo json_encode(['status' => 'ok', 'session' => $_SESSION]);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);
    $timestamp = $data['timestamp'];
    $message = $data['message'];
    $goal = $data['goal'];
    $pos = $data['pos'];
    $userId = $data['userId'];  // capture the unique ID

		//fileAppend('messages.csv',[$timestamp, $message, $userId]); // Append message, timestamp, and unique ID to CSV
		$_SESSION[$userId] = [
			'timestamp' => $timestamp,
			'goal' => $goal,
			'pos' => $pos,
			'message' => $message
		];

		// Check if 'users' session array exists, if not, create it
    if (!isset($_SESSION['users'])) {
			$_SESSION['users'] = [];
		}

		// If the userId is not already in the users array, add it
		if (!in_array($userId, $_SESSION['users'])) {
				$_SESSION['users'][] = $userId;
		}

    echo json_encode(['status' => 'success']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'positions') {
	header('Content-Type: application/json');

	$positions = [];
	if (!isset($_SESSION['users'])) {
		$_SESSION['users'] = [];
	}
	foreach ($_SESSION['users'] as $userId) {
		if (isset($_SESSION[$userId])) {
				$userData = $_SESSION[$userId];
				$userData['userId'] = $userId;
				$positions[] = $userData;
		}
	}
	echo json_encode($positions);
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
                'userId' => $row[2]
            ];
        }
        fclose($handle);
    }

    echo json_encode($messages);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'reset') {
	header('Content-Type: application/json');
	session_unset();
	echo json_encode($_SESSION);
	exit;
}
?>


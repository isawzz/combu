<?php // Filename: server.php

session_start();

$posted = $_SERVER['REQUEST_METHOD'] === 'POST' ? json_decode(file_get_contents("php://input"), true) : [];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	//echo json_encode(['posted'=>$posted]);exit;
	$userId = $posted['id'];  
	$_SESSION[$userId] = $posted;

	// Check if 'users' session array exists, if not, create it
	if (!isset($_SESSION['users'])) {
		$_SESSION['users'] = [];
	}

	// If the userId is not already in the users array, add it
	if (!in_array($userId, $_SESSION['users'])) {
			$_SESSION['users'][] = $userId;
	}

	echo json_encode($_SESSION);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'reset') {
	header('Content-Type: application/json');
	session_unset();
	echo json_encode($_SESSION);
	exit;
}
?>


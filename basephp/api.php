<?php // Filename: api.php
//header("Access-Control-Allow-Origin: http://localhost:5500");
session_start();

$posted = $_SERVER['REQUEST_METHOD'] === 'POST' ? json_decode(file_get_contents("php://input"), true) : [];

if ($_SERVER['REQUEST_METHOD'] === 'POST'){
	echo 'WTF!!!!!!!!!!!!!!!!!!!!!'; exit;
	echo $posted['action'] . ' - ' . $_POST['filename']; exit; //$posted['filename']; exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($posted['action']) && $posted['action'] === 'upload_image') {
	$imageData = $posted['imageData'];
	$filename = $posted['filename'];

	// Remove the prefix from the image data
	$base64Data = str_replace('data:image/png;base64,', '', $imageData);
	$image = base64_decode($base64Data);

	// Save the image to a file
	$path = 'uploads/' . $filename;  // Ensure you have a folder named 'uploads' and it's writable
	file_put_contents($path, $image);

	echo $filename . ' uploaded successfully!'; exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'upload_image') {

	$imageData = $_POST['imageData'];
	$filename = $_POST['filename'];

	// Remove the prefix from the image data
	$base64Data = str_replace('data:image/png;base64,', '', $imageData);
	$image = base64_decode($base64Data);

	// Save the image to a file
	$path = 'uploads/' . $filename;  // Ensure you have a folder named 'uploads' and it's writable
	file_put_contents($path, $image);

	echo $filename . ' uploaded successfully!'; exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
	//echo 'hallo'; die;

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

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'session') {
	header('Content-Type: application/json');
	echo json_encode((object)$_SESSION);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'reset') {
	header('Content-Type: application/json');
	session_unset();
	echo json_encode((object)$_SESSION);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'load_images') {
	$dir = isset($_GET['path'])? $_GET['path']:'../../base/assets/icons';
	// $dir = '../../base/assets/img/animals/bird'; // Directory path where images are stored
	$images = [];
	
	// echo 'hallo hallo ' . $dir; exit;
	if (is_dir($dir)) {
		// echo 'IST EIN DIR hallo hallo ' . $dir; exit;
		$files = scandir($dir);
		foreach ($files as $file) {
			if ($file !== '.' && $file !== '..') {
				$images[] = [
						'filename' => $file,
						'path' => "$dir/$file",
				];
			}
		}
	}
	header('Content-Type: application/json');
	echo json_encode($images);
	exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET' && isset($_GET['action']) && $_GET['action'] === 'upload_image') {
	$imageData = $_GET['imageData'];
	$filename = $_GET['filename'];

	// Remove the prefix from the image data
	$base64Data = str_replace('data:image/png;base64,', '', $imageData);
	$image = base64_decode($base64Data);

	// Save the image to a file
	$path = 'uploads/' . $filename;  // Ensure you have a folder named 'uploads' and it's writable
	file_put_contents($path, $image);

	echo $filename . ' uploaded successfully!'; exit;
}

?>


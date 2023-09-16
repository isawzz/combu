<?php

// Get the URL of the external image from the query parameter
$path = $_GET['path'];

if (empty($path)) {
    http_response_code(400);
    echo 'Missing "path" parameter';
    exit;
}
$result = [];
$paths = explode(',',$path);
foreach ($paths as $p) {
    $k = pathinfo($p, PATHINFO_FILENAME);

    if (is_file($p)) {
        $result[$k] = file_get_contents($p);
    }
}
header('Content-Type: application/json');
echo json_encode($result);
?>

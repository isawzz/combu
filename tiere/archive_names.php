<?php
function recGetFilenames($cat,$path){
    $files = scandir($path);
    $filenames = [];
    $dirnames = [];
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            if (is_file($path . DIRECTORY_SEPARATOR . $file)) { $filenames[] = $file; }
            if (is_dir($path . DIRECTORY_SEPARATOR . $file)) { $dirnames[$file] = recGetFilenames($file,$path . DIRECTORY_SEPARATOR . $file); }
        }
    }
    return ['files'=>$filenames,'dirs'=>$dirnames];
}

// Get the URL of the external image from the query parameter
$path = $_GET['path'];

if (empty($path)) {
    http_response_code(400);
    echo 'Missing "path" parameter';
    exit;
}
$result = [];
if (is_dir($path)) {
    $cat = pathinfo($path, PATHINFO_FILENAME);
    $result = recGetFilenames($cat,$path);
}

header('Content-Type: application/json');
echo json_encode($result);
?>

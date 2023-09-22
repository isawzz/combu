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
$paths = explode(',',$path);
foreach ($paths as $p) {
    $k = pathinfo($p, PATHINFO_FILENAME);

    if (is_dir($p)) {
        $cat = pathinfo($p, PATHINFO_FILENAME);
        $result[$k] = recGetFilenames($cat,$p);
    }
}
header('Content-Type: application/json');
echo json_encode($result);
?>

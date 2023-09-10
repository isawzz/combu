<?php
$dir = '../animals'; // Directory path where images are stored
$images = [];

if (is_dir($dir)) {
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
?>

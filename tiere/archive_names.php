<?php
// Get the URL of the external image from the query parameter
$path = $_GET['path'];

if (empty($path)) {
    http_response_code(400);
    echo 'Missing "path" parameter';
    exit;
}
echo $path;
$names = [];

if (is_dir($path)) {
    $files = scandir($path);
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            if (is_file($path . DIRECTORY_SEPARATOR . $file)) {
                // Get the filename without extension
                $fileInfo = pathinfo($file);
                $filenameWithoutExtension = $fileInfo['filename'];
                $fileExtension = $fileInfo['extension'];
                // $filenameWithoutExtension = pathinfo($file, PATHINFO_FILENAME);
                // $names[] = $filenameWithoutExtension; // Add the filename to the list
                $names[] = [
                    'filename' => $filenameWithoutExtension,
                    'extension' => $fileExtension,
                    'dir' => $path,
                    'path' => "$path/$filenameWithoutExtension.$fileExtension",
                ];
            }
        }
    }
}

header('Content-Type: application/json');
echo json_encode($names);
?>

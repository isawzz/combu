<?php

function getFilenames($path){
    $names = [];
    $files = scandir($path);
    //return $files;
    foreach ($files as $file) {
        if ($file !== '.' && $file !== '..') {
            if (is_file($path . DIRECTORY_SEPARATOR . $file)) {
                $names[] = $file; continue;

                // Get the filename without extension
                $fileInfo = pathinfo($file);
                $filenameWithoutExtension = $fileInfo['filename'];
                $fileExtension = $fileInfo['extension'];
                // $filenameWithoutExtension = pathinfo($file, PATHINFO_FILENAME);
                // $names[] = $filenameWithoutExtension; // Add the filename to the list
                $names[] = $filenameWithoutExtension;
                // $names[] = [
                //     'filename' => $filenameWithoutExtension,
                //     // 'extension' => $fileExtension,
                //     // 'dir' => $path,
                //     // 'path' => "$path/$filenameWithoutExtension.$fileExtension",
                // ];
            }
        }
    }
    return $names;
}

// Get the URL of the external image from the query parameter
$path = $_GET['path'];

if (empty($path)) {
    http_response_code(400);
    echo 'Missing "path" parameter';
    exit;
}
//echo $path;
$result = [];

if ($path == 'emoji') {
    //$echo $path . "geeeeeeeeeee"; die;
    //$result['message'] = 'hallo'; echo $path;
    $dir = '../base/assets/img/emoji/';
    $dirs = scandir($dir);
    //echo json_encode(['dirs'=>$dirs]); exit;
    foreach ($dirs as $d) {
        if ($d !== '.' && $d !== '..') {
            $cat = pathinfo($d, PATHINFO_FILENAME);
            //echo $cat; exit;
            //echo $cat . ': ' . $dir . $d; exit;
            $result[$cat] = getFilenames($dir . $d);
        }
        //break;
    }
} else if (is_dir($path)) {

    $cat = pathinfo($path, PATHINFO_FILENAME);
    // //$echo 'hallo'; exit;
    // $names = [];
    // $files = scandir($path);
    // foreach ($files as $file) {
    //     if ($file !== '.' && $file !== '..') {
    //         if (is_file($path . DIRECTORY_SEPARATOR . $file)) {
    //             // Get the filename without extension
    //             $fileInfo = pathinfo($file);
    //             $filenameWithoutExtension = $fileInfo['filename'];
    //             $fileExtension = $fileInfo['extension'];
    //             // $filenameWithoutExtension = pathinfo($file, PATHINFO_FILENAME);
    //             // $names[] = $filenameWithoutExtension; // Add the filename to the list
    //             $names[] = [
    //                 'filename' => $filenameWithoutExtension,
    //                 'extension' => $fileExtension,
    //                 'dir' => $path,
    //                 'path' => "$path/$filenameWithoutExtension.$fileExtension",
    //             ];
    //         }
    //     }
    // }
    $result[$cat] = getFilenames($path); //$names;
}

header('Content-Type: application/json');
echo json_encode($result);
?>

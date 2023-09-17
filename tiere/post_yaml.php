<?php
$raw = file_get_contents("php://input");
$o = json_decode($raw);
if (isset($o->content) && isset($o->filename)) {
    $content = $o->content;
    $filename = $o->filename;
    $path = $filename; //'uploads/' . $filename . '.yaml';  // Ensure you have a folder named 'uploads' and it's writable
    //file_put_contents($path, $content);
    file_put_contents($path, $content); //implode(PHP_EOL, $content));
    echo 'text uploaded successfully!';
} else {
    echo 'Error uploading text!';
}
?>

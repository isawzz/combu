<?php
$dir = 'images/';
$images = glob($dir . "*.{jpg,jpeg,png,gif}", GLOB_BRACE);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $oldName = $_POST['oldName'];
    $newName = $_POST['newName'];

    if (file_exists($dir . $oldName)) {
        rename($dir . $oldName, $dir . $newName);
    }
    exit;
}

include 'index.html';
?>

<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    $oldFilename = $data['filename'];
    $newFilename = $data['newFilename'];
    
    // Validate and sanitize the new filename (you can add more validation here)
    $newFilename = preg_replace('/[^A-Za-z0-9_.-]/', '', $newFilename);

    // Rename the file
    $dir = 'images'; // Directory path where images are stored
    $oldPath = "$dir/$oldFilename";
    $newPath = "$dir/$newFilename";

    if (file_exists($oldPath) && !file_exists($newPath)) {
        if (rename($oldPath, $newPath)) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false]);
        }
    } else {
        echo json_encode(['success' => false]);
    }
} else {
    echo json_encode(['success' => false]);
}
?>

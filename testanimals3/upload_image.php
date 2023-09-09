<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['image'])) {
    $uploadDir = 'images'; // Directory path where images should be uploaded
    $uploadFile = $uploadDir . '/' . basename($_FILES['image']['name']);

    // Check if the file already exists
    if (!file_exists($uploadFile)) {
        // Check if the file is a valid image (you can add more validation here)
        $imageFileType = strtolower(pathinfo($uploadFile, PATHINFO_EXTENSION));
        if (in_array($imageFileType, ['jpg', 'jpeg', 'png', 'gif'])) {
            // Upload the file
            if (move_uploaded_file($_FILES['image']['tmp_name'], $uploadFile)) {
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
} else {
    echo json_encode(['success' => false]);
}
?>

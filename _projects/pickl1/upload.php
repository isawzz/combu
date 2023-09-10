<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $uploadedFile = $_FILES['image'];

    if ($uploadedFile['error'] === UPLOAD_ERR_OK) {
        // Set the desired height for the uploaded image
        $desiredHeight = 300; // 300 pixels

        // Load the uploaded image
        $image = imagecreatefromstring(file_get_contents($uploadedFile['tmp_name']));

        // Calculate the new width while maintaining the aspect ratio
        $originalWidth = imagesx($image);
        $originalHeight = imagesy($image);
        $newWidth = ($desiredHeight / $originalHeight) * $originalWidth;

        // Create a new image with the desired height and calculated width
        $resizedImage = imagecreatetruecolor($newWidth, $desiredHeight);
        imagecopyresampled($resizedImage, $image, 0, 0, 0, 0, $newWidth, $desiredHeight, $originalWidth, $originalHeight);

        // Save the resized image to a file (you can adjust the file path)
        $outputFilePath = 'uploads/' . uniqid() . '.jpg';
        imagejpeg($resizedImage, $outputFilePath);

        // Clean up memory
        imagedestroy($image);
        imagedestroy($resizedImage);

        echo 'Image uploaded and resized successfully.';
    } else {
        http_response_code(400);
        echo 'Image upload failed.';
    }
} else {
    http_response_code(405);
    echo 'Method not allowed.';
}
?>

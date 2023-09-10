<?php
// Get the URL of the external image from the query parameter
$imageURL = $_GET['url'];

if (empty($imageURL)) {
    http_response_code(400);
    echo 'Missing "url" parameter';
    exit;
}

// Set the content type based on the image type (you may need to adjust this based on your use case)
header('Content-Type: image/jpeg');

// Fetch the image from the external URL and echo it to the response
$imageData = file_get_contents($imageURL);
echo $imageData;
?>

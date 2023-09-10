<?php
$dir = '../animals/';
$images = glob($dir . "*.{jpg,jpeg,png,gif}", GLOB_BRACE);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $oldName = $_POST['oldName'];
    $newName = $_POST['newName'];

    if (file_exists($dir . $oldName)) {
        rename($dir . $oldName, $dir . $newName);
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Images with Editable Labels</title>
    <style>
        img {
            height: 300px;
            margin: 10px;
        }
    </style>
</head>
<body>

<?php foreach ($images as $image): ?>
    <div class="image-wrapper">
        <img src="<?= $image ?>" alt="">
        <input type="text" value="<?= basename($image) ?>" class="label-input">
    </div>
<?php endforeach; ?>

<script>
    const inputs = document.querySelectorAll('.label-input');

    inputs.forEach(input => {
        input.addEventListener('keyup', function(event) {
            if (event.key === 'Enter') {
                let oldName = this.defaultValue;
                let newName = this.value;

                if (oldName !== newName) {
                    fetch('index.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: `oldName=${encodeURIComponent(oldName)}&newName=${encodeURIComponent(newName)}`
                    }).then(response => {
                        if (response.ok) {
                            this.defaultValue = newName;
                            alert('Image name updated!');
                        } else {
                            alert('Error updating image name!');
                        }
                    });
                }
            }
        });
    });
</script>

</body>
</html>

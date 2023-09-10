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

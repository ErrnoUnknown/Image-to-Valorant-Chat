const fileInput = document.getElementById('imageInput');
const uploadAndConvertButton = document.getElementById('uploadAndConvertButton');
const resultPre = document.getElementById('result_text');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const copyButton = document.getElementById('copyResultButton');

uploadAndConvertButton.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', function() {
    if (fileInput.files.length === 0) {
        alert('Please select an image file.');
        return;
    }

    const file = fileInput.files[0];
    const img = new Image();
    const reader = new FileReader();

    reader.onload = function(event) {
        img.src = event.target.result;
        document.getElementById("input_image").src = event.target.result;
    };

    img.onload = function() {
        const originalWidth = img.width;
        const originalHeight = img.height;

        const desiredWidth = 26;
        let newHeight = Math.round(desiredWidth * (originalHeight / originalWidth));

        if (newHeight > 13) {
            newHeight = 13;
        }

        canvas.width = desiredWidth;
        canvas.height = newHeight;
        ctx.drawImage(img, 0, 0, desiredWidth, newHeight);

        const imageData = ctx.getImageData(0, 0, desiredWidth, newHeight);
        const data = imageData.data;

        let result = '';

        for (let y = 0; y < newHeight; y++) {
            for (let x = 0; x < desiredWidth; x++) {
                const index = (y * desiredWidth + x) * 4;
                const r = data[index];
                const g = data[index + 1];
                const b = data[index + 2];

                const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);

                if (gray <= 51) {
                    result += '_';
                } else if (gray <= 102) {
                    result += '░';
                } else if (gray <= 153) {
                    result += '▒';
                } else if (gray <= 204) {
                    result += '▓';
                } else {
                    result += '█';
                }
            }
            result += '\n';
        }

        resultPre.textContent = result;
    };

    reader.readAsDataURL(file);
});

copyButton.addEventListener('click', () => {
    const resultText = resultPre.textContent;
    if (resultText) {
        navigator.clipboard.writeText(resultText).then(() => {
            alert('Result copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    } else {
    }
});
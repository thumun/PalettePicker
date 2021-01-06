
function pageLoaded() {
    Array.prototype.forEach.call(document.querySelectorAll(".file-upload__button"), function (button) {
        const hiddenInput = button.parentElement.querySelector(
            ".file-upload__input");
        const label = button.parentElement.querySelector(".file-upload__label");
        const defaultLabelText = "No file selected";

        // Set default text for label
        label.textContent = defaultLabelText;
        label.title = defaultLabelText;

        button.addEventListener("click", function () {
            hiddenInput.click();
        });

        hiddenInput.addEventListener("change", function () {
            const filenameList = Array.prototype.map.call(hiddenInput.files, function (
                file
            ) {
                return file.name;
            });

            label.textContent = filenameList.join(", ") || defaultLabelText;
            label.title = label.textContent;
        });
    });
}

var loadFile = function (event) { // putting the user uploaded image onto the canvas 

    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = URL.createObjectURL(event.target.files[0]);  // the user uploaded file 
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    img.onload = function () {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // get the scale
        var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
        // get the top left position of the image
        var x = (canvas.width / 2) - (img.width / 2) * scale;
        var y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale); // draw image on to canvas 
    };
    originalImageData = null;
    document.getElementById("hue").value = "180";   // resets vals for hsl sliders when an image is uploaded to the canvas 
    document.getElementById("saturation").value = "50";
    document.getElementById("brightness").value = "50";
};

var downloadPalette = function () { // outputs a txt file w/ data about colors from palette 

    var text = "";

    for (let i = 0; i < colorcells.length; i++) {    // cycling through each color in palette 
        if (colorcells[i] == null) {     // if cell is empty then use empty cell
            break;
        }
        text += `Color ${i + 1}: ${colorcells[i].colorvalues.name.value}`; // adding data about each color to txt file (data from API)
        text += `\n\t     RGB: ${colorcells[i].colorvalues.rgb.value}`;
        text += `\n\t     HSL: ${colorcells[i].colorvalues.hsl.value}`;
        text += `\n\t     XYZ: ${colorcells[i].colorvalues.XYZ.value}`;
        text += `\n\t Hexcode: ${colorcells[i].colorvalues.hex.value}`;
        text += `\n\n`;
    }

    blob = new Blob([text], { type: 'text/plain' });
    anchor = document.createElement('a');

    anchor.download = "palette.txt";    // download file name 
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();

}

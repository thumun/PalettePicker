
function pageLoaded() {

Array.prototype.forEach.call(document.querySelectorAll(".file-upload__button"), function(button) {
    const hiddenInput = button.parentElement.querySelector(
    ".file-upload__input");
    const label = button.parentElement.querySelector(".file-upload__label");
    const defaultLabelText = "No file selected";

    // Set default text for label
    label.textContent = defaultLabelText;
    label.title = defaultLabelText;

    button.addEventListener("click", function() {
    hiddenInput.click();
    });

    hiddenInput.addEventListener("change", function() {
    const filenameList = Array.prototype.map.call(hiddenInput.files, function(
        file
    ) {
        return file.name;
    });

    label.textContent = filenameList.join(", ") || defaultLabelText;
    label.title = label.textContent;
    });
});
}

var loadFile = function(event) {

    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = URL.createObjectURL(event.target.files[0]);
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    
    img.onload = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    // get the scale
    var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
    // get the top left position of the image
    var x = (canvas.width / 2) - (img.width / 2) * scale;
    var y = (canvas.height / 2) - (img.height / 2) * scale;
    ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        //img.style.display = 'none';
    };
    
};

var downloadPalette = function(){

    var text = "";
    
    for (let i = 0; i < colorcells.length; i++){
        if (colorcells[i] == null){     // if cell is empty then use empty cell
            break;
        }
        text+= 'Color ' + (i+1) + ': ' + colorcells[i] + '\n';
    }

    blob = new Blob([text], { type: 'text/plain' });
    anchor = document.createElement('a');

    anchor.download = "palette.txt";    // download file name 
    anchor.href = (window.webkitURL || window.URL).createObjectURL(blob);
    anchor.dataset.downloadurl = ['text/plain', anchor.download, anchor.href].join(':');
    anchor.click();

}
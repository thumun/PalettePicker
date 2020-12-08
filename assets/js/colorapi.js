function getcolorvalues(cell, selected) {
    let url = 'https://www.thecolorapi.com/id?rgb=' + cell.pixel[0] + ',' + cell.pixel[1] + ',' + cell.pixel[2];    // using a color api to get name of colorss & other data
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // asynchronous; getting info in background and updating once got it 

    xhr.onload = function(e){
        if (xhr.readyState == 4){
            if (xhr.status == 200){
                cell.colorvalues = JSON.parse(xhr.responseText); // parsing string in rder to easily get data from it 
                selected.textContent = cell.colorvalues.hex.value;
            }
        }
    };

    xhr.send(null);
}
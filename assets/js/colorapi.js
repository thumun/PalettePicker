function getcolorvalues(cell, selected) {
    let url = 'https://www.thecolorapi.com/id?rgb=' + cell.pixel[0] + ',' + cell.pixel[1] + ',' + cell.pixel[2];    // using a color api to get name of colors & other data
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true); // asynchronous; getting info in background and updating once got it 

    xhr.onload = function (e) {
        if (xhr.readyState == 4) {
            if (xhr.status == 200) {
                cell.colorvalues = JSON.parse(xhr.responseText); // parsing string in order to easily get data from it 
                if ((cell.pixel[0] * 0.299 + cell.pixel[1] * 0.587 + cell.pixel[2] * 0.114) > 150)
                    selected.style.color = "#000000";
                else
                    selected.style.color = "#ffffff";

                selected.textContent = cell.colorvalues.hex.value + '\n' + cell.colorvalues.name.value;
            }
        }
    };

    xhr.send(null);
}

var colorcells = [null, null, null, null, null];   // creating an array to select/pick colors
var ctx = canvas.getContext('2d');
var hoveredColor = document.getElementById('hovered-color');

function pick(event) { // for hover color 
    
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);   // getting info on pixel where mouse is hovered over 
    var data = pixel.data;

      const rgba = `rgba(${data[0]}, ${data[1]}, ${data[2]}, ${data[3] / 255})`;    // creating color string that will be assigned to table cell - from pixel data
      
      hoveredColor.style.background = rgba;     // setting data in hoveredColor 
      //hoveredColor.textContent = rgba;
  
      return rgba;
  }

  function pickcolor(event) {   // for select color 
    var x = event.layerX;
    var y = event.layerY;
    var pixel = ctx.getImageData(x, y, 1, 1);
    var data = pixel.data;
    updatecell(data);   // updating data 

    for (let i = 0; i < colorcells.length; i++){    // put one color per box in table 
        var selectedColor = document.getElementById('selected-color'+(i+1));    // adding color to corresponding table cell [based on array cell]
        var rgba = colorcells[i];  // getting the associated javascript cell [will put this color in the html table]
        
        if (rgba != null){
            selectedColor.style.background = rgba;
            //selectedColor.textContent = rgba;
        }
        else{
            rgba=(`rgba(255, 255, 255, 50)`);   // default
            selectedColor.style.background = rgba;
            //selectedColor.textContent = rgba;
        } 
    }
  
      return rgba;
  }
  
  canvas.addEventListener('mousemove', function(event) {    // when mouse hover over canvas; function called 
      pick(event);    
  });
  canvas.addEventListener('click', function(event) {    // click on canvas [to select color]
        pickcolor(event);
  });

function updatecell(color){  // updating selected color to javascript array 
    var emptycell = -1; 

    for (let i = 0; i < colorcells.length; i++){    // iterating through array
        if (colorcells[i] == null){     // if cell is empty then use empty cell
            emptycell = i; 
            break; 
        }
    }


    if (emptycell == -1){   // if no empty cells found:
        colorcells = [null, null, null, null, null]; // clear all colors 
        emptycell = 0;
    }

    
    colorcells[emptycell] = `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${color[3] / 255})`;    // putting selected color in emptycell

}

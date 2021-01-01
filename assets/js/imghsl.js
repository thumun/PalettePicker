var ctx = canvas.getContext('2d');
var originalImageData = null;

var grayscale = function () {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    for (var i = 0; i < data.length; i += 4) {
        var avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
        data[i] = avg; // red
        data[i + 1] = avg; // green
        data[i + 2] = avg; // blue
    }
    ctx.putImageData(imageData, 0, 0);
};

var hue = function () {

};

var saturation = function () {

};

var brightness = function (sliderValue) {

    if(originalImageData == null) {
        originalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    }

    var imageDataCopy = new Uint8ClampedArray(originalImageData.data);

    for (var i = 0; i < imageDataCopy.length; i += 4) {
        r = imageDataCopy[i]; // red
        g = imageDataCopy[i + 1]; // green
        b = imageDataCopy[i + 2]; // blue

        hsl = RGBToHSL(r,g,b);
        
    
        //console.log("slider value:" + sliderValue);

        hsl[2] = hsl[2] + (sliderValue - 50);
        //if(hsl[2] < 0) hsl[2] = 0;
        //if(hsl[2] > 100) hsl[2] = 100;

        rgb = HSLToRGB(hsl[0], hsl[1], hsl[2]);

        imageDataCopy[i] = rgb[0];
        imageDataCopy[i+1] = rgb[1];
        imageDataCopy[i+2] = rgb[2];
    }
    const imageData = new ImageData(imageDataCopy, originalImageData.width, originalImageData.height)
    ctx.putImageData(imageData, 0, 0);
};

function RGBToHSL(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;

    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;

    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;

    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return [h, s, l];
}

function HSLToRGB(h, s, l) {
    // Must be fractions of 1
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c / 2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    r = Math.round((r + m) * 255);
    g = Math.round((g + m) * 255);
    b = Math.round((b + m) * 255);

    return [r, g, b];
}
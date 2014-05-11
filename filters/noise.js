self.onmessage = function (event) {

    var imageData = event.data.imagedata;
    var width = event.data.width;
    var height = event.data.height;
    var radius = event.data.radius;

    var pixels = imageData.data;

    var w4 = width*4;
    var y = height;
    var random = Math.random;

    var noise = radius;
    var noise2 = Math.floor(noise / 2);

    for (var i=0; i< pixels.length; i+=4){
        if (true){
            var r = pixels[i] - noise2 + (random() * noise);
            var g = pixels[i+1] - noise2 + (random() * noise);
            var b = pixels[i+2] - noise2 + (random() * noise);
            if (r < 0 ) r = 0;
            if (g < 0 ) g = 0;
            if (b < 0 ) b = 0;
            if (r > 255 ) r = 255;
            if (g > 255 ) g = 255;
            if (b > 255 ) b = 255;

            pixels[i] = r;
            pixels[i+1] = g;
            pixels[i+2] = b;
        }
    }

    postMessage({
        status: 'done',
        imagedata: imageData
    });
}
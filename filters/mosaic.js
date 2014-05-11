self.onmessage = function (event) {

    var imageData = event.data.imagedata;
    var width = event.data.width;
    var height = event.data.height;
    var radius = event.data.radius;

    var pixels = imageData.data;

    for (var i=0; i< height; i+=radius){
        for (var j = 0; j < width * 4; j+=4*radius){
            var offset = i*width*4 + j;
            var r = pixels[offset];
            var g = pixels[offset+1];
            var b = pixels[offset+2];
            
            for (var k=i; k<i+radius; k++){
                for (var l=j; l<j+radius*4; l+=4){
                    pixels[k*width*4 + l] = r;
                    pixels[k*width*4 + l + 1] = g;
                    pixels[k*width*4 + l + 2] = b;
                }
            }

            pixels[offset] = r;
            pixels[offset+1] = g;
            pixels[offset+2] = b;
        }
    }

    postMessage({
        status: 'done',
        imagedata: imageData
    });
}
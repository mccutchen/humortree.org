document.getElementById('input').addEventListener('load', displace);

function displace(e) {
    var img = e.currentTarget,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        w = img.width,
        h = img.height,
        sliceWidth = 5,
        slices;

    // Copy the input image to the canvas.
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0);

    // Pull image data slices out of the canvas
    slices = getSlices(ctx, w, h, sliceWidth);

    // Do something with the slices.
    slices.reverse();

    // Draw the slices back to the canvas.
    drawSlices(ctx, slices);

    // Insert the canvas into the DOM after the source image element.
    img.parentNode.insertBefore(canvas, img.nextSibling);
}

function getSlices(ctx, w, h, sliceWidth) {
    var slices = [];
    for (var x = 0; x < w; x += sliceWidth) {
        slices.push(ctx.getImageData(x, 0, sliceWidth, h));
    }
    return slices;
}

function drawSlices(ctx, slices) {
    for (var i = 0, offset = 0, slice; i < slices.length; i++) {
        slice = slices[i];
        ctx.putImageData(slice, offset, 0);
        offset += slice.width;
    }
}

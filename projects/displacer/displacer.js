function displace(e) {
    var img = e.currentTarget,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        // Pick a size for the canvas that's as close as possible to the input
        // image size while being divisible by 12.
        w = Math.floor(img.width / 48) * 48,
        h = Math.floor(img.height / 48) * 48,
        sizes = [3, 6, 12, 24, 48];

    // Copy the input image to the canvas.
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0);

    // Insert the canvas into the DOM after the source image element.
    img.parentNode.insertBefore(canvas, img.nextSibling);

    function step() {
        var size = sizes[rand(sizes.length)],
            slices = getSlices(ctx, w, h, size),
            total = slices.length,
            a = rand(total),
            b = rand(total),
            aVal = slices[a],
            bVal = slices[b];
        slices[a] = bVal, slices[b] = aVal;
        drawSlices(ctx, slices);
    }
    setInterval(step, 250);
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

function rand(hi, low) {
    low = low || 0;
    return Math.floor(Math.random() * (hi - low) + low);
}

document.getElementById('input').addEventListener('load', displace);

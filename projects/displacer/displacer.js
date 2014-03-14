function displace(e) {
    var img = e.currentTarget,
        canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        // Pick a slice width as percentage of largest dimension of source img
        sliceWidth = Math.round(Math.max(img.width, img.height) * 0.0125),
        // Pick a size for the canvas that's divisible by the slice width
        w = Math.floor(img.width / sliceWidth) * sliceWidth,
        h = Math.floor(img.height / sliceWidth) * sliceWidth,
        slices = null;

    // Copy the input image to the canvas.
    canvas.width = w;
    canvas.height = h;
    ctx.drawImage(img, 0, 0);

    // Insert the canvas into the DOM after the source image element.
    img.parentNode.insertBefore(canvas, img.nextSibling);

    slices = getSlices(ctx, w, h, sliceWidth);
    console.log('Slice:', slices[0]);

    function step() {
        var total = slices.length,
            a = rand(total),
            b = rand(total);
        swap(slices, a, b);
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

function swap(xs, a, b) {
    var aVal = xs[a],
        bVal = xs[b];
    xs[a] = bVal;
    xs[b] = aVal;
}

function sum(xs) {
    var total = 0;
    for (var i = 0, length = xs.length; i < length; i++) {
        total += xs[i];
    }
    return total;
}

function avg(xs) {
    return sum(xs) / (xs.length || 1);
}

function rand(hi, low) {
    low = low || 0;
    return Math.floor(Math.random() * (hi - low) + low);
}

document.getElementById('input').addEventListener('load', displace);

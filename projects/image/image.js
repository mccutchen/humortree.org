// image.js is a fairly direct port of the original image.php algorithm (found
// in ./original/image.php).

function drawImage(opts) {
    opts = opts || {};
    var width = opts.width || 100;
    var height = opts.height || 100;
    var iterations = opts.iterations || 500;

    var colorCount = rand(2, 10);
    var palette = randomPalette(colorCount);

    let [canvas, ctx] = createCanvas(width, height);

    function opLine() {
        let [x1, y1] = randCoords(width, height);
        let [x2, y2] = randCoords(width, height);
        ctx.strokeStyle = toFillStyle(randomChoice(palette));
        ctx.lineWidth = rand(1, 5);
        ctx.beginPath()
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function opDashedLine() {
        let [x1, y1] = randCoords(width, height);
        let [x2, y2] = randCoords(width, height);
        ctx.strokeStyle = toFillStyle(randomChoice(palette));
        ctx.setLineDash([rand(1, 5), rand(1, 5)]);
        ctx.lineWidth = rand(1, 5);
        ctx.beginPath()
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    }

    function opFilledRect() {
        let [x, y] = randCoords(width, height);
        let [w, h] = randCoords(width, height);
        ctx.fillStyle = toFillStyle(randomChoice(palette));
        ctx.fillRect(x, y, w, h);
    }

    function opPixel() {
        let [x, y] = randCoords(width, height);
        ctx.fillStyle = toFillStyle(randomChoice(palette));
        ctx.fillRect(x, y, 1, 1);
    }

    var ops = [
        opLine,
        opLine, // line was over-represented in the original
        opDashedLine,
        opFilledRect,
        opPixel,
    ]

    // fill canvas
    ctx.fillStyle = toFillStyle(randomChoice(palette));
    ctx.fillRect(0, 0, width, height);

    // apply random operations
    for (var i = 0; i < iterations; i++) {
        ctx.save();
        randomChoice(ops)();
        ctx.restore();
    }

    return canvas.toDataURL('image/png');
}

function createCanvas(w, h) {
    // See https://www.html5rocks.com/en/tutorials/canvas/hidpi/ for context on
    // the hidpi setup we're doing here.
    var dpr = window.devicePixelRatio || 1;
    var canvas = document.createElement('canvas');
    canvas.width = w * dpr;
    canvas.height = h * dpr;

    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    return [canvas, ctx];
}

function randomPalette(count) {
    var colors = [];
    for (var i = 0; i < count; i++) {
        colors.push(randomColor());
    }
    return colors;
}

function randomChoice(xs) {
    return xs[Math.floor(Math.random() * xs.length)];
}

function randomColor() {
    return [rand(0, 255), rand(0, 255), rand(0, 255)];
}

function rand(min, max) {
    return (Math.random() * (max - min) + min) | 0;
}

function randCoords(width, height) {
    return [rand(0, width), rand(0, height)];
}

function toFillStyle(color) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}


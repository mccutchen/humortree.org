// lines.js is a fairly direct port of the original lines.php algorithm (found
// in ./original/lines.php).

function drawLines(opts) {
    opts = opts || {};
    var colorCount = opts.colorCount || 5;
    var phaseCount = opts.phaseCount || 10;
    var phaseMax = opts.phaseMax || 200;
    var phaseMin = opts.phaseMin || 20;

    var imgWidth = 10;
    var imgHeight = 0;
    var phases = [];

    for (var i = 0; i < phaseCount; i++) {
        var phaseSize = rand(phaseMin, phaseMax);
        var phasePalette = randomPalette(colorCount);
        var phase = [];
        for (var j = 0; j < phaseSize; j++) {
            phase.push(randomChoice(phasePalette));
        }
        phases.push(phase);

        imgHeight += phaseSize;
    }

    var canvas = createCanvas(imgWidth, imgHeight);
    var ctx = canvas.getContext("2d");

    var offset = 0;
    for (var i = 0; i < phases.length; i++) {
        var phase = phases[i];
        for (var j = 0; j < phase.length; j++) {
            var color = phase[j];
            ctx.fillStyle = toFillStyle(color);
            ctx.fillRect(0, offset, imgWidth, 1);
            offset++;
        }
    }

    return canvas.toDataURL('image/png');
}

function createCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas;
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
    if (max === 0) {
        max = 1;
    }
    if (min === max) {
        max += 20;
    }
    return Math.floor(Math.random() * (max - min)) + min;
}

function toFillStyle(color) {
    return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}


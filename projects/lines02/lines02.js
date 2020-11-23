// lines02.js is a fairly direct port of the original lines.php algorithm (found
// in ./original/lines.php).

class Color {
    constructor(base) {
        if (!base) {
            this.r = rand(0, 255);
            this.g = rand(0, 255);
            this.b = rand(0, 255);
        }
        else {
            var d = rand(5, 15);
            var dr = rand(d * -1, d);
            var dg = rand(d * -1, d);
            var db = rand(d * -1, d);

            this.r = wrapChannel(base.r + dr);
            this.g = wrapChannel(base.g + dg);
            this.b = wrapChannel(base.b + db);
        }
    }

    toFillStyle() {
        return `rgb(${this.r}, ${this.g}, ${this.b})`
    }
}

function drawLines(opts) {
    opts = opts || {};
    var phaseCount = opts.phaseCount || 8;
    var phaseSize = opts.phaseSize || 255;

    var width = phaseCount * phaseSize;
    var height = 50;
    var phases = [];

    for (var i = 0; i < phaseCount; i++) {
        var phase = [];
        var color = undefined;
        for (var j = 0; j < phaseSize; j++) {
            color = new Color(color);
            phase.push(color);
        }
        phases.push(phase);
    }

    var canvas = createCanvas(width, height);
    var ctx = canvas.getContext("2d");

    var xOffset = 0;
    phases.forEach(phase => {
        phase.forEach(color => {
            ctx.fillStyle = color.toFillStyle();
            ctx.fillRect(xOffset, 0, 1, height);
            xOffset++;
        })
    });

    return canvas.toDataURL('image/png');
}
function wrapChannel(c) {
    return Math.abs(c % 255);
}

function createCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas;
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

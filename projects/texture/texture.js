// texture.js is a fairly direct port of the original texture.*.php algorithm
// (found in ./original/texture.*.php).

class Matrix {
    constructor(W, H, filler) {
        filler = filler || function (x, y) { };
        this.W = W;
        this.H = H;
        this.M = [];
        for (var y = 0; y < H; y++) {
            var row = [];
            for (var x = 0; x < W; x++) {
                row.push(filler(x, y));
            }
            this.M.push(row);
        }
    }

    get(x, y) {
        if (x < 0 || x >= this.W || y < 0 || y >= this.H) {
            return undefined;
        }
        return this.M[y][x];
    }

    set(x, y, val) {
        this.M[y][x] = val;
    }

    forEach(f) {
        this.M.forEach((row, y) => {
            row.forEach((val, x) => {
                f(val, x, y);
            })
        });
    }
}

function drawTexture(opts) {
    opts = opts || {};
    var colorCount = opts.colorCount || 5;
    var height = opts.height || 100;
    var width = opts.width || 100;
    var grayscale = opts.grayscale || false;

    // our repeating pattern will be 1/4 the size of the desired output image,
    // to give space for it to be transformed into a pattern
    var patternHeight = (height / 2) | 0;
    var patternWidth = (width / 2) | 0;

    // choose the palette of colors, and fill our matrix with random choices
    // from that palette
    var palette = randomPalette(colorCount, grayscale);
    var texture = new Matrix(patternWidth, patternHeight, function (x, y) {
        return randomChoice(palette);
    });

    // take a smoothing pass to give a bit of order to the randomly chosen
    // pattern
    smooth(texture, mode);

    // fill our pattern canvas
    var patternCanvas = createCanvas(patternWidth, patternHeight);
    var patternCtx = patternCanvas.getContext("2d");
    texture.forEach(function (color, x, y) {
        patternCtx.fillStyle = toFillStyle(color);
        patternCtx.fillRect(x, y, 1, 1);
    });

    // transform our pattern canvas into a pattern and fill our final image
    // with that pattern
    var canvas = createCanvas(width, height);
    var ctx = canvas.getContext("2d");
    var pattern = ctx.createPattern(patternCanvas, "repeat");
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, width, height);

    return canvas.toDataURL('image/png');
}

// smooth iterates over every color in the texture, calling the smoothing
// function with the neighbors of each color.
//
// smoother should take an array of colors and return a single color.
function smooth(texture, smoother) {
    texture.forEach((val, x, y) => {
        var left = texture.get(x - 1, y) || val;
        var right = texture.get(x + 1, y) || val;
        var top = texture.get(x, y - 1) || val;
        var bottom = texture.get(x, y + 1) || val;
        texture.set(x, y, smoother([val, left, right, top, bottom]));
    })
}

// mode chooses the most common color from an array of colors
function mode(colors) {
    var counters = {}
    var chosen = colors[0];
    var max = 0;
    colors.forEach(color => {
        var count = counters[color] || 0;
        counters[color] = count + 1;
        if (count > max) {
            chosen = color;
        }
    });
    return chosen;
}

function createCanvas(w, h) {
    var canvas = document.createElement('canvas');
    canvas.setAttribute("width", w);
    canvas.setAttribute("height", h);
    return canvas;
}

function randomPalette(count, grayscale) {
    var colors = [];
    for (var i = 0; i < count; i++) {
        colors.push(randomColor(grayscale));
    }
    return colors;
}

function randomChoice(xs) {
    return xs[Math.floor(Math.random() * xs.length)];
}

function randomColor(grayscale) {
    if (grayscale) {
        c = rand(0, 255);
        return [c, c, c];
    }
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


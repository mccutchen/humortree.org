// Transpiled to p5.js from original processing source code in Peinter2.pde by
// pde2js (https://github.com/terabyte128/pde2js)

var NUM_COORDS;

var GO;

var cursor;

var peinter;

function setup() {
    initializeFields();
    createCanvas(800, 300);
    noBackground();
    strokeWidth(1.5);
}

function loop() {
    if (!GO)
        return;
    peinter.addCoords(cursor.x, cursor.y);
    peinter.peint();
    cursor.update();
}

// pause animation if the spacebar is pressed
function keyPressed() {
    if (key == ' ')
        GO = (!GO);
}

// does the actual drawing

var NUM_COORDS;

var stroke;

var strokeDelta;

var strokeLimit;

var c;

var x, y;

public Peinter(c) {
    this.c = c;
    x = new Array(NUM_COORDS);
    y = new Array(NUM_COORDS);
}

// give the peinter somewhere new to paint
function addCoords(newx, newy) {
    for (var i = 1; i < NUM_COORDS; i++) {
        x[i - 1] = x[i];
        y[i - 1] = y[i];
    }
    x[x.length - 1] = newx;
    y[y.length - 1] = newy;
}

function pe___parseint() {
    // if the mouse is pressed, pick a more 'fudged' color
    c = (mouseIsPressed) ? c.reallyFudge() : c.slightlyFudge();
    setStroke(c);
    strokeWidth(stroke);
    // the brush strokes are a series of bezierVertexes
    beginShape(LINE_STRIP);
    for (var i = 0; i < NUM_COORDS; i++) {
        bezierVertex(x[i], y[i]);
    }
    endShape();
    // modify the stroke weight a little bit
    stroke += strokeDelta;
    if (stroke >= strokeLimit)
        strokeDelta *= -1;
    if (stroke <= .5)
        strokeDelta *= -1;
}


// provides some random movement for a Peinter to follow

var delta;

var x, y;

public Cursor() {
    x = rand(0, width);
    y = rand(0, height);
}

function update() {
    x = wrap(x + rand(-delta, delta), width);
    y = wrap(y + rand(-delta, delta), height);
}


// similar to the original color...

var r, g, b;

public FudgeableColor(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

function slightlyFudge() {
    return fudge(0, 3);
}

function reallyFudge() {
    return fudge(5, 20);
}

function fudge(min_diff, max_diff) {
    var dr = rand(min_diff, max_diff);
    var dg = rand(min_diff, max_diff);
    var db = rand(min_diff, max_diff);
    if (rand(0, 10) % 2 == 0)
        dr *= -1;
    if (rand(0, 10) % 2 == 0)
        dg *= -1;
    if (rand(0, 10) % 2 == 0)
        db *= -1;
    return new FudgeableColor(wrap(r + dr, 256), wrap(g + dg, 256), wrap(b + db, 256));
}


// ///////////////////////////
// utility functions    //
// ///////////////////////////
function setStroke(c) {
    stroke(c.r, c.g, c.b);
}

function rand(lo, hi) {
    return int(random(lo, hi));
}

function wrap(n, at) {
    return (n >= 0 && n < at) ? n : (n < 0) ? at + n : n - at;
}

function initializeFields() {
    NUM_COORDS = 4;
    GO = true;
    cursor = new Cursor();
    peinter = new Peinter(new FudgeableColor(rand(0, 255), rand(0, 255), rand(0, 255)));
    NUM_COORDS = 4;
    stroke = .5;
    strokeDelta = .5;
    strokeLimit = 20;
    c = null;
    x = null;
    y = null;
    delta = 20;
    x = 0;
    y = 0;
    r = 0;
    g = 0;
    b = 0;
}


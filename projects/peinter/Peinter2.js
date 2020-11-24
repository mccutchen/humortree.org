// Transpiled to p5.js from original processing source code in Peinter2.pde by
// pde2js (https://github.com/terabyte128/pde2js)

var GO = true;
var NUM_COORDS = 4;
var WIDTH = 800;
var HEIGHT = 300;

// does the actual drawing
class Peinter {
    constructor(c) {
        this.strokeWeight = 0.5
        this.strokeDelta = 0.5;
        this.strokeLimit = 20;

        this.c = c;
        this.x = new Array(NUM_COORDS);
        this.y = new Array(NUM_COORDS);
    }

    // give the peinter somewhere new to paint
    addCoords(newx, newy) {
        for (var i = NUM_COORDS - 1; i > 0; i--) {
            this.x[i] = this.x[i-1];
            this.y[i] = this.y[i-1];
        }
        this.x[0] = newx;
        this.y[0] = newy;
    }

    peint() {
        // if the mouse is pressed, pick a more 'fudged' color
        this.c = (mouseIsPressed) ? this.c.reallyFudge() : this.c.slightlyFudge();
        setStroke(this.c);
        strokeWeight(this.strokeWeight);

        // the brush strokes are a series of bezierVertexes
        beginShape();
        vertex(this.x[0], this.y[0]);
        bezierVertex(this.x[1], this.y[1], this.x[2], this.y[2], this.x[3], this.y[3]); // assume NUM_COORDS == 4
        endShape();

        // modify the stroke weight a little bit
        this.strokeWeight += this.strokeDelta;
        if (this.strokeWeight >= this.strokeLimit)
            this.strokeDelta *= -1;
        if (this.strokeWeight <= .5)
            this.strokeDelta *= -1;
    }
}


// provides some random movement for a Peinter to follow
class Cursor {
    constructor() {
        this.delta = 20;
        this.x = rand(0, WIDTH);
        this.y = rand(0, HEIGHT);
    }

    update() {
        this.x = wrap(this.x + rand(-this.delta, this.delta), WIDTH);
        this.y = wrap(this.y + rand(-this.delta, this.delta), HEIGHT);
    }
}

// similar to the original color...
class FudgeableColor {
    constructor(r, g, b) {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    slightlyFudge() {
        return this.fudge(0, 3);
    }

    reallyFudge() {
        return this.fudge(5, 20);
    }

    fudge(min_diff, max_diff) {
        var dr = rand(min_diff, max_diff);
        var dg = rand(min_diff, max_diff);
        var db = rand(min_diff, max_diff);
        if (rand(0, 10) % 2 == 0)
            dr *= -1;
        if (rand(0, 10) % 2 == 0)
            dg *= -1;
        if (rand(0, 10) % 2 == 0)
            db *= -1;
        return new FudgeableColor(wrap(this.r + dr, 255), wrap(this.g + dg, 255), wrap(this.b + db, 255));
    }
}

var paintCursor = new Cursor();
var peinter = new Peinter(new FudgeableColor(rand(0, 255), rand(0, 255), rand(0, 255)));;

function setup() {
    var canvas = createCanvas(WIDTH, HEIGHT);
    canvas.parent('sketch');
    background("white");
    strokeWeight(1.5);
    noFill();

    for (var i = 0; i < NUM_COORDS; i++) {
        paintCursor.update();
        peinter.addCoords(paintCursor.x, paintCursor.y);
    }
}

function draw() {
    if (!GO)
        return;
    paintCursor.update();
    peinter.addCoords(paintCursor.x, paintCursor.y);
    peinter.peint();
}

// pause animation if the spacebar is pressed
function keyPressed() {
    if (key == ' ')
        GO = (!GO);
}


// ///////////////////////////
// utility functions    //
// ///////////////////////////
function setStroke(c) {
    stroke(c.r, c.g, c.b);
}

function rand(lo, hi) {
    return (Math.random() * (hi - lo) + lo) | 0;
}

function wrap(n, at) {
    return (n >= 0 && n < at) ? n : (n < 0) ? at + n : n - at;
}

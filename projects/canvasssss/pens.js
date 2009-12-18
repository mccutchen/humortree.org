function Pen(context, mover) {
    this.context = context;
    this.mover = mover;

    function draw() {}
}

function SimplePen(context, mover) {
    var pen = new Pen(context, mover);
    context.lineCap = 'round';
    context.strokeStyle = '#111';
    context.lineWidth = 1;

    pen.draw = function() {
        var ax = mover.x,
            ay = mover.y;
        context.beginPath();
        context.moveTo(ax, ay);
        mover.step();
        var cx1 = Utils.fudge(ax, 5),
            cy1 = Utils.fudge(ay, 5),
            cx2 = Utils.fudge(mover.x, 5),
            cy2 = Utils.fudge(mover.y, 5);
        context.bezierCurveTo(cx1, cy1, cx2, cy2, mover.x, mover.y);
        context.stroke();
    }
    return pen;
}

function ColorPen(context, mover) {
    var pen = new SimplePen(context, mover);
    var color = {
        r: Utils.rand(255),
        g: Utils.rand(255),
        b: Utils.rand(255),
        a: 255
    }

    function fudgeColor(c) {
        return {
            r: Utils.wrap(Utils.fudge(c.r, 5), 255),
            g: Utils.wrap(Utils.fudge(c.g, 5), 255),
            b: Utils.wrap(Utils.fudge(c.b, 5), 255),
            a: c.a
        }
    }

    var steps = 0;
    var changeAfter = Utils.rand(500, 100);

    var oldDraw = pen.draw;
    pen.draw = function() {
        if (++steps % changeAfter == 0) {
            color = fudgeColor(color);
            changeAfter = Utils.rand(500, 100);
        }
        context.strokeStyle = Utils.rgba(color);
        oldDraw();
    }
    return pen;
}

function VariablePen(context, mover) {
    var pen = new ColorPen(context, mover);
    var MIN_WIDTH = 1;
    var MAX_WIDTH = 6;
    var width = Utils.rand(MAX_WIDTH, MIN_WIDTH);
    var steps = 0;
    var changeAfter = Utils.rand(100);
    
    var oldDraw = pen.draw;
    pen.draw = function() {
        if (++steps % changeAfter == 0) {
            width = Utils.bounce(Utils.fudge(width, 2), MAX_WIDTH, MIN_WIDTH);
        }
        context.lineWidth = width;
        oldDraw();
    }
    return pen;
}
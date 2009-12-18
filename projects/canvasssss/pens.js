function Pen(context, mover) {
    this.context = context;
    this.mover = mover;

    function draw() {}
}

function SimplePen(context, mover) {
    var pen = new Pen(context, mover);
    context.lineCap = 'round';
    context.strokeStyle = '#333';

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
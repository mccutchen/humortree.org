function Pen(context, mover) {
    this.context = context;
    this.mover = mover;

    function draw() {}
}

function SimplePen(context, mover) {
    var pen = new Pen(context, mover);
    context.lineCap = 'round';
    context.strokeStyle = '#f0f';

    pen.draw = function() {
        var ax = mover.x,
            ay = mover.y;
        context.beginPath();
        context.moveTo(ax, ay);
        mover.step();
        var cx1 = Utils.rand(ax, mover.x),
            cy1 = Utils.rand(ay, mover.y),
            cx2 = Utils.rand(ax, mover.x),
            cy2 = Utils.rand(ay, mover.y);
        //ctx.quadraticCurveTo(cx, cy, mover.x, mover.y);
        context.bezierCurveTo(cx1, cy1, cx2, cy2, mover.x, mover.y);
        context.stroke();
    }
    return pen;
}
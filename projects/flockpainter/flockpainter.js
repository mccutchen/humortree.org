(function() {
    function init() {
        Animatrix.animate(draw, setup);
    }

    var w = 600, h = 300;

    function setup(ctx) {
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        console.log('Setup:', ctx, ctx.canvas);
    }

    function draw(ctx, step, state) {
        // state is an object comprised of vectors for our last position and
        // velocity.
        if (state === null) {
            state = {
                p: Vector.create(w/2, h/2),
                v: Vector.create(Utils.randFloat(-4, 4), Utils.randFloat(-4, 4))
            };
            console.log('Initial state:', state);
        }

        // update position based on current velocity, and (for now) only
        // update velocity to stay within the bounds of the canvas.
        var _ = wander(state.p, state.v),
            p = _[0],
            v = _[1];
        if (p.x < 0 || p.x > w) v.x *= -1;
        if (p.y < 0 || p.y > h) v.y *= -1;

        drawSegment(ctx, state.p, p);

        return {
            p: p,
            v: v
        };
    }

    function wander(p, v) {
        var a = Vector.create(Utils.randFloat(-2, 2), Utils.randFloat(-2, 2)),
            newV = Vector.add(v, a),
            mag = Vector.magnitude(newV);
        if (mag > 10) {
            newV = Vector.scale(Vector.normalize(v), 9.5);
        } else if (mag < 1) {
            newV = Vector.scale(Vector.normalize(v), 1.5);
        }
        return [Vector.add(p, newV), newV];
    }

    function drawSegment(ctx, a, b) {
        // Draw a line segment from point a to point b. Segments are bezier
        // curves with control points interpolated evenly between a and b.
        var dx = (b.x - b.x) / 3,
            dy = (b.y - b.y) / 3,
            cp1x = a.x + dx,
            cp1y = a.y + dy,
            cp2x = a.x + 2 * dx,
            cp2y = a.y + 2 * dy;
        
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, b.x, b.y);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ccc';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, b.x, b.y);
        ctx.stroke();
    }

    document.addEventListener('DOMContentLoaded', init);
})();

(function() {
    function init() {
        Animatrix.animate(draw, setup);
    }

    var w = 600, h = 300;

    function setup(ctx) {
        ctx.canvas.width = w;
        ctx.canvas.height = h;

        // setup returns initial state of the animation, an object comprised
        // of vectors for our last position and velocity.
        return {
            p: new Vector(w/2, h/2),
            v: new Vector
        };
    }

    function draw(ctx, step, state) {
        var v = wander(state.v, 1, 10),
            p = state.p.add(v);

        // reverse direction when a boundary is hit
        if (p.x < 0 || p.x > w) v.x *= -1;
        if (p.y < 0 || p.y > h) v.y *= -1;

        drawSegment(ctx, state.p, p);

        return {
            p: p,
            v: v
        };
    }

    function wander(v, minVelocity, maxVelocity) {
        var a = new Vector(Utils.randFloat(-3, 3), Utils.randFloat(-3, 3)),
            v2 = v.add(a),
            mag = v2.magnitude();
        if (mag > maxVelocity) {
            v2 = v2.normalize().scale(maxVelocity - 0.5);
        } else if (mag < minVelocity) {
            v2 = v2.normalize().scale(minVelocity + 0.5);
        }
        return v2;
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
        ctx.strokeStyle = 'rgba(0, 0, 0, .2)';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, b.x, b.y);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(0, 0, 0, .2)';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, b.x, b.y);
        ctx.stroke();
    }

    document.addEventListener('DOMContentLoaded', init);
})();

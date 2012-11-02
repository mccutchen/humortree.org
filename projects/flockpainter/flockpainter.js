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
            v: new Vector()
        };
    }

    function draw(ctx, step, state) {
        var a = accelerate(state),
            v = state.v.add(a).limit(1, 10),
            p = bound(state.p.add(v), w, h);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.002)';
        ctx.fillRect(0, 0, w, h);
        drawSegment(ctx, state.p, p);

        return {
            p: p,
            v: v
        };
    }

    function accelerate(state) {
        return wander();
    }

    // Add a little random acceleration to the given velocity vector
    function wander(v) {
        return new Vector(Utils.randFloat(-3, 3), Utils.randFloat(-3, 3));
    }

    // Bound the given position vector to the given width and height
    function bound(p, w, h) {
        var x = (p.x < 0) ? 0 : (p.x > w) ? w : p.x,
            y = (p.y < 0) ? 0 : (p.y > h) ? h : p.y;
        return new Vector(x, y);
    }

    // Draw a line segment from point a to point b. Segments are bezier curves
    // with control points interpolated evenly between a and b.
    function drawSegment(ctx, a, b) {
        //a = continuize(a, b, w, h);
        var dx = (b.x - a.x) / 3,
            dy = (b.y - a.y) / 3,
            cp1x = a.x + dx,
            cp1y = a.y + dy,
            cp2x = a.x + 2 * dx,
            cp2y = a.y + 2 * dy;
        
        ctx.lineWidth = 8;
        ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, b.x, b.y);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(0, 0, 0, .1)';
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, b.x, b.y);
        ctx.stroke();
    }

    document.addEventListener('DOMContentLoaded', init);
})();

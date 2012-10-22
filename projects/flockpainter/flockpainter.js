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
        // state is the last position of the thing
        if (state === null) {
            state = { x: w/2, y: h/2};
        }

        // calculate current position based on last position
        var pos = {
            x: Utils.wrap(Utils.fudge(state.x, 8), w),
            y: Utils.wrap(Utils.fudge(state.y, 8), h)
        };

        // draw a curve from the last position to the new position
        var dx = (pos.x - state.x) / 3,
            dy = (pos.y - state.y) / 3,
            cp1x = state.x + dx,
            cp1y = state.y + dy,
            cp2x = state.x + 2 * dx,
            cp2y = state.y + 2 * dy;

        if (step % 60 === 0) {
            console.log('step %d', step);
            console.log('(%d, %d) => (%d, %d) by (%d, %d)',
                        state.x, state.y, pos.x, pos.y, dx, dy);
            console.log('curve: (%d, %d) => (%d, %d) => (%d, %d) => (%d, %d)',
                        state.x, state.y, cp1x, cp1y, cp2x, cp2y,
                        pos.x, pos.y);
        }
        
        ctx.lineWidth = 8;
        ctx.strokeStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(state.x, state.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, pos.x, pos.y);
        ctx.stroke();

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#ccc';
        ctx.beginPath();
        ctx.moveTo(state.x, state.y);
        ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, pos.x, pos.y);
        ctx.stroke();

        return pos;
    }

    document.addEventListener('DOMContentLoaded', init);
})();

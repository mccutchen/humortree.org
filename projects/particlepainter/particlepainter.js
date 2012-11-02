(function() {
    function init() {
        Animatrix.animate(draw, setup);
    }

    var w = 600, h = 300;

    function setup(ctx) {
        ctx.canvas.width = w;
        ctx.canvas.height = h;
        // setup returns initial state of the animation
        return null;
    }

    function draw(ctx, step, state) {
        return null;
    }

    document.addEventListener('DOMContentLoaded', init);
})();

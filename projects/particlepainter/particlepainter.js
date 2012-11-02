(function() {
    function init() {
        Animatrix.animate(draw, setup);
    }

    var w = 600, h = 300;

    function setup(ctx) {
        ctx.canvas.width = w;
        ctx.canvas.height = h;

        for (var i = 0; i < 5; i++) {
            var x = Utils.randInt(0, Env.w),
                y = Utils.randInt(0, Env.h),
                m = Utils.randInt(0, 10),
                p = new Particle(m, new Vector(x, y), new Vector());
            Env.bodies.push(p);
        }
        return null;
    }

    function draw(ctx, step, state) {
        Env.step();
        Env.draw(ctx);
        return null;
    }

    document.addEventListener('DOMContentLoaded', init);
})();

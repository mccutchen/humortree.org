function Renderer(system, ctx) {
    this.system = system;
    this.ctx = ctx;
}

Renderer.prototype.render = function render() {
    var sys = this.system,
        ps = sys.particles,
        end = Math.PI * 2,
        ctx = this.ctx,
        p, r;

    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, sys.width, sys.height);

    ctx.fillStyle = '#eee';
    for (var i = 0; i < ps.length; i++) {
        p = ps[i];
        //r = Math.max(1, Math.sqrt(p.mass * p.vel.magnitude()));
        r = 2;
        ctx.beginPath();
        ctx.arc(p.loc.x, p.loc.y, r, 0, end, true);
        ctx.fill();
    };
};

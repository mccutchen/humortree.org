var Utils = {
    rand: function(low,hi) {
        return Math.floor(Math.random() * (hi - low)) + low;
    },
    wrap: function(n, max) {
        if (n >= 0 && n <= max) return n;
        if (n > max) return n - max;
        return n + max;
    },
    bounce: function(n, max) {
        if (n >= 0 && n <= max) return n;
        if (n > max) return max + (max - n);
        return 0 - n;
    }
};

var Mover = (function() {
    var MAX_DELTA = 20;
    function Mover(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
    }
    Mover.prototype.step = function() {
        var dx = Utils.rand(-MAX_DELTA, MAX_DELTA);
        var dy = Utils.rand(-MAX_DELTA, MAX_DELTA);
        // this.x = Utils.wrap(this.x + dx, this.w);
        //      this.y = Utils.wrap(this.y + dy, this.h);
        this.x = Utils.bounce(this.x + dx, this.w);
        this.y = Utils.bounce(this.y + dy, this.h);
    }
    return Mover;
})();

function play() {
    var canvas = document.getElementById('x');
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 200;
    var ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    
    var w = canvas.width,
        h = canvas.height;

    var mover = new Mover(w/2, h/2, w, h);
    console.log(mover);

    function draw() {
        var ax = mover.x,
            ay = mover.y;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        mover.step();
        
        var cx1 = Utils.rand(ax, mover.x),
            cy1 = Utils.rand(ay, mover.y),
            cx2 = Utils.rand(ax, mover.x),
            cy2 = Utils.rand(ay, mover.y);
        //ctx.quadraticCurveTo(cx, cy, mover.x, mover.y);
        ctx.bezierCurveTo(cx1, cy1, cx2, cy2, mover.x, mover.y);
        ctx.stroke();
    }
    var timer = setInterval(draw, 20);
}

window.addEventListener('load', play, false);

if (typeof console == 'undefined')
    console = { log: function() {} };
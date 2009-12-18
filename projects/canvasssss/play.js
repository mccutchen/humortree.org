function play() {
    var canvas = document.getElementById('x');
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 200;

    var ctx = canvas.getContext('2d');
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#333';
    
    var mover = new RandomMover({ x: canvas.width, y: canvas.height });

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

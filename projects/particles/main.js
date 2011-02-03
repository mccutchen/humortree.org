function init() {
    var canvas = document.getElementById('x'),
        ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 200;

    var sys = new System(canvas.width, canvas.height, 5),
        renderer = new Renderer(sys, ctx);

    ctx.fillStyle = '#333';
    ctx.fillRect(0, 0, sys.width, sys.height);
    renderer.render();

    setInterval(function() { renderer.render(); }, 1000);
    setInterval(function() { sys.step(); }, 1000);

    console.log(canvas, sys, renderer);
}

window.addEventListener('load', init, false);

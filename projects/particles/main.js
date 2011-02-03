function init() {
    var canvas = document.getElementById('x'),
        ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 200;

    var sys = new System(canvas.width, canvas.height, 500),
        renderer = new Renderer(sys, ctx);
    
    sys.step();
    renderer.render();

    setInterval(function() { renderer.render(); }, 100);
    setInterval(function() { sys.step(); }, 100);

    console.log(canvas, sys, renderer);
}

window.addEventListener('load', init, false);

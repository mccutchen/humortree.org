function play() {
    var canvas = document.getElementById('x');
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 200;

    var context = canvas.getContext('2d');
    var mover = new RandomMover({ x: canvas.width, y: canvas.height });
    var pen = new SimplePen(context, mover);
    var timer = setInterval(function() { pen.draw() }, 20);
}

window.addEventListener('load', play, false);

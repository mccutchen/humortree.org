function play(canvas) {
    var context = canvas.getContext('2d');
    var mover = new RandomMover({ x: canvas.width, y: canvas.height });
    var pen = new SimplePen(context, mover);
    var timer = setInterval(function() { pen.draw() }, 20);
}

function save() {
    var imgdata = this.toDataURL('image/png');
    var gallery = document.getElementById('gallery');
    var img = document.createElement('img');
    img.src = imgdata;
    gallery.appendChild(img);
    return false;
}

function init() {
    var canvas = document.getElementById('x');
    var gallery = document.getElementById('gallery');
    canvas.width = window.innerWidth - 200;
    canvas.height = window.innerHeight - 200;
    gallery.style.width = canvas.width + 'px';

    play(canvas);
    canvas.addEventListener('click', save, false);
}

window.addEventListener('load', init, false);

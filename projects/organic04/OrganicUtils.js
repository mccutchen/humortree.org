var BURST = {
	frames 	: new Array(0,1,2,3,4,5),
	pre 		: "burst/b",
	post		: ".gif",
	count 	: 0,
	delay		: 50,
	load		: function() {
		for(var i = 0; i < this.frames.length; i++) {
			var temp = new Image();
			temp.src = this.pre + this.frames[i] + this.post;
		}
	}
}; BURST.load();

function controller() {
	if(document.f.pause.value == "stop") {
		stop();
		document.f.pause.value = "start";
	}
	else if(document.f.pause.value == "start") {
		play();
		document.f.pause.value = "stop";
	}
}

function add() { World.add(new OrganicMover(World.size)); }
function remove() { World.remove();	}

function play() {
	LOOP = setInterval("World.tick();",DELAY);
	World.properties.style.visibility = "hidden";
}
function stop() {
	clearInterval(LOOP);
	World.properties.style.visibility = "visible";
}

function burst() {
	if(BURST.count < BURST.frames.length) {
		var src = BURST.pre + BURST.frames[BURST.count++] + BURST.post;
		document.images["burst"].src = src;
		setTimeout("burst();",BURST.delay);
	}
	else BURST.count = 0;
}

function preload() {
	var cache = new Array();
	for(var i = 0; i < BURST.frames.length; i++) {
		cache[i] = new Image(10,10);
		cache[i].src = BURST.pre + BURST.frames[i] + BURST.post;
	}
}

var lastProperty = null;
function showProperties(id) {
	if(this.id != lastProperty) {
		var id = zeroFill(this.id, 3);
		var degrees = zeroFill(World[this.id].angle.degrees, 3);
		var speed = World[this.id].step;
		var string = "ID: " + id + " / Angle: " + degrees + "&#0176; / Speed: " + speed + " ";
		lastProperty = this.id;
	} else {
		string = "ID: &ndash;&ndash;&ndash; / Angle: &ndash;&ndash;&ndash;&#0176; / Speed: &ndash; ";
		lastProperty = null;
	}
	World.properties.innerHTML = string;
}

function zeroFill(num, places) {
	var string = num.toString();
	for(var i = string.length; i < places; i++)	string = "0" + string;
	return string;
}

function rand(low,hi) { return Math.floor(Math.random() * (hi - low)) + low; }
function fixDegrees(deg) { return (deg >= 360) ? deg - 360 : (deg < 0) ? 360 + deg : deg; }


// look-up tables
var sine = new Array();
	for(var i = 0; i < 360; i++) sine[i] = Math.sin(i * (Math.PI / 180));
var cosine = new Array();
	for(var i = 0; i < 360; i++) cosine[i] = Math.cos(i * (Math.PI / 180));
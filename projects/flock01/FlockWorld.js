var FlockWorld = {
	flocks : new Array(),
	width : 0,
	height : 0,
	obj : null,
	debugObj : null,
	lock : false,
	
	INITIAL_FLOCKS : 1,
	INITIAL_BOIDS : 10,
	VISION : 50,
	TOO_CLOSE : 20,
	MAX_VELOCITY : 10,
	MIN_VELOCITY : 2,
	
	debug : function debug($s) {
		this.debugObj.innerHTML = $s;
	},
	
	getWeight : function getWeight($x) {
		return Math.exp((-1*Math.sqr($x))/100);
	},
	
	wrapx : function wrapx($x) {
		if($x < 0) $x = this.width + $x;
		return Math.abs(Math.round($x) % this.width);
	},
	wrapy : function wrapy($y) {
		if($y < 0) $y = this.height + $y;
		return Math.abs(Math.round($y) % this.height);
	},
	wrap : function wrap($p) { return new Point(this.wrapx($p.x), this.wrapy($p.y)); },
	
	add : function add($f) {
		this.flocks.add($f);
	},
	addNewFlock : function addNewFlock() {
		var f = new Flock(this.flocks.length);
		this.flocks.add(f);
		return f;
	},
	remove : function remove($f) {
		this.flocks.remove($f);
	},
	
	tick : function tick() {
		if(!this.lock) {
		
			this.lock = true;
			
			for(var i = 0; i < this.flocks.length; i++)
				this.flocks[i].tick();
				
			this.lock = false;
		}
	},
	
	init : function($id) {
		this.obj = document.getElementById($id);
		this.width = parseInt(this.obj.offsetWidth);
		this.height = parseInt(this.obj.offsetHeight);
		//this.debugObj = document.getElementById('debug');
	}
}
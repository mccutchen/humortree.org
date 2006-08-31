function OrganicWorld(id, w, h) {
	this.size			= 0;
	this.width			= w;
	this.height			= h;
	this.id				= id;
	this.obj				= document.getElementById(id);
	this.properties	= document.getElementById("properties");
	
	this.add = function(mover) {
		this[this.size] = mover;
		this[this.size].create();
		burst();
		return this.size++;
	}
	this.remove = function() {
		var s = this.size - 1;
		if (this[s]) {
			this[s].destroy();
			this[s] = null;
			this.size = s;
		}
		return this.size;
	}
	this.tick = function() {
		for(var i = 0; i < this.size; i++)
			this[i].move();
		window.status = "Number of organisms: " + this.size;
	}
	
	this.wrapx = function(x) {
		return (x > this.width) ? x - this.width : (x < 0) ? this.width + x : x;
	}
	this.wrapy = function(y) {
		return (y > this.height) ? y - this.height : (y < 0) ? this.height + y : y;
	}
}
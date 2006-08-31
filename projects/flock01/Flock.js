function Flock($id) {
	this.id = $id;
	this.image = 'boid' + (this.id % 4) + '.png';
	this.boids = new Array();
	this.size = this.boids.length;
	this.locked = false;
	this.stats = new Array();
	this.stats['distance'] = new Array();
	this.stats['position'] = new Array();
	this.stats['heading'] = new Array();
}


Flock.prototype.add = function add($boid) {
	this.boids.add($boid);
	this.size = this.boids.length;
}
Flock.prototype.addNewBoid = function addNewBoid() {
	var b = new Boid(this.size, this);
	b.create();
	this.add(b);
}
Flock.prototype.remove = function remove($boid) {
	this.boids.remove($boid);
	this.size = this.boids.length;
}

Flock.prototype.tick = function tick() {
	if(!this.locked) {
		this.locked = true;
		
		for(var i = 0; i < this.boids.length; i++)
			this.boids[i].tick();
		
		for(i = 0; i < this.boids.length; i++)
			this.boids[i].move();
		
		this.locked = false;

	} else {
		return;
	}
}


Flock.prototype.getPeers = function getPeers($boid) {
	// pass one: eliminate those birds that are obviously too far away
	var passA = new Array();
	var him;
	for(var i = 0; i < this.boids.length; i++) {
		him = this.boids[i];
		
		// add his stats
		this.stats['position'][i] = new Point(him.position.x, him.position.y);
		this.stats['heading'][i] = him.heading.getHeading();
		
		
		// his position, used repeatedly
		//var hisx = him.position.x;
		//var hisy = him.position.y;
		
		// make the quick test
		if(him != $boid) { // make sure we don't compare ourselves to ourselves
			if(Math.abs($boid.position.x - him.position.x) < FlockWorld.VISION) // quick eliminate on x-axis
				if(Math.abs($boid.position.y - him.position.y) < FlockWorld.VISION) // and again on y-axis
					passA.add(him); // he passed!
		}
	}
	
	var passB = new Array();
	for(i = 0; i < passA.length; i++) {
		
		him = passA[i];
		
		
		var d = $boid.position.getDistanceTo(him.position);
		
		//alert('my position: (' + $boid.position.x + ', ' + $boid.position.y + ')\n' +
		//		'his position: (' + him.position.x + ', ' + him.position.y + ')\n' +
		//		'distance: ' + d);
		if(d < FlockWorld.VISION) {
			// he is visible to me
			//him.setWeight(FlockWorld.getWeight(d)); // how much influence does he have?
			passB.add(him);
		}
	}
	return passB;
}

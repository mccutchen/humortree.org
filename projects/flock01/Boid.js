function Boid($id, $flock) {
	this.id = $id;
	this.flock = $flock;
	this.style = null;
	this.position = new Point(rand(0,FlockWorld.width), rand(0,FlockWorld.height));
	this.heading = Vector.createFromHeading(rand(0,360));
	this.velocity = rand(FlockWorld.MIN_VELOCITY, FlockWorld.MAX_VELOCITY);
	this.thoughts = new Array();
	//this.velocity = Vector.createFromHeading(rand(FlockWorld.MIN_VELOCITY, FlockWorld.MAX_VELOCITY));
	//this.thoughts = [new Array(), new Array()];
}

Boid.prototype.setWeight = function setWeight($w) {
	this.heading.weight = $w;
	//this.velocity.weight = $w;
}
Boid.prototype.addThought = function addThought($v, $about) {
	this.thoughts.add($v);
	//this.thoughts[$about].add($v);
}

Boid.prototype.tick = function tick() {
	
	var peers = this.flock.getPeers(this);
	
	var omniWeight = 1 / (peers.length + 2);
	
	var peer;
	for(var i = 0; i < peers.length; i++) {
		peer = peers[i];
		peer.setWeight(omniWeight);
		this.addThought(peer.heading, 0);
		//this.addThought(peer.velocity, 1);
	}
	
	
	// create a vector towards the average position of the flock
	var avgPosition = VectorMath.averagePoints(this.flock.stats['position']);
	var avgDx = this.position.x - avgPosition.x;
	var avgDy = this.position.y - avgPosition.y;
	var positionVector = Vector.createFromComponents(avgDx, avgDy);
	//positionVector.weight = FlockWorld.getWeight(this.position.getDistanceTo(avgPosition));
	positionVector.weight = omniWeight;
	
	// create a vector that reflects the average heading of the flock
	var avgHeading = VectorMath.average(this.flock.stats['heading']);
	var headingVector = Vector.createFromHeading(avgHeading);
	headingVector.weight = omniWeight;
	
	this.addThought(positionVector, 0);
	this.addThought(headingVector, 0);
	
	//this.velocity.weight = omniWeight;
	//this.addThought(this.velocity, 1);
	
	//var debug =	'current position: (' + this.position.x + ', ' + this.position.y + ')<br>' +
	//				'current heading: ' + this.heading.getHeading() + '°<br>';// +
					//'next heading: ' + nextHeading.getHeading() + '°<br>';
	//FlockWorld.debug(debug);
	
	return 0;
}


Boid.prototype.move = function move() {
	
	this.think();
	
	//var v = this.velocity.getHeading();
	//var dx = this.heading.x * v;
	//var dy = this.heading.y * v * -1;
	
	this.position.moveBy(this.heading.x * this.velocity, this.heading.y * this.velocity * -1);
	this.position = FlockWorld.wrap(this.position);
	
	this.style.left = this.position.x + 'px';
	this.style.top = this.position.y + 'px';
	
	return 0;
}

Boid.prototype.think = function think() {
	this.heading = VectorMath.add(this.thoughts);
	//this.heading = VectorMath.add(this.thoughts[0]);
	//this.velocity = VectorMath.add(this.thoughts[1]);
}


Boid.prototype.create = function create() {
	var me = document.createElement('img');
	me.src = this.flock.image;
	me.id = this.id;
	me.style.position = 'absolute';
	me.style.top = this.position.y + 'px';
	me.style.left = this.position.x + 'px';
	this.style = me.style;
	
	FlockWorld.obj.appendChild(me);
}
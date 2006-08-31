// OrganicAngle.js
function OrganicAngle(range) {
	this.range			= range; // pick a new angle based on this
	this.degrees		= rand(0,360); // degrees, from 0 to 360
	this.fickleness	= rand(10,30); // how long to follow a certain degree
	this.step			= rand(-5,5); // step between degrees
	this.ticks			= 0; // count steps for fickleness
}

OrganicAngle.prototype.next = function next() {
	this.ticks++;
	if(this.ticks == this.fickleness)
		this.renew();
	this.degrees = fixDegrees(this.degrees + this.step); // make sure the degree is between 0 and 360
	return this.degrees;
}

OrganicAngle.prototype.renew = function renew() {
	this.ticks = 0;
	var newd = rand(this.degrees-this.range, this.degrees+this.range); // pick a new degree based on the range
	this.degrees = fixDegrees(newd); // make sure that degree is between 0 and 360
	this.fickleness = rand(5,20);
	this.step = rand(-5,5);
}
OrganicAngle.prototype.toRadians = function toRadians() {
	return this.degrees * (Math.PI / 180); // convert degrees to radians and return
}
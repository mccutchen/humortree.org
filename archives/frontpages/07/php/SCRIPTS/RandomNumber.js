// RandomNumber - a random number generator
function RandomNumber (lo, hi) {
	this.lo = lo;
	this.hi = hi - lo;
	this.init = init;
	this.next = next;
	function next () { return Math.floor (Math.random () * this.hi) + this.lo; }
	function init (lo, hi) { this.lo = lo; this.hi = hi - lo; }
}
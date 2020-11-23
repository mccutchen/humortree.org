function FadingColor (startColor, endColor, numberOfSteps) {
	if (startColor.isColor && endColor.isColor) {
		this.startColor = startColor;
		this.currentColor = this.startColor;
		this.endColor = endColor;
		this.numberOfSteps = numberOfSteps;
		
		this.ready = false;
		this.finished = false;
		this.deltaR = this.deltaG = this.deltaB = this.doubleR = this.doubleG = this.doubleB = 0.0;
		
		this.makeReady = makeReady;
		this.makeFinished = makeFinished;
		this.setDeltas = setDeltas;
		this.swap = swap;
		this.isFinished = isFinished;
		this.getNextColor = getNextColor;
		
		this.makeReady ();
	}
	
	function isFinished () { return this.finished; }
	
	function makeReady () {
		this.setDeltas ();
		this.ready = true;
		this.finished = false;
	}
	function makeFinished () {
		this.ready = false;
		this.finished = true;
	}
	function swap () {
		var t = this.startColor;
		this.startColor = this.endColor;
		this.endColor = t;
	}
	
	function setDeltas () {
		this.deltaR = (this.startColor.r - this.endColor.r) / this.numberOfSteps * -1;
		this.deltaG = (this.startColor.g - this.endColor.g) / this.numberOfSteps * -1;
		this.deltaB = (this.startColor.b - this.endColor.b) / this.numberOfSteps * -1;
		this.doubleR = this.startColor.r;
		this.doubleG = this.startColor.g;
		this.doubleB = this.startColor.b;
	}
	
	function getNextColor () {
		this.doubleR += this.deltaR;
		this.doubleG += this.deltaG;
		this.doubleB += this.deltaB;
		var c = new Color (Math.round (this.doubleR), Math.round (this.doubleG), Math.round (this.doubleB));
		if (c.equals (this.endColor)) {
			this.makeFinished ();
		}
		return c;
	}
}
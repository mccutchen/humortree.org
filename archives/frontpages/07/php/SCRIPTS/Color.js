function Color (r, g, b) {
	this.r = r;
	this.g = g;
	this.b = b;
	this.isColor = true;
	
	this.toString = toString;
	this.getHexColor = getHexColor;
	this.getRGBColor = getRGBColor;
	this.equals = equals;
	
	function getHexColor () {
		return "#" + decToHex (this.r) + decToHex (this.g) + decToHex (this.b);
	}
	function getRGBColor () {
		return "rgb(" + this.r + "," + this.g + "," + this.b + ")";
	}
	function equals (color) {
		return (this.getHexColor() == color.getHexColor());
	}
	function toString () { return "[Color object]"; }
}

function hexToDec (n) {
	return parseInt (n, 16);
}

function decToHex (n) {
	n = n.toString (16);
	if (n.length < 2) n = "0" + n;
	return n;
}
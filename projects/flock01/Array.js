// Array.js

Array.prototype.indexOf = function indexOf($element) {
	for(var i = 0; i < this.length; i++)
		if(this[i] == $element) return i;
	return -1;
}
Array.prototype.item = function item($i) {
	return this[$i];
}
Array.prototype.elementAt = function elementAt($i) {
	return this[$i];
}
Array.prototype.lastElement = function lastElement() {
	return this[this.length - 1];
}
Array.prototype.add = function add($element) {
	this[this.length++] = $element;
	return this.length - 1;
}
Array.prototype.remove = function remove($element) {
	var index = this.indexOf($element);
	if(index >= 0) {
		this.splice(index,1);
		return true;
	} else {
		return false;
	}
}
Array.prototype.removeElementAt = function removeElementAt($index) {
	this.splice($index,1);
}
Array.prototype.insertElementAt = function insertElementAt($element, $index) {
	this.splice($index, 0, $element);
}



Array.prototype.cursor = 0;

Array.prototype.hasNext = function hasNext() {
	return (this.cursor < this.length);
}
Array.prototype.getNext = function getNext() {
	return this[this.cursor++];
}
Array.prototype.reset = function reset() {
	this.cursor = 0;
}

Array.prototype.clear = function clear() {
	this.splice(0, this.length);
}
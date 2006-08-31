var delay = 200;
var steps = 55;

var rn = new RandomNumber (210, 255);
var sc = new Color (rn.next(), rn.next(), rn.next());
var ec = new Color (rn.next(), rn.next(), rn.next());
var fc = new FadingColor (sc, ec, steps);

var body;

function fade () {
	if (!fc.isFinished ())
		body.style.backgroundColor = fc.getNextColor ().getRGBColor ();
	else {
		fc.swap ();
		fc.endColor = new Color (rn.next(), rn.next(), rn.next());
		fc.makeReady ();
	}
	setTimeout ("fade ();",delay);
}

function init () {
	body = document.getElementsByTagName ("body")[0];
	fade ();
}
<?php

$size = isset($HTTP_GET_VARS['size']) ? $HTTP_GET_VARS['size'] : 255;
if($size > 255) $size = $size - ($size % 255);
$h = 50;

$nImages = $size / 255;

$currentColor = false;

for($k = 0; $k < $nImages; $k++) {
	
	$images[$k] = imageCreate(255, $h);
	
	for ($i = 0; $i < 255; $i++) {
		$c = new Color($currentColor);
		$color = imageColorAllocate($images[$k], $c->r, $c->g, $c->b);
		imageLine($images[$k], $i,0, $i,$h, $color);
		$currentColor = $c;
	}
}

$finalImage = imageCreate($size, $h);
for($i = 0; $i < count($images); $i++) {
	imageCopy(
		$finalImage, // to
		$images[$i], // from
		$i*255, 0,  // to (x, y)
		0,0,  // from (x, y)
		255, $h // from (w, h)
	);
}



// output the image
header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");    // Date in the past
header ("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT"); 
header ("Cache-Control: no-cache, must-revalidate");  // HTTP/1.1
header ("Pragma: no-cache");
header ("Content-type: image/png");
imagePNG($finalImage);





class Color {
	
	var $r;
	var $g;
	var $b;
	
	var $MAX_DELTA = 15;
	var $MIN_DELTA = 2;
	var $MAX_DISTANCE = 20;
	var $MIN_DISTANCE = 10;
	
	function Color($base = false) {
		if(!$base) {
			$this->r = randomNumber(0, 255);
			$this->g = randomNumber(0, 255);
			$this->b = randomNumber(0, 255);
		}
		else {
			
			/* // trying to keep $dr, $dg and $db from being 0
			$dr = randomNumber($this->MIN_DELTA, $this->MAX_DELTA);
			if(randomNumber(0,100) % 2 == 0) $dr *= -1;
			
			$dg = randomNumber($this->MIN_DELTA, $this->MAX_DELTA);
			if(randomNumber(0,100) % 2 == 0) $dg *= -1;
			
			$db = randomNumber($this->MIN_DELTA, $this->MAX_DELTA);
			if(randomNumber(0,100) % 2 == 0) $db *= -1;
			*/
			
			$d = randomNumber(5, 15);
			$dr = randomNumber($d*-1, $d);
			$dg = randomNumber($d*-1, $d);
			$db = randomNumber($d*-1, $d);
			
			$this->r = wrap($base->r + $dr);
			$this->g = wrap($base->g + $dg);
			$this->b = wrap($base->b + $db);
		}
	}
}




function wrap($n, $at = 255) { return abs($n % $at); }


mt_srand((double)microtime()*1000000);

function randomNumber($min, $max)
{
	if($max == 0)
		$max = 1;
	if($min == $max)
		$max+=20;
	
	return mt_rand($min, $max);
}


?>
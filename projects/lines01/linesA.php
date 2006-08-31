<?php

Header ("Content-type: image/png"); // tell the browser what sort of image to expect... no HTML can be output now.

if (isset($h))
	$imgHeight = $h;
else
	$imgHeight = 1200;
$imgWidth = 1;
$im = ImageCreate ($imgWidth, $imgHeight);

$numberOfColors = 10;

for ($i = 0; $i < $numberOfColors; $i++)
{
	$colors[$i] = ImageColorAllocate ($im, randomNumber(0,255), randomNumber(0,255), randomNumber(0,255));
}

for ($i = 0; $i < $imgHeight; $i++)
{
	ImageSetPixel ($im, 0, $i, $colors[randomNumber(0, sizeOf($colors) - 1)]);
}



ImagePNG($im);


function randomNumber($min, $max)
{
	if($max == 0)
		$max = 1;
	if($min == $max)
		$max+=20;
	//srand((double)microtime()*1000000);
	return rand($min, $max);
}


?>

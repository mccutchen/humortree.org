<?php

Header ("Content-type: image/png");

srand((double)microtime()*1000000);

$imgHeight = 400;
$imgWidth = 400;
$numberOfPasses = 100;
$numberOfColors = 10;


$im = ImageCreate ($imgWidth, $imgHeight);

for($i = 0; $i < $numberOfColors; $i++)
{
	$colors[$i] = ImageColorAllocate($im, rand (0,255), rand (0,255), rand (0,255));
}

$black = ImageColorAllocate($im,0,0,0);

imageFill($im,0,0,$black);

for($i = 0; $i < $numberOfPasses; $i++)
	$temp = doSomething(randomNumber(0,4));

ImagePNG($im);


function doSomething($what)
{
	global $im, $imgWidth, $imgHeight, $numberOfColors, $colors;
	
	$x = randomNumber(0,$imgWidth);
	$y = randomNumber(0,$imgHeight);
	$w = randomNumber(10,$imgWidth/10);
	$h = $w;
	$color = $colors[randomNumber(0,$numberOfColors)];
	
	if ($what == 0) imageArc($im, $x, $y,$w,$h,randomNumber(0,360),randomNumber(20,360), $color);
	elseif ($what == 1) imageFilledRectangle($im, $x, $y,randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), $colors[randomNumber(0,$numberOfColors)]);
	elseif ($what == 2) imageline($im, randomNumber(0,$imgWidth), randomNumber(0,$imgHeight),randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), $colors[randomNumber(0,$numberOfColors)]);
}

function randomNumber($min, $max)
{
	if($max == 0)
		$max = 1;
	if($min == $max)
		$max+=20;
	
	return rand($min, $max);
}


?>

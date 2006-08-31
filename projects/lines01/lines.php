<?php

Header ("Content-type: image/png"); // tell the browser what sort of image to expect... no HTML can be output now.

mt_srand ((double) microtime() * 1000000);

$numberOfColors = 5;

$phaseMin = 20;
$phaseMax = 200;
$phases = 10;
$phaseLengths = array (
	randomNumber($phaseMin,$phaseMax),
	randomNumber($phaseMin,$phaseMax),
	randomNumber($phaseMin,$phaseMax),
	randomNumber($phaseMin,$phaseMax),
	randomNumber($phaseMin,$phaseMax),
	randomNumber($phaseMin,$phaseMax),
	randomNumber($phaseMin,$phaseMax),
	randomNumber($phaseMin,$phaseMax),
	randomNumber($phaseMin,$phaseMax),
	randomNumber($phaseMin,$phaseMax)
);


$imgHeight = 1200;

$firstSum = 0;
for ($i = 0; $i < sizeof($phaseLengths); $i++)
	$firstSum += $phaseLengths[$i];
$phaseLengths[9] = $imgHeight - $firstSum;

$imgWidth = 1;
$im = ImageCreate ($imgWidth, $imgHeight) or die ("no image created!");
$count = 0;

for ($i = 0; $i < $phases; $i++)
{
	$tempMin = randomNumber (0, 255);
	$tempMax = randomNumber ($tempMin, 255);
	
	$colors = setColors ($numberOfColors, 0, 255);
	
	for ($n = 0; $n < $phaseLengths[$i]; $n++)
	{
		ImageSetPixel ($im, 0, $count, $colors[randomNumber (0, $numberOfColors - 1)]);
		$count++;
	}
}

ImagePNG($im) or die ("could not 'export' image");

function setColors($howmany, $min, $max)
{
	global $im;
	for ($i = 0; $i < $howmany; $i++)
	{
		$colors[$i] = ImageColorAllocate ($im, randomNumber($min, $max), randomNumber($min, $max), randomNumber($min, $max));
	}
	return $colors;
}

function randomNumber($min, $max)
{
	if($max == 0)
		$max = 1;
	if($min == $max)
		$max+=20;
	
	return mt_rand($min, $max);
}


?>

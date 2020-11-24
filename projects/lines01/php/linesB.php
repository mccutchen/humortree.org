<?php

Header ("Content-type: image/png"); // tell the browser what sort of image to expect... no HTML can be output now.


$colors = array ();
$numberOfColors = 5;

$phaseMin = 20;
$phaseMax = 200;
$phases = 10;
$phaseLengths = array ( randomNumber($phaseMin,$phaseMax), randomNumber($phaseMin,$phaseMax), randomNumber($phaseMin,$phaseMax), randomNumber($phaseMin,$phaseMax), randomNumber($phaseMin,$phaseMax), randomNumber($phaseMin,$phaseMax), randomNumber($phaseMin,$phaseMax), randomNumber($phaseMin,$phaseMax), randomNumber($phaseMin,$phaseMax));

$firstSum = 0;
for ($i = 0; $i < sizeof($phaseLengths); $i++)
	$firstSum += $phaseLengths[$i];
$phaselengths[9] = $imHeight - $firstSum;

$imgHeight = $firstSum + $phaseLengths[9];
$imgWidth = 1;
$im = ImageCreate ($imgWidth, $imgHeight);
$count = 0;

for ($i = 0; $i < $phases; $i++)
{
	$tempMin = randomNumber (0, 255);
	$tempMax = randomNumber ($tempMin, 255);
	
	setColors ($numberOfColors, 0, 255);
	for ($n = 0; $n < $phaseLengths[$i]; $n++)
	{
		ImageSetPixel ($im, 0, $count, $colors[randomNumber(0, sizeof($colors))]);
		$count++;
	}
}

ImagePNG($im);

function setColors($howmany, $min, $max)
{
	global $colors, $im, $count;
	for ($i = 0; $i < $howmany; $i++)
	{
		$colors[$i] = ImageColorAllocate ($im, randomNumber($min, $max), randomNumber($min, $max), randomNumber($min, $max));
	}
	return;
}

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

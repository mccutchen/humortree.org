<?php

require ("Matrix.class.php");

Header ("Content-type: image/png"); // tell the browser what sort of image to expect... no HTML can be output now.

mt_srand ((double) microtime() * 1000000);

if (!isset ($w)) $w = 10;
if (!isset ($h)) $h = 10;

$colorMax = 20;
$imgWidth = $w;
$imgHeight = $h;
$matrix = new Matrix ($imgWidth, $imgHeight);
//$colorMatrix = $matrix;

$img = ImageCreate ($imgWidth, $imgHeight) or die ("no image created!");

for ($i = 0; $i < $colorMax; $i++) {
	$r = mt_rand (0, 255);
	$g = mt_rand (0, 255);
	$b = mt_rand (0, 255);
	$colors[$i] = ImageColorAllocate ($img, $r, $g, $b);
}

for ($y = 0; $y < $imgHeight; $y++) {
	for ($x = 0; $x < $imgWidth; $x++) {
		$matrix->setValue (mt_rand (0, sizeof ($colors) - 1), $x, $y);
	}
}

$matrix->median ();

for ($y = 0; $y < $imgHeight; $y++) {
	for ($x = 0; $x < $imgWidth; $x++) {
		ImageSetPixel ($img, $x, $y, $colors[$matrix->getValueAt ($x,$y)]);
	}
}

$img = backgroundify ($img);

ImagePNG($img) or die ("could not 'export' image");


/**
 * taken from php.net
**/
function backgroundify($image)
{
	$ix = imagesx($image);
	$iy = imagesy($image);
	$ixhalf = floor($ix / 2); // DON'T USE ON IMAGES WITH ODD SIZES! 
	$iyhalf = floor($iy /2);
	$panel_temp = ImageCreate ($ix, $iy) or die("Cannot Initialize new GD image stream");
	imagecopy($panel_temp, $image, 0,0,0,0,$ix, $iy);
	imagecopy($image, $panel_temp, 0,0,$ixhalf,$iyhalf, $ix-$ixhalf, $iy-$iyhalf); // move bottom right to top left
	imagecopy($image, $panel_temp, $ixhalf,$iyhalf, 0,0,$ix-$ixhalf, $iy-$iyhalf); // top left to bottom right
	imagecopy($image, $panel_temp, $ixhalf, 0,0,$iyhalf,$ix-$ixhalf, $iy-$iyhalf); // bottom left to topo right
	imagecopy($image, $panel_temp, 0,$iyhalf, $ixhalf,0,$ix-$ixhalf, $iy-$iyhalf); // top left to bottom right
	return $image;
}







/*
for ($y = 0; $y < $imgHeight; $y++) {
	for ($x = 0; $x < $imgWidth; $x++) {
		$c = mt_rand (0, sizeof ($colors) - 1);
		$color = $colors[$c];
		//$colorMatrix->setValue ($c, $x, $y)
	}
}
*/
?>

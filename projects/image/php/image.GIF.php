<?php

Header ("Content-type: image/gif"); // tell the browser what sort of image to expect... no HTML can be output now.

$imgHeight = 100;
$imgWidth = 100;
//$numberOfPasses = randomNumber(50,200);
$numberOfPasses = 500;
$numberOfColors = randomNumber(2,10);

$im = ImageCreate ($imgHeight, $imgWidth);

for($i = 0; $i < $numberOfColors; $i++)
{
	$colors[$i] = ImageColorAllocate($im, randomNumber(0,255),randomNumber(0,255),randomNumber(0,255));
}

imageFill($im,0,0,$colors[randomNumber(0,$numberOfColors)]);

for($i = 0; $i < $numberOfPasses; $i++)
	$temp = doSomething(randomNumber(0,6));

ImageGIF($im);



function doSomething($what)
{
	global $im, $imgWidth, $imgHeight, $numberOfColors, $colors;
	
	if($what == 0)
		imagedashedline($im, randomNumber(0,$imgWidth), randomNumber(0,$imgHeight),randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), $colors[randomNumber(0,$numberOfColors)]); 
	else if($what == 1)
		imageline($im, randomNumber(0,$imgWidth), randomNumber(0,$imgHeight),randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), $colors[randomNumber(0,$numberOfColors)]); 
	else if($what == 2)
		imageFilledRectangle($im, randomNumber(0,$imgWidth), randomNumber(0,$imgHeight),randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), $colors[randomNumber(0,$numberOfColors)]); 
	else if($what == 3)
		imageLine($im, randomNumber(0,$imgWidth), randomNumber(0,$imgHeight),randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), $colors[randomNumber(0,$numberOfColors)]); 
	else if($what == 4)
		imageSetPixel($im, randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), $colors[randomNumber(0,$numberOfColors)]); 
	//else if($what == 5)
		//imageRectangle($im, randomNumber(0,$imgWidth), randomNumber(0,$imgHeight),randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), $colors[randomNumber(0,$numberOfColors)]); 
	//else if($what == 6)
		//imageFillToBorder($im, randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), $colors[randomNumber(0,$numberOfColors)], $colors[randomNumber(0,$numberOfColors)]); 
	//else if($what == 7)
		//imagearc($im, randomNumber(0,$imgWidth), randomNumber(0,$imgHeight),randomNumber(0,$imgWidth), randomNumber(0,$imgHeight), randomNumber(0,360), randomNumber(20,360), $colors[randomNumber(0,$numberOfColors)]); 
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

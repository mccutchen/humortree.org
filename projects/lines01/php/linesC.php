<?php

Header ("Content-type: image/png"); // tell the browser what sort of image to expect... no HTML can be output now.


$numberOfColors = 6;

$numberOfPhases = 5;
$phaselength = 150;

$numberOfFades = 4;
$fadelength = 24;

$total = $numberOfPhases + $numberOfFades;

$imgHeight = 1200;
$imgWidth = 1;
$im = ImageCreate ($imgWidth, $imgHeight);

$count = $phaseCount = $fadeCount = 0;


function setFade($n)
{
	global $phases;
	$arr = array ();
	$prev = $n-1;
	$next = $n+1;
	for ($i = 0; $i < $numberOfColors; $i++)
	{
		if ($i % 2 == 0)
			$arr[$i] = $phases[$prev][$i];
		else
			$arr[$i] = $phases[$next][$i];
	}
	return $arr;
}


for ($i = 0; $i < $numberOfPhases; $i++)
{
	$phases[$i] = new Phase;
}
for ($i = 1; $i <= $numberOfFades; $i++)
{
	$fades[$i] = new Fade;
	$fades[$i]->set ($phases[$i-1]->colors, $phases[$i+1]->colors);
}

for ($i = 0; $i < $total; $i++)
{
	$rem = $i % 2;
	if ($rem == 0)
	{
		for ($n = 0; $n < $phaselength; $n++)
		{
			ImageSetPixel ($im, 0, $count, $phases[$phaseCount]->colors[randomNumber (0, $numberOfColors)]);
			
			$t = $phases[$phaseCount]->colors;
			//print "$t[0]<br>\n";
			$count++;
		}
		$phaseCount++;
	}
	elseif ($rem != 0)
	{
		for ($n = 1; $n <= $fadelength; $n++)
		{
			ImageSetPixel ($im, 0, $count, $fades[$n]->colors[randomNumber (0, $numberOfColors)]);
			//print "fade - $count<br>\n";
			$count++;
		}
		$fadeCount++;
	}
	//print "<br><br>$i - passes<br><br>\n";
}


ImagePNG($im);


class Phase
{
	var $colors;
	
	function Phase()
	{
		$this->colors = setColors($numberOfColors,0,255);
	}
}

class Fade
{
	var $colors;
	
	function set($previous, $next)
	{
		for ($i = 0; $i < $numberOfColors; $i++)
		{
			$r = $i % 2;
			if ($r)
				$this->colors[$i] = $previous[$i];
			elseif (!$r)
				$this->colors[$i] = $next[$i];
		}
	}
}


function setColors($howmany, $min, $max)
{
	global $im;
	$temp = array ();
	for ($i = 0; $i < $howmany; $i++)
	{
		$temp[$i] = ImageColorAllocate ($im, randomNumber($min, $max), randomNumber($min, $max), randomNumber($min, $max));
	}
	return $temp;
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

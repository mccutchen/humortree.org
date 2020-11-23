<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">



<!-- sexy beast -->




<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Humor Tree Wonderful</title>
	<script type="text/javascript" src="SCRIPTS/import.js"></script><!-- import any javascript for this page -->
	<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1" />
	<meta http-equiv= "pragma" content="no-cache" />
	<meta name="MSSmartTagsPreventParsing" content="true" />
	<meta name="AUTHOR" content="will mccutchen - will@horcob.org" />
</head>

<body onload="init ();">

<pre>
     ___           ___           ___           ___           ___     
    /\__\         /\__\         /\__\         /\  \         /\  \    
   /:/  /        /:/  /        /::|  |       /::\  \       /::\  \   
  /:/__/        /:/  /        /:|:|  |      /:/\:\  \     /:/\:\  \  
 /::\  \ ___   /:/  /  ___   /:/|:|__|__   /:/  \:\  \   /::\~\:\  \ 
/:/\:\  /\__\ /:/__/  /\__\ /:/ |::::\__\ /:/__/ \:\__\ /:/\:\ \:\__\
\/__\:\/:/  / \:\  \ /:/  / \/__/~~/:/  / \:\  \ /:/  / \/_|::\/:/  /
     \::/  /   \:\  /:/  /        /:/  /   \:\  /:/  /     |:|::/  / 
     /:/  /     \:\/:/  /        /:/  /     \:\/:/  /      |:|\/__/  
    /:/  /       \::/  /        /:/  /       \::/  /       |:|  |    
    \/__/         \/__/         \/__/         \/__/         \|__|    

<?php
	
	//vomit ();
	
	$listFile = "list.txt";
	$separator = "#";
	
	// read file into one big string, then split it into an array of lists //
	$sList = fread (fopen ($listFile, "r"), filesize ($listFile));
	$aLists = split ($separator, $sList);
	
	foreach ($aLists as $sList) {
		
		$sList = trim ($sList); // get rid of whitespace around big list string
		$aItems = split ("\n",$sList); // break big list into an array of items		
		for ($i = 0; $i < count ($aItems); $i++){
			$aItems[$i] = trim ($aItems[$i]); // get rid of whitespace around each item
			if (strlen ($aItems[$i]) < 6) $allItems[$i] .= "___";
		}
		columnize ($aItems); // output columns of the items
	}
	
	
?>
    ___           ___           ___           ___     
   /\  \         /\  \         /\  \         /\  \    
   \:\  \       /::\  \       /::\  \       /::\  \   
    \:\  \     /:/\:\  \     /:/\:\  \     /:/\:\  \  
    /::\  \   /::\~\:\  \   /::\~\:\  \   /::\~\:\  \ 
   /:/\:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\ /:/\:\ \:\__\
  /:/  \/__/ \/_|::\/:/  / \:\~\:\ \/__/ \:\~\:\ \/__/
 /:/  /         |:|::/  /   \:\ \:\__\    \:\ \:\__\  
 \/__/          |:|\/__/     \:\ \/__/     \:\ \/__/  
                |:|  |        \:\__\        \:\__\    
                 \|__|         \/__/         \/__/    

</pre>



</body>
</html>



<?php

function columnize ($arr) {
		$max = 4;
		$largestRemainder = 0;
		$title = array_shift ($arr);
		$size = count ($arr);
		if (eregi ("(text)", $title)) {
			$title = str_replace ("(text)","",$title);
			echo "\n<strong>" . $title . "</strong>\n";
			echo implode ("\n", $arr) . "\n";
		}
		else {
		
			echo "\n<strong>" . $title . "</strong>\n";
			
			
			$i = $max;
			$keepOn = true;
			$cols = 0;
			$min = 1;
			while ($i > $min && $keepOn) {
				$r = $size % $i;
				if ($r == 0) {
					$cols = $i;
					$keepOn = false;
				}
				elseif ($r > $largestRemainder) $largestRemainder = $i;
				$i--;
			}
			if ($cols == 0) $cols = $largestRemainder;
			$rows = ($size > 4) ? ceil ($size / $cols) : 2;
			
			
			for ($y = 0; $y < $rows; $y++) {
				for ($x = $y; isset ($arr[$x]); $x += $rows) {
					echo zerofill ($x + 1) . ". <a href=\"$title/" . trim ($arr[$x]) . "/\">" . $arr[$x] . "</a>" . ((strlen ($arr[$x]) < 6) ? "   " : "") . "\t";
				}
				echo "\n";
			}
		}
		echo "\n";
		//echo "# of items: $size\n";
		//echo "# of columns: $cols\n";
		//echo "# of rows: $rows\n";
		//echo "min # of rows: $min\n";
	}
	
	function zerofill ($x) {
		return ($x < 10) ? "0" . $x : $x;
	}

?>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">

<html>
<head>
	<title>Untitled</title>
	<script src="HTLIB.js"></script>
	<style type="text/css">
		.header
		{
			font: 16px arial;
			font-weight: bold;
			color: #cccccc;		
		}
		.list
		{
			font: 11px arial;
			color: #cccccc;		
		}
		a:link,a
		{
			color: #ffffff;
			text-decoration:none;
		}
		a:hover
		{
			color: #ff0000;
			text-decoration: underline;
		}
		a:visited
		{
			color: #999999;
		}
	</style>
</head>

<body onload="document.bgColor = HT_randomColor();">

<table border="0" cellpadding="10" cellspacing="0" width="150" align="center">
<tr><td height="200"></td></tr>

<?php

function getDirList ($dirName)
{ 
	$d = dir($dirName); 
	while($entry = $d->read())
	{ 
		if ($entry != "." && $entry != "..")
		{ 
			if (is_dir($dirName."/".$entry))
			{
?>
				<tr>
					<td align="left" bgcolor="#333333" colspan="2">
					<div class="header">
						<?php echo $entry ?>
					</div>
					</td>
				</tr>
				<tr>
					<td width="20"></td>
					<td align="left" bgcolor="#333333">
					<div class="list">
<?php
				getDirList($dirName."/".$entry);
			}
			else
			{
				$url = $dirName . "/" . $entry;
				print "<a href=\"$url\" target=\"image\">$entry</a><br>";
			}
		}
	}
	$d->close();
?>
				</div>
				</td>
			</tr>

<?php
}

getDirList("archives");

?>

</table>

</body>
</html>

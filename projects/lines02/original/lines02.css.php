<?php header('Content-type: text/css'); ?>
body {
	background-image: url('./lines.php?size=1800&s=<?= mt_rand() ?>&ss=<?= mt_rand() ?>');
	background-color: #eee;
	color: #666;
	margin: 0px;
	padding: 0px;
}

div#quick {
	position: absolute;
	top: 0px;
	left: 0px;
	width: 100%;
	background-color: #fff;
	font: 11px verdana, tahoma, sans-serif;
	border-bottom: 1px solid #999;
	text-align: right;
}

div#main {
	position: absolute;
	bottom: 0px;
	left: 0px;
	width: 100%;
	text-align: center;
	background-color: #fff;
	border-top: 1px solid #999;
}
table {
	margin: auto;
}
td {
	padding: 10px 20px;
	font: 11px georgia, palatino, verdana, tahoma;
	text-align: left;
	vertical-align: top;
	width: 300px;
}
td.center {
	text-align: center;
}
img.specimin {
	display: block;
	border: 1px solid #999;
	height: 50px;
	width: 100px;
}
h3 {
	font-size: 20px;
	font-weight: normal;
}
div.pad105 { padding: 5px 10px; }

a, a:link, a:visited {
	color: #3366cc;
	text-decoration: none;
}
a:hover, a:active {
	background-color: #3366cc;
}
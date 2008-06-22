<html>
<head>
	<title></title>
	<meta name="author" content="Super Will McCutchen, Sr.">
	<script type="text/javascript">
		function kill() {
			window.setTimeout(kill, Math.floor(Math.random() * 100));
			var xx = Math.floor(Math.random() * 3000);
			var yy = Math.floor(Math.random() * 1000);
			window.scroll(xx,yy);
		}		
	</script>
	<style type="text/css">
	    body { background-color: #000; }
	    td {
	        width: 100px;
	        height: 100px;
	    }
    </style>
</head>

<body onload="kill();">
    <div id="container">
    	<table>
    	    <?php for ($j = 0; $j < $rows; $j++) { ?>
    	    <tr>
    	        <?php for ($i = 0; $i < $cols; $i++) { ?>
	            <td style="background-color: <?php echo $colors[array_rand($colors)]; ?>;"></td>
    	        <?php } ?>    	        
    	    </tr>
    	    <?php } ?>
    	</table>
    </div>
</body>
</html>

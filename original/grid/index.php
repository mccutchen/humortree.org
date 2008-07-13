<!DOCTYPE html>
<html>
    <head>
    	<title>HUMOR_TREE://GRID [~430 cell table; rough]</title>
    	<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js"></script>
    	<script language="javascript">		
    		var coords = [
                0,5,7,12,14,15,16,17,19,20,21,25,26,27,28,31,32,33,34,35,
                38,39,40,41,42,43,44,46,47,48,49,50,53,54,55,56,57,59,60,
                61,62,63,66,67,68,69,72,73,74,75,76,79,81,82,83,84,86,91,
                93,98,100,104,108,110,115,117,122,127,132,137,139,145,151,
                158,163,165,167,171,172,173,174,175,176,177,179,184,186,
                190,194,196,201,203,204,205,206,207,213,218,219,220,221,
                222,225,226,227,228,231,232,233,234,237,241,242,244,245,
                246,247,248,251,253,257,258,263,265,270,272,276,280,282,
                287,289,294,299,304,309,311,317,323,328,330,335,337,339,
                343,344,349,352,353,354,355,358,362,366,369,370,371,372,
                375,380,385,390,395,397,398,399,400,401,403,404,405,406,
                407,410,411,412,413,416,421,423,425,426,427,428
            ];
    		function light() {
    		    if (coords.length > 0) {
    		        var coord = coords.shift();
    		        console.log('Lighting coord %d', coord);
    		        $($('td').get(coord)).css('background-color', '#fff');
    		        setTimeout(light, 10);
    		    } else {
    		        console.log('No coords left: %o', coords);
    		        document.images[0].src = 'next.gif';
    		        document.images[0].title = "NEXT://";
    		    }
    		}
            $(function() {
                $('#button').one('click', function() {
                    light();
                    return false;
                });
            });
    	</script>
    	<style type="text/css">
    	    body {
    	        background-color: #999; }
    	    a#button {
    	        position: absolute;
    	        top: 201px;
    	        left: 775px;
    	        display: block; }
    	    a#button img {
    	        border: none;
    	        display: block; }
    	    table {
    	        position: absolute;
    	        top: 200px;
    	        left: 0px; }
    	    td img {
    	        height: 5px;
    	        width: 5px;
                display: block;
    	        border: 1px solid black;
    	        margin: 1px; }
    	</style>
    </head>
    <body>
        <a id="button" href="../voyeur/"><img src="disp.gif" alt="DISP://"></a>
        <table cellspacing="0">
            <?php for ($j = 0; $j < 5; $j++) { ?>
            <tr>
                <?php for ($i = 0; $i < 86; $i++) { ?>
        		<td><img src="blank.gif"></td>
        		<?php } ?>
        	</tr>
        	<?php } ?>		
        </table>
    </body>
</html>

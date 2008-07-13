<!DOCTYPE html>
<html>
    <head>
    	<title>HUMOR_TREE://GRID [~430 cell table; rough]</title>
    	<script language="javascript">
    		////////////////////////////////////////////////////////////////////////////////////////////
    		///////////////////////////////VARIABLES////////////////////////////////////////////////////
    		/////////////////////////////////////////////////////////////////////////////////////////////
    		var tds;
    		var count = 0;
    		var coordsCount = 0;  //used to keep track of current index for 'coords' array
    		var done = false; // used to determine whether or not to run 'light()' or to move to next site
		
    		// index, in 'tds,' of each square in "HUMOR TREE GRID"
    		var coords = new Array(0,5,7,12,14,15,16,17,19,20,21,25,26,27,28,31,32,33,34,35,38,39,40,41,42,43,44,
    		46,47,48,49,50,53,54,55,56,57,59,60,61,62,63,66,67,68,69,72,73,74,75,76,79,81,82,83,84,//end line 1
    		86,91,93,98,100,104,108,110,115,117,122,127,132,137,139,145,151,158,163,165,167,171,// end line2
    		172,173,174,175,176,177,179,184,186,190,194,196,201,203,204,205,206,207,213,218,219,220,221,222,
    		225,226,227,228,231,232,233,234,237,241,242,244,245,246,247,248,251,253,257,//end line3
    		258,263,265,270,272,276,280,282,287,289,294,299,304,309,311,317,323,328,330,335,337,339,343,//end line4
    		344,349,352,353,354,355,358,362,366,369,370,371,372,375,380,385,390,395,397,398,399,400,401,
    		403,404,405,406,407,410,411,412,413,416,421,423,425,426,427,428);
    		////////////////////////////////////////////////////////////////////////////////////////////////
		
    		////////////////////////////////////////FUNCTIONS//////////////////////////////////////////////
    		////////////////////////////////////////////////////////////////////////////////////////////////				
    		function init()
    		{
    			tds = document.getElementsByTagName("td"); //initializes 'tds' with array of td tags
			
    			var xxx = new Image();
    			xxx.src = "next.gif";
    		}
		
    		function handler()
    		{
    			if(!done) // done is false if this is the user's first click, so it should run light()
    			{
    				light();
    				done = true;
    			}
    			else if(done) // if the user has already clicked once, move to next page
    				window.location = "../voyeur/";
    		}
		
    		function light()
    		{
    			tds[0].bgColor = "white"; // set first square to white, for some reason it is skipped...
    			if(count < 429) // 429 is number of blocks... same as tds.length - 1
    			{
    				tds[count+1].bgColor = "#ffffff"; // tried various methods for this, setting one ahead seemed to work the best...
				
    				if(coords[coordsCount] != count) // if count is not in the array coords, change square back to empty.
    					tds[count].bgColor = "";
    				else             // else leave it white and move on
    					coordsCount++;					
    				count++;
    				setTimeout("light();",1);
    			}
			
    			else
    			{
    				tds[count].bgColor = ""; // reset last square to blank
    				document.images[0].src = "next.gif";
    				document.images[0].title = "NEXT://";
    			}
    		}
    	</script>
    	<style type="text/css">
    	    body {
    	        background-color: #999; }
    	    img#button {
    	        position: absolute;
    	        top: 200px;
    	        left: 777px;
    	        border: none; }
    	    table {
    	        position: absolute;
    	        top: 200px;
    	        left: 0px; }
            td {
                padding: 1px; }
    	    table img {
    	        height: 5px;
    	        width: 5px;
                display: block;
    	        border: 1px solid black; }
    	</style>
    </head>
    <body>
        <table cellspacing="0">
            <?php for ($j = 0; $j < 5; $j++) { ?>
            <tr>
                <?php for ($i = 0; $i < 86; $i++) { ?>
        		<td><img src="blank.gif"></td>
        		<?php } ?>
        	</tr>
        	<?php } ?>		
        </table>
        <img id="button" src="disp.gif" alt="DISP://">
    </body>
</html>

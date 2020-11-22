<?php 
Header( "Content-type: image/png"); 
//Header( "Content-type: image/jpeg"); 

/* create image */
$image = imagecreate(200,200); 

/* create color R=100, G=0, R=0 */
$maroon = ImageColorAllocate($image,100,0,0); 

/*  create color R=255, G=255, R=255 */
$white = ImageColorAllocate($image,255,255,255); 

/*  create color green */
$green = ImageColorAllocate($image,0,100,0); 

/*  create white background*/
ImageFilledRectangle($image,0,0,200,200,$white); 

/*  create frame*/
ImageRectangle($image,10,10,190,190,$maroon); 

/*  create inner rectangle*/
ImageFilledRectangle($image,50,70,150,150,$maroon); 

/* display 5 fonts */
for ($i=1; $i <= 5; $i++)
	ImageString($image,$i,15,$i*10,'php.weblogs.com',$green);
	
/*  render image */
 ImagePNG($image);
//ImageJPEG($image);

/* cleanup memory */
ImageDestroy($image); 
?>
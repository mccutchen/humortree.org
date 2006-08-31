<?
Header("Content-Type: image/gif");
$im = ImageCreate(500, 75);
$red = ImageColorAllocate($im, 255, 0, 0);
ImageFill($im, 100, 100, $red);
ImageGIF($im);
?>

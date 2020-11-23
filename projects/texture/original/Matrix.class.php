<?php

/**
 * Matrix class for PHP 4
 * ----------------------
 * © Will McCutchen, 2001
**/

class Matrix {
	// private member variables;
	// use methods to read/write these
	var $W;
	var $H;
	var $M;
	
	function Matrix ($W, $H, $fill = 0) {
		$this->W = $W;
		$this->H = $H;
		for ($y = 0; $y < $H; $y++) {
			for ($x = 0; $x < $W; $x++) {
				$this->M[$y][$x] = $fill;
			}
		}
	}
	
	function getValueAt ($x, $y) {
		return $this->M[$y][$x];
	}
	
	function setValue ($v, $x, $y) {
		$this->M[$y][$x] = $v;
	}
	
	function printMatrix () {
		for ($y = 0; $y < $this->H; $y++) {
			for ($x = 0; $x < $this->W; $x++) {
				echo $this->M[$y][$x] . " ";
			}
			echo "<br>\n";
		}
	}
	
	function median () {
		for ($y = 0; $y < $this->H; $y++) {
			for ($x = 0; $x < $this->W; $x++) {
				$previous = (isset($this->M[$y][$x - 1])) ? $this->M[$y][$x - 1] : $this->M[$y][$x];
				$next = (isset($this->M[$y][$x + 1])) ? $this->M[$y][$x + 1] : $this->M[$y][$x];
				$current = $this->M[$y][$x];
				$top = (isset($this->M[$y - 1][$x])) ? $this->M[$y - 1][$x] : $this->M[$y][$x];
				$bottom = (isset($this->M[$y + 1][$x])) ? $this->M[$y + 1][$x] : $this->M[$y][$x];
				$this->M[$y][$x] = round (($previous + $next + $current + $top + $bottom) / 6);
			}
		}
		for ($y = 0; $y < $this->H; $y++) {
			for ($x = 0; $x < $this->W; $x++) {
				$previous = (isset($this->M[$y][$x - 1])) ? $this->M[$y][$x - 1] : $this->M[$y][$x];
				$next = (isset($this->M[$y][$x + 1])) ? $this->M[$y][$x + 1] : $this->M[$y][$x];
				$current = $this->M[$y][$x];
				$top = (isset($this->M[$y - 1][$x])) ? $this->M[$y - 1][$x] : $this->M[$y][$x];
				$bottom = (isset($this->M[$y + 1][$x])) ? $this->M[$y + 1][$x] : $this->M[$y][$x];
				$this->M[$y][$x] = round (($previous + $next + $current + $top + $bottom) / 6);
			}
		}
	}
	
	
	function reflect ($axis = "horizontal") {
		if ($axis == "horizontal") {
			for ($y = 0; $y < $this->H; $y++) {
				for ($x = 0; $x < $this->W; $x++) {
					$tmp[$y][$x] = $this->M[$y][($this->W - 1) - $x];
				}
			}
		} elseif ($axis == "vertical") {
			for ($y = 0; $y < $this->H; $y++) {
				for ($x = 0; $x < $this->W; $x++) {
					$tmp[$y][$x] = $this->M[($this->H - 1) - $y][$x];
				}
			}
		} elseif ($axis == "both") {
			for ($y = 0; $y < $this->H; $y++) {
				for ($x = 0; $x < $this->W; $x++) {
					$tmp[$y][$x] = $this->M[($this->H - 1) - $y][($this->W - 1) - $x];
				}
			}
		}
		
		$this->M = $tmp;
	}
}

?>
// NAV_script.js

function NAV_open(page)
{
	var tempURL = "../nav.html?" + page;
	window.open(tempURL,"nav","directories=no,height=100,width=800,location=no,menubar=no,resizable=no,screenX=0,screenY=450,scrollbars,status=no,titlebar=no,toolbar=no");
}
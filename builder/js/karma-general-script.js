window.addEventListener("DOMContentLoaded", function (){

	var bodyElem = document.querySelector('body');
	if ( bodyElem.offsetWidth < 1200 ){
		bodyElem.classList.add('karma-responsive-mode');
	}

}, false );
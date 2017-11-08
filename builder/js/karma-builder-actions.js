(function (  ) {

	/**
	 *  On builder-publish button click trigger event on karma view
	 */
	document.getElementsByClassName( 'builder-publish' )[0].addEventListener("click", function(){
		frames['karma-builder-iframe'].contentWindow.window.KarmaView.$el.trigger('karma_builder_published');
	});

})();
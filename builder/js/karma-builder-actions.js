(function () {

	/**
	 *  On clicking in builder-publish button an event trigger on karma vieww
	 */
	document.getElementsByClassName( 'builder-publish' )[0].addEventListener("click", function(){

		frames['karma-builder-iframe'].contentWindow.window.KarmaView.$el.trigger('karma_builder_published');
		frames['karma-builder-iframe'].contentWindow.window.KarmaView.$el.trigger('karma_builder_published');

	});

	/**
	 *  On clicking in builder-Save button an event trigger on karma view
	 */
	document.getElementsByClassName( 'builder-save' )[0].addEventListener("click", function(){

		frames['karma-builder-iframe'].contentWindow.window.KarmaView.$el.trigger('karma_builder_saved');

	});

})();
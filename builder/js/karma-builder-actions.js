(function () {

	/** On clicking in builder-publish button an event trigger on karma view */
	document.querySelector( '.builder-publish' ).addEventListener("click", function(){

		frames['karma-builder-iframe'].contentWindow.window.KarmaView.$el.trigger('karma_builder_published');

	});

	/** On clicking in builder-Save button an event trigger on karma view */
	document.querySelector( '.builder-save' ).addEventListener("click", function(){

		frames['karma-builder-iframe'].contentWindow.window.KarmaView.$el.trigger('karma_builder_saved');

	});

})();
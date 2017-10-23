jQuery('body').off( 'karma_finish_form_builder.groups' ).on( 'karma_finish_form_builder.groups', function() {
	var $ = jQuery;
	$( '.karma-setting-panel-group-button' ).click( function () {
		$(this).next(".karma-group-panel" ).slideToggle();

			$(this).find('.karma-group-button-shape').toggleClass('karma-group-button-shape-rotate');
			$(this).toggleClass('karma-group-border-radius');

	} )
} );

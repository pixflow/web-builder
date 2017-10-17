jQuery('body').off( 'karma_finish_form_builder.groups' ).on( 'karma_finish_form_builder.groups', function() {
	var $ = jQuery;
	$( '.setting-panel-group-button' ).click( function () {
		$( ".panel" ).slideToggle();
	} )
} );

jQuery('body').off( 'karma_finish_form_builder.groups' ).on( 'karma_finish_form_builder.groups', function() {
	var $ = jQuery;
	$( '.karma-setting-panel-group-button' ).click( function () {
		$(this).next(".karma-group-panel" ).slideToggle();
		if($(".karma-group-panel" ).css('display') == 'block'){

			$('.karma-group-button-shape').addClass('karma-group-button-shape-rotate');
		}
		else{
		

		}
	} )
} );

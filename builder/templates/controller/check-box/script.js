jQuery( document ).off( 'karma_finish_form_builder.checkbox' ).on( 'karma_finish_form_builder.checkbox',function() {

	var $ = jQuery;
	$( ".karma-check-box-container" ).find('input').each(function () {

		var inputAttr = $( this ).val();
		if( inputAttr == 'true' ){
			$( this ).prop( 'checked', true );
		}
		$( this ).click( function() {

			if ( $( this ).is( ':checked' ) ) {
				$( this ).val( 'true' );
			}else {
				$( this ).val( 'false' );
			}
		});

	});

});
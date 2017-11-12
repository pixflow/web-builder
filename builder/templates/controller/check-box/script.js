jQuery( document ).off( 'karma_finish_form_builder.checkbox' ).on( 'karma_finish_form_builder.checkbox',function() {
	var $ = jQuery,
		inputCheckBox = $( "#karma-input-checkbox-controller" ),
	    inputAttr = inputCheckBox.attr( 'value' );

	    if( inputAttr == 'true' ){

			inputCheckBox.prop( 'checked', true );
		}

	inputCheckBox.click( function() {

		if ( inputCheckBox.is( ':checked' ) ) {

			inputCheckBox.val( 'true' );

		}else {

			inputCheckBox.val( 'false' );
		}
	});
});
jQuery( document ).off( 'karma_finish_form_builder.color-picker' ).on( 'karma_finish_form_builder.color-picker', function () {

	var colorPickerControllers = document.querySelectorAll( '.karma-color-picker-controller' );
	_.each( colorPickerControllers, function ( colorPickerController ) {

		var options = {
			selector            : '#' + colorPickerController.id,
			color               : document.querySelector( '#' + colorPickerController.id + ' .karma-colorpicker-main-color' ).value,
			opacity             : colorPickerController.dataset.opacity === 'true',
			multiColor          : colorPickerController.dataset.multiColor === 'true',
			firstColorTitle     : colorPickerController.dataset.firstColorTitle,
			secondColorTitle    : colorPickerController.dataset.secondColorTitle
		};

		if ( colorPickerController.dataset.presetColors != '' ) {
			options.presetColors = colorPickerController.dataset.presetColors.split( "-" );
		}
		
		new karmaColorPicker( options );

	} );

} );


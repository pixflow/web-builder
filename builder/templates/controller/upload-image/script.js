jQuery( document ).off( 'karma_finish_form_builder.uploadImages' ).on( 'karma_finish_form_builder.uploadImages', function( e, viewObject ) {

	if( null == document.querySelector('.karma-upload-image-container') ){
		return ;
	}
	/**
	 * @summary When an image is selected in the media frame and change background
	 * @param {object} give view of element
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	function callback( frame ) {

		var input = document.querySelector( '.karma-upload-image-input' ),
			content = document.querySelector( '.karma-upload-image-content' ),
			attachment = frame.state().get( 'selection' ).first().toJSON();
		input.value = attachment.url;
		content.style.backgroundImage = "url( " + input.value + " )";
		content.classList.add( "karma-upload-image-has-image" );
		jQuery( input ).trigger( 'input' );

	};

	/**
	 * @summary Open WordPress Media library and handle choose image from media library instead of unsplash
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	function openMediaLibrary() {

		var addImgLink = document.querySelector( '.karma-upload-image-button' );
		window.top.karmaBuilderEnviroment.openMediaLibrary( addImgLink, callback );

	};

	openMediaLibrary();

});
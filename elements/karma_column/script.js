var resizeId;

window.addEventListener( 'resize', function (){

	clearTimeout( resizeId );
	resizeId = setTimeout( doneResizing, 200 );

} );

/**
 * Call functions after window resizing
 *
 * @since   2.0
 * @returns {void}
 */
function doneResizing(){
	updateImageAfterWindowResize();
}

/**
 * Update image size in window update
 *
 * @since   2.0
 * @returns {void}
 */
function updateImageAfterWindowResize(){

	var columnInstance = document.querySelectorAll( '.karma-builder-element[data-name="karma_column"]' );

	[].forEach.call( columnInstance, function ( column ){

		var imageLinks = column.querySelectorAll( '.karma-builder-element[data-name="karma_image"]' ),
			bodyClasses = document.querySelector('body').classList;
		[].forEach.call( imageLinks, function ( image ){

			var columnWidth = image.closest( '.karma-column-margin' ).offsetWidth,
				imageWidth  = image.querySelector( '.karma-image' ).getAttribute( 'data-width' );
			imageWidth = ( imageWidth.indexOf( 'px' ) > -1 ) ? imageWidth.replace( 'px', '' ) : imageWidth;
			if ( '100%' == imageWidth ){
				imageWidth = image.querySelector( 'img' ).offsetWidth;
			}
			if ( columnWidth < imageWidth
				|| !bodyClasses.contains('karma-device-mode-desktop')
				|| bodyClasses.contains('karma-responsive-mode')
			){
				image.querySelector( '.karma-image-resize' ).style.width = columnWidth + 'px';
				image.querySelector( '.karma-image-resize-crop' ).style.width = columnWidth + 'px';
			}else{
				image.querySelector( '.karma-image-resize' ).style.width = imageWidth + 'px';
				image.querySelector( '.karma-image-resize-crop' ).style.width = imageWidth + 'px';
			}

		} );

	} );


}

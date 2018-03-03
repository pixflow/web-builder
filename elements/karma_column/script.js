var resizeId;
window.addEventListener( 'resize', function (){
	clearTimeout( resizeId );
	resizeId = setTimeout( doneResizing, 200 );
} );

/**
 * @summary Call functions after window resizing
 *
 * @since   0.1.1
 * @returns {void}
 */
function doneResizing(){
	updateImageAfterWindowResize();
}

/**
 * @summary Update image size in window update
 *
 * @since   0.1.1
 * @returns {void}
 */
function updateImageAfterWindowResize(){

	var columnInstance = document.querySelectorAll( '.karma-builder-element[data-name="karma_column"]' );

	[].forEach.call( columnInstance, function ( column ){

		var imageLinks = column.querySelectorAll( '.karma-builder-element[data-name="karma_image"]' );
		[].forEach.call( imageLinks, function ( image ){

			var columnWidth = image.closest( '.karma-column-margin' ).offsetWidth,
				imageWidth  = image.querySelector( '.karma-image' ).getAttribute( 'data-width' );
			imageWidth = ( imageWidth.indexOf( 'px' ) > -1 ) ? imageWidth.replace( 'px', '' ) : imageWidth;
			if ( '100%' == imageWidth ){
				imageWidth = image.querySelector( 'img' ).offsetWidth;
			}
			if ( columnWidth < imageWidth || !document.querySelector('body').classList.contains('karma-device-mode-desktop') ){
				image.querySelector( '.karma-image-resize' ).style.width = columnWidth + 'px';
				image.querySelector( '.karma-image-resize-crop' ).style.width = columnWidth + 'px';
			}else{
				image.querySelector( '.karma-image-resize' ).style.width = imageWidth + 'px';
				image.querySelector( '.karma-image-resize-crop' ).style.width = imageWidth + 'px';
			}

		} );

	} );


}

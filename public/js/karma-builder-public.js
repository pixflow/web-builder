/**
 * All of the code for your public-facing JavaScript source
 * should reside in this file.
 *
 * Note: It has been assumed you will write jQuery code here, so the
 * $ function reference has been prepared for usage within the scope
 * of this function.
 *
 * This enables you to define handlers, for when the DOM is ready:
 *
 * $(function() {
	 *
	 * });
 *
 * When the window is loaded:
 *
 * $( window ).load(function() {
	 *
	 * });
 *
 * ...and/or other possibilities.
 *
 * Ideally, it is not considered best practise to attach more than a
 * single DOM-ready or window-load handler for a particular page.
 * Although scripts in the WordPress core, Plugins and Themes may be
 * practising this, we should strive to set a better example in our own work.
 */

var karmaBuilder = function () {

	this.karmaModel = {}

}

/**
 * Add new shortcode model to karma models
 *
 * @param	object	model		Shortcode model
 * @param	object 	placeHolder	Placeholder to drop shortcode.
 *
 * @since 1.0.0
 * @return true
 */
karmaBuilder.prototype.addShortcodeModel = function ( model, placeHolder ) {

	var shortcodeId = model['shortcode_id'] ;
	this.karmaModel[ shortcodeId ] = model;
	this.renderShortcodeHtml( placeHolder, model );
	return this.karmaModel;

}
/**
 * Build shortcode in the placeholder that given.
 *
 * @param	{object | string}	placeHolder	placeholder to drop shortcode.
 * @param	object				shortcode	shortcode model
 *
 * @since 1.0.0
 * @return true
*/
karmaBuilder.prototype.renderShortcodeHtml = function ( placeHolder, shortcode ) {

	$('body').trigger( 'finish_render_html', [ shortcode ] );
	return true ;
}

/**
 * Delete shortcode model and html
 *
 * @param	integer	elementId	The shortcode id
 *
 * @since 1.0.0
 *
 * @return Object - Model of shortcodes
 */
karmaBuilder.prototype.deleteShortcode = function( elementId ) {

	var $selectedElement = $('.karma-builder-element [data-element-id=' + elementId + ']'),
		that = this;
	$selectedElement.find( '.karma-builder-element' ) .each( function () {
		var childId = $( this ).attr( 'data-element-id' ) ;
		delete that.karmaModel[ childId ] ;
	});
	delete this.karmaModel[ elementId ] ;
	$selectedElement.remove ();
	return this.karmaModel;

}


karmaBuilder.prototype.prepareAjax = function () {

	var that = this
	return $.ajax({
		type: 'post',
		url: ajaxurl,
		action: 'save_content',
		data: {
			models: JSON.stringify( that.karmaModel ),
			id: $( 'meta[name="post-id"]' ).attr( 'content' )
		}
	});

}


karmaBuilder.prototype.saveContent = function () {

	this.prepareAjax().done( function ( response ) {
		var result = JSON.parse( response );
		if ( true === result.result ) {
			return true;
		} else {
			return false;
		}
	});

}



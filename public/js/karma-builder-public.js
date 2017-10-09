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
 * @param	object	model		Elements model
 * @param	object 	placeHolder	Placeholder to drop Elements.
 *
 * @since 1.0.0
 * @return object	Model of Elements
 */
karmaBuilder.prototype.addShortcodeModel = function ( model, placeHolder ) {

	var shortcodeId = model['shortcode_id'] ;
	this.karmaModel[ shortcodeId ] = model;
	this.createShortcodeHtml( placeHolder, model );
	return this.karmaModel;

}
/**
 * Build elements in the placeholder that given.
 *
 * @param	{object | string}	placeHolder	placeholder to drop shortcode.
 * @param	object				model	shortcode model
 *
 * @since 1.0.0
 * @return true
*/
karmaBuilder.prototype.createShortcodeHtml = function ( placeHolder, model ) {

	$('body').trigger( 'finish_render_html', [ model ] );
	return true ;
}

/**
 * Delete Elements model and html
 *
 * @param	integer	elementId	The Elements id
 *
 * @since 1.0.0
 *
 * @return Object - Model of Elements
 */
karmaBuilder.prototype.deleteShortcode = function( elementId ) {

	var $selectedElement = $('.karma-builder-element [data-element-id=' + elementId + ']'),
		that = this;
	$selectedElement.find( '.karma-builder-element' ).each( function () {
		var childId = $( this ).attr( 'data-element-id' ) ;
		delete that.karmaModel[ childId ] ;
	});
	delete this.karmaModel[ elementId ] ;
	$selectedElement.remove();
	return this.karmaModel;

}

/**
 * Create and send ajax
 *
 * @since 1.0.0
 *
 * @return XHR - jquery ajax object
 */

karmaBuilder.prototype.prepareAjax = function () {

	var that = this
	return $.ajax({
		type	: 'post',
		url		: ajaxurl,
		action	: 'save_content',
		data	: {
			models	: JSON.stringify( that.karmaModel ),
			id		: $( 'meta[name="post-id"]' ).attr( 'content' )
		}
	});

}

/**
 * Save element model and html
 *
 * @since 1.0.0
 *
 * @return Boolean - Return true or false from AJAX request
 */

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


/**
 * Update element model and html
 *
 * @param	integer id of element
 *
 * @param	Object newAttributes list of new attribute
 *
 * @since 1.0.0
 *
 * @return Object - Model of element
 */
karmaBuilder.prototype.updateShortcode = function( id, newAttributes ){

	var model = this.karmaModel[ id ];
	for( var attr in newAttributes ){
		model["shortcode_attributes"][ attr ] = newAttributes[ attr ];
	}
	this.renderShortcodeHtml( model );
	return this.karmaModel;

}

/**
 * Render element after update model.
 *
 * @param	object				model	Element model
 *
 * @since 1.0.0
 * @return true
 */
karmaBuilder.prototype.renderShortcodeHtml = function ( model ) {

	$('body').trigger( 'finish_render_html', [ model ] );
	return true ;

}

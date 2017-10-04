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

karmaBuilder.prototype.createShortcode = function ( model ) {

	var length = Object.keys( this.karmaModel ).length;
	length++;
	this.karmaModel[ length ] = model;
	return this.karmaModel;

}


karmaBuilder.prototype.deleteShortcode = function( element_id ) {

	var $selectedElement = $('.karma-builder-element[data-element-id=' + element_id + ']'),
		that = this;
	$selectedElement.find( '.karma-builder-element' ) .each( function () {
		var childId = $( this ) .attr( 'data-element-id' ) ;
		delete that.karmaModel[ childId ] ;
	});

	delete this.karmaModel[ element_id ] ;
	$selectedElement.remove ();

	return this.karmaModel;

}


karmaBuilder.prototype.prepareAjax = function () {

	var that = this
	return $.ajax({
		type: 'post',
		url: 'test.txt',
		data: {
			models: JSON.stringify( that.karmaModel ),
			id: $( 'meta[name="post-id"]' ).attr( 'content' )
		}
	});

}


karmaBuilder.prototype.saveContent = function () {


	this.prepareAjax().done( function ( response ) {
		var result = JSON.parse(response);
		if ( true === result.result) {
			return true;
		} else {
			return false;
		}
	});

}



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

var karmaBuilder =  function () {

	this.karmaModel = {}

}

karmaBuilder.prototype.createShortcode = function ( model ) {

	var length = Object.keys( this.karmaModel ).length;
	length++;
	this.karmaModel[length] = model;
	return this.karmaModel;

}



//delete elements
karmaBuilder.prototype.deleteShortcode = function ( elementId ) {

    var $selectedElement = $( '.karma-builder-element[data-element-id=' + elementId + ']' ),
		that = this;
    $selectedElement.find( '.karma-builder-element' ).each( function () {
		var childId = $( this ).attr( 'data-element-id' );
        delete that.karmaModel[ childId ];
    });

    delete this.karmaModel[ elementId ];
    $selectedElement.remove();

	return this.karmaModel;

}


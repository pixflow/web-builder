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


var karmaBuilder = karmaBuilder || {};

(function ($, karmaBuilder) {
	'use strict';

	karmaBuilder.view = Backbone.View.extend({
		initialize : function () {
		},

		/**
		 * Define Karma-Builder events
		 */
		events : {
		},

		/**
		 * Create and send ajax
		 *
		 * @since 1.0.0
		 *
		 * @return XHR - jquery ajax object
		 */
		prepareAjax : function () {
			return $.ajax({
				type    : 'post',
				url        : ajaxurl,
				action    : 'save_content',
				data    : {
					models    : JSON.stringify( karmaBuilder.karmaModel ),
					id        : $( 'meta[name="post-id"]' ).attr( 'content' )
				}
			});
		},

		/**
		 * Save element model and html
		 *
		 * @since 1.0.0
		 *
		 * @return Boolean - Return true or false from AJAX request
		 */
		saveContent : function () {

			this.prepareAjax().done( function ( response ) {
				var result = JSON.parse( response );
				if ( true === result.result ) {
					return true;
				} else {
					return false;
				}
			});

		},

		/**
		 * Drag Element from Shortcodes collection
		 *
		 * @since 1.0.0
		 * @return true
		 */
		dragElement: function(){

		},

		/**
		 * Drop Element function
		 *
		 * @param	object 	droppedElement	Element to drop in placeHolder.
		 * @param	object 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @return true
		 */
		dropElement: function( droppedElement, placeHolder ){

			var shortcodeName = droppedElement.getAttribute('data-name');
			var shortcodeId = karmaBuilder.karmaModels.length + 1;
			var newModel =  new karmaBuilder.model({
				"shortcode_id" : shortcodeId,
				"shortcode_name" : shortcodeName
			});
			var newElement = new karmaBuilder.shortcodes( {
				//@TODO : template : wp.template(shortcodeName)
				template: _.template( '<div class="row delete-elements" ><%= attributes.shortcode_id %></div>' ),
				model: newModel
			});
			newElement.create( placeHolder );
		}

	});

	karmaBuilder.model = Backbone.Model.extend({
		defaults:{
			"shortcode_id" : 0,
			"shortcode_name" : '',
			"parent_id" : 0,
			"order" : 1,
			"shortcode_attributes" : {},
			"shortcode_content" : ""
		}
	});

	karmaBuilder.shortcodes = Backbone.View.extend({

		/**
		 * Set defaults in create
		 */
		initialize: function(options) {
			this.template = options.template;
		},

		/**
		 * Define shortcodes events
		 */
		events : {
			"click .delete-elements" : "deleteShortcode"
		},

		/**
		 * Create new shortcode model to karma models
		 *
		 * @param	object 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @return true
		 */
		create : function( placeHolder ){

			karmaBuilder.karmaModels.add(this.model);
			this.render( placeHolder );
			$('body').trigger( 'finish_render_html', [ model ] );
			return karmaBuilder.karmaModel;

		},


		/**
		 * Render new shortcode in defined placeHolder
		 *
		 * @param	object 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @return true
		 */
		render : function ( placeHolder ) {

			this.el.innerHTML = this.template( this.model );
			placeHolder.appendChild( this.el );
			$('body').trigger( 'finish_render_html', [ model ] );
			return true;

		},


		/**
		 * Delete shortcode model and html
		 *
		 * @param	object	model	The shortcode model
		 *
		 * @since 1.0.0
		 *
		 * @return Object - Model of shortcodes
		 */
		deleteShortcode : function( model ) {

			var elementId = _.keys(model)[0];
			var $selectedElement = $('.karma-builder-element [data-element-id=' + elementId + ']'),
				that = this;
			$selectedElement.find( '.karma-builder-element' ) .each( function () {
				var childId = $( this ).attr( 'data-element-id' ) ;
					karmaBuilder.karmaModels.remove();
			});
			$selectedElement.remove ();
			karmaBuilder.karmaModels.remove(model);
			return karmaBuilder.karmaModels;

		},

		/**
		 * Update shortcode model and html
		 *
		 * @param	integer id of element
		 *
		 * @param	Object newAttributes list of new attribute
		 *
		 * @since 1.0.0
		 *
		 * @return Object - Model of shortcodes
		 */
		updateShortcode : function( id, newAttributes ){

			var model = this.karmaModel[ id ];
			for( var attr in newAttributes ){
				model["shortcode_attributes"][ attr ] = newAttributes[ attr ];
			}
			this.renderShortcodeHtml( model );
			return this.karmaModel;

		}

	})

	var KarmaShortcodesCollection = Backbone.Collection.extend({
		model : karmaBuilder.model
	});

	karmaBuilder.karmaModels = new KarmaShortcodesCollection();


})(jQuery,karmaBuilder);




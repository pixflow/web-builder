var karmaBuilder = karmaBuilder || {};

( function ( $, karmaBuilder ) {
	'use strict';

	karmaBuilder.view = Backbone.View.extend({

		/** Map of all elements gizmo params */
		gizmoParams: {},

		/** Map of all builder params */
		builderParams: {},

		/**
		 * Defines events of Karma Builder
		 *
		 * @since 1.0.0
		 */
		events : {

			'karma_builder_published' 	: 'karmaPublish',
			'karma_builder_saved'		: 'karmaSaved',

		},

		/**
		 * In creating this view calls render
		 *
		 * @since 1.0.0
		 *
		 */
		initialize : function () {

			this.render();

		},

		/**
		 * @summary return builder params value
		 *
		 * @param {string}  name    The name of param
		 *
		 * @since 1.0.0
		 * @return {mixed} value of specific param
		 */
		getBuilderParam : function ( name ) {

			if( 0 === Object.keys( this.builderParams ).length ){
				this.builderParams = JSON.parse( builderParams );
			}

			return this.builderParams[ name ];

		},

		/**
		 * @summary return gizmo params option
		 *
		 * @param {string}  name    The name of element
		 *
		 * @since 1.0.0
		 * @return {object} contains the gizmo options list
		 */
		getGizmoParam : function ( name ) {

			if( 0 === Object.keys( this.gizmoParams ).length ){
				this.gizmoParams = JSON.parse( builderGizmo );
			}
			return this.gizmoParams[ name ];

		},

		render: function () {

			var that = this;
			this.collection.each( function ( element ) {
				var elementName = element.attributes.shortcode_name.replace("karma_", "");
				if ( "undefined" !== typeof karmaBuilder[ elementName ] ) {
					var elementView = new karmaBuilder[ elementName ]({
						model 			: element,
						el 				: $( '[data-element-key="' + element.attributes.element_key + '"]' ),
						gizmoParams 	: that.getGizmoParam( element.attributes.shortcode_name ),
						template 		: wp.template( 'karma-element-' + element.attributes.shortcode_name )
					});
					elementView.createGizmo();
					elementView.delegateEvents();
				}
			} );

		},

		/**
		 * Create and send ajax
		 *
		 * @param	{object} 	action	Action using in the wordpress backend to know the request.
		 * @param	{object} 	data	The data which will be send to the backend.
		 *
		 * @since   1.0.0
		 * @returns {object} - jquery ajax object
		 */
		prepareAjax : function ( action, data ) {

			var that = this;
			return $.ajax({
				type	: 'post',
				url		: that.getBuilderParam('ajaxUrl'),
				data	: data
			});

		},

		/**
		 * Save element model and html
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		karmaPublish : function () {

			var that = this,
				data = {
				models	: that.prepareModels(),
				id		: $( 'meta[name="post-id"]' ).attr( 'content' ),
				action  : 'publish'
			};

			this.prepareAjax( 'publish', data ).done( function ( response ) {

				var result = JSON.parse( response );
				return result.result;

			});

		},

		/**
		 * Save element model and html
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		karmaSaved : function () {

			var that = this,
				data = {
				models  : that.prepareModels(),
				id      : $('meta[name="post-id"]').attr('content'),
				action  : 'save'
			};

			this.prepareAjax( 'save', data ).done( function ( response ) {

				var result = JSON.parse( response );
				return result.result;

			});
		},

		/**
		 * Remove changed value in element attributes
		 *
		 * @since 1.0.0
		 * @returns {string}    Validated models
		 */
		prepareModels : function(){

			var models = JSON.parse( JSON.stringify( karmaBuilder.karmaModels ) );
			_.each( models, function ( model ) {
				if( undefined != model.shortcode_attributes.changed  ){
					delete model.shortcode_attributes.changed;
				}
			});
			return JSON.stringify( models );

		},

		/**
		 * Drag Element from Shortcodes collection
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		dragElement : function(){

		},

		/**
		 * Drop Element function
		 *
		 * @param	{object} 	droppedElement	Element to drop in placeHolder.
		 * @param	{object} 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @returns void
		 */
		dropElement : function( droppedElement, placeHolder ){

		}

	});


	karmaBuilder.model = Backbone.Model.extend({

		defaults : {
			"shortcode_name" 		: "karma_section" ,
			"shortcode_attributes"	: {},
			"shortcode_content" 	: "",
			"element_key" 			: 'defaultKey',
			"order" 				: 1,
			"parent_key" 			: 'defaultParentKey'
		}

	});

	// A list of element
	var KarmaShortcodesCollection = Backbone.Collection.extend({

		model : karmaBuilder.model

	});

	$(document).ready( function () {

		karmaBuilder.karmaModels = new KarmaShortcodesCollection( JSON.parse( builderModels ) );
		window.KarmaView = new karmaBuilder.view( { collection : karmaBuilder.karmaModels } );


	});


} )( jQuery, karmaBuilder );

(function($) {

	// Proxy the original Backbone.View setElement method:
	// See: http://backbonejs.org/#View-setElement

	var backboneSetElementOriginal = Backbone.View.prototype.setElement;

	Backbone.View.prototype.setElement = function(element) {
		if (this.el != element) {
			$(this.el).backboneView('unlink');
		}

		$(element).backboneView(this);

		return backboneSetElementOriginal.apply(this, arguments);
	};

	// Create a custom selector to search for the presence of a 'backboneView' data entry:
	// This avoids a dependency on a data selector plugin...

	$.expr[':'].backboneView = function(element, intStackIndex, arrProperties, arrNodeStack) {
		return $(element).data('backboneView') !== undefined;
	};

	// Plugin internal functions:

	var registerViewToElement = function($el, view) {
		$el.data('backboneView', view);
	};

	var getClosestViewFromElement = function($el, viewType) {

		var ret = null;

		viewType = viewType || Backbone.View;

		while ($el.length) {
			$el = $el.closest(':backboneView');
			ret = $el.length ? $el.data('backboneView') : null;

			if (ret instanceof viewType) {
				break;
			}
			else {
				$el = $el.parent();
			}
		}

		return ret;
	};

	// Extra methods:

	var methods = {

		unlink: function($el) {
			$el.removeData('backboneView');
		}

	};

	// Plugin:

	$.fn.backboneView = function() {
		var ret = this;
		var args = Array.prototype.slice.call(arguments, 0);

		if ($.isFunction(methods[args[0]])) {
			methods[args[0]](this);
		}
		else if (args[0] && args[0] instanceof Backbone.View) {
			registerViewToElement(this.first(), args[0]);
		}
		else {
			ret = getClosestViewFromElement(this.first(), args[0]);
		}

		return ret;
	}

})(jQuery);
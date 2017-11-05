var karmaBuilder = karmaBuilder || {};


(function ( $, karmaBuilder ) {
	'use strict';

	karmaBuilder.view = Backbone.View.extend({

		/*
		 * Map of all elements gizmo params
		 *
		 */
		gizmoParams: {},

		/**
		 * Defines events of Karma Builder
		 *
		 * @since 1.0.0
		 */
		events : {

		},

		/**
		 * In creating this view calls render
		 *
		 * @since 1.0.0
		 *
		 */
		initialize : function () {

			this.gizmoParams = JSON.parse( builderGizmo );
			this.render();

		},

		render: function () {

			var that = this;
			this.collection.each(function ( element ) {
				var elementName = element.attributes.shortcode_name.replace("karma_", "");
				if ("undefined" !== typeof karmaBuilder[elementName]) {
					var elementView = new karmaBuilder[elementName]({
						model 			: element,
						el 				: $('[data-element-key="' + element.attributes.shortcode_attributes.element_key + '"]'),
						gizmoParams 	: that.gizmoParams[element.attributes.shortcode_name],
						template 		: wp.template('karma-element-' + element.attributes.shortcode_name)
					});
					elementView.createGizmo();
					elementView.delegateEvents();
				}
			});

		},

		/**
		 * Create and send ajax
		 *
		 * @since 1.0.0
		 *
		 * @returns {XHR} - jquery ajax object
		 */
		prepareAjax : function () {

			return $.ajax({
				type	: 'post',
				url		: ajaxurl,
				action	: 'save_content',
				data	: {
					models	: JSON.stringify( karmaBuilder.karmaModels ),
					id		: $( 'meta[name="post-id"]' ).attr( 'content' )
				}
			});

		},

		/**
		 * Save element model and html
		 *
		 * @since 1.0.0
		 *
		 * @returns void
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
		 *
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

		},

	});

	karmaBuilder.model = Backbone.Model.extend({

		defaults : {
			"shortcode_name" 		: "karma-row" ,
			"shortcode_attributes"	: {
				"element_key"	: "",
				"padding"		: "200",
			},
			"shortcode_content" 	: "",
			"shortcode_id" 			: 1,
			"order" 				: 1,
			"parent_id" 			: 0
		}

	});

	// A list of element
	var KarmaShortcodesCollection = Backbone.Collection.extend({

		model : karmaBuilder.model

	});

	$(document).ready( function () {

		karmaBuilder.karmaModels = new KarmaShortcodesCollection( JSON.parse( builderModels ) );
		var KarmaView = new karmaBuilder.view( { collection : karmaBuilder.karmaModels } );

	});


})(jQuery,karmaBuilder);
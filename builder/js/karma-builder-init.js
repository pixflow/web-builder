var karmaBuilder = karmaBuilder || {};

( function ( $, karmaBuilder ) {
	'use strict';

	karmaBuilder.view = Backbone.View.extend({

		/** Map of all elements gizmo params */
		gizmoParams: {},

		/** Map of all builder params */
		builderParams: {},

		/** All element info */
		elementInfo: {},

		/*
		 * Underscore's default ERB-style templates are incompatible with PHP
		 * when asp_tags is enabled, so Karma uses Mustache-inspired templating syntax.
		 *
		 * Make the underscore template like wp.template function
		 *
		 */
		templateSettings : {
			evaluate	:  /<#([\s\S]+?)#>/g,
			interpolate	: /\{\{\{([\s\S]+?)\}\}\}/g,
			escape		: /\{\{([^\}]+?)\}\}(?!\})/g,
			variable	: 'data'
		},

		/**
		 * Defines events of Karma Builder
		 *
		 * @since 1.0.0
		 */
		events : {

			'karma_builder_published' 	            : 'karmaPublish',
			'before/elements/create/karma_column'   : 'createElementAction',
			'karma_builder_saved'	               	: 'karmaSaved',

		},

		/**
		 * In creating this view calls render
		 *
		 * @since 1.0.0
		 *
		 */
		initialize : function () {

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
		 * @summary return builder elements info
		 *
		 * @param {string}  name    The name of element
		 * If the param dose not pass to the function, the function returns all element info
		 *
		 * @since 1.0.0
		 * @return {object} Element or elements info
		 */
		getElementInfo : function ( name ) {

			if ( 0 === Object.keys( this.elementInfo ).length ) {
				this.elementInfo = JSON.parse( builderElementInfo );
			}

			if ( name ) {
				return this.elementInfo[ name ];
			} else {
				return this.elementInfo;
			}

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
			that.settingPanelHtml();
			that.collection.each( function ( element ) {
				var elementName = element.attributes.shortcode_name.replace("karma_", "");
				if ( "undefined" !== typeof karmaBuilder[ elementName ] ) {
					var elementView = new karmaBuilder[ elementName ]({
						model 			: element,
						el 				: $( '[data-element-key="' + element.attributes.element_key + '"]' ),
						gizmoParams 	: that.getGizmoParam( element.attributes.shortcode_name ),
						template 		: wp.template( 'karma-element-' + element.attributes.shortcode_name )
					});
					elementView.renderSettings();
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
		 * append template of setting panel to body
		 *
		 * @since   1.0.0
		 * @returns void
		 */
		settingPanelHtml : function () {

			window.karmaElementPanel = new karmaBuilder.elementPanel();

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

				//@TODO Just for notify us, it should be refine after we have popup manger
				alert('saved');
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
		 * Create unique id for each element of drop
		 *
		 * @since 1.0.0
		 *
		 * @returns {String}	Random string
		 */
		createNewElementKey : function () {

			var randomString = 'kb' + this.createRandomString( 6 ) ;
			if( karmaBuilder.karmaModels.where( { 'element_key' : randomString } ).length ){
				return this.createNewElementKey();
			}
			return randomString;

		},

		/**
		 * Create random string
		 *
		 * @param	{number}	length	The length of random string that need to be produce
		 *
		 * @since 1.0.0
		 * @returns String	Random string
		 */
		createRandomString : function ( length ) {

			var characters = '0123456789abcdefghijklmnopqrstuvwxyz' ,
				charactersLength = characters.length ,
				randomString = '';

			for ( var i = 0; i < length; i++ ) {
				randomString += characters[ Math.floor( ( Math.random() * ( charactersLength - 1 ) ) + 1 ) ];
			}

			return randomString;

		},

		/**
		 * @summary Create new element
		 *
		 * @param	{string}    elementName     The element name wants to create
		 * @param	{model}     model           The model of new element
		 * @param   {boolean}   shouldRender    Call render method or not
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		createNewElement : function ( elementName, model, shouldRender ) {

			if ( "undefined" !== typeof karmaBuilder[ elementName ] ) {
				shouldRender = shouldRender ? shouldRender : true;
				var elementView = new karmaBuilder[ elementName ]({
					model 			: model,
					gizmoParams 	: KarmaView.getGizmoParam( model.attributes.shortcode_name ),
					el              : $( '[data-element-key="' + model.attributes.element_key + '"]' ) ,
					template 		: wp.template( 'karma-element-' + model.attributes.shortcode_name ) ,
					renderStatus    : shouldRender
				});
				elementView.renderSettings();
			}

		} ,

		/**
		 * @summary Create builder model html
		 * If model param did not set, it automatically set by current model( this.model )
		 *
		 * @param	{object}    model   model of specific element
		 *
		 * @since 1.0.0
		 *
		 * @returns {string} Builder html
		 */
		createBuilderModel : function( model ){

			model = model ? model : this.model ;
			var classes 			= this.$el.triggerHandler( 'before/elements/create/' + model.attributes.shortcode_name, [ model.attributes.shortcode_attributes ] ) ,
				elementKey 			= model.attributes.element_key,
				elementName			= model.attributes.shortcode_name,
				karmaBuilderOutput,
				tags;

			classes = ( classes )
				? classes + ' ' +  elementName.replace( "_", "-" ) + '-' + elementKey
				: elementName.replace( "_", "-" ) + '-' + elementKey;

			karmaBuilderOutput  = '<div class="karma-builder-element '
				+ classes
				+ '" data-element-key="' + elementKey +  '" data-name="' + elementName + '" > '
				+ '</div>',
				tags = '<style id="style-' + elementName.replace( "_", "-" ) + '-' + elementKey + '" ></style>'
					+ '<script  id="script-' + elementName.replace( "_", "-" ) + '-' + elementKey + '" ></script>';


			return tags + karmaBuilderOutput;

		},

		/**
		 * @summary Set filter before create builder html
		 *
		 * @param {object}  atts    The attribute of element
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		createElementAction: function( e, atts ){

			var classes = 'karma-col-sm-' + atts[ 'sm_size' ]
				+ ' karma-col-md-' + atts[ 'md_size' ]
				+ ' karma-col-lg-' + atts[ 'lg_size' ]
				+ ' karma-col-xl-' + atts[ 'xl_size' ];
			return classes;

		},

		/**
		 * @summary Fetch a JavaScript template for an id
		 *
		 * @param  	{string} 	templateName	A string that corresponds to a DOM element with an id prefixed with "tmpl-".
		 * @param 	{object}	templateParams	Data value for template
		 *
		 * @since 1.0.0
		 * @returns {string}    The HTML output of template
		 */
		getWpTemplate: function ( templateName, templateParams ) {

			if ( null === templateParams ) {
				templateParams = {};
			}
			var tempObject = wp.template( templateName );

			return tempObject( templateParams );


		},

		/**
		 * @summary Fetch a Underscore ( JS ) template for an specific name
		 *
		 * @param	{string}	templateName	A string that corresponds for template.
		 * @param	{object}	params			Data value for template
		 *
		 * @since 1.0.0
		 * @returns {string}    The HTML output of template
		 */
		getUnderscoreTemplate : function ( templateName, params ) {

			var compiled,
					that = this ;
			compiled =  _.template( templateName, that.templateSettings );
			return compiled( params );

		},

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
		KarmaView.render();
		$( '.karma-tooltip' ).tooltip({
			position: {
				my: "center+10 top",
				at: "center bottom+5",
				using: function( position, feedback ) {
					$( this ).css( position );
					$( "<div>" )
						.addClass( "arrow" )
						.addClass( feedback.vertical )
						.addClass( feedback.horizontal )
						.appendTo( this );
				}
			}
		});

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
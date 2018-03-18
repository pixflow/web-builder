( function ( $, karmaBuilder ) {
	'use strict';

	karmaBuilder.view = karmaBuilder.elementsBehavior.extend({

		/** Map of all elements gizmo params */
		gizmoParams: {},

		/** Map of all builder params */
		builderParams: {},

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

		events : {

			'click.bindDocumentEvent'                      				        : 'bindDocumentEvent',
			'karma/before/publish' 	                            			    : 'karmaPublish',
			'karma/before/elements/create/karma_column'      			        : 'createElementAction',
			'karma/before/save'	                   	     				        : 'karmaSaved',
			'karma/after/dropElement.reorderElements'   			            : "reorderElements" ,
			'karma/after/dropElement.emptyColumn'       			            : "removeEmptyColumn" ,
			'karma/after/finishElementPanel'            			            : 'makeElementsDraggable',
			'karma/after/sortSections'            			            		: 'defineFirstSection',
			'click .karma-blank-page-simple-layout .karma-new-section-layout'	: 'createNewSection',
			'click .karma-blank-page-section-link'								: 'openSectionPanel',
			'karma/callParent'                                                  : 'callParent',
			'paste [contenteditable]'				       	                    : 'pasteAsPlainText',

		},

		initialize : function () {

			karmaBuilder.view.__super__.initialize.apply( this, arguments );
			this.notifyDevelopers();
			document.body.setAttribute( "karma-device-mode", "desktop" );
			this.defineFirstSection();

		},

		/**
		 *  Notify developers or user that how to use Karma when they opening developer tools
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		notifyDevelopers : function(){

			console.log( '%c      ', 'font-size:80px; background: url(' + this.getBuilderParam('alertIconUrl') + ') no-repeat;' );
			console.log('%c Please dont modify Karmabuilder models and save it, it can destroy your content! ', 'background: #cc1526; color: #BFF8F8');

		},


		/**
		 *  return builder params value
		 *
		 * @param {string}  name    The name of param
		 *
		 * @since 0.1.0
		 * @return {mixed} value of specific param
		 */
		getBuilderParam : function ( name ) {

			if( 0 === Object.keys( this.builderParams ).length ){
				this.builderParams = JSON.parse( builderParams );
			}

			return this.builderParams[ name ];

		},


		/**
		 *  return gizmo params option
		 *
		 * @param {string}  name    The name of element
		 *
		 * @since 0.1.0
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
			this.makeSectionsSortable();
			that.collection.each( function ( element ) {
				var elementName = element.attributes.shortcode_name.replace("karma_", "");
				elementName = elementName.replace( /_/g, '' );
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

			this.bindDocumentEvent();

		},

		/**
		 *  paste as plain text for pasting in text shortcode
		 *
		 * @param   {Object}    event
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		pasteAsPlainText : function ( e ) {

			e.preventDefault();
			var text = ( e.originalEvent || e ).clipboardData.getData('text/plain');
			document.execCommand( 'insertText', false, text );

		},


		/**
		 *  open section panel in blank page
		 *
		 * @param {event}  event
		 *
		 * @since   0.1.0
		 * @returns {void}
		 *
		 */
		openSectionPanel : function ( e ) {
			
			e.stopPropagation();
			var elementPanel = window.top.document.querySelector( '.karma-element-panel-add-element-view' );
			window.top.karmaElementPanel.loadBlocks();
			if( null != elementPanel ){
				elementPanel.classList.add( 'element-panel-show' );
			};

			var elementPanelSection = window.top.document.querySelector( '.element-panel-section' );
			if( null != elementPanelSection ){
				elementPanelSection.classList.add( 'karma-active-tab' );
			};

			var elementPanelSectionActiveButton = window.top.document.querySelector( '.karma-addcontent[data-tab="karma-element-panel-list"]' );
			if( null != elementPanelSectionActiveButton ){
				elementPanelSectionActiveButton.classList.remove( 'karma-addcontent-active' );
			};

			var elementPanelSectionButton  = window.top.document.querySelector( '.karma-addcontent[data-tab="element-panel-section"]' );
			if( null != elementPanelSectionButton ){
				elementPanelSectionButton.classList.add( 'karma-addcontent-active' );
			};

		},

		/**
		 *  bind functions on document click
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		bindDocumentEvent: function () {

			this.removeActiveElement();
			this.removeActiveColumn();
			this.removeActiveSection();
			this.removeSettingPanel();
			this.closeElementPanel();
			window.top.karmaBuilderEnviroment.closeCodeEditorDropDown();

		},

		/**
		 *  Remove all active elements
		 *
		 * @since   0.1.0
		 * @returns {object}
		 */
		removeActiveElement : function () {

			var activeElement = document.querySelector('.karma-active-element')
			if( null != activeElement ){
				activeElement.classList.remove('karma-active-element');
			}

			$( document ).trigger( "click.hideColorPickerContainer" );

			return this;

		},

		/**
		 *  Remove active column
		 *
		 * @since   0.1.0
		 * @returns {object}
		 */
		removeActiveColumn : function () {

			var activeElement = document.querySelector('.karma-active-column')
			if( null != activeElement ){
				activeElement.classList.remove('karma-active-column');
			}

			return this;

		},

		/**
		 *  Remove element setting panel
		 *
		 * @since   0.1.0
		 * @returns {object}
		 */
		removeSettingPanel : function () {

			if( 'undefined' != typeof elementSettingPanel ){
				elementSettingPanel.removeSettingPanel();
			}

			return this;

		},

		/**
		 *  Close element panel
		 *
		 * @since   0.1.0
		 * @returns {object}
		 */
		closeElementPanel : function () {

			if( 'undefined' != typeof window.top.karmaElementPanel ){
				window.top.karmaElementPanel.closeElementPanel();
			}

			return this;

		},

		/**
		 *  Remove active section
		 *
		 * @since   0.1.0
		 * @returns {object}
		 */
		removeActiveSection : function () {

			var activeElement = document.querySelector('.karma-active-section')
			if( null != activeElement ){
				activeElement.classList.remove('karma-active-section');
			}

			return this;

		},

		/**
		 *  Create and send ajax
		 *
		 * @param	{object} 	action	Action using in the wordpress backend to know the request.
		 * @param	{object} 	data	The data which will be send to the backend.
		 *
		 * @since   0.1.0
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
		 *  Save element model and html
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		karmaPublish : function () {

			var that = this,
				data = {
				models	: that.prepareModels(),
				id		: $( 'meta[name="post-id"]' ).attr( 'content' ),
				action  : 'publish' ,
				customJS : window.top.$('.karma-custom-js').text().trim() ,
				customCSS : window.top.$('.karma-custom-css').text().trim()
			};

			this.prepareAjax( 'publish', data ).done( function ( response ) {

				var result = JSON.parse( response );
				window.top.karmaBuilderEnviroment.$el.trigger( 'karma/finish/animation' );
				return result.result;

			});

		},

		/**
		 *  Save element model and html
		 *
		 * @since   0.1.0
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
		 *  Remove changed value in element attributes
		 *
		 * @since 0.1.0
		 * @returns { string }    Validated models
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
		 *  Fetch a JavaScript template for an id
		 *
		 * @param  	{string} 	templateName	A string that corresponds to a DOM element with an id prefixed with "tmpl-".
		 * @param 	{object}	templateParams	Data value for template
		 * @param   {number}    deep            Get template in iframe or outside
		 *
		 * @example if deep = 1 ( get templates outside iframe )
		 *
		 * @since 0.1.0
		 * @returns {string}    The HTML output of template
		 */
		getWpTemplate: function ( templateName, templateParams, deep ) {

			if ( null === templateParams ) {
				templateParams = {};
			}

			if( 1 == deep ){
				var tempObject = window.top.wp.template( templateName );
			}else{
				var tempObject = wp.template( templateName );
			}
			return tempObject( templateParams );
		},

		/**
		 *  Fetch a Underscore ( JS ) template for an specific name
		 *
		 * @param	{string}	templateName	A string that corresponds for template.
		 * @param	{object}	params			Data value for template
		 *
		 * @since 0.1.0
		 * @returns {string}    The HTML output of template
		 */
		getUnderscoreTemplate : function ( templateName, params ) {

			var compiled,
					that = this ;
			compiled =  _.template( templateName, that.templateSettings );
			return compiled( params );

		},

		/**
		 *  set the first section of builder 
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		defineFirstSection : function (){

			$('.karma-first-section').removeClass('karma-first-section');
			$('#karma-builder-layout div[data-name="karma_section"]').first().addClass('karma-first-section');

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

	$( document ).ready( function () {

		karmaBuilder.karmaModels = new KarmaShortcodesCollection( JSON.parse( builderModels ) );
		window.KarmaView = new karmaBuilder.view( { collection : karmaBuilder.karmaModels, el : $( document ) } );
		KarmaView.render();
		window.top.karmaBuilderEnviroment.$el.trigger('karma/finish/iframeInit');
		setTimeout(function () {
			var template =  KarmaView.getWpTemplate( 'karma-feedback' ) ;
			$('body').append( template );

			setTimeout(function () {
				$(".feedback-popup").addClass('show-popup show-popup2');
				$('.feedback-icon').addClass('bounce-effect');
				setTimeout(function () {
					$('.feedback-icon').removeClass('bounce-effect');
				},500)
			},5000);

			setInterval(function () {

				if(!($('.feedback-popup').hasClass('show-popup'))){
					$('.feedback-icon').addClass('bounce-effect');
					setTimeout(function () {
						$('.feedback-icon').removeClass('bounce-effect');
					},500)
				}
			},5000);

			$('.feedback-icon').click(function () {

				$('.feedback-popup').toggleClass('show-popup');
				$('.feedback-popup').toggleClass('show-popup2');

			})

			$('.feedback-close svg').click(function () {
				$('.feedback-popup').toggleClass('show-popup');
				$('.feedback-popup').toggleClass('show-popup2');
			})

		},100);

		//deactive header link
		$('.site-header a').click(function (e) {

			e.preventDefault();

		})
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
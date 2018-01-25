var karmaBuilder = karmaBuilder || {};

( function ( $, karmaBuilder ) {
	'use strict';

	karmaBuilder.view = Backbone.View.extend({

		/** Map of all elements gizmo params */
		gizmoParams: {},

		/** Map of all builder params */
		builderParams: {},

		/** Scroll used for dragging interval */
		flyScroll : '' ,

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

		events : {

			'click.bindDocumentEvent'                      				        : 'bindDocumentEvent',
			'karma/before/publish' 	                            			    : 'karmaPublish',
			'karma/before/elements/create/karma_column'      			        : 'createElementAction',
			'karma/before/save'	                   	     				        : 'karmaSaved',
			'karma/after/dropElement.reorderElements'   			            : "reorderElements" ,
			'karma/after/dropElement.emptyColumn'       			            : "removeEmptyColumn" ,
			'karma/after/finishElementPanel'            			            : 'makeElementsDraggable',
			'click .karma-blank-page-simple-layout .karma-new-section-layout'	: 'createNewSection',
			'click .karma-blank-page-section-link'								: 'openSectionPanel',
			'karma/callParent'                                                  : 'callParent'

		},

		initialize : function () {

		},

		/**
		 * @summary return builder params value
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
		 * @summary return gizmo params option
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
		 * @summary Call specific function on parent element
		 *
		 * @param   {Dom Node}  element     Child element
		 * @param   {array}     functions   Functions that need to be run
		 * @param   {number}    deep        Which parent should be run
		 *
		 * @example if deep = 1 columns function class run and if deep = 2
		 * section class are execute.
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		callParent : function( event, element, functions, deep ) {

			var parentInstance = $( element ).closest('.karma-builder-element[data-name="'
				+ ( ( deep == 1 ) ? 'karma_column' : 'karma_section' )
				+ '"]').backboneView();

			_.each( functions, function ( callback ) {
				parentInstance[ callback ]( event );
			});

		},

		/**
		 * @summary create new section functionality in blank page
		 *
		 * @param {event}  event
		 *
		 * @since   0.1.0
		 * @returns {void}
		 *
		 */
		createNewSection : function ( e ) {

			var domNode = e.target.closest( ".karma-new-section-layout" ),
					newGrid = JSON.parse( domNode.getAttribute( 'data-value' ) ),
					placeholder = document.getElementById( 'karma-builder-layout' ) ,
					elementName = 'karma_section',
					validateModel = KarmaView.getValidateElementModel( placeholder, elementName ),
					model = karmaBuilder.karmaModels.add( validateModel );
			placeholder.innerHTML= KarmaView.createBuilderModel( model );
			var newSection = KarmaView.createNewElement( elementName.replace( 'karma_', '' ), model, true );
			newSection.changeRowLayout( newGrid );
			KarmaView.createStyleSheetForElements( newSection.model.attributes.shortcode_attributes, newSection );
			newSection.$el.click();

		},

		/**
		 * @summary open section panel in blank page
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
		 * @summary bind functions on document click
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

		},

		/**
		 * @summary Remove all active elements
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
		 * @summary Remove active column
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
		 * @summary Remove element setting panel
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
		 * @summary Close element panel
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
		 * @summary Remove active section
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
		 * @summary Create and send ajax
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
		 * @summary Save element model and html
		 *
		 * @since   0.1.0
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
				window.top.karmaBuilderEnviroment.$el.trigger( 'karma/finish/animation' );
				return result.result;

			});

		},

		/**
		 * @summary Save element model and html
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
		 * @summary Remove changed value in element attributes
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
		 * @summary Create unique id for each element of drop
		 *
		 * @since 0.1.0
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
		 * @summary Create random string
		 *
		 * @param	{number}	length	The length of random string that need to be produce
		 *
		 * @since 0.1.0
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
		 * @since 0.1.0
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

			return elementView;
		} ,

		/**
		 * @summary Create builder model html
		 * If model param did not set, it automatically set by current model( this.model )
		 *
		 * @param	{object}    model   model of specific element
		 *
		 * @since 0.1.0
		 *
		 * @returns {string} Builder html
		 */
		createBuilderModel : function( model ){

			model = model ? model : this.model ;
			var classes 			= this.$el.triggerHandler( 'karma/before/elements/create/' + model.attributes.shortcode_name, [ model.attributes.shortcode_attributes ] ) ,
				elementKey 			= model.attributes.element_key,
				elementName			= model.attributes.shortcode_name,
				karmaBuilderOutput,
				alignmentClass = '' ,
				tags,
				output = '',
				id = elementName.replace( '_' , '-' ) + '-' + elementKey;

			classes = ( classes )
				? classes + ' ' +  elementName.replace( "_", "-" ) + '-' + elementKey
				: elementName.replace( "_", "-" ) + '-' + elementKey;
			
			tags = '<style id="style-' + elementName.replace( "_", "-" ) + '-' + elementKey + '" >' + '</style>'
				+ '<script  id="script-' + elementName.replace( "_", "-" ) + '-' + elementKey + '" ></script>';

			if( 'karma_column' != elementName && 'karma_section' != elementName ){
				output = '<div class="karma-element-content"></div>';
				alignmentClass = ' karma-element-alignment-left ' ;
			}

			karmaBuilderOutput  = '<div id="'
				+ id
				+ '" class="karma-builder-element '
				+ alignmentClass
				+ classes
				+ '" data-element-key="' + elementKey +  '" data-name="' + elementName + '" > '
				+ output
				+ '</div>';


			return tags + karmaBuilderOutput;

		},

		/**
		 * @summary Set filter before create builder html
		 *
		 * @param {object}  atts    The attribute of element
		 *
		 * @since 0.1.0
		 *
		 * @returns {string}
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
		 * @summary Fetch a Underscore ( JS ) template for an specific name
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
		 * @summary Prepare elements before drop
		 *
		 * @param {object}  	whereToDrop DOM node
		 * @param { string }  elementName 	Element name
		 * @param { string }  type 			Element type
		 *
		 * @since   0.1.0
		 * @returns {boolean}
		 */
		prepareBeforeDrop : function ( whereToDrop, elementName, type ) {

			if( null == whereToDrop ){
				return false;
			}
			var validateModel = this.getValidateElementModel( whereToDrop, elementName, type ),
				model = karmaBuilder.karmaModels.add( validateModel );

			whereToDrop.outerHTML = KarmaView.createBuilderModel( model );
			KarmaView.createNewElement( elementName.replace( 'karma_', '' ), model, true );
			this.$el.trigger( 'karma/after/dropElement', [ validateModel['parent_key'] ] );

		},

		/**
		 * @summary Return validate model for initialize new element
		 *
		 * @param {object}  whereToDrop DOM node
		 * @param { string }  elementName 	Element name
		 * @param { string }  type 			Element type
		 *
		 * @since   0.1.0
		 * @returns {object}
		 */
		getValidateElementModel : function ( whereToDrop, elementName, type ) {

			var parentKey = whereToDrop.closest('.karma-builder-element'),
				modelAttributes = $( document ).triggerHandler( 'karma/before/createElement/' + elementName );

			 if (  "karma_unsplash_image" == type ){
			 	var imageUrl = window.top.document.querySelector( '.ui-draggable-dragging' ).getAttribute('data-full-url');
				modelAttributes.imgurl = imageUrl;
			 }


			return {
				order 					: 1 ,
				element_key				: KarmaView.createNewElementKey(),
				shortcode_name 			: elementName,
				shortcode_content		: '',
				shortcode_attributes	: modelAttributes,
				parent_key :  ( null == parentKey ) ? '' : parentKey.getAttribute('data-element-key')
			}

		},

		/**
		 * @summary Update model default value with real value in drop
		 *
		 * @param { DOM node }  element 		New element to make it backbone element
		 * @param {object}  	modelAttributes Valid element model
		 *
		 * @since   0.1.0
		 * @returns {object}  updated model attributes with real values;
		 */
		newModelAttributes : function ( element, modelAttributes) {

			if (  "karma_unsplash_image" == element ){
				var imageUrl = document.querySelector( '.ui-draggable-dragging' ).getAttribute('data-full-url');
				modelAttributes.imgurl = imageUrl;
				return modelAttributes;
			}

			return modelAttributes;

		},

		/**
		 * @summary Order elements after drop or sortable
		 *
		 * @param {string}  parentKey   Element key of parent element
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		reorderElements : function ( e, parentKey ) {

			var childElements = document.querySelectorAll('[data-element-key="' + parentKey + '"] .karma-builder-element'),
				order = 1 ;
			_.each( childElements, function( element ){
				var elementInstance = $( element ).backboneView();
				elementInstance.model.attributes.order = order;
				order ++ ;
			});

		},

		/**
		 * @summary Remove empty class for columns
		 *
		 * @param {string}  parentKey   Element key of parent element
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		removeEmptyColumn : function ( e, parentKey ) {

			var parentSection = document.querySelector('[data-element-key="' + parentKey + '"]').closest('.karma-section');
			$( parentSection ).find('.karma-empty-column').removeClass('karma-empty-column');
			
		},

		/**
		 * @summary Scroll the browser down or up on dragging element
		 *
		 * @param {object} element  Jquery helper
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		scroll : function ( element, event ) {

			var element = element.helper,
				toolbarHeight = 150;
			this.scrollToDown( element, toolbarHeight, event );
			this.scrollToTop( element, event );

		},

		/**
		 * @summary Keep element position while dragging and scrolling
		 *
		 * @param   {object}    element        Helper element
		 * @param   {string}    direction      Scroll direction
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		keepElementPosition : function( element, direction ){

			var elementNode = element[ 0 ] ,
				top = parseInt( elementNode.style.top );
			top = ( 'up' === direction  ) ? ( top - 5 ) : ( top + 5 );
			elementNode.style.top =  top + 'px';

		},

		/**
		 * @summary Scroll the browser down  dragging element
		 *
		 * @param   {object}    element        Helper element
		 * @param   {number}    toolbarHeight  Height of builder toolbar
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		scrollToDown: function ( element, toolbarHeight, event ) {

			var that = this;

			if ( event.clientY + toolbarHeight > window.innerHeight ) {
				clearInterval( that.flyScroll );
				/** Start scrolling down */
				that.flyScroll = setInterval( function(){
					/** If scroll at the bottom stop scrolling */
					if( window.innerHeight + window.scrollY >= document.body.offsetHeight ){
						clearInterval( that.flyScroll );
					}
					that.keepElementPosition( element, 'down' );
					$( window ).scrollTop( $( window ).scrollTop() + 5 );
				}, 1 );
			} else {
				clearInterval( that.flyScroll );
			}

		},

		/**
		 * @summary Scroll the browser up on dragging element
		 *
		 * @param   {object}    element        Helper element
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		scrollToTop : function ( element, event ) {

			var that = this;
			if ( event.clientY < 50 ) {
				clearInterval( that.flyScroll );
				/** Start scrolling up */
				that.flyScroll = setInterval( function(){
					/** If scroll at the top stop scrolling */
					if( $( window ).scrollTop() == 0  ){
						clearInterval( that.flyScroll );
					}
					that.keepElementPosition( element, 'up' );
					$( window ).scrollTop( $( window ).scrollTop() - 5 );
				}, 1 );
			}

		},

		/**
		 * @summary None ro block overlay for detecting true elements
		 *
		 * @param {object}  element   Droppable elements
		 *
		 * @since   0.1.0
		 * @returns {boolean | object}  Element info
		 */
		getParentElementInfo : function ( element ) {

			var parentElement = element.closest( ".karma-builder-element" );
			if( null == parentElement ){
				return false;
			}
			var elementName = parentElement.getAttribute( 'data-name' ) ,
				info = {
					node : parentElement ,
					name : elementName
				}
			return info;

		},

		/**
		 * @summary None ro block overlay for detecting true elements
		 *
		 * @param {object}  event   DOM events
		 * @param {object}  UI      Dragging element
		 * UI is jquery helper object
		 *
		 * @since   0.1.0
		 * @returns {boolean}
		 */
		overlayBehavior : function ( event, UI ) {

			if ( UI.helper.hasClass( 'karma-element-single-element' ) || UI.helper.hasClass( 'karma-unsplash-images-list' ) ) {
				var overlay = window.top.document.querySelector( '.karma-overlay-on-dragging' );
			} else {
				var overlay = document.querySelector( '.karma-overlay-on-dragging' );
			}
			overlay.style.display = 'none';
			UI.helper.get( 0 ).style.display = 'none';
			var targetElement = document.elementFromPoint( event.clientX, event.clientY );
			if ( undefined ==  targetElement ){
				return false;
			}else if( targetElement.classList.contains('karma-spacing') ){
				targetElement = document.elementFromPoint( event.clientX, event.clientY + 50 );
			}else if( targetElement.classList.contains('karma-section') ){
				targetElement = document.elementFromPoint( event.clientX - 50 , event.clientY);
			}
			overlay.style.display = 'block';
			UI.helper.get( 0 ).style.display = 'flex' ;
			return targetElement;
		},

		/**
		 * @summary Remove drop area placeholders while dragging
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		removePlaceHolders : function () {

			var activePlaceHolder = document.querySelector('.karma-show-placeholder');
			if( null != activePlaceHolder ){
				activePlaceHolder.classList.remove('karma-show-placeholder');
			}

		},

		/**
		 * @summary Detect and show drop area placeholders while dragging
		 *
		 * @param {object}  event   DOM events
		 * @param {object}  UI      Dragging element
		 * UI is jquery helper object
		 *
		 * @since   0.1.0
		 * @returns {boolean}
		 */
		detectDropAreas : function ( event, UI ) {

			var targetElement = this.overlayBehavior( event, UI );

			if( null == targetElement || false == targetElement ){
				return false;
			}
			if(  targetElement.classList.contains('karma-element-placeholder') || null != targetElement.closest('.karma-element-placeholder') ){
				return false;
			}
			targetElement = this.getParentElementInfo( targetElement );
			this.removePlaceHolders();
			if ( false == targetElement || 'karma_section' == targetElement.name ){
				return false;
			}else if ( true == this.checkSelfPlaceholder( targetElement, UI )  ){

				if ( targetElement.node.clientWidth == targetElement.node.querySelector('.karma-element-content').clientWidth ){
					return false;
				}
				this.setAlignment( targetElement, event );
			}
			else if ( 'karma_column' == targetElement.name ) {
				var placeHolder =  targetElement.node.querySelector('.karma-column-placeholder');
				if ( null != placeHolder ) {
					placeHolder.classList.add('karma-show-placeholder');
				} else {
					placeHolder = targetElement.node.querySelector('.karma-column-margin').lastChild;
					placeHolder.classList.add('karma-show-placeholder');
				}
			} else {
				this.showElementsPlaceHolder( event, targetElement );
			}
			return true;

		},

		/**
		 * @summary Set the alignment of element
		 *
		 * @param {object}  target	DOM node
		 * @param {object}  event	DOM events
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		setAlignment: function ( target, event ){

			var alignPlaceholder = target.node.querySelector( '.karma-alignment-placeholder' ),
				overlay = document.querySelector( '.karma-overlay-on-dragging' );
			if ( undefined != alignPlaceholder ){
				alignPlaceholder.classList.add( 'karma-show-placeholder' );
				overlay.style.display = 'none';
				var directPlaceholder = document.elementFromPoint( event.clientX, event.clientY );
				overlay.style.display = 'block';
				if ( undefined != target.node.querySelector( '.karma-active-align' ) ){
					target.node.querySelector( '.karma-active-align' ).classList.remove( 'karma-active-align' );
				}
				directPlaceholder.classList.add( 'karma-active-align' );

			}

		},

		/**
		 * @summary Check if current drop area is its element drop area or not
		 *
		 * @param {object}  targetElement   DOM node
		 * @param {object}  helperOBJ       Dragging element
		 * UI is jquery helper object
		 *
		 * @since   0.1.0
		 * @returns {boolean}
		 */
		checkSelfPlaceholder : function ( targetElement, helperOBJ ) {

			var draggableElement = helperOBJ.helper[0].getAttribute('data-element-key'),
				dropareaElement = targetElement.node.getAttribute('data-element-key');

			if(  draggableElement === dropareaElement ){
				return true;
			}

			return false;

		},

		/**
		 * @summary Detect and show drop area placeholders while dragging
		 * for elements ( Not for section and column )
		 *
		 * @param {object}  event           DOM events
		 * @param {object}  targetElement   Droppable element
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		showElementsPlaceHolder : function ( event, targetElement ) {

			var scrollTop = document.body.scrollTop,
				topPosition = targetElement.node.getBoundingClientRect().top + scrollTop ,
				elementHeight = targetElement.node.offsetHeight,
				elementHalf = topPosition + elementHeight / 2;

			if ( ( event.clientY + scrollTop ) < elementHalf ) {
				/** Users drag at the top of element */
				targetElement.node.previousElementSibling.classList.add( 'karma-show-placeholder' );
			} else {
				/** Users drag at the bottom of element */
				targetElement.node.nextElementSibling.classList.add( 'karma-show-placeholder' );
			}

		},

		/**
		 * @summary Create overlay element to prevent from other mouse events while dragging
		 * or blocking if exists
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		createOverlay : function () {

			var overlay = document.querySelector( '.karma-overlay-on-dragging' );
			if ( null == overlay ) {
				overlay = document.createElement( 'div' );
				overlay.classList.add( 'karma-overlay-on-dragging' );
				document.body.appendChild( overlay );
			} else {
				overlay.style.display = 'block';
			}

		},

		/**
		 * @summary Set display none for overlay
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		removeOverlay : function () {

			var overlay = document.querySelector( '.karma-overlay-on-dragging' );
			overlay.style.display = 'none';

		},

		/**
		 * @summary Make sections sortable
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		makeSectionsSortable: function () {

			var that = this;
			// Add beforeStart event to jQuery ui sortable
			var oldMouseStart = $.ui.sortable.prototype._mouseStart;
			$.ui.sortable.prototype._mouseStart = function ( event, overrideHandle, noActivation ) {
				this._trigger( "beforeStart", event, this._uiHash() );
				oldMouseStart.apply( this, [ event, overrideHandle, noActivation ] );
			};

			$( "#karma-builder-layout" ).sortable( {
				cursor: "move",
				delay: 100,
				cancel: ".karma-active-element",
				items: ".karma-builder-element[data-name='karma_section']",
				update: function () {

					that.reorderSections();

				},
				beforeStart: function () {

					document.body.style.overflowX = 'hidden';

				},
				sort: function ( event, UI ) {

					that.scroll( UI, event );

				},
				beforeStop: function () {

					document.body.style.overflowX = '';

				},
				stop: function () {

					clearInterval( that.flyScroll );
					
				}
			} );

		},

		/**
		 * @summary Render elements and their childes
		 *
		 * @param   {object}    elementsModel
		 * @param   {object}    elementView
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		renderElementsChildes : function ( elementsModel, elementView ) {

			var that = this,
				placeholder = that.getPlaceholder( elementView );

			this.renderElements( placeholder, elementsModel , elementView );

		},

		/**
		 * @summary Get the correct placeholder
		 *
		 * @param   {object}    elementView
		 *
		 * @since   0.1.0
		 * @returns {object}    placeholder
		 */
		getPlaceholder : function ( elementView ) {

			var placeholder = elementView.el.nextElementSibling;
			while( placeholder ){

				if ( placeholder.classList.contains('karma-element-placeholder') ) {
					placeholder = placeholder
					break;
				}
				placeholder = placeholder.nextElementSibling;

			}
			return placeholder;


		},

		/**
		 * @summary Render elements and their children
		 *
		 * @param   {object}    placeholder
		 * @param   {object}    elementsModel
		 * @param   {object}    elementView
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		renderElements : function( placeholder, elementModel, elementView ){

			elementModel.parent.element_key = this.createNewElementKey();
			elementModel.parent.order = 1;
			var newBackboneModel = karmaBuilder.karmaModels.add( elementModel.parent ),
				elementName = newBackboneModel.get('shortcode_name').replace( 'karma_', '' );

			if( 'section' == elementName ){
				placeholder.insertAdjacentHTML( 'afterend', this.createBuilderModel( newBackboneModel ) );
				var newView = this.createNewElement( elementName, newBackboneModel, true ),
					oldGrid = elementView.currentGrid();
				newView.changeRowLayout( oldGrid );
				this.reorderSections();
				this.createColumnsChild( elementModel.childes, newView );
				newView.checkIfColumnsEmpty( newView.el.querySelector( '.karma-section' ) );
			}else if( 'section' != elementName && 'column' != elementName ){
				placeholder.insertAdjacentHTML( 'afterend', this.createBuilderModel( newBackboneModel ) );
				var newView = this.createNewElement( elementName, newBackboneModel, true );
				this.$el.trigger( 'karma/after/dropElement', [ newBackboneModel.get('parent_key') ] );
			}

			this.createStyleSheetForElements( newView.model.attributes.shortcode_attributes, newView );

		},

		/**
		 * @summary create style tag for models of page
		 *
		 * @param   {Array}    models
		 * @param   {object}    elementView
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		//@TODO it should be refactor and delete this function
		createStyleSheetForElements : function( models, elementView ){

			_.each( models, function ( value, model ) {
				if( 'function' == typeof elementView[ model ] ){
					elementView[ model ]();
				}
			} );


		},

		/**
		 * @summary Render elements and their childes
		 *
		 * @param   {object}    children    Children models in column
		 *
		 * @since   0.1.0
		 * @returns {array}
		 */
		sortChildren : function ( children ) {

			var childes = [] ;
			_.each( children, function ( element ) {
				childes.push( element.parent );
			} );
			childes = _.sortBy( childes, 'order' )
			return childes;

		},

		/**
		 * @summary Prevent from scrolling parent element when scrolling on child element
		 *
		 * @param {Object}  selector    Javascript selector
		 *
		 * @returns {void}
		 */
		preventFromScrollingOnParent : function( selector ) {

			//FF doesn't recognize mousewheel as of FF3.x
			var mouseWheelEvent = (/Firefox/i.test( navigator.userAgent ) )? "DOMMouseScroll" : "mousewheel"
			selector.on( mouseWheelEvent, function ( e ) {

				var event = e.originalEvent,
					direction = event.wheelDelta || -event.detail;

				this.scrollTop += ( direction < 0 ? 1 : -1 ) * 30;
				e.preventDefault();

			});

		},

		/**
		 * @summary Render elements and their childes
		 *
		 * @param   {object}    columns List of all child section columns
		 * @param   {object}    newView
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		createColumnsChild : function ( columns, newView ) {

			var that = this,
				columnsInSection = newView.el.querySelectorAll('.karma-builder-element'),
				index = 0 ;

			_.each( columns, function ( column ) {

				var parentKey = columnsInSection[ index ].getAttribute('data-element-key'),
					columnChildren = that.sortChildren( column.childes );

					_.each( columnChildren, function ( element ) {

						var placeholder = columnsInSection[ index ].querySelector('.karma-column-placeholder');
						if( null == placeholder ){
							var elementPlaceholders = columnsInSection[ index ].querySelectorAll('.karma-insert-between-elements-placeholder');
							placeholder = elementPlaceholders[ elementPlaceholders.length - 1 ]
						}
						element.element_key = that.createNewElementKey();
						element.order = 1;
						element.parent_key = parentKey;

						var newBackboneModel = karmaBuilder.karmaModels.add( element ),
							elementName = newBackboneModel.get('shortcode_name').replace( 'karma_', '' );

						placeholder.outerHTML = that.createBuilderModel( newBackboneModel );
						var elementView = that.createNewElement( elementName, newBackboneModel, true );
						that.createStyleSheetForElements( elementView.model.attributes.shortcode_attributes, elementView );

				} );

				that.$el.trigger( 'karma/after/dropElement', parentKey );
				index ++;

			} );

		},

		/**
		 * @summary Order sections after drop or sortable
		 * This function call on makeSectionsSortable() function
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		reorderSections: function () {

			var childElements = document.querySelectorAll( '#karma-builder-layout .karma-builder-element[data-name="karma_section"]' ),
				order = 1;
			_.each( childElements, function ( element ) {
				var elementInstance = $( element ).backboneView();
				elementInstance.model.attributes.order = order;
				order++;
			} );

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

	$( document ).ready( function () {

		karmaBuilder.karmaModels = new KarmaShortcodesCollection( JSON.parse( builderModels ) );
		window.KarmaView = new karmaBuilder.view( { collection : karmaBuilder.karmaModels, el : $( document ) } );
		KarmaView.render();
		window.top.karmaBuilderEnviroment.$el.trigger('karma/finish/iframeInit');

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
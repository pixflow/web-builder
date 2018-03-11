var karmaBuilder = karmaBuilder || {};

( function ( $, karmaBuilder ) {
	'use strict';

	karmaBuilder.elementsBehavior = Backbone.View.extend({

		/** Scroll used for dragging interval */
		flyScroll : '' ,

		/** All element info */
		elementInfo: {},

		initialize : function (){
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
				placeholder = document.querySelector( '.karma-blank-page-container' ) ,
				elementName = 'karma_section';

			var newSection = KarmaView.createKarmaElement( [ placeholder, 'in' ], elementName );
			newSection.changeRowLayout( newGrid );
			KarmaView.createStyleSheetForElements( newSection.model.attributes.shortcode_attributes, newSection );
			newSection.$el.click();
			newSection.$el.trigger('karma/after/sortSections');

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
		 * @returns {object}
		 */
		createNewElement : function ( elementName, model, shouldRender ) {

			elementName = elementName.replace( /_/g, '' );
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
				id = elementName.replace( /_/g , '-' ) + '-' + elementKey;

			classes = ( classes )
				? classes + ' ' +  elementName.replace( /_/g, "-" ) + '-' + elementKey
				: elementName.replace( /_/g, "-" ) + '-' + elementKey;

			tags = '<style id="style-' + elementName.replace( /_/g, "-" ) + '-' + elementKey + '" >' + '</style>'
				+ '<script  id="script-' + elementName.replace( /_/g, "-" ) + '-' + elementKey + '" ></script>';

			if( 'karma_column' != elementName && 'karma_section' != elementName ){
				output = '<div class="karma-element-content"></div>';
				alignmentClass = ' karma-element-alignment-' + model.attributes.shortcode_attributes.elementalign + ' ' ;
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
		 * @summary Prepare elements before drop
		 *
		 * @param {object}  whereToDrop     DOM node
		 * @param {string}  elementName 	Element name
		 * @param {string}  type 			Element type
		 *
		 * @since   0.1.0
		 * @returns {boolean}
		 */
		prepareBeforeDrop : function ( whereToDrop, elementName, type ) {

			if( null == whereToDrop ){
				return false;
			}

			if (  "karma_unsplash_image" == type ){
				var imageUrl = window.top.document.querySelector( '.ui-draggable-dragging' ).getAttribute('data-full-url');
				var	modelAttributes = {
					shortcode_attributes: {
						imgurl: imageUrl
					}
				}
			}

			var viewObject = this.createKarmaElement( [ whereToDrop, 'in' ], elementName, modelAttributes );
			this.$el.trigger( 'karma/after/dropElement', [ viewObject.model.get('parent_key') ] );

		},


		/**
		 * @summary Create element
		 *
		 * @param   {object}  	placeholder
		 * @param   {string}  	elementName
		 * @param   {object}    elementModel
		 *
		 * @example You should pass the full the element name like karma_image or karma_image_text_box.
		 * for elementModel you should pass the object that contains new model values if you want to change.
		 *
		 * for placeholder you should use karma valid placeholder like elements and section placeholders or empty
		 * placeholder for column .
		 * 
		 * The second value of placeholders should be contains the position of new element and accept this values :
		 * before, in , after
		 *
		 * @since   0.1.0
		 * @returns {object|bool}    Instance of element view or false on failure
		 */
		createKarmaElement : function( placeholder, elementName, elementModel ){

			if( ! _.isArray( placeholder ) ){
				console.error('Placeholder should be array, ' + typeof placeholder + ' given.' );
				return false;
			}

			elementModel = ( 'undefined' == typeof elementModel ) ? {} : elementModel;
			var backboneModel = karmaBuilder.karmaModels.add( this.getValidateElementModel( placeholder[0], elementName, elementModel ) );

			switch ( placeholder[1] ){
				case 'before' :
					placeholder[0].insertAdjacentHTML( 'beforebegin', this.createBuilderModel( backboneModel ) );
					break;
				case 'in' :
					placeholder[0].outerHTML = this.createBuilderModel( backboneModel );
					break;
				case 'after' :
					placeholder[0].insertAdjacentHTML( 'afterend', this.createBuilderModel( backboneModel ) );
					break;
				default :
					console.error('Position of placeholder should be given' );
					return false;
					break;
			}

			elementName = elementName.replace( /_/g, '' );
			elementName = elementName.replace( 'karma', '' );
			var viewObject = this.createNewElement( elementName, backboneModel, true );
			viewObject.$el.trigger('karma/finish/dropElement');
			return viewObject;

		},

		/**
		 * @summary Return validate model for initialize new element
		 *
		 * @param {object}  whereToDrop     DOM node
		 * @param {string}  elementName 	Element name
		 * @param {object}  elementModel
		 *
		 * @since   0.1.0
		 * @returns {object}
		 */
		getValidateElementModel : function ( whereToDrop, elementName, elementModel ) {

			var parentKey = whereToDrop.closest('.karma-builder-element'),
				modelAttributes = $( document ).triggerHandler( 'karma/before/createElement/' + elementName ),
				shortcodeAttributes = jQuery.extend( modelAttributes, elementModel.shortcode_attributes );

			delete elementModel.shortcode_attributes;
			delete elementModel.element_key ;
			var defaultModel =  jQuery.extend( {
					order 					: 1 ,
					element_key				: KarmaView.createNewElementKey(),
					shortcode_name 			: elementName,
					shortcode_content		: '',
					parent_key              : ( null == parentKey ) ? '' : parentKey.getAttribute('data-element-key')
			} , elementModel );

			defaultModel['shortcode_attributes'] = shortcodeAttributes;
			return defaultModel;


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
					if( event.target.classList.contains('karma-element-content') || event.target.classList.contains('ui-sortable') ){
						that.keepElementPosition( element, 'down' );
					}
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
					if( event.target.classList.contains('karma-element-content') || event.target.classList.contains('ui-sortable') ){
						that.keepElementPosition( element, 'up' );
					}
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
				overlay.style.display = 'block';
				UI.helper.get( 0 ).style.display = 'flex' ;
				return false;
			} else if ( targetElement.classList.contains( 'karma-spacing' ) ) {
				if ( targetElement.classList.contains( 'karma-top-spacing' ) ) {
					targetElement = document.elementFromPoint( event.clientX, event.clientY + 40 );
				} else {
					targetElement = document.elementFromPoint( event.clientX, event.clientY - 40 );
				}
			} else if ( targetElement.classList.contains( 'karma-section' ) ) {
				targetElement = document.elementFromPoint( event.clientX, event.clientY - 40 );
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

			var activePlaceHolder 	= document.querySelector('.karma-show-placeholder'),
				fullPlaceholder 	= document.querySelector('.full-element-placeholder');

			if( null != activePlaceHolder ){
				activePlaceHolder.classList.remove('karma-show-placeholder');
			}
			if ( null != fullPlaceholder ){
				fullPlaceholder.classList.remove('full-element-placeholder');
			}
		}

		,

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
					 targetElement.node.classList.add( 'full-element-placeholder' );
					return false;
				}
				this.setAlignment( targetElement, event );
			}else if ( 'karma_column' == targetElement.name ) {
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

			if ( ( event.clientY - 40 + scrollTop ) < elementHalf ) {
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

			// Add beforeStart event to jQuery ui sortable
			var oldMouseStart = $.ui.sortable.prototype._mouseStart,
				that = this,
				helperKey,
				pickedElement, newSec, addNewSecClone;
			$.ui.sortable.prototype._mouseStart = function ( event, overrideHandle, noActivation ) {
				this._trigger( "beforeStart", event, this._uiHash() );
				oldMouseStart.apply( this, [ event, overrideHandle, noActivation ] );
			};

			$( "#karma-builder-layout" ).sortable( {
				cursor: "move",
				delay: 100,
				helper : "clone",
				cancel: ".karma-active-element",
				items: ".karma-builder-element[data-name='karma_section']",
				update: function () {
					that.reorderSections();
				},
				beforeStart: function ( e, UI ) {

					if ( undefined != UI.item[0] ){
						pickedElement = UI.item[0];
						pickedElement.classList.add( 'karma-show-border-section' );
						addNewSecClone = $( UI.item[ 0 ] ).next().clone( true );
						newSec = $( UI.item[ 0 ] ).next();
					}
					document.body.style.overflowX = 'hidden';

				},
				sort: function ( event, UI ) {

					helperKey = UI.helper.attr('data-element-key');
					that.scroll( UI, event );
					$('#karma-section-' + helperKey + ':not(.ui-sortable-helper)').css( { 'display' : '', 'visibility' : 'hidden' });

				},
				beforeStop: function () {

					document.body.style.overflowX = '';

				},
				stop: function ( e, UI ) {
					var section = UI.item[0];
					clearInterval( that.flyScroll );
					$('#karma-section-' + helperKey + ':not(.ui-sortable-helper)').css( { 'display' : '', 'visibility' : '' });
					if ( undefined != section ){
						section.classList.remove( 'karma-show-border-section' );
						$( section ).after( addNewSecClone );
						$( newSec ).remove();
						$( section ).next().after( $( '.karma-section-placeholder-' + $( section ).attr( 'data-element-key' ) ) );
					}
					KarmaView.$el.trigger('karma/after/sortSections');
				}
			} );

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
		 * @param   {boolean}   dropBlock
		 *
		 * @since   0.1.0
		 * @returns {object} view of rendered element
		 */
		renderElements : function( placeholder, elementModel, dropBlock  ){

			var elementName = elementModel.parent.shortcode_name;

			if ( 'karma_section' == elementName ){

				var newView = this.createKarmaElement( [ placeholder, 'after' ], elementName, elementModel.parent ),
					oldGrid = elementModel.grid;

				if( dropBlock ){
					newView.block = elementModel;
				}
				newView.changeRowLayout( oldGrid );
				this.reorderSections();
				this.createColumnsChild( elementModel.childes, newView );
				newView.checkIfColumnsEmpty( newView.el.querySelector( '.karma-section' ) );
				delete newView.block ;

			} else if( 'karma_section' != elementName && 'karma_column' != elementName ){

				var newView = this.createKarmaElement( [ placeholder, 'after' ], elementName, elementModel.parent  );
				this.$el.trigger( 'karma/after/dropElement', [ newView.model.get('parent_key') ] );

			}

			this.createStyleSheetForElements( newView.model.attributes.shortcode_attributes, newView );
			return newView;

		},

		/**
		 * @summary create style tag for models of page
		 * This function just call the specify model that need to call render_css model
		 *
		 * @param   {object}    models
		 * @param   {object}    elementView
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		createStyleSheetForElements : function( models, elementView ){

			_.each( models, function ( value, model ) {
				if( 'function' == typeof elementView[ model ] ){
					if( elementView[ model ].toString().match(/this.renderCss\(/i) ){
						elementView[ model ]();
					}
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

					var elementView = that.createKarmaElement( [ placeholder, 'in' ], element.shortcode_name, element  );
					that.createStyleSheetForElements( elementView.model.attributes.shortcode_attributes, elementView );

				} );

				that.$el.trigger( 'karma/after/dropElement', parentKey );
				index ++;

			} );

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
			var mouseWheelEvent = (/Firefox/i.test( navigator.userAgent ) ) ? "DOMMouseScroll" : "mousewheel"
			selector.on( mouseWheelEvent, function ( e ) {

				var event = e.originalEvent,
					direction = event.wheelDelta || -event.detail;

				this.scrollTop += ( direction < 0 ? 1 : -1 ) * 30;
				e.preventDefault();

			});

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

		},

		/**
		 * @summary Detect and show blocks drop area placeholders while dragging
		 *
		 * @param {object}  event   DOM events
		 * @param {object}  UI      Dragging element
		 * UI is jquery helper object
		 *
		 * @since   0.1.1
		 * @returns {boolean}
		 */
		detectBlocksDropAreas: function ( event, UI ) {

			window.top.document.querySelector( '.karma-overlay-on-dragging' ).style.display = 'none';
			UI.helper.get( 0 ).style.display = 'none';
			var targetElement = document.elementFromPoint( event.clientX, event.clientY );
			if( null !=  window.top.document.elementFromPoint( event.clientX, event.clientY )){
				var parentIframeTarget = window.top.document.elementFromPoint( event.clientX, event.clientY ).nodeName;	
			}
			window.top.document.querySelector( '.karma-overlay-on-dragging' ).style.display = 'block';
			UI.helper.get( 0 ).style.display = 'flex';
			if ( 'IFRAME' != parentIframeTarget ) {
				targetElement = null;
			}
			var blankPage = document.querySelector('.karma-blank-page-container');
			if ( null == targetElement ) {
				return false;
			} else if ( null != blankPage ) {
				targetElement = blankPage;
			} else {
				targetElement = ( targetElement.classList.contains( 'ui-sortable-handle' ) ) ? targetElement : targetElement.closest( '.ui-sortable-handle' );
			}
			if ( null == targetElement ) {
				return false;
			}

			var scrollTop = document.body.scrollTop,
				topPosition = targetElement.getBoundingClientRect().top + scrollTop,
				elementHeight = targetElement.offsetHeight,
				elementHalf = topPosition + elementHeight / 2;
			this.removePlaceHolders();
			if ( ( event.clientY + scrollTop ) < elementHalf && null == blankPage ) {
				/* Users drag at the top of element */
				$( targetElement ).prevAll( '.karma-insert-between-sections-placeholder' ).first().addClass( 'karma-show-placeholder' );
			} else {
				/* Users drag at the bottom of element */
				$( targetElement ).nextAll( '.karma-insert-between-sections-placeholder' ).first().addClass( 'karma-show-placeholder' );
			}

		},

	} );


} )( jQuery, karmaBuilder );

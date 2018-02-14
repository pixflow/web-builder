var karmaBuilder = karmaBuilder || {};

( function ( $, karmaBuilder ) {
	'use strict';

	karmaBuilder.elementsBehavior = Backbone.View.extend({


		/** Scroll used for dragging interval */
		flyScroll : '' ,

		/** All element info */
		elementInfo: {},

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
			elementName = elementName.replace( /_/g, '' );
			KarmaView.createNewElement( elementName.replace( 'karma', '' ), model, true );
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

			var that = this,
				helperKey;
			// Add beforeStart event to jQuery ui sortable
			var oldMouseStart = $.ui.sortable.prototype._mouseStart;
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
				beforeStart: function () {

					document.body.style.overflowX = 'hidden';

				},
				sort: function ( event, UI ) {

					that.scroll( UI, event );
					helperKey = UI.helper.attr('data-element-key');
					console.log(event)
					$('#karma-section-' + helperKey + ':not(.ui-sortable-helper)').css( { 'display' : '', 'visibility' : 'hidden' });
					//$( "#karma-builder-layout" ).sortable( "option", "cursorAt", { left: event.clientX } );

				},
				beforeStop: function () {

					document.body.style.overflowX = '';

				},
				stop: function () {

					clearInterval( that.flyScroll );
					$('#karma-section-' + helperKey + ':not(.ui-sortable-helper)').css( { 'display' : '', 'visibility' : '' });

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


} )( jQuery, karmaBuilder );

( function( $, karmaBuilder ){

	karmaBuilder.elementPanel = Backbone.View.extend({

		/** Scroll used for dragging interval */
		flyScroll : '' ,

		/**
		 * Define elements event
		 *
		 * @since   1.0.0
		 */
		events : {

			"click .element-panel-add-element-button"		                           	: "openAddElementView",
			"click" 										                           	: "stopClickInPanel",
			"karma/after/finish_element_panel"                                         	: "initDraggable" ,
			'mousedown .karma-element-panel-list .karma-element-single-element'        	: "addGrabHandler" ,
			'mouseup .karma-element-panel-list .karma-element-single-element'          	: "removeGrabHandler" ,
			"click li.karma-addcontent"													: "elementPanelTab",
			"input .search-text"                                                        : "searchInElements",
			"click .karma-builder-addcontent ul li"                                     : "categoryFilterActive",
			"click .karma-builder-element-panel-gather-menu"							: "openCategoryMenu"

		},

		/**
		 * Set defaults on initialize
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		initialize: function() {

			this.setElement( $( '<div class="karma-element-panel-container">' ) );
			this.render();
			this.createAddElementPanel();
			this.createTemplatesPanel();
			this.createUnsplashPanel();
			this.$el.trigger( 'karma/after/finish_element_panel', [ this ] );
			this.setEvents();

		},

		/**
		 * @summary set external Events
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		setEvents : function(){
			var that = this;
			$( document ).on( 'click', function(){
				that.closeElementPanel();
			});
		},

		/**
		 * stop close panel when click in panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		stopClickInPanel : function (e) {

			e.stopPropagation();

		},

		/**
		 * call element-panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		render : function () {

			document.body.appendChild( this.el );

		},

		/**
		 * functionality for element panel tab
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		elementPanelTab: function (e) {

			var target = $( e.target );
			if ( target.hasClass( 'karma-addcontent' ) ) {
				var orginalSelector = target;
			} else {
				var orginalSelector = target.closest( '.karma-addcontent' );
			}
			document.querySelector( '.karma-active-tab' ) && document.querySelector( '.karma-active-tab' ).classList.remove( 'karma-active-tab' );
			var tabData = orginalSelector.attr( 'data-tab' ),
				tabContent = document.querySelector(  '.' + tabData  );
			tabContent.classList.add( "karma-active-tab" );

		},

		/**
		 * create add element panel with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createAddElementPanel: function(){
			
			var templateParams = {} ;
			templateParams['elementInfo'] = KarmaView.getElementInfo();
			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-add-element', templateParams ) + '</div>';
			this.el.appendChild( $( template )[0] );

		},

		/**
		 * create Templates panel with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createTemplatesPanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-templates', {} ) + '</div>';
			this.el.appendChild( $( template )[0] );

		},

		/**
		 * create Unsplash with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createUnsplashPanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-unsplash', {} ) + '</div>';
			this.el.appendChild( $( template )[0] );


		},

		/**
		 * open add element panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		openAddElementView: function () {

			var addElement = document.querySelector( '.karma-element-panel-add-element-view' );
			var elementPanelShowClass = "element-panel-show";
			if( null != addElement ){
				if ( addElement.classList.contains( elementPanelShowClass ) ) {
					addElement.classList.remove( "element-panel-show" );
				}else
				addElement.classList.add( "element-panel-show" );
			}
			this.scrollElementPanel();

		},

		/**
		 * close add element panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		closeElementPanel: function() {

			var addElement = document.querySelector( '.karma-element-panel-add-element-view' );
			if( null != addElement ) {
				addElement.classList.remove("element-panel-show");
			}

		},

		/**
		 * @summary use niceScroll for element panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		scrollElementPanel: function () {

			$(".karma-elements").niceScroll({
				cursorcolor:"#A9A9A9",
				cursorwidth:"3px",
				cursoropacitymax:0.56,
				railalign: "left",
				cursorborder : "none",
			});

		},

		/**
		 * Add grab style for elements
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		addGrabHandler : function ( e ) {

			var target = $( e.target );
			if ( target.hasClass( 'karma-element-single-element' ) ) {
				target.addClass('karma-grab-element');
			} else {
				target.closest('.karma-element-single-element').addClass('karma-grab-element');
			}

		},

		/**
		 * Remove grab style for elements
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		removeGrabHandler : function ( e ) {

			var target = $( e.target );
			if ( target.hasClass( 'karma-element-single-element' ) ) {
				target.removeClass('karma-grab-element');
			} else {
				target.closest('.karma-element-single-element').removeClass('karma-grab-element');
			}

		},

		/**
		 * Scroll the browser down or up on dragging element
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		scroll : function ( element ) {

			var element = element.helper,
				toolbarHeight = 100;
			this.scrollToDown( element, toolbarHeight );
			this.scrollToTop();

		},

		/**
		 * Scroll the browser down  dragging element
		 *
		 * @param   {object}    element        Helper element
		 * @param   {number}    toolbarHeight  Height of builder toolbar
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		scrollToDown: function ( element, toolbarHeight ) {

			var that = this;
			if ( element.position().top +  toolbarHeight  > window.innerHeight  + $(window).scrollTop() ) {
				clearInterval( that.flyScroll );
				/** Start scrolling down */
				that.flyScroll = setInterval( function(){
					/** If scroll at the bottom stop scrolling */
					if( window.innerHeight + window.scrollY == document.body.offsetHeight ){
						clearInterval( that.flyScroll );
					}
					$( window ).scrollTop( $( window ).scrollTop() + 5 );
				}, 1 );
			} else {
				clearInterval( that.flyScroll );
			}

		},

		/**
		 * Scroll the browser up on dragging element
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		scrollToTop : function () {

			var that = this;
			if ( event.clientY < 50 ) {
				clearInterval( that.flyScroll );
				/** Start scrolling up */
				that.flyScroll = setInterval( function(){
					/** If scroll at the top stop scrolling */
					if( $( window ).scrollTop() == 0  ){
						clearInterval( that.flyScroll );
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
		 * @since   1.0.0
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
		 * @since   1.0.0
		 * @returns {boolean}
		 */
		overlayBehavior : function ( event, UI ) {

			var overlay = document.querySelector( '.karma-overlay-on-dragging' ) ,
				targetElement;
			overlay.style.display = 'none';
			UI.helper.get( 0 ).style.display = 'none';
			targetElement = document.elementFromPoint( event.clientX, event.clientY );
			overlay.style.display = 'block';
			UI.helper.get( 0 ).style.display = 'flex' ;
			return targetElement;

		},

		/**
		 * @summary Detect and show drop area placeholders while dragging
		 *
		 * @param {object}  event   DOM events
		 * @param {object}  UI      Dragging element
		 * UI is jquery helper object
		 *
		 * @since   1.0.0
		 * @returns {boolean}
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
		 * @since   1.0.0
		 * @returns {boolean}
		 */
		detectDropAreas : function ( event, UI ) {

			var targetElement = this.overlayBehavior( event, UI );
			targetElement = this.getParentElementInfo( targetElement );
			this.removePlaceHolders();
			if ( false == targetElement || 'karma_section' == targetElement.name ){
				return false;
			} else if ( 'karma_column' == targetElement.name ) {
				var placeHolder =  targetElement.node.querySelector('.karma-column-placeholder');
				if( null != placeHolder ){
					placeHolder.classList.add('karma-show-placeholder');
				}
			} else {
				this.showElementsPlaceHolder( event, targetElement );
			}
			return true;

		},

		/**
		 * @summary Detect and show drop area placeholders while dragging
		 * for elements ( Not for section and column )
		 *
		 * @param {object}  event           DOM events
		 * @param {object}  targetElement   Droppable element
		 *
		 * @since   1.0.0
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
		 * @since   1.0.0
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
		 * @since   1.0.0
		 * @returns {void}
		 */
		removeOverlay : function () {

			var overlay = document.querySelector( '.karma-overlay-on-dragging' );
			overlay.style.display = 'none';

		},

		/**
		 * Enable draggable functionality on any item element
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		initDraggable : function(){

			var that = this;
			$('.karma-element-single-element').draggable({
				appendTo: "body",
				containment: 'document',
				cursorAt: { top : 20, left : 50 },
				helper: 'clone' ,
				start : function(){

					var DOMOBJ = $( this ).get( 0 );
					DOMOBJ.classList.add( 'karma-start-dragging', 'karma-grab-element' );
					that.createOverlay();

				} ,

				drag : function( event, UI ){

					that.scroll( UI );
					that.detectDropAreas( event, UI );
					
				},

				stop: function(){

					var DOMOBJ = $( this ).get( 0 );
					DOMOBJ.classList.remove( 'karma-start-dragging', 'karma-grab-element' );
					clearInterval( that.flyScroll );
					that.removeOverlay();
					that.removePlaceHolders();

				}
			});

		},

		/**
		 * Search in elements
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		searchInElements : function ( e ){
			
			var searchValue = $( e.target ).val();
			$('.karma-element-single-element').hide();
			if( '' != searchValue.trim() ){
				$('[data-category*="' + searchValue.trim() + '"]').css( 'display', 'flex' );
			}else{
				$('.karma-element-single-element').css( 'display', 'flex' );
			}

		},

		/**
		 * @summary when active category filter get class
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		categoryFilterActive: function ( e ) {

			var target = $( e.target ),
				karmaAddcontentClass =	target.closest( '.karma-addcontent' );
			if ( karmaAddcontentClass ) {
			$( '.karma-addcontent' ).removeClass( 'karma-addcontent-active' );
			karmaAddcontentClass.addClass( "karma-addcontent-active" );
			}

		},

		openCategoryMenu : function (e) {

			var target = $( e.target ),
			categoryMenu = target.closest( '.karma-builder-element-panel-gather-menu' );


			if ( target.closest( 'svg' ).length ){

				categoryMenu.toggleClass( 'karma-open-element-category-dropdown' )

			}


		}

	});

} )( jQuery, karmaBuilder );

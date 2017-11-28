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
			this.closeElementPanel();
			this.$el.trigger( 'karma/after/finish_element_panel', [ this ] );
			this.scrollElementPanel();

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
			if( null != addElement ){
				addElement.classList.add( "element-panel-show" );
			}

		},

		/**
		 * close add element panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		closeElementPanel: function() {

			$( document ).on( 'click', function(){
				var addElement = document.querySelector( '.karma-element-panel-add-element-view' );
				if( null != addElement ) {
					addElement.classList.remove("element-panel-show");
				}
			});
		},

		/**
		 * use niceScroll for element panel
		 *
		 * @since   1.0.0
		 */
		scrollElementPanel: function () {

			$(".karma-element-panel-list").niceScroll({
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
			if ( event.clientY < 100 ) {
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
				zIndex: 9999999,
				cursorAt: { top : 20, left : 50 },
				helper: 'clone' ,
				start : function(){

					var DOMOBJ = $( this ).get( 0 );
					DOMOBJ.classList.add( 'karma-start-dragging', 'karma-grab-element' );

				} ,

				drag : function( event, UI ){

					that.scroll( UI ) ;

				},

				stop: function(){

					var DOMOBJ = $( this ).get( 0 );
					DOMOBJ.classList.remove( 'karma-start-dragging', 'karma-grab-element' );
					clearInterval( that.flyScroll );

				}
			});

		}

	});

} )( jQuery, karmaBuilder );

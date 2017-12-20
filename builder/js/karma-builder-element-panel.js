( function( $, karmaBuilder ){

	karmaBuilder.elementPanel = Backbone.View.extend({

		/** Scroll used for dragging interval */
		flyScroll : '' ,

		/**
		 *@summary Define elements event
		 *
		 * @since   1.0.0
		 */
		events : {

			"click.stopClickInPanel" 										            : "stopClickInPanel",
			"karma/after/finish_element_panel"                                         	: "initDraggable" ,
			'mousedown .karma-element-panel-list .karma-element-single-element'        	: "addGrabHandler" ,
			'mouseup .karma-element-panel-list .karma-element-single-element'          	: "removeGrabHandler" ,
			"click li.karma-addcontent"													: "elementPanelTab",
			"input .karma-builder-search-text"                                          : "searchInElements",
			"click .karma-builder-addcontent ul li"                                     : "categoryFilterActive",
			"click .karma-element-panel-price-filter ul li "							: "elementPanelPriceFilter",
			"click .karma-builder-element-panel-gather-menu"							: "openCategoryMenu" ,
			'karma/after/dropElement'                                                   : "reorderElements" ,
			"click .karma-search-close-icon"											: "clearElementPanelSearchBar" ,
			"click .karma-builder-search-text"											: "showElementPanelSearchBar" ,
			"mousewheel .karma-elements"                                                : "preventFromScrolling" ,
			"click .element-panel-button"												: "openElementPanel"


		},


		/**
		 * @summary Set defaults on initialize
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
			this.createUpgradePanel();
			this.$el.trigger( 'karma/after/finish_element_panel', [ this ] );
			this.setEvents();
			this.removeGatherMenuPanel();
			this.elementGatherMenuFiltering();
			window.karmaIsotope = $('.karma-isotope').clone();

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
		 * @summary close panel when click in panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		stopClickInPanel : function (e) {

			e.stopPropagation();
			if( $( ".karma-open-element-category-dropdown" ).hasClass('karma-open-element-category-dropdown') ){
				$( ".karma-open-element-category-dropdown" ).removeClass( "karma-open-element-category-dropdown" );
			}


		},

		/**
		 * @summary element-panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		render : function () {

			document.body.appendChild( this.el );

		},

		/**
		 * @summary functionality for element panel tab
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		elementPanelTab: function (e) {

			var target =  e.target ;
			if ( target.classList.contains( 'karma-addcontent' ) ) {
				var orginalSelector = target;
			} else {
				var orginalSelector = target.closest( '.karma-addcontent' );
			}

			this.setActiveTab( orginalSelector );

		},

		/**
		 * @summary get the clicked element and show its related tab
		 *
		 * @param object orginalSelector active category filter
		 * @since   1.0.0
		 * @returns {void}
		 */
		setActiveTab : function( orginalSelector ){

			document.querySelector( '.karma-active-tab' ) && document.querySelector( '.karma-active-tab' ).classList.remove( 'karma-active-tab' );
			var tabData = orginalSelector.getAttribute( 'data-tab' ),
				tabContent = document.querySelector(  '.' + tabData  );
			if( null != tabContent){
				tabContent.classList.add( "karma-active-tab" );
			}

			document.querySelector( '.karma-element-panel-add-element-view' ).setAttribute( 'data-active-tab', tabData );

		},

		/**
		 *@summary create add element panel with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createAddElementPanel: function(){

			var templateParams = {} ;
			templateParams['elementInfo'] = KarmaView.getElementInfo();
			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-add-element', templateParams ) + '</div>';
			this.el.appendChild( $( template )[ 0 ] );

		},

		/**
		 *@summary create Templates panel with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createTemplatesPanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-templates', {} ) + '</div>';
			this.el.appendChild( $( template )[ 0 ] );

		},

		/**
		 *@summary create Unsplash with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createUnsplashPanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-unsplash', {} ) + '</div>';
			this.el.appendChild( $( template )[ 0 ] );

		},

		/**
		 *@summary create Upgrade with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createUpgradePanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-upgrade', {} ) + '</div>';
			this.el.appendChild( $( template )[ 0 ] );

		},

		/**
		 *@summary close add element panel
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
		 * @summary Prevent from scrolling window when scrolling on nice scroll elements
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		preventFromScrolling : function ( e ) {

			e.preventDefault();

		},

		/**
		 *@summary Add grab style for elements
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
		 * @summary Remove grab style for elements
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
		 * @summary Scroll the browser down or up on dragging element
		 *
		 * @param {object} element  Jquery helper
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		scroll : function ( element, event ) {

			var element = element.helper,
				toolbarHeight = 100;
			this.scrollToDown( element, toolbarHeight );
			this.scrollToTop( element, event );

		},

		/**
		 * @summary Keep element position while dragging and scrolling
		 *
		 * @param   {object}    element        Helper element
		 * @param   {string}    direction      Scroll direction
		 *
		 * @since   1.0.0
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
		 * @since   1.0.0
		 * @returns {void}
		 */
		scrollToDown: function ( element, toolbarHeight ) {

			var that = this;
			if ( parseInt( element[ 0 ].style.top ) +  toolbarHeight  > window.innerHeight  + $( window ).scrollTop() ) {
				clearInterval( that.flyScroll );
				/** Start scrolling down */
				that.flyScroll = setInterval( function(){
					/** If scroll at the bottom stop scrolling */
					if( window.innerHeight + window.scrollY == document.body.offsetHeight ){
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
		 * @since   1.0.0
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
			if( null == targetElement ){
				return false;
			}
			if(  targetElement.classList.contains('.karma-element-placeholder') || null != targetElement.closest('.karma-element-placeholder') ){
				return false;
			}
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
		 * @summary check if permium load permium template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		checkingPermium : function () {

			if( $( '.karma-active-tab .karma-isotope' ).length
				&&  !$( '.karma-active-tab .karma-isotope .premium' ).length
			){
				var permiumTemplate = document.querySelector( '.element-panel-permium' ) ;
				document.querySelector( '.karma-active-tab' ) && document.querySelector( '.karma-active-tab' ).classList.remove( 'karma-active-tab' );
				permiumTemplate.classList.add("karma-active-tab" );
			}

		},

		/**
		 * @summary Enable draggable functionality on any item element
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		initDraggable : function(){

			var that = this;
			$('.karma-element-single-element:not(.karma-deactive-element)').draggable({
				appendTo: "body",
				containment: 'document',
				cursorAt: { top : 20, left : 50 },
				helper: 'clone' ,
				start : function(){

					var DOMOBJ = $( this ).get( 0 );
					$(".karma-elements").getNiceScroll().remove();
					DOMOBJ.classList.add( 'karma-start-dragging', 'karma-grab-element' );
					that.createOverlay();

				} ,

				drag : function( event, UI ){

					that.scroll( UI, event );
					that.detectDropAreas( event, UI );

				},

				stop: function( event, UI ){

					var DOMOBJ = $( this ).get( 0 ),
						dropArea = document.querySelector('.karma-show-placeholder');
					DOMOBJ.classList.remove( 'karma-start-dragging', 'karma-grab-element' );
					clearInterval( that.flyScroll );
					that.removeOverlay();
					that.prepareBeforeDrop( dropArea, UI.helper.attr('data-element-name') );
					that.removePlaceHolders();
					that.scrollElementPanel();

				}

			});

		},

		/**
		 * @summary Prepare elements before drop
		 *
		 * @param {object}  whereToDrop DOM node
		 * @param {string}  elementName Element name for drop
		 *
		 * @since   1.0.0
		 * @returns {boolean}
		 */
		prepareBeforeDrop : function ( whereToDrop, elementName ) {

			if( null == whereToDrop ){
				return false;
			}
			var validateModel = this.getValidateElementModel( whereToDrop, elementName ),
				CID = karmaBuilder.karmaModels.add( validateModel ).cid,
				model = karmaBuilder.karmaModels.get({ 'cid' : CID });
			whereToDrop.outerHTML = KarmaView.createBuilderModel( model );
			KarmaView.createNewElement( elementName.replace( 'karma_', '' ), model, true );
			this.$el.trigger( 'karma/after/dropElement', [ validateModel['parent_key'] ] );

		},

		/**
		 * @summary Return validate model for initialize new element
		 *
		 * @param {object}  whereToDrop DOM node
		 * @param {string}  elementName Element name for drop
		 *
		 * @since   1.0.0
		 * @returns {object}
		 */
		getValidateElementModel : function ( whereToDrop, elementName ) {

			return {
				shortcode_name : elementName,
				shortcode_content : '',
				element_key : KarmaView.createNewElementKey(),
				shortcode_attributes : $( document ).triggerHandler( 'karma/before/createElement/' + elementName ),
				order : 1 ,
				parent_key :  whereToDrop.closest('.karma-builder-element').getAttribute('data-element-key')
			}

		},

		/**
		 * @summary Order elements after drop or sortable
		 * This function call by listeners (karma/before/createElement/:elementName )
		 *
		 * @param {string}  parent_key   Element key of parent element
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		reorderElements : function ( e, parent_key ) {

			var childElements = document.querySelectorAll('[data-element-key="' + parent_key + '"] .karma-builder-element'),
				order = 1 ;
			_.each( childElements, function( element ){
				var elementInstance = $( element ).backboneView();
				elementInstance.model.attributes.order = order;
				order ++ ;
			});

		},

		/**
		 * @summary Search in elements
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		searchInElements : function ( e ){

			this.showElementPanelSearchCloseIcon();
			var searchValue 	= $( e.target ).val(),
				notFoundElement	= document.querySelector( '.karma-active-tab .karma-isotope .karma-not-found' );
			$('.karma-element-single-element').hide();
			if( '' != searchValue.trim()  ){
				if (  $('[data-category*="' + searchValue.trim() + '"]').length ) {

					if ( 'undefined' != typeof( notFoundElement ) && null != notFoundElement ){
						notFoundElement.classList.add('karma-hide');
					}
					$('[data-category*="' + searchValue.trim() + '"]').css( 'display', 'flex' );

				}else {
					if ( 'undefined' != typeof( notFoundElement ) && null != notFoundElement ){
						notFoundElement.classList.remove('karma-hide');
					}
				}
			}else{
				if ( 'undefined' != typeof( notFoundElement ) && null != notFoundElement ){
					notFoundElement.classList.add('karma-hide');
				}
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
				karmaAddcontentClass.addClass( 'karma-addcontent-active' );
			}
			this.setPriceFilterOnAll();
			this.elementPanelCloseSearchBar( e );

		},

		/**
		 * @summary after click in each category set the price filter on all items
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		setPriceFilterOnAll : function () {

			var element = this.el.querySelector( '.karma-element-panel-price-filter ul .active' ),
				allFilter = this.el.querySelector( '.karma-element-panel-price-filter ul li[ data-filter = "*" ]' );

			if (typeof(element) != 'undefined' && element != null){
				element.classList.remove( 'active' );
			}
			if (typeof(allFilter) != 'undefined' && allFilter != null){
				allFilter.classList.add( 'active' );
			}
			this.callIQuicksandOnElements( this.callfiltering( '*' ) );

		},

		/**
		 * @summary initialize quicksand on add element panel
		 *
		 * @param 	array $elementToFilter set of elements to filter
		 * @since   1.0.0
		 * @returns {void}
		 */
		callIQuicksandOnElements: function ( $elementToFilter ) {

			$('.karma-elements ').quicksand( $elementToFilter ,{
				duration: 500,
				useScaling : true ,
				easing : 'easeOutQuad',
			}  );

		},

		/**
		 * @summary filter elements
		 *
		 * @param   {string} clickedItemData  data which eant to filter
		 * @since   1.0.0
		 * @returns { array } array of selected objects
		 */
		callfiltering : function ( clickedItemData ) {

			if ( clickedItemData == '*' ) {
				var $filteredData = karmaIsotope.find('.karma-element-single-element');
			} else {
				var $filteredData = karmaIsotope.find(
					'.karma-element-single-element[data-id*=' + clickedItemData +']'
				);
			}
			return $filteredData

		},

		/**
		 * @summary open category dropdown on click hamburger menu
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		openCategoryMenu: function ( e ) {

			e.stopPropagation();
			var target = $( e.target ),
				categoryMenu = target.closest( '.karma-builder-element-panel-gather-menu' );
			if ( target.closest('svg').length ) {
				categoryMenu.toggleClass( 'karma-open-element-category-dropdown' )
			}
			this.elementPanelCloseSearchBar( e );

		},

		/**
		 * @summary sorting elements with category filter
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		elementGatherMenuFiltering : function () {

			var that = this;

			$( '.karma-builder-element-panel-gather-menu ul li' ).click( function () {

				$('.karma-builder-element-panel-gather-menu .active').removeClass('active');
				$( this ).addClass('active');

				that.callIQuicksandOnElements(  that.callfiltering( $( this ).attr( 'data-id' ) )  );
				$( '.karma-builder-element-panel-gather-menu' ).trigger( '.removeGatherMenuPane' );

			});

		},

		/**
		 * @summary filtering price filter
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		elementPanelPriceFilter:function ( e ) {

			var target = ( "li" == e.target.tagName ) ? e.target : e.target.closest( 'li' ) ;

			if ( target.classList.contains( 'active' ) ){
				return;
			}
			this.el.querySelector( '.active' ).classList.remove( 'active' );
			target.classList.add( 'active' );
			if( '.premium' == target.getAttribute( 'data-filter' ) ){
				this.checkingPermium();
			}else {
				this.setActiveTab( this.el.querySelector( '.karma-addcontent-active' ) );
			}
			this.callIQuicksandOnElements( this.callfiltering( target.getAttribute( 'data-filter' ) ) );

		},


		/**
		 * @summary Close gather menu panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		removeGatherMenuPanel: function () {

			$( '.karma-builder-element-panel-gather-menu' ).off( "click.removeGatherMenuPanel" ).on( "click.removeGatherMenuPanel", function(){
				$( ".karma-open-element-category-dropdown" ).removeClass( "karma-open-element-category-dropdown" );
			});

		},

		/**
		 * @summary clear input of search when click close icon
		 * @param {object}  event
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		clearElementPanelSearchBar: function ( e ) {

			e.stopPropagation();
			var searchInputVal = document.querySelector( ".karma-builder-search-text" );

			searchInputVal.classList.add( "open-search-panel" );
			searchInputVal.value = "";
			$( ".karma-builder-search-text" ).trigger( 'input' );

		},

		/**
		 * @summary add class to show search bar in element panel
		 * @param {object}  event
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		showElementPanelSearchBar: function ( e ) {

			e.stopPropagation()
			var searchInputVal = document.querySelector( ".karma-builder-search-text" );

			searchInputVal.classList.add( "open-search-panel" );
			$( '.karma-builder-element-panel-gather-menu' ).trigger( "click.removeGatherMenuPanel" );

		},

		/**
		 * @summary Close search bar when click document
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		elementPanelCloseSearchBar: function ( e ) {

			var searchInputVal = document.querySelector( ".karma-builder-search-text" ),
				searchInputCloseButton = document.querySelector( ".karma-search-close-icon" );

			this.clearElementPanelSearchBar( e );
			if( null != searchInputVal ) {
				if( null != searchInputCloseButton ) {
					searchInputCloseButton.classList.remove( "show-search-close-icon" );
				}
			searchInputVal.classList.remove( "open-search-panel" );
			}

		},

		/**
		 * @summary show and hide close icon in search box in element panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		showElementPanelSearchCloseIcon: function () {

			var searchInputVal = document.querySelector( ".karma-builder-search-text" ).value,
				searchInputCloseButton = document.querySelector( ".karma-search-close-icon" );
			if(null != searchInputCloseButton){
				if( "" != searchInputVal ){
					searchInputCloseButton.classList.add( "show-search-close-icon" ) ;
				}else{
					searchInputCloseButton.classList.remove( "show-search-close-icon" ) ;
				}
			}
		},

		/**
		 *@summary open element panel for each button
		 * @param event
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		openElementPanel: function ( e ) {

			var elementPanelIcon = ( e.target.classList.contains( 'element-panel-button' ) ) ? e.target : e.target.closest( '.element-panel-button' ),
				elementPanelAttr =elementPanelIcon.getAttribute( "data-open-panel" ),
				elementPanelShowClass = "element-panel-show";

			if( "" != elementPanelAttr && null != elementPanelAttr ){
					var addElement = document.querySelector( '.' + elementPanelAttr ),
						openElementPanel = document.querySelector( ".element-panel-show" );

				if( null != openElementPanel ){
					openElementPanel.classList.remove( "element-panel-show" );
				}

				if( null != addElement ){
					if ( addElement.classList.contains( elementPanelShowClass ) ) {
						addElement.classList.remove( "element-panel-show" );
					}else {
						addElement.classList.add( "element-panel-show" );
					}
				}

			this.scrollElementPanel();
			}

		},

	});

} )( jQuery, karmaBuilder );

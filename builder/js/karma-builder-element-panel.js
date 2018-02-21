( function( $, karmaBuilderActions ){

	karmaBuilderActions.elementPanel = Backbone.View.extend({


		blocks: '',

		events : {

			"click.stopClickInPanel"                                                    : "stopClickInPanel",
			'mousedown .karma-element-panel-list .karma-element-single-element'         : "addGrabHandler" ,
			'mouseup .karma-element-panel-list .karma-element-single-element'           : "removeGrabHandler" ,
			"click li.karma-addcontent"                                                 : "elementPanelTab",
			"input .karma-builder-search-text"                                          : "searchInElements",
			"click .karma-builder-addcontent ul li"                                     : "categoryFilterActive",
			"click .karma-builder-addcontent ul li[data-tab='element-panel-section']"   : "loadBlocks",
			"click .karma-element-panel-price-filter ul li "                            : "elementPanelPriceFilter",
			"click .karma-builder-element-panel-gather-menu"                            : "openCategoryMenu" ,
			"click .karma-search-close-icon"                                            : "clearElementPanelSearchBar" ,
			"click .karma-search-close-icon"                                            : "elementPanelCloseSearchBar",
			"click .karma-builder-search-text"                                          : "showElementPanelSearchBar" ,
			"click .element-panel-button"                                               : "openElementPanel",
			"click .element-panel-button:not(.karma-responsive-panel)"					: "openElementPanel",
			"click .karma-responsive-panel"												: "openResponsiveMode",
			"click .karma-responsive-button"											: "changeDevice"

		},

		initialize: function() {

			this.setElement( $( '<div id="karma-add-element" class="karma-element-panel-container">' ) );
			this.render();
			this.createAddElementPanel();
			this.createTemplatesPanel();
			this.createUnsplashPanel();
			this.createUpgradePanel();
			this.makeElementsDraggable();
			this.removeGatherMenuPanel();
			this.elementGatherMenuFiltering();
			this.karmaIsotope = $( '.karma-isotope' ).clone( true, true );
			karmaBuilderEnviroment.getIframe().KarmaView.preventFromScrollingOnParent( $('preventFromScrollingOnParent') );

		},


		/**
		 * @summary Call draggable on elements in add new elements item;
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		makeElementsDraggable: function () {

			karmaBuilderEnviroment.initDraggable( '.karma-element-single-element:not(.karma-deactive-element)' );

		},

		/**
		 * @summary close panel when click in panel
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		stopClickInPanel : function ( e ) {

			e.stopPropagation();
			if( $( ".karma-open-element-category-dropdown" ).hasClass('karma-open-element-category-dropdown') ){
				$( ".karma-open-element-category-dropdown" ).removeClass( "karma-open-element-category-dropdown" );
			}

		},

		render : function () {

			document.body.appendChild( this.el );

		},

		/**
		 * @summary functionality for element panel tab
		 *
		 * @since   0.1.0
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
		 * @param  { object } originalSelector active category filter
		 * @since   0.1.0
		 * @returns {void}
		 */
		setActiveTab : function( originalSelector ){

			document.querySelector( '.karma-active-tab' ) && document.querySelector( '.karma-active-tab' ).classList.remove( 'karma-active-tab' );
			var tabData = originalSelector.getAttribute( 'data-tab' ),
				tabContent = document.querySelector(  '.' + tabData  );
			if( null != tabContent){
				tabContent.classList.add( "karma-active-tab" );
				var inactiveContainer = tabContent.querySelector('.karma-add-element-inactive-container');
				if ( undefined != inactiveContainer ){
					inactiveContainer.style.overflow = '';
					inactiveContainer.style.overflow = 'hidden';
				}

			}

			document.querySelector( '.karma-element-panel-add-element-view' ).setAttribute( 'data-active-tab', tabData );

		},

		/**
		 *@summary create add element panel with import template
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		createAddElementPanel: function(){

			var templateParams = {} ;
			templateParams['elementInfo'] = karmaBuilderEnviroment.getElementInfo();
			templateParams['blocks'] = this.blocks;
			var template = '<div>' + karmaBuilderEnviroment.getIframe().KarmaView.getWpTemplate( 'karma-element-panel-add-element', templateParams, 1 ) + '</div>';
			this.el.appendChild( $( template )[ 0 ] );

		},

		/**
		 *@summary create Templates panel with import template
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		createTemplatesPanel: function(){

			var template = '<div>' + karmaBuilderEnviroment.getIframe().KarmaView.getWpTemplate( 'karma-element-panel-templates', {}, 1 ) + '</div>';
			this.el.appendChild( $( template )[ 0 ] );

		},

		/**
		 *@summary create Unsplash with import template
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		createUnsplashPanel: function(){

			var template = '<div>' + karmaBuilderEnviroment.getIframe().KarmaView.getWpTemplate( 'karma-element-panel-unsplash', {}, 1 ) + '</div>';
			this.el.appendChild( $( template )[ 0 ] );

		},

		/**
		 *@summary create Upgrade with import template
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		createUpgradePanel: function(){

			var template = '<div>' + karmaBuilderEnviroment.getIframe().KarmaView.getWpTemplate( 'karma-element-panel-upgrade', {}, 1 ) + '</div>';
			this.el.appendChild( $( template )[ 0 ] );

		},

		/**
		 *@summary close add element panel
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		closeElementPanel: function() {

			var elementPanelSelector = document.querySelector( '.element-panel-show' );
			if( null != elementPanelSelector ){
				elementPanelSelector.classList.remove( "element-panel-show" );
				var addElement = document.querySelector( '.karma-element-panel-add-element-view' );
				if( null != addElement ) {
					var activeElement = addElement.querySelector( '.karma-addcontent' );
					if( null != activeElement ){
						$( activeElement ).click();
					}
				}
				delete window.elementPanelUnsplash;
				document.querySelector( '.element-panel-section-container .karma-unsplash-images-result' ).innerHTML = '' ;
				document.querySelector( '.element-panel-section-container #karma-unsplash-search' ).value = '' ;
			}

		},

		/**
		 * @summary use niceScroll for element panel
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		scrollElementPanel: function () {


			$(" .karma-elements, .karma-add-element-inactive-container").niceScroll({
				cursorcolor:"#A9A9A9",
				cursorwidth:"3px",
				cursoropacitymax:0.56,
				railalign: "left",
				cursorborder : "none",
			});


		},

		/**
		 * @summary check if premium load premium template
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		checkingPremium: function () {

			if( $( '.karma-active-tab .karma-isotope' ).length
				&&  !$( '.karma-active-tab .karma-isotope .premium' ).length
			){
				var premiumTemplate = document.querySelector( '.element-panel-permium' ) ;
				document.querySelector( '.karma-active-tab' ) && document.querySelector( '.karma-active-tab' ).classList.remove( 'karma-active-tab' );
				premiumTemplate.classList.add("karma-active-tab" );
			}

		},

		/**
		 * @summary Search in elements
		 *
		 * @since   0.1.0
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
		 * @since   0.1.0
		 * @returns {void}
		 */
		categoryFilterActive: function ( e ) {

			var target = $( e.target ),
				karmaAddcontentClass =	target.closest( '.karma-addcontent' );
			if ( karmaAddcontentClass ) {
				$( '.karma-addcontent' ).removeClass( 'karma-addcontent-active' );
				karmaAddcontentClass.addClass( 'karma-addcontent-active' );
			}

			if( 'element-panel-image' == karmaAddcontentClass.attr('data-tab') ){
				window.elementPanelUnsplash = new window.karmaUnsplash( this, document.querySelector('.element-panel-image'), false );
				elementPanelUnsplash.loadImages( elementPanelUnsplash.pageSurf, 30, false );
			}

			this.stopClickInPanel( e );
			this.setPriceFilterOnAll( e );
			this.elementPanelCloseSearchBar( e );

		},

		/**
		 * @summary after click in each category set the price filter on all items
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		setPriceFilterOnAll : function ( e ) {

			var element = this.el.querySelector( '.karma-element-panel-price-filter ul .active' ),
				allFilter = this.el.querySelector( '.karma-element-panel-price-filter ul li[ data-filter = "*" ]' ),
				clickedElement  =  e.target.classList.contains( 'karma-addcontent' ) ? e.target : e.target.closest('.karma-addcontent') ;

			if (typeof(element) != 'undefined' && element != null){
				element.classList.remove( 'active' );
			}
			if (typeof(allFilter) != 'undefined' && allFilter != null){
				allFilter.classList.add( 'active' );
			}

			if ( "karma-element-panel-list" == clickedElement.getAttribute( 'data-tab' ) ) {
				this.callIQuicksandOnElements( this.callFiltering( '*', $( '.karma-builder-element-panel-gather-menu ul li.karma-selected-dropdown-option' ).data( 'id' ) ) );
			}

		},

		/**
		 * @summary initialize quicksand on add element panel
		 *
		 * @param 	{ array } $elementToFilter set of elements to filter
		 * @since   0.1.0
		 * @returns { void }
		 */
		callIQuicksandOnElements: function ( $elementToFilter ) {

			$('.karma-elements ').quicksand( $elementToFilter ,{
				duration	: 400,
				useScaling 	: true ,
				easing 		: 'easeOutQuad',
			}  );

		},

		/**
		 * @summary filter elements an add element panel items
		 *
		 * @param   { string }    priceFilter     price category to filter
		 * @param   { string }    categoryFilter  element category to filter
		 * @since   0.1.0
		 * @returns { array } array of selected objects
		 */
		callFiltering: function ( priceFilter, categoryFilter ) {

			var $filteredData = [];
			if ( '*' === priceFilter && '*' === categoryFilter ) {

				$filteredData = this.karmaIsotope.find( '.karma-element-single-element' );

			} else if ( '*' === priceFilter && '*' !== categoryFilter ) {

				$filteredData = this.karmaIsotope.find(
					'.karma-element-single-element[data-id*=' + categoryFilter + ']'
				);

			} else if ( '*' !== priceFilter && '*' === categoryFilter ) {

				$filteredData = this.karmaIsotope.find(
					'.karma-element-single-element[data-id*=' + priceFilter + ']'
				);

			} else if ( '*' !== priceFilter && '*' !== categoryFilter ) {

				$filteredData = this.karmaIsotope.find(
					'.karma-element-single-element[data-id*=' + categoryFilter + '][data-id*=' + priceFilter + ']'
				);

			}
			return $filteredData

		},

		/**
		 * @summary open category dropdown on click hamburger menu
		 *
		 * @since   0.1.0
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
		 * @since   0.1.0
		 * @returns {void}
		 */
		elementGatherMenuFiltering : function () {

			var that = this;

			$( '.karma-builder-element-panel-gather-menu ul li' ).click( function () {

				$('.karma-builder-element-panel-gather-menu .karma-selected-dropdown-option').removeClass('karma-selected-dropdown-option');
				$( this ).addClass('karma-selected-dropdown-option');

				that.callIQuicksandOnElements( that.callFiltering( $( '.karma-element-panel-price-filter ul li.active' ).data( 'filter' ), $( this ).attr( 'data-id' ) ) );
				$( '.karma-builder-element-panel-gather-menu' ).trigger( '.removeGatherMenuPane' );

			});

		},

		/**
		 * @summary filtering price filter
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		elementPanelPriceFilter:function ( e ) {

			this.elementPanelCloseSearchBar( e );
			var target = ( "li" == e.target.tagName ) ? e.target : e.target.closest( 'li' ) ;

			if ( target.classList.contains( 'active' ) ){
				return;
			}
			this.el.querySelector( '.active' ).classList.remove( 'active' );
			target.classList.add( 'active' );
			if( '.premium' == target.getAttribute( 'data-filter' ) ){
				this.checkingPremium();
			}else {
				this.setActiveTab( this.el.querySelector( '.karma-addcontent-active' ) );
			}
			this.callIQuicksandOnElements( this.callFiltering( target.getAttribute( 'data-filter' ), $( '.karma-builder-element-panel-gather-menu ul li.karma-selected-dropdown-option' ).data( 'id' ) ) );

		},

		/**
		 * @summary Close gather menu panel
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		removeGatherMenuPanel: function () {

			$( '.karma-builder-element-panel-gather-menu' ).off( "click.removeGatherMenuPanel" ).on( "click.removeGatherMenuPanel", function(){
				$( ".karma-open-element-category-dropdown" ).removeClass( "karma-open-element-category-dropdown" );
			});

		},

		/**
		 * @summary clear input of search when click close icon
		 * @param {object}  event DOM Events
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		clearElementPanelSearchBar: function ( e ) {

			e.stopPropagation();
			var searchInputVal = document.querySelector( ".karma-builder-search-text" );
			var unsplashSearch = document.querySelector( "#karma-unsplash-search" );

			searchInputVal.classList.add( "open-search-panel" );
			searchInputVal.value = "";
			unsplashSearch.value = "";
			$( ".karma-builder-search-text,#karma-unsplash-search" ).trigger( 'input' );

		},

		/**
		 * @summary add class to show search bar in element panel
		 * @param { object }  event DOM Events
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		showElementPanelSearchBar: function ( e ) {

			e.stopPropagation()
			var searchInputVal = document.querySelector( ".karma-builder-search-text" );

			searchInputVal.classList.add( "open-search-panel" );
			this.showElementPanelSearchCloseIcon();
			$( '.karma-builder-element-panel-gather-menu' ).trigger( "click.removeGatherMenuPanel" );

		},

		/**
		 * @summary Close search bar when click document
		 *
		 * @since   0.1.0
		 * @returns { void }
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
		 * @since   0.1.0
		 * @returns {void}
		 */
		showElementPanelSearchCloseIcon: function () {

			var searchInputCloseButton = document.querySelector( ".karma-search-close-icon" );
			searchInputCloseButton.classList.add( "show-search-close-icon" ) ;

		},

		/**
		 *@summary open element panel for each button
		 * @param event
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		openElementPanel: function ( e ) {

			var elementPanelIcon = ( e.target.classList.contains( 'element-panel-button' ) ) ? e.target : e.target.closest( '.element-panel-button' ),
				elementPanelAttr =elementPanelIcon.getAttribute( "data-open-panel" ),
				elementPanelShowClass = "element-panel-show";

			if( 'undefined' != typeof karmaBuilderEnviroment.getIframe().elementSettingPanel ){
				karmaBuilderEnviroment.getIframe().elementSettingPanel.removeSettingPanel();
			}

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

				this.setActiveTab( document.querySelector( ".karma-addcontent-active" ) );
				this.loadBlocks();
			}

		},

		/**
		 * @summary get list of blocks and load
		 *
		 * @since   0.1.1
		 * @returns {void}
		 */
		loadBlocks:function () {

			var that = this;
			if ( '' != this.blocks ) {
				return;
			}
			$.ajax( {
				type: "GET",
				dataType: "json",
				url: "http://pixflow.net/products/karma/blocks-api/karma-blocks.api.php",
				success: function ( blocks ) {
					var templateParams = {};
					templateParams[ 'blocks' ] = blocks;
					that.blocks = blocks;
					var blocksHTML = karmaBuilderEnviroment.getIframe().KarmaView.getWpTemplate( 'karma-element-panel-blocks', templateParams, 1 );
					document.querySelector( '.karma-blocks-container' ).innerHTML = blocksHTML;
					that.makeBlocksDraggable();
					that.scrollElementPanel();

				}
			} );

		},

		/**
		 * @summary Call draggable on blocks
		 *
		 * @since 0.1.1
		 * @returns {void}
		 */
		makeBlocksDraggable: function () {

			karmaBuilderEnviroment.initBlocksDraggable( '#karma-add-element .element-panel-section-container.element-panel-deactive-part .karma-section-element' );

		},

		/**
		 * @summary change builder mode to responsive or desktop
		 * @param event
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		openResponsiveMode : function ( e ){

			var elementPanel = $('#karma-add-element');
			if ( ! elementPanel.hasClass( 'karma-show-responsive-buttons' ) ){
				this.showResponsiveButtons( e );
			}else{
				this.hideResponsiveButtons( e );
			}
		},

		/**
		 *@summary show responsive buttons
		 * @param event
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		showResponsiveButtons : function ( e ){
	
			var that = e.target,
				elementPanel = $('#karma-add-element');

			elementPanel.addClass('karma-show-responsive-buttons');
			setTimeout(function (){
				$( that ).closest('.karma-panel-templates-container ').addClass('animate-device-buttons');
				$('.karma-responsive-mobile').click();
			}, 500 );

		},

		/**
		 * @summary hide responsive buttons
		 *
		 * @param event
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		hideResponsiveButtons : function ( e ){

			var that = e.target,
				elementPanel = $('#karma-add-element');

			$(that).closest('.karma-panel-templates-container ').removeClass('animate-device-buttons');
			setTimeout(function (){
				elementPanel.removeClass('karma-show-responsive-buttons');
			}, 500 );
		},



		/**
		 * @summary set active responsive button
		 * @param event
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		changeDevice : function ( e ){
			
			var button = e.target.closest('.karma-responsive-button'),
			 	regex = new RegExp('(?:^|\\s)karma-device-mode-(.*?)(?!\\S)'),
				builderEnvirmont = karmaBuilderEnviroment.getIframe().document.querySelector('.karma-builder-environment');

			document.querySelector('body').className = document.querySelector('body').className.replace( regex, " karma-device-mode-" + button.getAttribute('data-mode') );
			builderEnvirmont.setAttribute( "karma-device-mode" , button.getAttribute('data-mode'));
			$('.karma-active-responsive-device').removeClass('karma-active-responsive-device');
			if ( ! button.classList.contains('karma-responsive-panel') ){
				button.classList.add('karma-active-responsive-device');
			}

		},

		/**
		 *@summary change builder mode to responsive or desktop
		 * @param event
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		openResponsiveMode : function ( e ){

			var elementPanel = $('#karma-add-element');
			if ( ! elementPanel.hasClass( 'karma-show-responsive-buttons' ) ){
				this.showResponsiveButtons( e );
			}else{
				this.hideResponsiveButtons( e );
			}
		},

		/**
		 *@summary show responsive buttons
		 * @param event
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		showResponsiveButtons : function ( e ){
	
			var that = e.target,
				elementPanel = $('#karma-add-element');

			elementPanel.addClass('karma-show-responsive-buttons');
			setTimeout(function (){
				$( that ).closest('.karma-panel-templates-container ').addClass('animate-device-buttons');
				$('.karma-responsive-mobile').click();
			}, 500 );

		},

		/**
		 * @summary hide responsive buttons
		 *
		 * @param event
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		hideResponsiveButtons : function ( e ){

			var that = e.target,
				elementPanel = $('#karma-add-element');

			$(that).closest('.karma-panel-templates-container ').removeClass('animate-device-buttons');
			setTimeout(function (){
				elementPanel.removeClass('karma-show-responsive-buttons');
			}, 500 );
		},



		/**
		 * @summary set active responsive button
		 * @param event
		 *
		 * @since   0.1.0
		 * @returns { void }
		 */
		changeDevice : function ( e ){
			
			var button = e.target.closest('.karma-responsive-button'),
			 	regex = new RegExp('(?:^|\\s)karma-device-mode-(.*?)(?!\\S)'),
				builderEnvirmont = karmaBuilderEnviroment.getIframe().document.querySelector('.karma-builder-environment');

			document.querySelector('body').className = document.querySelector('body').className.replace( regex, " karma-device-mode-" + button.getAttribute('data-mode') );
			builderEnvirmont.setAttribute( "karma-device-mode" , button.getAttribute('data-mode'));
			$('.karma-active-responsive-device').removeClass('karma-active-responsive-device');
			if ( ! button.classList.contains('karma-responsive-panel') ){
				button.classList.add('karma-active-responsive-device');
			}

		},

	});

} )( jQuery, karmaBuilderActions );
/*
 * KarmaUnsplash manager
 * The resources that make up the Unsplash JSON API
 *
 *
 * Copyright 2018 @Pixflow
 * Licensed under the MIT license.
 *
 *
 */



/**
 * Perform an animation and requests that the browser call a specified function to
 * update an animation before the next repaint.
 */
window.requestAnimFrame = ( function(){
	return  window.requestAnimationFrame   ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame    ||
		function( callback ){
			window.setTimeout( callback, 1000 / 60);
		};
})();

(function ( $ ) {
	/**
	 * KarmaUnsplash manager
	 * The resources that make up the Unsplash JSON API
	 *
	 * @since 0.1.0
	 */

	window.karmaUnsplash = function ( view, selector, uploadImage ) {

		this.APIURL = 'https://api.unsplash.com/';
		/** Elements view */
		this.viewObject = view;
		/** Unsplash application id */
		this.clientId = '100034b1de5815805647bef611d9ed7575b6c1812daa39730488d32be4461e12';
		this.pageSurf = this.getPage();
		this.searchPageSurf = 1;
		this.uploadImageMode = uploadImage;
		this.firstLoad = true;
		this.selector = selector;
		this.doingAjax = false;
		/** Setup before functions */
		this.typingTimer;
		/** timer identifier */
		this.doneTypingInterval = 2000;
		this.oldValue = '';
		/** time in ms, 2 second for example */
		if( null !== document.querySelector('.karma-unsplash-controller') ) {
			this.detectScroll();
			this.openMediaLibrary();
			this.bindInputEvent();
			this.setEventsOnArrow();
		}

	};


	/**
	 * Create unsplash images request url
	 *
	 * @param {string}  type        Link relations
	 * @param {object}  queryParmas Query Parameters
	 *
	 * @since 0.1.0
	 * @returns {string} API URL
	 */
	karmaUnsplash.prototype.createUnsplashURL = function ( type, queryParmas ) {

		var unsplashRequestURL = this.APIURL + type + '/' + '?client_id=' + this.clientId;
		_.each( queryParmas, function( value, key ){
			unsplashRequestURL += '&' + key + '=' + value;
		});
		return unsplashRequestURL;

	};

	/**
	 * Bind key behavior on Unsplash input
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.bindInputEvent = function(){

		var that = this ,
			searchInput = that.selector.querySelector('#karma-unsplash-search');
		/** Bind keyUp event */
		searchInput.onkeyup = function () {

			clearTimeout( that.typingTimer );
			that.typingTimer = setTimeout( function () {
				/** Send HTTP request when typing finished */
				that.searchAjax( that );

			}, that.doneTypingInterval );

		};

		/** Bind keyDown event */
		searchInput.onkeydown = function () {

			clearTimeout( that.typingTimer );

		}

	};

	/**
	 * Remove Html Unsplash results
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.removeResults = function(){

		var element = this.selector.querySelector('.karma-unsplash-images-result');
		if(  null != element ){
			element.innerHTML = '';
		}

	};

	/**
	 * Remove search mode and load photos
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.removeSearchMode = function(){

		var that = this ,
			inputElement = this.selector.querySelector('#karma-unsplash-search');
		that.removeResults();
		that.loadImages( that.pageSurf, 30, false );
		that.searchPageSurf = 1 ;
		inputElement.parentNode.parentNode.classList.remove('karma-unsplash-search-mode');

	};

	/**
	 * Search specific photos in Unsplash
	 *
	 * @param {object}  that    Karma Unsplash instance
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.searchAjax = function ( that ) {

		var inputElement = this.selector.querySelector('#karma-unsplash-search'),
			value = inputElement.value;

		if( '' === value.trim() ){
			that.removeSearchMode();
			return ;
		}

		if( 1 === that.searchPageSurf || that.oldValue != value ){
			that.removeResults();
		}
		that.oldValue = value;
		var queryParams = {
				query    : value ,
				page     : that.searchPageSurf,
				per_page : 30,
			},
			requestUrl = that.createUnsplashURL( 'search/photos', queryParams );
		inputElement.parentNode.parentNode.classList.add('karma-unsplash-search-mode');
		that.sendHTTPRequest( requestUrl );

	};

	/**
	 * Read the last page surf from history
	 *
	 * @since 0.1.0
	 * @returns {number} Last page surfed
	 */
	karmaUnsplash.prototype.getPage = function(){

		return ( null != localStorage.getItem( 'karmaUnsplashPage' ) ) ? parseInt( localStorage.getItem( 'karmaUnsplashPage' ) ) : 1 ;

	};

	/**
	 * Load images from Unsplash server or local storage
	 *
	 * @param {number}  page        Page number to retrieve
	 * @param {number}  perPage     Number of items per page
	 * @param {boolean} loadMore    Force retrieve new images
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.loadImages = function ( page, perPage, loadMore ) {

		var params = {
			'page'     : page,
			'per_page' : perPage,
		};

		if( this.cacheTimeExpire() || true === loadMore ) {
			var requestURL = this.createUnsplashURL( 'photos', params );
			this.sendHTTPRequest( requestURL );
		} else {
			var images = localStorage.getItem( 'karmaUnsplashImages' );
			this.showImages( JSON.parse( images ), 'thumb' );
		}

	};

	/**
	 * Check the data difference from last time that given images
	 * This function prevent from send repetitious request
	 *
	 * @since   0.1.0
	 * @returns {boolean}
	 */
	karmaUnsplash.prototype.cacheTimeExpire = function () {

		var updateTime = localStorage.getItem( 'karmaUnsplashImagesTime' );
		if( null === updateTime ){
			return true;
		}
		var	currentTime = new Date().getTime() ,
			timeDiff = Math.abs( currentTime - parseInt( updateTime ) ),
			diffDays = Math.floor( timeDiff / ( 1000 * 3600 * 24 ) );
		if ( diffDays >= 1 ) {
			localStorage.removeItem( 'karmaUnsplashImages' );
			localStorage.removeItem( 'karmaUnsplashPage' );
			return true;
		} else {
			return false;
		}

	};

	/**
	 * Save JSON data from Unsplash to local storage
	 *
	 * @param {number}  value  New images retrieved
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.storage = function( value ){

		if( null !== localStorage.getItem( 'karmaUnsplashImages' ) ){
			var storeData = localStorage.getItem('karmaUnsplashImages');
			storeData = JSON.parse( storeData );
			storeData = storeData.concat( value );
		}else{
			localStorage.setItem( 'karmaUnsplashImagesTime', new Date().getTime() );
			var storeData = value;
		}
		localStorage.setItem( 'karmaUnsplashImages', JSON.stringify( storeData ) );
		localStorage.setItem( 'karmaUnsplashPage', this.pageSurf );

	};

	/**
	 * Create element for showing images
	 *
	 * @param {object}  images  Images retrieved
	 * @param {object}  size    Type of image to load ( ex : small , large )
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.showImages = function ( images, size ) {


		var that = this ,
			el = this.selector.querySelector('.karma-unsplash-images-result');

		that.onFirstLoad();
		that.checkEmptyResult( el, images );
		that.appendChildElements( el, images, size );
		that.firstLoad = false;
		that.pageSurf ++ ;

	};

	/**
	 * Execute functions on first init
	 *
	 * @param {Object}  el      Parent Selector
	 * @param {object}  images  Images retrieved
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.checkEmptyResult = function ( el, images ) {



		if( "" == images ){

			el.classList.add("unsplash-empty-result");
			el.innerHTML = "No Result Found for <span id='karma-not-found-text'> " + el.closest( '.karma-unsplash' ).querySelector( 'input' ).value + "</span>";

		}else{
			el.classList.remove("unsplash-empty-result");
			// Check if current image set add it

			if(  this.uploadImageMode ){

				var currentValue = this.selector.querySelector( '.karma-unsplash-image-input' ).value;
				if ( '' != currentValue ) {
					el.appendChild( this.createChild( currentValue, '', '' ) );
				}

			}

		}

	}

	/**
	 * Execute functions on first init
	 *
	 * @param {Object}  el      Parent Selector
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.onFirstLoad = function () {

		if( true === this.firstLoad ){
			// Create empty image to remove background
			this.removeResults();
		}

	}

	/**
	 * Append elements for showing images
	 *
	 * @param {Object}  el      Parent Selector
	 * @param {object}  images  Images retrieved
	 * @param {object}  size    Type of image to load ( ex : small , large )
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.appendChildElements = function ( el, images, size ) {

		var that =  this,
			doingScroll = el.innerHTML.trim();
		_.each( images, function( image ){
			if( null != el ){
				el.appendChild( that.createChild( image, size, 'unsplash' ) );
			}
		});

		if( false === that.firstLoad && '' != doingScroll ){
			this.scrollToY( el.scrollTop + 220,  500, 'easeInOutQuint' );
		}

	}

	/**
	 * Set infinity scroll for Unsplash image result element
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.detectScroll = function () {

		var scrollableElement = this.selector.querySelector('.karma-unsplash-images-result'),
			mouseWheelEvent = (/Firefox/i.test(navigator.userAgent))? "DOMMouseScroll" : "mousewheel" //FF doesn't recognize mousewheel as of FF3.x
			that = this;

		karmaBuilderEnviroment.getIframe().KarmaView.preventFromScrollingOnParent( $( scrollableElement ) );
		scrollableElement.addEventListener( mouseWheelEvent, function(){

			if ( scrollableElement.scrollTop + scrollableElement.clientHeight >= scrollableElement.scrollHeight ) {

				if( false === that.doingAjax ){
					if( scrollableElement.parentNode.classList.contains('karma-unsplash-search-mode') ){
						that.searchAjax( that );
					}else{
						that.loadImages( that.pageSurf, 30, true );
					}
				}

			}

		});

	};

	/**
	 * Create and set event on each Unsplash element
	 *
	 * @param {object}  img     IMG info
	 * @param {string}  size    Type of image to load ( ex : small , large )
	 * @param {string}  type    determine image type is unsplash or not
	 *
	 * @since 0.1.0
	 * @returns {Object}    HTML element
	 */
	karmaUnsplash.prototype.createChild = function ( img, size, type ) {

		var url 		= ( 'unsplash' == type  ) ? img.urls[ size ] : img,
			fullUrl 	= (  img.urls  ) ? img.urls.regular : url ,
			newChild 	= document.createElement('div') ,
			imageInput 	= document.querySelector( '.karma-unsplash-image-input' );

		newChild.setAttribute( 'class', 'karma-unsplash-images-list' );
		if ( 'unsplash' == type ) {
			var newAvatar = document.createElement( 'div' );
			newAvatar.setAttribute( 'class', 'karma-unsplash-avatar' );
			newAvatar.classList.add( 'karma-tooltip' );
			newAvatar.setAttribute( 'title', img.user.name );
			newChild.appendChild( newAvatar );
			this.bindAvatarTooltip( newChild );
			this.setDraggable( newChild, fullUrl );

		}

		if ( '' == url ) {
			newChild.classList.add( 'karma-unsplash-empty' );
		}

		newChild.setAttribute( 'style', 'background-image:url(' +  url + ')' );
		if( true == this.uploadImageMode ){
			this.setClickEventOnchildes( imageInput, newChild, fullUrl );
		}
		return newChild;

	};
	/**
	 * Make unsplash photo draggable in photo panel
	 *
	 * @param {object}  newChild    New unsplash image
	 * @param {string}  fullUrl		Url of image in regular size
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.setDraggable = function ( newChild, fullUrl ) {

		if( ! this.uploadImageMode ){
			newChild.setAttribute( 'data-element-name', 'karma_image' );
			newChild.setAttribute( 'data-element-type', 'karma_unsplash_image' );
			newChild.setAttribute( 'data-full-url', fullUrl );
			karmaBuilderEnviroment.initDraggable( newChild );
		}

	}

	/**
	 * Set click event on images
	 *
	 * @param {Object}  imageInput  Hidden input
	 * @param {Object}  newChild    Unsplash item childes
	 * @param {String}  url         Image url
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.setClickEventOnchildes = function ( imageInput, newChild, url ) {

		var that = this;
		if( null == imageInput ){
			return ;
		}
		newChild.onclick = function () {

			var selected = that.selector.querySelector('.karma-unspalsh-selected');
			if( null != selected ) {
				selected.classList.remove('karma-unspalsh-selected');
			}
			this.classList.add('karma-unspalsh-selected');
			imageInput.value = url;
			jQuery( imageInput ).trigger( 'input' );

		};

		if (
			imageInput.value == url
		) {
			newChild.click();
		}

	}

	/**
	 * Process the response of XHR request
	 *
	 * @param {String}  response    response of XHR request
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.processResult = function( response ){

		var images = JSON.parse( response  ),
			that = this;

		if( 'object' == typeof images.results ){
			images = images.results;
			that.searchPageSurf ++ ;
		}else{
			that.storage( images );
		}

		that.showImages( images, 'thumb' );
		that.doingAjax = false;

	};

	/**
	 * Get a single page from the list of all photos
	 *
	 * @param {string}  URL Request url
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.sendHTTPRequest = function( URL ){

		var XMLHttp = new XMLHttpRequest() ,
			that = this;
		that.doingAjax = true ;
		var loading = this.selector.querySelector( '.karma-change-loading-icon' );
		loading.classList.remove( 'karma-unspalsh-icon' );
		loading.classList.add( 'unsplash-loading-more' );
		XMLHttp.onreadystatechange = function() {
			if ( XMLHttp.readyState == XMLHttpRequest.DONE ) {
				if ( XMLHttp.status == 200) {
					that.processResult( XMLHttp.responseText );
					loading.classList.remove( 'unsplash-loading-more' );
					loading.classList.add( 'karma-unspalsh-icon' );
				}
				else if ( XMLHttp.status == 400 ) {
					throw 'HTTP Error 400. The request hostname is invalid.' ;
				}
				else {
					throw 'Bad Request - Invalid URL';
				}
			}
		};

		XMLHttp.open( "GET", URL , true );
		XMLHttp.send();

	};

	/**
	 * When an image is selected in the media frame and change background
	 *
	 *  @param {object}  frame Wordpress media frame object
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.callback = function ( frame ) {

		var input = this.selector.querySelector( '.karma-unsplash-image-input' );

		// Get media attachment details from the frame state
		var attachment = frame.state().get( 'selection' ).first().toJSON();

		// Send the attachment url to our hidden input
		input.value = attachment.url;
		jQuery( input ).trigger( 'input' );
		var el = this.createChild( attachment.url, '', '' );
		var emptyImage = this.selector.querySelector( '.karma-unsplash-empty' );
		emptyImage.parentNode.insertBefore( el, emptyImage.nextSibling );

	};

	/**
	 * Add tooltip to all images of unsplash
	 *
	 *  @param {object} selector    Dom node
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.bindAvatarTooltip = function ( selector ) {

		$( selector ).tooltip( {
			position: {
				my: "center top",
				at: "center bottom+5",
				using: function ( position, feedback ) {

					$( this ).css( position );
					$( "<div>" )
						.addClass( "arrow" )
						.addClass( feedback.vertical )
						.addClass( feedback.horizontal )
						.appendTo( this );

				}
			},
			tooltipClass: "unsplash-avatar",
			show: {
				delay: 350,
				duration: 100

			},
			hide: {
				delay: 200,
				duration: 100
			},

		} );

	};

	/**
	 * Open WordPress Media library and handle choose image from media library instead of unsplash
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.openMediaLibrary = function () {

		if( true === this.uploadImageMode ){
			var addImgLink = this.selector.querySelector( '.karma-unspalsh-media-library' );
			var handler = this.callback.bind( this );
			karmaBuilderEnviroment.openMediaLibrary( addImgLink, handler );
		}

	};

	/**
	 * Scrolls to a particular set of coordinates in the document
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.scrollToY = function( scrollTargetY, speed, easing ) {

		var element = this.selector.querySelector('.karma-unsplash-images-result') ,
			scrollY = element.scrollTop ,
			scrollTargetY = scrollTargetY || 0,
			speed = speed || 2000,
			easing = easing || 'easeOutSine',
			currentTime = 0;
		var time = Math.max(.1, Math.min( Math.abs( scrollY - scrollTargetY ) / speed, .8 ) );
		var easingEquations = {
			easeOutSine: function ( pos ) {
				return Math.sin( pos * ( Math.PI / 2 ) );
			},
			easeInOutSine: function (pos) {
				return ( -0.5 * ( Math.cos( Math.PI * pos ) - 1 ) );
			},
			easeInOutQuint: function ( pos ) {
				if ( ( pos /= 0.5 ) < 1 ) {
					return 0.5 * Math.pow( pos, 5 );
				}
				return 0.5 * ( Math.pow( ( pos - 2 ), 5 ) + 2 );
			}
		};

		function tick() {

			currentTime += 1 / 60;
			var p = currentTime / time;
			var t = easingEquations[ easing ]( p );

			if ( p < 1 ) {
				requestAnimFrame( tick );
				element.scrollTo( 0, scrollY + ( ( scrollTargetY - scrollY ) * t ) );
			} else {
				element.scrollTo( 0, scrollTargetY );
			}
		}
		tick();

	}

	/**
	 * Set event on scroll down arrow
	 *
	 * @since 0.1.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.setEventsOnArrow = function () {

		var that = this;
		this.selector.addEventListener( 'click', function( event ){

			if ( event.target.classList.contains('karma-unspalsh-icon') ) {
				var element = that.selector.querySelector('.karma-unsplash-images-result');
				if( element.scrollTop + element.clientHeight >= element.scrollHeight ){
					if( false === that.doingAjax ){
						if( element.parentNode.classList.contains('karma-unsplash-search-mode') ){
							that.searchAjax( that );
						}else{
							that.loadImages( that.pageSurf, 30, true );
						}
					}
				}
				that.scrollToY( element.scrollTop + 220,  500, 'easeInOutQuint' );
			}

		}, false );

	}
})( jQuery );
jQuery( document ).off( 'karma_finish_form_builder.getUnsplashPhoto' ).on( 'karma_finish_form_builder.getUnsplashPhoto', function( e, viewObject ){

	/**
	 * @summary KarmaUnsplash manager
	 * The resources that make up the Unsplash JSON API
	 *
	 * @since 1.0.0
	 */
	var karmaUnsplash;
	karmaUnsplash = function () {

		this.APIURL = 'https://api.unsplash.com/';
		/** Unsplash application id */
		this.clientId = '100034b1de5815805647bef611d9ed7575b6c1812daa39730488d32be4461e12';
		this.pageSurf = this.getPage();
		this.searchPageSurf = 1;
		this.firstLoad = true;
		this.doingAjax = false;
		/** Setup before functions */
		this.typingTimer;
		/** timer identifier */
		this.doneTypingInterval = 2000;
		this.oldValue = '';
		/** time in ms, 2 second for example */
		this.detectScroll();
		this.openMediaLibrary();
		this.bindInputEvent();

	};


	/**
	 * @summary Create unsplash images request url
	 *
	 * @param {string}  type        Link relations
	 * @param {object}  queryParmas Query Parameters
	 *
	 * @since 1.0.0
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
	 * @summary Bind key behavior on Unsplash input
	 *
	 * @since 1.0.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.bindInputEvent = function(){
		
		var that = this ,
			searchInput = document.getElementById('karma-unsplash-search');
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
	 * @summary Remove Html Unsplash results
	 *
	 * @since 1.0.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.removeResults = function(){

		document.querySelector('.karma-unsplash-images-result').innerHTML = '';

	};

	/**
	 * @summary Remove search mode and load photos
	 *
	 * @since 1.0.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.removeSearchMode = function(){

		var that = this ,
			inputElement = document.getElementById('karma-unsplash-search');
		that.removeResults();
		that.loadImages( that.pageSurf, 9, false );
		that.searchPageSurf = 1 ;
		inputElement.parentNode.parentNode.classList.remove('karma-unsplash-search-mode');

	};

	/**
	 * @summary Search specific photos in Unsplash
	 *
	 * @param {object}  that    Karma Unsplash instance
	 *
	 * @since 1.0.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.searchAjax = function ( that ) {

		var inputElement = document.getElementById('karma-unsplash-search'),
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
				per_page : 9,
			},
			requestUrl = that.createUnsplashURL( 'search/photos', queryParams );

		inputElement.parentNode.parentNode.classList.add('karma-unsplash-search-mode');
		that.sendHTTPRequest( requestUrl );

	};

	/**
	 * @summary Read the last page surf from history
	 *
	 * @since 1.0.0
	 * @returns {number} Last page surfed
	 */
	karmaUnsplash.prototype.getPage = function(){

		return ( null != localStorage.getItem( 'karmaUnsplashPage' ) ) ? parseInt( localStorage.getItem( 'karmaUnsplashPage' ) ) : 1 ;

	};

	/**
	 * @summary Load images from Unsplash server or local storage
	 *
	 * @param {number}  page        Page number to retrieve
	 * @param {number}  perPage     Number of items per page
	 * @param {boolean} loadMore    Force retrieve new images
	 *
	 * @since 1.0.0
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
	 * @summary Check the data difference from last time that given images
	 * This function prevent from send repetitious request
	 *
	 * @since   1.0.0
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
	 * @summary Save JSON data from Unsplash to local storage
	 *
	 * @param {number}  value  New images retrieved
	 *
	 * @since 1.0.0
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
	 * @summary Create element for showing images
	 *
	 * @param {object}  images  Images retrieved
	 * @param {object}  size    Type of image to load ( ex : small , large )
	 *
	 * @since 1.0.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.showImages = function ( images, size ) {


		var that = this ,
			el = document.querySelector('.karma-unsplash-images-result');
		if( true === that.firstLoad ){
			that.removeResults();
		}
		_.each( images, function( image ){
			if( null != el ){
				el.appendChild( that.createChild( image, size ) );
			}
		});
		if( false === that.firstLoad ){
			scrollToY( el.scrollTop + 220,  500, 'easeInOutQuint' );
		}

		that.firstLoad = false;
		that.pageSurf ++ ;
		
	};

	/**
	 * @summary Set infinity scroll for Unsplash image result element
	 *
	 * @since 1.0.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.detectScroll = function () {

		var scrollableElement = document.querySelector('.karma-unsplash-images-result'),
			that = this;
		scrollableElement.addEventListener( 'mousewheel', function( e ){
			if ( scrollableElement.scrollTop + scrollableElement.clientHeight >= scrollableElement.scrollHeight ) {
				e.preventDefault();
				if( false === that.doingAjax ){
					if( scrollableElement.parentNode.classList.contains('karma-unsplash-search-mode') ){
						that.searchAjax( that );
					}else{
						that.loadImages( that.pageSurf, 9, true );
					}
				}
			}
		});

	};

	/**
	 * @summary Create and set event on each Unsplash element
	 *
	 * @param {object}  img  IMG info
	 * @param {string}  size    Type of image to load ( ex : small , large )
	 *
	 * @since 1.0.0
	 * @returns {Object}    HTML element
	 */
	karmaUnsplash.prototype.createChild = function ( img, size ) {

		var newChild = document.createElement('div') ;
		newChild.setAttribute( 'class', 'karma-unsplash-images-list' );
		newChild.setAttribute( 'style', 'background-image:url(' +  img.urls[ size ] + ')' );
		newChild.onclick = function () {
			var selected = document.querySelector('.karma-unspalsh-selected');
			if( null != selected ) {
				selected.classList.remove('karma-unspalsh-selected');
			}
			this.classList.add('karma-unspalsh-selected');
			document.querySelector('.karma-unsplash-image-input').value = img.urls.full;
		};
		return newChild;

	};

	/**
	 * @summary Process the response of XHR request
	 *
	 * @param {String}  response    response of XHR request
	 *
	 * @since 1.0.0
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
	 * @summary Get a single page from the list of all photos
	 *
	 * @param {string}  URL Request url
	 *
	 * @since 1.0.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.sendHTTPRequest = function( URL ){

		var XMLHttp = new XMLHttpRequest() ,
			that = this;
		that.doingAjax = true ;
		XMLHttp.onreadystatechange = function() {
			if ( XMLHttp.readyState == XMLHttpRequest.DONE ) {
				if ( XMLHttp.status == 200) {
					that.processResult( XMLHttp.responseText );
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
	 * @summary When an image is selected in the media frame and change background
	 *
	 *  @param {object}  frame Wordpress media frame object
	 *
	 * @since 1.0.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.callback = function ( frame ) {

		var input = document.querySelector( '.karma-unsplash-image-input' );

		// Get media attachment details from the frame state
		var attachment = frame.state().get( 'selection' ).first().toJSON();

		// Send the attachment id to our hidden input
		input.value = attachment.url;

	};

	/**
	 * @summary Open WordPress Media library and handle choose image from media library instead of unsplash
	 *
	 * @since 1.0.0
	 * @returns {void}
	 */
	karmaUnsplash.prototype.openMediaLibrary = function () {

		var addImgLink = document.querySelector( '.karma-unspalsh-media-library' );
		viewObject.openMediaLibrary( addImgLink, this.callback );

	};

	if( null !== document.querySelector('.karma-unsplash-controller') ){

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

		/**
		 * @summary Scrolls to a particular set of coordinates in the document
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		function scrollToY( scrollTargetY, speed, easing ) {

			var element = document.querySelector('.karma-unsplash-images-result') ,
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


		/** Initialize karmaUnsplash */
		var photos = new karmaUnsplash();
		photos.loadImages( photos.pageSurf, 9, false );

		document.querySelector('.karma-unspalsh-icon').addEventListener( 'click', function(){

			var element = document.querySelector('.karma-unsplash-images-result');
			if( element.scrollTop + element.clientHeight >= element.scrollHeight ){
				if( false === photos.doingAjax ){
					if( element.parentNode.classList.contains('karma-unsplash-search-mode') ){
						photos.searchAjax( photos );
					}else{
						photos.loadImages( photos.pageSurf, 9, true );
					}
				}
			}
			scrollToY( element.scrollTop + 220,  500, 'easeInOutQuint' );

		}, false );


	}

});
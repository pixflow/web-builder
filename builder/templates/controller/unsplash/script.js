jQuery( document ).off( 'karma_finish_form_builder.getUnsplashPhoto' ).on( 'karma_finish_form_builder.getUnsplashPhoto', function( e, viewObject ){


	var karmaUnsplash = function(){

		this.APIURL = 'https://api.unsplash.com/';
		this.clientId = '4107f003fb3e18122cfc11f99a57b5738947b1cee0d75b12b4cba90c23d39d85' ;
		this.pageSurf = 1;
		this.detectScroll();

	}

	karmaUnsplash.prototype.loadImages = function ( page, perPage, loadMore ) {

		var params = {
			'page'     : page,
			'per_page' : perPage,
			},
			requestURL = this.createUnsplashURL( 'photos', params );
		if( this.cacheTimeExpire() || true === loadMore ) {
			this.sendHTTPRequest( requestURL );
		} else {
			var images = localStorage.getItem( 'karmaUnsplashImages' );
			this.showImages( JSON.parse( images ), 'thumb' );
		}

	}

	karmaUnsplash.prototype.cacheTimeExpire = function () {

		var updateTime = localStorage.getItem( 'karmaUnsplashImagesTime' );
		if( null === updateTime ){
			return true;
		}
		var	currentTime = new Date().getTime() ,
			timeDiff = Math.abs( currentTime - updateTime ),
			diffDays = Math.ceil( timeDiff / ( 1000 * 3600 * 24 ) );
		if ( diffDays >=1 ) {
			localStorage.removeItem( 'karmaUnsplashImages' );
			return true;
		} else {
			return false;
		}

	}

	karmaUnsplash.prototype.storage = function( value ){

		if( null !== localStorage.getItem( 'karmaUnsplashImages' ) ){
			var storeData = localStorage.getItem( 'karmaUnsplashImages' );
			storeData = JSON.parse( storeData );
			storeData = storeData.concat( value );
		}else{
			localStorage.setItem( 'karmaUnsplashImagesTime', new Date().getTime() );
			var storeData = value;
		}
		localStorage.setItem( 'karmaUnsplashImages', JSON.stringify( storeData ) );

	}

	karmaUnsplash.prototype.showImages = function ( images, size ) {

		var that = this ,
			el = document.querySelector('.karma-unsplash-images-result');
		if( 1 === that.pageSurf ){
			el.innerHTML = '' ;
		}
		_.each( images, function( image ){
			if( null != el ){
				el.appendChild( that.createChild( image.urls[ size ] ) );
			}
		});
		that.pageSurf ++ ;
		
	}

	karmaUnsplash.prototype.detectScroll = function () {

		var scrollableElement = document.querySelector('.karma-unsplash-images-result'),
			that = this;
		scrollableElement.addEventListener( 'mousewheel', function( e ){
			if ( scrollableElement.scrollTop + scrollableElement.clientHeight >= scrollableElement.scrollHeight ) {
				e.preventDefault();
				that.loadImages( a.pageSurf, 9, true );
			}
		});

	}

	karmaUnsplash.prototype.createChild = function ( imgURL ) {

		var newChild = document.createElement('div') ;
		newChild.setAttribute( 'class', 'karma-unsplash-images-list' );
		newChild.setAttribute( 'style', 'background-image:url(' +  imgURL + ')' );
		return newChild;

	}

	karmaUnsplash.prototype.sendHTTPRequest = function( URL ){

		var XMLHttp = new XMLHttpRequest() ,
			that = this;
		XMLHttp.onreadystatechange = function() {
			if ( XMLHttp.readyState == XMLHttpRequest.DONE ) {
				if ( XMLHttp.status == 200) {
					var images = JSON.parse( XMLHttp.responseText  );
					that.storage( images );
					that.showImages( images, 'thumb' );
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

	}

	karmaUnsplash.prototype.createUnsplashURL = function ( type, queryParmas ) {

		var unsplashRequestURL = this.APIURL + type + '/' + '?client_id=' + this.clientId;
		_.each( queryParmas, function( value, key ){
				unsplashRequestURL += '&' + key + '=' + value;
		});
		return unsplashRequestURL;
		
	}

	if( null !== document.querySelector('.karma-unsplash-controller') ){
		var photos = new karmaUnsplash();
		photos.loadImages( a.pageSurf, 9, false );
	}

});
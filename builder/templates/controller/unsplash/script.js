jQuery( document ).off( 'karma_finish_form_builder.getUnsplashPhoto' ).on( 'karma_finish_form_builder.getUnsplashPhoto', function( e, viewObject ){


	var karmaUnsplash = function(){

		this.APIURL = 'https://api.unsplash.com/';
		this.clientId = '100034b1de5815805647bef611d9ed7575b6c1812daa39730488d32be4461e12' ;
		this.pageSurf = this.getPage();
		this.firstLoad = true;
		this.doingAjax = false;
		this.detectScroll();

	}

	karmaUnsplash.prototype.getPage = function(){

		return ( null != localStorage.getItem( 'karmaUnsplashPage' ) ) ? parseInt( localStorage.getItem( 'karmaUnsplashPage' ) ) : 1 ;

	}

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

	}

	karmaUnsplash.prototype.cacheTimeExpire = function () {

		var updateTime = localStorage.getItem( 'karmaUnsplashImagesTime' );
		if( null === updateTime ){
			return true;
		}
		var	currentTime = new Date().getTime() ,
			timeDiff = Math.abs( currentTime - parseInt( updateTime ) ),
			diffDays = Math.floor( timeDiff / ( 1000 * 3600 * 24 ) );
		if ( diffDays >=1 ) {
			localStorage.removeItem( 'karmaUnsplashImages' );
			localStorage.removeItem( 'karmaUnsplashPage' );
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
		localStorage.setItem( 'karmaUnsplashPage', this.pageSurf );

	}

	karmaUnsplash.prototype.showImages = function ( images, size ) {


		var that = this ,
			el = document.querySelector('.karma-unsplash-images-result');
		if( true === that.firstLoad ){
			el.innerHTML = '' ;
			that.firstLoad = false;
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
				if( false === that.doingAjax ){
					that.loadImages( that.pageSurf, 9, true );
				}
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
		that.doingAjax = true ;
		XMLHttp.onreadystatechange = function() {
			if ( XMLHttp.readyState == XMLHttpRequest.DONE ) {
				if ( XMLHttp.status == 200) {
					var images = JSON.parse( XMLHttp.responseText  );
					that.showImages( images, 'thumb' );
					that.storage( images );
					that.doingAjax = false;
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
		photos.loadImages( photos.pageSurf, 9, false );

		document.querySelector('.karma-unspalsh-icon').addEventListener( 'click', function(){
			//TODO go scroll on click
		}, false );
	}

});
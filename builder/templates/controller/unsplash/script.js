jQuery( document ).off( 'karma_finish_form_builder.getUnsplashPhoto' ).on( 'karma_finish_form_builder.getUnsplashPhoto', function( e, viewObject ){


	var karmaUnsplash = function(){

		this.APIURL = 'https://api.unsplash.com/';
		this.clientId = '4107f003fb3e18122cfc11f99a57b5738947b1cee0d75b12b4cba90c23d39d85' ;

	}

	karmaUnsplash.prototype.loadImages = function ( page, perPage ) {

		var params = {
			'page'     : page,
			'per_page' : perPage,
			},
			requestURL = this.createUnsplashURL( 'photos', params );

	}

	karmaUnsplash.prototype.createUnsplashURL = function ( type, queryParmas ) {

		var unsplashRequestURL = this.APIURL + type + '/' + '?client_id=' + this.clientId;
		_.each( queryParmas, function( value, key ){
				unsplashRequestURL += '&' + key + '=' + value;
		});
		return unsplashRequestURL;
		
	}

	//TODO Should delete
/*	var a = new karmaUnsplash();
	a.loadImages( 1,9 );*/

});
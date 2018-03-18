/*
 * karmaVideoPopup is a popup plugin to load video in popup mode
 *
 *
 * Copyright 2018 @Pixflow
 * Licensed under the MIT license.
 *
 *
 */

/**
 * karmaVideoPopup manager
 * The resources that add popup to video
 *
 * @param {string}  selector video link
 *
 * @since 0.1.0
 * @returns {void}
 */
var karmaVideoPopup = function ( selector ) {

	this.selector = selector;
	this.href = document.querySelector( selector ).getAttribute( 'data-url' ).replace( "watch?v=", "embed/" );
	this.createVideoPopupHtml();

};

/**
 * close and delete lightbox HTML
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaVideoPopup.prototype.closeVideoPopup = function () {

	var videoPopup = document.getElementById( "karma-video-popup-opened" );
	if ( undefined != videoPopup ){
		videoPopup.classList.add( "karma-close-video-popup" );
		setTimeout( function () {
			videoPopup.remove();
		},800 );
	}

};
/**
 * create video popup html and append to body
 *
 * @param {string}  url video URL
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaVideoPopup.prototype.createVideoPopupHtml = function () {
	
	var that = this;
	// Create videoPopup container
	var videoPopup = document.createElement( 'div' );
	videoPopup.setAttribute( 'id', 'karma-video-popup-opened' );

	// videoPopup close
	var close = document.createElement( 'button' );
	close.setAttribute( 'class', 'karma-video-popup-close' );
	close.innerHTML = '×';
	videoPopup.appendChild( close );

	// Create videoPopup object
	var object = document.createElement( 'iframe' );
	object.setAttribute( 'scrolling',"no");
	object.setAttribute( 'src', this.href );
	videoPopup.appendChild( object );

	// Add videoPopup HTML to body
	document.body.appendChild( videoPopup );
	videoPopup.addEventListener( 'click', function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		that.closeVideoPopup();
	}, true );

};


/*
 * karmaImageLightbox is a lightbox plugin to load images in popup mode
 *
 *
 * Copyright 2018 @Pixflow
 * Licensed under the MIT license.
 *
 *
 */



/**
 * karmaImageLightbox manager
 * The resources that add lightbox to images
 *
 * @param {string}  selector image link selector
 *
 * @since 0.1.0
 * @returns {void}
 */
var karmaImageLightbox = function ( selector ) {

	this.selector = selector;
	this.href = document.querySelector( selector ).getAttribute( 'href' );
	this.init();

};


/**
 * init lightbox on images with selector class
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaImageLightbox.prototype.init = function () {

	var that = this;
	// Open Lightbox
	var handler = that.openLightbox.bind( that );
	jQuery( document.querySelector( this.selector ) ).on( 'click.karma-lightbox', handler );
	
};

/**
 * create and load lightbox
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaImageLightbox.prototype.openLightbox = function ( e ) {

	e.preventDefault();
	if ( document.querySelectorAll( '#karma-lightbox-opened' ).length ) {
		return;
	}
	var html = document.querySelector( 'html' );
	if ( html.classList ) {
		html.classList.add( 'karma-image-lightbox-active' );
	} else {
		html.className += ' karma-image-lightbox-active';
	}
	var image = document.querySelector( this.selector ).href;

	this.createLightboxHtml( image );

};

/**
 * close and delete lightbox HTML
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaImageLightbox.prototype.closeLightbox = function () {

	var html = document.querySelector( 'html' );
	var activeClass = 'karma-image-lightbox-active';
	if ( html.classList ) {
		html.classList.remove( activeClass );
	} else {
		html.className = html.className.replace( new RegExp( '(^|\\b)' + activeClass.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' );
	}
	document.getElementById( "karma-lightbox-opened" ).remove();

};

/**
 * create lightbox html and append to body
 *
 * @param {string}  url image URL
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaImageLightbox.prototype.createLightboxHtml = function ( url ) {

	var that = this;
	// Create lightbox container
	var lightbox = document.createElement( 'div' );
	lightbox.setAttribute( 'id', 'karma-lightbox-opened' );

	// Create lightbox loading
	var loading = document.createElement( 'span' );
	loading.setAttribute( 'class', 'karma-lightbox-loading' );
	loading.innerHTML = 'Loading ...';
	lightbox.appendChild( loading );

	// Close Light box close
	var close = document.createElement( 'button' );
	close.setAttribute( 'class', 'karma-lightbox-close' );
	close.innerHTML = '×';
	lightbox.appendChild( close );

	// Create lightbox image
	var image = document.createElement( 'img' );
	image.setAttribute( 'src', url );
	lightbox.appendChild( image );

	// Add lightbox HTML to body
	document.querySelector( 'body' ).appendChild( lightbox );
	lightbox.addEventListener( 'click', function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		if ( 'IMG' === e.target.tagName ) {
			return;
		}
		that.closeLightbox();
	}, true );

};

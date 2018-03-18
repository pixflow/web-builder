var karmaBuilderPageManager = karmaBuilderPageManager  || {};

(function ($, karmaBuilderPageManager ) {
	'use strict';

	karmaBuilderPageManager .view = Backbone.View.extend({


		/**
		 *  Build html for preview template
		 */
		previewTemplate :'<div class="karma-preview-template-container">'
		+'<div class="karma-preview-template-header">'
		+ '<div class="karma-preview-template-header-right">'
		+ '<div class="karma-preview-template-cancel-btn">'
		+'<span>Cancel</span>'
		+ '</div>'
		+ '<div class="karma-preview-template-start-btn">'
		+'<span data-id="{{ data.templateID }}">START EDITING</span>'
		+ '</div>'
		+ '<div class="karma-preview-template-price">'
		+'<span>Price:</span>'
		+'<span> Free</span>'
		+ '</div>'
		+ '</div>'
		+ '<div class="karma-preview-template-header-left">'
		+ '<div class="karma-preview-template-logo">'
		+ '<img src="{{ pageManagerParams.karmaPreviewLogo }}" > '
		+ '</div>'
		+ '<div class="karma-preview-template-preview-btn">'
		+ '<span> Preview Page</span>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="karma-preview-template-iframe">'
				+'<iframe src="{{ data.previewUrl }}"></iframe>'
		+ '</div>'
		+ '</div>',



		/*
		 * Underscore's default ERB-style templates are incompatible with PHP
		 * when asp_tags is enabled, so Karma uses Mustache-inspired templating syntax.
		 *
		 * Make the underscore template like wp.template function
		 *
		 */
		templateSettings: {
			evaluate: /<#([\s\S]+?)#>/g,
			interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
			escape: /\{\{([^\}]+?)\}\}(?!\})/g,
			variable: 'data'
		},

		events: {

			'click .karma-dropdown-header'				                        : 'openDropDown',
			'click .karma-page-popup-container'				                    : 'stopCloseClick',
			'click .karma-dropdown-options > li'		                        : 'selectDropDownList',
			'click .karma-page-popup-cancel-button'		                        : 'closeAddPage',
			'click .karma-page-popup-image-close-icon'	                        : 'closeAddPage',
			'click .karma-page-popup-overlay'	              			        : 'closeAddPage',
			'click .karma-preview-template-start-btn'	                        : 'openAddNewPopup',
			'click .karma-blank-page-template .karma-page-screenshot-container' : 'openAddNewPopup',
			'click .karma-create-page-button'			                        : 'openPreviewTemplate',
			'click .karma-preview-template-cancel-btn'                          : 'closePreviewTemplate',
			'click .karma-page-popup-content'								    : 'closeAddPageDropDown',
		},

		/**
		 * In creating this view calls render
		 *
		 * @since 2.0
		 *
		 */
		initialize: function ( options ) {},

		/**
		 *In creating this view calls render
		 *
		 * @since 2.0
		 *
		 */
		openPreviewTemplate: function ( el ) {

			var that = ( el.target.classList.contains( 'karma-create-page-button' ) ) ? el.target : el.target.closest( '.karma-create-page-button' ),
				previewUrl = that.getAttribute( 'data-url' ),
				templateID = that.getAttribute( 'data-id' );

			var previewTemplate = _.template( this.previewTemplate, this.templateSettings );
			$( 'body' ).append( previewTemplate( { previewUrl: previewUrl, templateID: templateID } ) );
			setTimeout( function () {
				document.querySelector( '.karma-preview-template-container' ).classList.add( 'karma-preview-template-container-show' );
			}, 100 );
		},

		/**
		 *close preview template
		 *
		 * @since 2.0
		 *
		 */
		closePreviewTemplate: function () {

			document.querySelector('.karma-preview-template-container').classList.remove('karma-preview-template-container-show');
			setTimeout( function () {
				$('.karma-preview-template-container').remove();
			},400 );

		},
		/**
		 *stop close panel
		 *
		 * @since 2.0
		 *
		 */
		stopCloseClick: function ( e ) {

		e.stopPropagation();
		this.closeAddPageDropDown();

		},

		/**
		 *stop close panel
		 *
		 * @since 2.0
		 *
		 */
		closeAddPageDropDown: function ( ) {

			$( ".karma-dropdown-body > ul" ).removeClass( "karma-doropdown-opened" );

		},

		/**
		 *opening add new page popup
		 *
		 * @since 2.0
		 *
		 */
		openAddNewPopup: function ( e ) {
			
			var templateId = e.target.getAttribute( 'data-id' );
			document.querySelector( 'input[name="import-template"]' ).value = templateId;
			document.querySelector('.karma-page-popup-container').classList.add('karma-page-popup-container-show');
			document.querySelector('.karma-page-popup-overlay').classList.add('karma-page-popup-overlay-show');

		},

		/**
		 *check if element is in viewport
		 *
		 * @param {object} el jquery object
		 * @since 2.0
		 * @returns { boolean }
		 */

		isElementInViewport: function ( el ) {

			if ( typeof jQuery !== 'undefined' && el instanceof jQuery ) el = el[0];

			var rect = el.getBoundingClientRect();
			var windowHeight = ( window.innerHeight || document.documentElement.clientHeight );
			var windowWidth = ( window.innerWidth || document.documentElement.clientWidth );

			return (
					( rect.left >= 0 )
					&& ( rect.top >= 0 )
					&& ( ( rect.left + rect.width ) <= windowWidth )
					&& ( ( rect.top + rect.height ) <= windowHeight )
			);
		},

		/**
		 * Fire on click in drop down list
		 *
		 * @since 2.0
		 */
		selectDropDownList: function ( e ) {

			var that = ( e.target.classList.contains('karma-dropdown-option') ) ? e.target : e.target.closest('.karma-dropdown-option');

			$( that ).closest(".karma-dropdown-options").find('.karma-dropdown-option').removeClass("karma-selected-dropdown-option");
			$( that ).addClass("karma-selected-dropdown-option");
			$( that ).closest(".karma-dropdown-body").find(".karma-page-popup-hidden-input").val( $( that ).attr("data-value") );
			$( that ).closest(".karma-dropdown-body ").find(".karma-dropdown-selected-item").html( $( that ).find( ".karma-dropdown-option-title" ).text() );
			this.closeAddPageDropDown();

		},

		/**
		 *Open dropdowm
		 *
		 * @since 2.0
		 */
		openDropDown: function ( e ) {

			e.stopPropagation();
			var element = ( $( e.target ).hasClass( 'karma-dropdown-header' ) ) ? $( e.target ) : $( e.target ) .closest('.karma-dropdown-header'),
					optionsContainer = element.next('ul');

			$( '.karma-doropdown-opened' ).removeClass( 'karma-doropdown-opened' );
			optionsContainer.addClass('karma-doropdown-opened');
			if ( ! optionsContainer.find('.karma-selected-dropdown-option').length ) {
				optionsContainer.find('.karma-dropdown-option').first().addClass('karma-selected-dropdown-option');
			}

			var top = optionsContainer.find('.karma-selected-dropdown-option').position().top  * -1 + 180 - $( window ).scrollTop() ,
				left = 37 ;


			optionsContainer.css({
				'top'       : top,
				'left'      : left,
				'opacity'   : 0
			});

			if ( this.isElementInViewport( optionsContainer ) ) {
				optionsContainer.css( 'opacity', '' );
			} else {
				top = $( window ).innerHeight() - optionsContainer.outerHeight( true ) - ( optionsContainer.find('.karma-selected-dropdown-option').position().top  + 110 );
				optionsContainer.css( { 'opacity' : '', 'top' : top } );
			}

		},

		/**
		 * close popup page
		 *
		 * @since 2.0
		 */
		closeAddPage : function () {

			document.querySelector('.karma-page-popup-container').classList.remove('karma-page-popup-container-show');
			document.querySelector('.karma-page-popup-overlay').classList.remove('karma-page-popup-overlay-show');
			this.closeAddPageDropDown();

		},


});


	$(document).ready(function () {

		window.karmaBuilderPageManager  = new karmaBuilderPageManager.view({
			el: $(document),

		});

	})

})(jQuery, karmaBuilderPageManager);
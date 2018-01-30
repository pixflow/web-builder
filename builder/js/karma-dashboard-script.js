var karmaBuilderTypography = karmaBuilderTypography || {};

( function ( $, karmaBuilderTypography ) {
	'use strict';

	karmaBuilderTypography.view = Backbone.View.extend({

		events : {
			'mousedown body:not( .karma-dropdown-body )' 	: 'closeDropDown',
			'click .karma-dropdown-options > li'			: 'selectDropDownList',
			'click .karma-dropdown-header'					: 'openDropDown',
			'click .karma-backto-previous-location'			: 'animateKarmaPanels',
			'input .karma-range-slider-input'				: 'updateRangeSlider',
			'click .karma-font-weight-count'			    : 'openFontsDetails'

		},

		/**
		 * @summary In creating this view calls render
		 *
		 * @since 0.1.0
		 *
		 */
		initialize : function () {

			this.initRangeSlider();

		},

		/**
		 * @summary range slider in typography manager
		 *
		 * @since 0.1.0
		 *
		 */
		updateRangeSlider : function ( e ) {

			var input = e.target,
				value = input.value ,
				rangeSliderInput = e.target
					.closest('.karma-range-slider-content')
					.querySelector('.karma-range-slider-range');

			$( rangeSliderInput ).val( value ).change();

		},

		initRangeSlider : function(){

			var $rangeInputs = $('.karma-range-slider-range'),
				that = this;

			$rangeInputs.rangeslider({

				polyfill: false

			}).on( 'input', function () {

				$( this ).next()
							.next('.karma-range-slider-number')
							.find('input')
							.val( this.value );

				that.updateFontSize( this, this.value );
			});

		},


		updateFontSize : function ( element, value ) {

			var target = element.closest('.karma-typography-box').querySelector('.karma-typography-text');

			target.style.fontSize = value + 'px';

		},


		/**
		 * @summary Show/Hide font details
		 *
		 * @since 0.1.0
		 *
		 */
		openFontsDetails : function ( e ) {

			var parentElement = e.target.closest('.karma-font-list'),
				slideElement = parentElement.querySelector('.karma-font-details-part');

			if( 'block' != slideElement.style.display ){
				$('.karma-font-details-part').slideUp( 300 );
			}
			
			$( parentElement.querySelector('.karma-font-details-part') ).slideToggle( 300 );

		},

		/**
		 * @summary Drop down for typography manager page(font-family and font-weight)
		 *
		 * @since 0.1.0
		 *
		 */
		closeDropDown : function ( e ) {

			if( $(e.target).hasClass( '.karma-dropdown-body' ) || $(e.target).closest( '.karma-dropdown-body' ).length ){
				return;
			}
			$( '.karma-dropdown-body > ul' ).removeClass( 'karma-doropdown-opened' );

		},

		selectDropDownList : function ( e ) {

			var element = ( $( e.target ).hasClass('karma-dropdown-option') ) ? $( e.target ) : $( e.target ).closest('.karma-dropdown-option');
			element.closest('ul').find( '.karma-selected-dropdown-option' ).removeClass( 'karma-selected-dropdown-option' );
			element.addClass( 'karma-selected-dropdown-option' );
			element.closest( '.karma-dropdown-controller' ).find( '> input' ).val( element.attr( 'data-value' ) ).trigger( 'input' );
			element.closest( '.karma-dropdown-body' ).find( '.karma-dropdown-selected-item' ).html( element.find( '.karma-dropdown-option-title' ).text() );
			$( '.karma-dropdown-body > ul' ).removeClass( 'karma-doropdown-opened' );

		},

		openDropDown : function ( e ) {

			var element = ( $( e.target ).hasClass('karma-dropdown-header') ) ? $( e.target ) : $( e.target ).closest('.karma-dropdown-header'),
				optionsContainer =  element.next( 'ul' );


			$( '.karma-doropdown-opened' ).removeClass( 'karma-doropdown-opened' );
			optionsContainer.addClass( 'karma-doropdown-opened' );
			var top =  optionsContainer.find( '.karma-selected-dropdown-option' ).position().top * -1 + element.offset().top - $( window ).scrollTop(),
				left = element.offset().left - 5;
			optionsContainer.css( {
				'top' : top,
				'left' : left
			} );

		},

		/**
		 * @summary Switch between font manager and typography with animation
		 *
		 * @since 0.1.0
		 *@returns { void }
		 */
		animateKarmaPanels : function ( e ) {

			var $panelContainer = $( '.karma-typography-container' )
				,$panels =  $panelContainer.find( '> .karma-panel' )
				, that = this
				,$panelToSlideIn, $panelToSlideOut;

			e.preventDefault();

			$panelToSlideOut = $panels.filter('.current');
			$panelToSlideIn = $( $( e.target ).attr('href') );

			if ( $panelContainer.is('.karma-element-animating') ||
				$panelToSlideOut.attr( 'id' ) == $panelToSlideIn.attr( 'id' ) ) return false;

			$panelToSlideOut.addClass( 'karma-element-exit slidedown fade ').removeClass( 'current' );
			$panelToSlideIn.addClass( 'karma-element-enter slideup fade' );

			setTimeout(function() {
				$panelContainer.addClass( 'karma-element-animating' );
			}, 0);

			this.updatePanelNav();

			setTimeout( function() {
				that.stopAnimation( $panelContainer, $panels, $panelToSlideIn );
			}, 600 );

		},

		/**
		 * @summary Calls after page moves
		 *
		 * @param { object } $panelContainer panel witch contains sections
		 * @param { Array } $panels  Panels of tab
		 * @param { object } $panelToSlideIn  element to slide up
		 * @since 0.1.0
		 *@returns { void }
		 */
		stopAnimation : function( $panelContainer, $panels, $panelToSlideIn ) {

			$panelToSlideIn.removeClass().addClass('karma-panel current ');
			$panels.filter( ':not(#' + $panelToSlideIn.attr('id') + ')' ).removeClass().addClass( 'karma-panel' );
			$panelContainer.removeClass( 'karma-element-animating' );

		},

		/**
		 * @summary Update navigation after switching panels
		 *
		 * @since 0.1.0
		 *@returns { void }
		 */
		updatePanelNav : function() {

			var nextPanel = $( '.karma-panel.karma-element-exit' ),
				backButton = $( '.karma-backto-previous-location' );
			backButton.attr( 'href', '#' + nextPanel.attr('id')  )
			backButton.text( nextPanel.attr('data-button-text') );
			$( '.karma-location-name' ).text( $( '.karma-panel.karma-element-enter' ).data('panel-title') )
		},

	});

	$( document ).ready( function () {

		window.karmaBuilderTypography = new karmaBuilderTypography.view( { el : $( document ) } );

	})


} )( jQuery, karmaBuilderTypography );

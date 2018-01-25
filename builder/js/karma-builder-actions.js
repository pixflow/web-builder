
var karmaBuilderActions = karmaBuilderActions || {};

( function ( $, karmaBuilderActions ) {
	'use strict';

	karmaBuilderActions.view = Backbone.View.extend({

		events : {

			'click .builder-publish'                    : 'karmaPublish',
			'karma/finish/animation'                    : 'publishAnimation',
			'karma/finish/iframeInit.settingPanelHtml'  : 'settingPanelHtml'

		},

		karmaIframe : null,

		/** All element info */
		elementInfo: {},


		/**
		 * In creating this view calls render
		 *
		 * @since 0.1.0
		 *
		 */
		initialize : function () {

		},

		/**
		 *@summary Add grab style for elements
		 *
		 * @param   {object}    UI  ui object of dragged element in jqueryUI
		 * @since   0.1.0
		 * @returns {void}
		 */
		addGrabHandler: function ( e, UI ) {

			if ( UI.helper.hasClass( 'ui-draggable' ) ) {
				UI.helper.addClass( 'karma-grab-element' );
			} else {
				UI.helper.closest( '.ui-draggable' ).addClass( 'karma-grab-element' );
			}

		},

		/**
		 * @summary Remove grab style for elements
		 *
		 * @param   {object}    UI  ui object of dragged element in jqueryUI
		 * @since   0.1.0
		 * @returns {void}
		 */
		removeGrabHandler: function ( e, UI ) {

			var target = UI.helper;
			if ( target.hasClass( 'ui-draggable' ) ) {
				target.removeClass( 'karma-grab-element' );
			} else {
				target.closest( '.ui-draggable' ).removeClass( 'karma-grab-element' );
			}

		},

		/**
		 * @summary append template of setting panel to body
		 *
		 * @since   0.1.0
		 * @returns void
		 */
		settingPanelHtml: function () {

			window.karmaElementPanel = new karmaBuilderActions.elementPanel();
			this.bindTooltip();

		},

		/**
		 * @summary Create overlay element to prevent from other mouse events while dragging
		 * or blocking if exists
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		createOverlay: function () {

			var overlay = document.querySelector( '.karma-overlay-on-dragging' );
			if ( null == overlay ) {
				overlay = document.createElement( 'div' );
				overlay.classList.add( 'karma-overlay-on-dragging' );
				document.body.appendChild( overlay );
			} else {
				overlay.style.display = 'block';
			}

		},

		/**
		 * @summary Bind jquery tooltip plugin
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		bindTooltip : function () {

			var tooltip = $( '.karma-tooltip' );
			tooltip.tooltip({
				position: {
					my: "center top",
					at: "center bottom+5",
					using: function( position, feedback ) {
						$( this ).css( position );
						$( "<div>" )
								.addClass( "arrow" )
								.addClass( feedback.vertical )
								.addClass( feedback.horizontal )
								.appendTo( this );
					}
				},
				show : {
					delay: 350,
					duration: 100
				},
				hide: {
					delay: 200,
					duration: 100
				},
				open : function() {

					var windowSize = window.innerWidth;
					if( windowSize > 1440 ){
						tooltip.tooltip( "close" );
					}

				},

			});

			$(document).on( 'click', '.ui-tooltip', function ( e ) {
				e.stopPropagation();
			});

		},


		/**
		 * @summary Set display none for overlay
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		removeOverlay: function () {

			var overlay = document.querySelector( '.karma-overlay-on-dragging' );
			overlay.style.display = 'none';

		},

		/**
		 * @summary Enable draggable functionality on any item element
		 *
		 * @param    {string}    selector    An element CSS selector to set draggable.
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		initDraggable: function ( selector ) {

			var that = this;
			$( selector ).draggable( {
				appendTo    : "body",
				containment : 'document',
				cursorAt    : { top: 40, left: 40 } ,
				helper      : 'clone' ,
				start: function ( event, UI ) {

					$( ".karma-elements" ).getNiceScroll().remove();
					this.classList.add( 'karma-start-dragging' );
					UI.helper[ 0 ].style.transform = '';
					that.addGrabHandler( event, UI );
					that.createOverlay();

				},

				drag: function ( event, UI ) {

					that.getIframe().KarmaView.scroll( UI, event );
					that.getIframe().KarmaView.detectDropAreas( event, UI );

				},

				stop: function ( event, UI ) {

					var dropArea = that.getIframe().document.querySelector( '.karma-show-placeholder' );
					this.classList.remove( 'karma-start-dragging' );
					that.removeGrabHandler( event, UI );
					clearInterval( that.flyScroll );
					that.removeOverlay();
					that.getIframe().KarmaView.prepareBeforeDrop( dropArea, UI.helper[ 0 ].getAttribute( 'data-element-name' ), UI.helper[ 0 ].getAttribute( 'data-element-type' ) );
					that.getIframe().KarmaView.removePlaceHolders();
					window.karmaElementPanel.scrollElementPanel();

				}

			} );

		},

		/**
		 * @summary return builder elements info
		 *
		 * @param {string}  name    The name of element
		 * If the param dose not pass to the function, the function returns all element info
		 *
		 * @since 0.1.0
		 * @return {object} Element or elements info
		 */
		getElementInfo: function ( name ) {

			if ( 0 === Object.keys( this.elementInfo ).length ) {
				this.elementInfo = JSON.parse( this.getIframe().builderElementInfo );
			}

			if ( name ) {
				return this.elementInfo[ name ];
			} else {
				return this.elementInfo;
			}

		},

		/**
		 * @summary Open WordPress Media library and handle choose image from media library instead of unsplash
		 *
		 * @param {Object}         addImgLink    Selector dom object
		 * @param {function}     callBack      callback function
		 * @param {object}         view
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		openMediaLibrary: function ( addImgLink, callBack, view ) {

			// Set all variables to be used in scope
			var frame,
				that = this;

			if ( 'undefined' == typeof view ) {
				view = {};
			}

			// ADD IMAGE LINK
			addImgLink.addEventListener('click', function () {

				// If the media frame already exists, reopen it.
				if (frame) {
					frame.open();
					return;
				}

				// Create a new media frame
				frame = wp.media({
					title: 'Select or Upload Media Of Your Chosen Persuasion',
					button: {
						text: 'Use this media'
					},
					multiple: false
				});

				// When an image is selected in the media frame...
				frame.on( 'select', callBack.bind( frame, frame, view ) );

				// Finally, open the modal on click
				frame.open();

				that.getIframe().KarmaView.preventFromScrollingOnParent( $('.attachments-browser .attachments') );
			}, false);


		},

		/**
		 * @summary Returns builder Iframe
		 *
		 * @since   0.1.0
		 * @returns {object}
		 */
		getIframe : function () {

			if( null == this.karmaIframe ){
				this.karmaIframe = document.getElementById('karma-builder-iframe').contentWindow.window;
			}

			return this.karmaIframe;
		},

		/**
		 * @summary Publish content on click in publish button
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		karmaPublish : function () {

			var karmaIframeView = this.getIframe().KarmaView,
				button = document.querySelector( '.builder-publish' );

			button.classList.add('karma-publish-animation');
			if( "undefined" !=  typeof karmaIframeView ){
				karmaIframeView.$el.trigger('karma/before/publish');
			}

		},

		/**
		 * @summary Animate publish animation button
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		publishAnimation : function () {

			var karmaPublishButton = document.querySelector( '.builder-publish' );
			karmaPublishButton.classList.add( 'karma-publish-finish-animation' );

			setTimeout( function () {

				karmaPublishButton.querySelector( ".builder-publish-text" ).style.opacity = "0";

			}, 480 );
			setTimeout( function () {

				karmaPublishButton.querySelector( ".builder-publish-text" ).style.opacity = "1";
				karmaPublishButton.style.transition = 'none';
				karmaPublishButton.classList.remove( "karma-publish-animation", "karma-publish-finish-animation" );

			}, 2400 );

		}


	});


	$( document ).ready( function () {
		window.karmaBuilderEnviroment = new karmaBuilderActions.view( { el : $( document ) } );
	})


} )( jQuery, karmaBuilderActions );

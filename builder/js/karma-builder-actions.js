
var karmaBuilderActions = karmaBuilderActions || {};

( function ( $, karmaBuilderActions ) {
	'use strict';

	karmaBuilderActions.view = Backbone.View.extend({

		events : {

			'click .builder-publish'                        : 'karmaPublish',
			'karma/finish/animation'                        : 'publishAnimation',
			'karma/finish/iframeInit.settingPanelHtml'      : 'settingPanelHtml',
			'click .builder-code-editor-link'               : 'openCodeEditor',
			'click .karma-code-editor-container'            : 'closeCodeEditor',
			'click .karma-dropdown-header '       		    : 'openDropdown',
			'mousedown body:not( .karma-dropdown-body )'    : 'closeCodeEditorDropDown'

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
			this.initCodeEditor();
		},

		/**
		 *Add grab style for elements
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
		 * Remove grab style for elements
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
		 * append template of setting panel to body
		 *
		 * @since   0.1.0
		 * @returns void
		 */
		settingPanelHtml: function () {

			window.karmaElementPanel = new karmaBuilderActions.elementPanel();
			this.bindTooltip();

		},

		/**
		 * Create overlay element to prevent from other mouse events while dragging
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
		 * Bind jquery tooltip plugin
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
		 * Set display none for overlay
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		removeOverlay: function () {

			var overlay = document.querySelector( '.karma-overlay-on-dragging' );
			overlay.style.display = 'none';

		},

		/**
		 * Enable draggable functionality on any item element
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
		 * return builder elements info
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
		 * Open WordPress Media library and handle choose image from media library instead of unsplash
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
		 * Returns builder Iframe
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
		 * Publish content on click in publish button
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
		 * Animate publish animation button
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

		},

		/**
		 * Enable draggable functionality on blocks
		 *
		 * @param    {string}    selector    blocks CSS selector to set draggable.
		 *
		 * @since   0.1.1
		 * @returns {void}
		 */
		initBlocksDraggable: function ( selector ) {

			var that = this;
			$( selector ).draggable( {
				appendTo: "body",
				containment: 'document',
				cursorAt: { top: 40, left: 40 },
				helper: 'clone',
				start: function ( event, UI ) {

					$( ".karma-add-element-inactive-container" ).getNiceScroll().remove();
					this.classList.add( 'karma-start-blocks-dragging' );
					that.createOverlay();
					that.addGrabHandler( event, UI );
					if ( null != that.getIframe().document.querySelector( '.karma-blank-page-container' ) ) {
						var placeholder = that.getIframe().document.createElement( 'div' );
						placeholder.setAttribute( 'class', 'karma-insert-between-sections-placeholder karma-blank-page-placeholder' );
						that.getIframe().document.getElementById( 'karma-builder-layout' ).appendChild( placeholder );
					}

				},

				drag: function ( event, UI ) {

					that.getIframe().KarmaView.scroll( UI, event );
					that.getIframe().KarmaView.detectBlocksDropAreas( event, UI );

				},

				stop: function ( event, UI ) {

					this.classList.remove( 'karma-start-blocks-dragging' );
					that.removeGrabHandler( event, UI );
					clearInterval( that.flyScroll );
					that.removeOverlay();
					var dropArea = that.getIframe().document.querySelector( '.karma-show-placeholder' );
					if ( null != dropArea && 'IFRAME' == document.elementFromPoint( event.clientX, event.clientY ).nodeName ) {
						that.renderBlock( UI.helper.data( "block-id" ), dropArea );
						 that.getIframe().KarmaView.$el.trigger('karma/after/sortSections');
					}
					that.getIframe().KarmaView.removePlaceHolders();
					window.karmaElementPanel.scrollElementPanel();

				}

			} );

		},

		/**
		 * render block
		 *
		 * @param    {int}      blockID     block id
		 * @param    {object}   dropArea    drop area placeholder
		 *
		 * @since   0.1.1
		 * @returns {void}
		 */
		renderBlock: function ( blockID, dropArea ) {

			var blocks = karmaElementPanel.blocks[ blockID ].content;
			for ( var block in blocks ) {
				var newView = this.getIframe().KarmaView.renderElements( dropArea, JSON.parse( blocks[ block ] ), true );
				dropArea = newView.$el.nextAll( '.karma-insert-between-sections-placeholder' ).first()[ 0 ];
			}
			if ( null != this.getIframe().document.querySelector( '.karma-blank-page-container' ) ) {
				this.getIframe().$( '.karma-blank-page-container' ).remove();
			}

		},

		/**
		 * Hide all elements in document
		 * insteadof #karma-builder-layout and its children
		 *
		 * @since   2.0
		 * @returns {void}
		 */
		hideNonKarmaElements : function (){

			var containers = this.getIframe().$('#karma-builder-layout').parents( ':not(html):not(body)' );
			for ( var i = containers.length - 1; i >= 0; i-- ){
				if( undefined != containers[ i ].querySelector('#karma-builder-layout') ){
					containers[ i ].setAttribute( 'id', 'karma-show-parent' );
				}
			}
		},

		/*
		 * initialize code editor
		 *
		 * @since   2.0
		 * @returns {void}
		 */
		initCodeEditor: function () {

			var javascriptFlask = new CodeFlask;

			javascriptFlask.run( '.karma-custom-js', {
				language: 'javascript'
			} );

			var cssFlask = new CodeFlask;
			cssFlask.run( '.karma-custom-css', {
				language: 'css'
			} );

		},

		/**
		 * open code editor
		 *
		 * @since   2.0
		 * @returns {void}
		 */
		openCodeEditor: function ( e ) {

			var codeEditorContainer = document.querySelector( '.karma-code-editor-container' );
			var lang = e.currentTarget.dataset.script;
			$( '.karma-code-editor' ).css( 'display', 'none' );
			$( '.karma-custom-' + lang ).css( 'display', 'block' );
			if ( !codeEditorContainer.classList.contains( 'active' ) ) {
				codeEditorContainer.classList.add( 'active' );
			}

		},

		openDropdown : function ( e ){

			var target = $( e.target ),
				element = ( target.hasClass('karma-dropdown-header') ) ? target : target.closest('.karma-dropdown-header'),
				optionsContainer =  element.siblings( '.karma-dropdown-options' );
			$( 'header .karma-doropdown-opened' ).removeClass( 'karma-doropdown-opened' );
			optionsContainer.addClass( 'karma-doropdown-opened' );

		},

		/**
		 * close code editor
		 *
		 * @since   2.0
		 * @returns {void}
		 */
		closeCodeEditor: function ( e ) {

			if ( e.target.classList.contains( 'karma-code-editor-container' ) ) {
				var codeEditorContainer = document.querySelector( '.karma-code-editor-container' );
				if ( codeEditorContainer.classList.contains( 'active' ) ) {
					codeEditorContainer.classList.remove( 'active' )
				}
			}

		},

		/**
		 * close code editor drop down
		 *
		 * @since   2.0
		 * @returns {void}
		 */
		closeCodeEditorDropDown: function () {

			$( '.karma-dropdown-body > .karma-dropdown-options' ).removeClass( 'karma-doropdown-opened' );

		}

	});


	$( document ).ready( function () {
		window.karmaBuilderEnviroment = new karmaBuilderActions.view( { el : $( document ) } );
	})


} )( jQuery, karmaBuilderActions );
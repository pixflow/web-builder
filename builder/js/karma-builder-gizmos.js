( function( $, karmaBuilder ){

	karmaBuilder.gizmos = Backbone.View.extend({

		gizmos: {},

		/**
		 * @summery Build html for new section button
		 */
		newSectionButtonTemplate : '<div class="karma-new-section-button">'
		+'<div class="karma-new-section-icon">'
		+'{{{data.icon}}}'
		+'</div>'
		+'</div>',


		/**
		 *@summery  Build html for inner gizmo
		 */
		innerGizmoTemplate : '<div class=" karma-gizmo-template karma-inner-gizmo-template {{ data.className }} karma-gizmo-container"></div>' ,

		/**
		 *@summery  Build html for outer gizmo
		 */
		outerGizmoTemplate : '<div class="karma-gizmo-template karma-outer-gizmo-template {{ data.className }} karma-gizmo-container"></div>' ,


		/**
		 *@summery  Build html for text shortcode alignment
		 */
		alignmentGizmoTemplate : ' <button class="karma-drop-down-icon karma-alignment-drop-down-gizmo"> {{{ data.defaultIcon }}} </button> '
		+ '<div class="karma-drop-down-box karma-alignment-drop-down">'
		+ '<button class="karma-align-left" data-value="align-left" >'
		+ '{{{data.leftAlignIcon}}}'
		+ '</button>'
		+ '<button class="karma-align-right" data-value="align-right" >'
		+ '{{{data.rightAlignIcon}}}'
		+ '</button>'
		+ '<button class="karma-align-center" data-value="align-center" >'
		+ '{{{data.centerAlignIcon}}}'
		+ '</button>'
		+ '</div>' ,




		/**
		 *  Build html for gizmo resizeable for top & bottom
		 */
		bothSpacingGizmoTemplate : '<div class="{{ data.className }} karma-spacing-container">'
		+ '<div class="karma-spacing karma-both-top-spacing karma-top-spacing  " data-direction="both"  >'
		+ '<div class="karma-both-spacing-handler karma-both-spacing-handler-top ui-resizable-handle ui-resizable-s">'
		+ '<div class="karma-spacing-dot-container karma-top-spacing-height ">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-top-hover"><div class="spacing-dot-hover target-moving"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="karma-spacing karma-bottom-spacing  " data-direction="both" style="height:{{ data.space }}px">'
		+ '<div class="karma-both-spacing-handler karma-both-spacing-handler-bottom ui-resizable-handle  ui-resizable-s">'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-bottom-hover"><div class="spacing-dot-hover"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 *  Build html for gizmo resizeable for left
		 */
		leftSpacingGizmoTemplate :'<div class="left-resizing {{ data.className }} karma-spacing-container">'
		+ '<div class="karma-spacing  ui-resizable-handle ui-resizable-e karma-left-spacing " data-direction="left" style="width:{{ data.leftspace}}px">'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-left-hover">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-dot-hover target-moving"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 *  Build html for gizmo resizeable for right
		 */
		rightSpacingGizmoTemplate :'<div class="{{ data.className }} karma-spacing-container">'
		+ '<div class="karma-spacing karma-right-spacing ui-resizable-w" data-direction="right" style="width:{{ data.rightspace }}px">'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-right-hover">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-dot-hover target-moving"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 * Build html for gizmo resizeably for top
		 */
		topSpacingGizmoTemplate :'<div class="{{ data.className }} karma-spacing-container">'
		+ '<div class="karma-spacing karma-top-spacing ui-resizable-handle ui-resizable-s ui-resizable-n " data-direction="top" style="height:{{ data.spaceing }}px">'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-dot-hover target-moving"></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,


		/**
		 * Build html for Gizmo crop
		 */
		cropGizmoTemplate : '<div class="left-crop {{ data.className }} karma-crop-container">'
		+ '<div class="karma-crop karma-left-crop " data-direction="left" >'
		+ '<div class="karma-crop-dot-container ui-resizable-handle ui-resizable-e">'
		+ '<div class="crop-dot"></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="top-crop {{ data.className }} karma-crop-container">'
		+ '<div class="karma-crop karma-top-crop " data-direction="top" >'
		+ '<div class="karma-crop-dot-container ui-resizable-handle ui-resizable-n">'
		+ '<div class="crop-dot"></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="right-crop {{ data.className }} karma-crop-container">'
		+ '<div class="karma-crop karma-right-crop " data-direction="right" >'
		+ '<div class="karma-crop-dot-container ui-resizable-handle ui-resizable-w">'
		+ '<div class="crop-dot"></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="bottom-crop {{ data.className }} karma-crop-container">'
		+ '<div class="karma-crop karma-bottom-crop " data-direction="bottom" >'
		+ '<div class="karma-crop-dot-container ui-resizable-handle ui-resizable-s">'
		+ '<div class="crop-dot"></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>',


		/**
		 * Build html for Gizmo resize
		 */
		imageResizeGizmoTemplate : '',

		resizeGizmoTemplate : '<div class="{{data.class}}" data-snap="{{data.param.snapGrid}}" ></div>',

		topGizmoTemplate : '<div class="{{data.class}}">'
		+ ' <# _.each( data.params, function( param ){  #>'
		+ ' <div class="karma-builder-gizmo-{{ param.type }} {{ param.className }} " data-form="{{ param.form }}">'
		+ ' <# if( "icon" === param.type ){ #>'
		+ ' <div>{{{ param.icon }}}</div>'
		+ '<# } else if( "text" === param.type ) {#>'
		+ '<div>{{{ param.value }}}</div>'
		+ '<# } else if( "icon-text" === param.type ) {#>'
		+ '<span class="karama-gizmo-icon">{{{ param.icon }}}</span>'
		+ '<span class="karma-gizmo-title">{{{ param.text }}} {{param.counter}}</span>'
		+ '<# } #>'
		+ '</div>'
		+ '<# }) #>'
		+ '</div>' ,

		titleGizmoTemplate: '<div class="karma-title-gizmo-template karma-gizmo-container"></div>',

		/**
		 * Set Gizmo Events
		 *
		 * @param {object}  gizmoParams     gizmo params of view
		 *
		 * @since 0.1.0
		 *
		 * @returns { void }
		 */
		gizmoEvents: function ( gizmoParams ) {

			if ( 'undefined' === typeof gizmoParams ) {
				return;
			}

			for ( var i in gizmoParams ) {
				if ( 'undefined' !== typeof gizmoParams[ i ].form ) {
					var event = {};
					event[ 'click .' + gizmoParams[ i ].className ] = 'showSettingPanel';
					this.delegateEvents( _.extend( this.events, event ) );
				}
			}

		},

		/**
		 * Build gizmo controller of elements base on params given
		 *
		 * @param	{ object }	gizmoParams	Gizmo params
		 *
		 * @since 0.1.0
		 *
		 * @returns { string }    The HTML output of template
		 */
		gizmoBuilder: function ( gizmoParams ) {

			var templateName = gizmoParams.type + 'Template';

			if ( "undefined" !== typeof this[ templateName ] ) {
				gizmoParams = this.$el.triggerHandler('before/buildGizmo', [templateName, gizmoParams]);

				var $gizmoPlaceHolder = $( KarmaView.getUnderscoreTemplate( this[ templateName ], gizmoParams ) ),
					$gizmoContainer = $gizmoPlaceHolder.find( '.karma-gizmo-container' ).addBack('.karma-gizmo-container');

				if( 'undefined' == typeof gizmoParams.selector ){
					this.$el.append( $gizmoPlaceHolder );
				}else{
					var targetSelector = this.$el.find( gizmoParams.selector );
					targetSelector.append( $gizmoPlaceHolder );

					if( ! targetSelector.hasClass( 'karma-element-content' ) ){
						targetSelector.addClass( 'karma-have-child-gizmo' );
					}
				}

				for( var i in gizmoParams.params ) {

					if ( typeof karmaBuilder.gizmos[ gizmoParams.params[ i ].type ] !== "undefined" ) {

						var gizmo = new karmaBuilder.gizmos[ gizmoParams.params[ i ].type ]();
						gizmo.data = gizmoParams.params[ i ];
						gizmo.elementView = this;
						gizmo.$gizmoContainer = $gizmoContainer;
						gizmo.orginalSelector = gizmoParams.selector;
						gizmo.render();
					}
				}

				if ( 'function' === typeof this[ gizmoParams.type.replace( /-/g, '' ) ] ) {
					this[ gizmoParams.type.replace( /-/g, '' ) ]( $gizmoPlaceHolder );
				}
				this.gizmoEvents( gizmoParams.params );

			}


		},

		/**
		 * Build gizmo controller
		 *
		 * @since 0.1.0
		 *
		 * @returns { void }
		 */
		createGizmo: function () {

			for ( var i in this.gizmoParams ) {
				for ( var param in this.gizmoParams[ i ].params ) {
					if ( this.gizmoParams[ i ].params[ param ].hasOwnProperty( "showIndex" ) ) {
						this.gizmoParams[ i ].params[ param ][ "counter" ] = this.$el.parent().find( '> div[class *= "col-sm"]' ).index( this.$el ) + 1;
					} else {
						this.gizmoParams[ i ].params[ param ][ "counter" ] = "";
					}
				}
				this.gizmoBuilder( this.gizmoParams[ i ] );
			}

		},

		/**
		 * Build gizmo resizeable for top and bottom
		 *
		 * @param { object } $gizmo section gizmo
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		bothSpacingGizmo : function ( $gizmo ) {

			var karmaSection = $( '#' + this.elementSelector() );
			var that = this,
				options = {
					maxHeight 	: 700,
					minHeight 	: 0,
					handles 	: {},
					cursor		: 's-resize',
					scroll 		: true ,
					start: function ( event, UI ) {

						karmaSection.addClass( "karma-resizable-active" );
						that.showMouseToolTip( event );
						document.querySelector('#karma-builder-layout').style.paddingBottom = "200px";
						that.updateGizmoValue( UI, that.el.querySelector('.karma-section'), 'padding-top' );

					},
					stop : function ( event, ui ) {

						that.updateElementModel( 'space', ui.element.height() );
						karmaSection.removeClass( "karma-resizable-active" );
						that.removeMouseToolTip( event );
						document.querySelector('#karma-builder-layout').style.paddingBottom = "0";
						that.el.querySelector( '.karma-both-top-spacing ').style.height = ui.element.height() +"px";

					},
					resize: function( event, UI ){
						var padding = ( UI.size.height <= 0 ) ? 0 : UI.size.height + 'px';
						that.renderCss('#' + that.elementSelector() + ' .karma-section', 'padding-top', padding, that.currentDevice() );
						that.renderCss('#' + that.elementSelector() + ' .karma-section', 'padding-bottom', padding, that.currentDevice() );
					}
				};

			// Apply JQuery Ui resizable on bottom spacing
			options.handles.s = $gizmo.find( '.ui-resizable-s' ).eq(0);
			options.handles.n = $gizmo.find( '.ui-resizable-s' ).eq(1);
			this.$el.find( '.karma-bottom-spacing' ).resizable( options );
		},

		/**
		 * Update live gizmo value with
		 * its value of the current device
		 *
		 * @param	{object} UI
		 * @param	{object} element javascript element
		 * @param	{string} property css property
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		updateGizmoValue : function ( UI, element, property ){

			var newSize =  window.getComputedStyle( element ).getPropertyValue( property );
			newSize = ( newSize.indexOf('px') > -1 ) ? newSize.replace( 'px', '' ) : newSize;
			if ( 'padding-left' == property || 'padding-right' == property ){
				UI.originalSize.width = parseInt( newSize );
				UI.helper[ 0 ].setAttribute( 'style', 'width: ' + UI.size.width + 'px' );
			} else if ( 'padding-top' == property || 'padding-bottom' == property ){
				UI.originalSize.height = parseInt( newSize );
				UI.helper[ 0 ].setAttribute( 'style', 'height: ' + UI.size.height + 'px' );
			}

		},

		/**
		 * Create object containing list of shortcode property
		 * based on device to call set attributes function
		 *
		 * @param	{string} property CSS property
		 * @param	{string} value new value of CSS
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		updateElementModel : function ( property, value ){

			var newAttr = {};
			newAttr[ this.currentDevice() + property ] = parseInt( value );
			this.setAttributes( newAttr, true );

		},

		/**
		 * show and hide element gizmo
		 * @param	{string} mode of action
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		toggleShortcodeGizmo :function( mode ){

			var shortcodeGizmo = this.el.querySelector( ".karma-outer-gizmo-template" );
			if( null !== shortcodeGizmo ){
				if( "add" == mode ){
					shortcodeGizmo.classList.add( "karma-hide-shortcode-gizmo" );
				}else{
					shortcodeGizmo.classList.remove( "karma-hide-shortcode-gizmo" );
				}
			}
		},

		/**
		 * Build gizmo resizeably for top
		 * @param {object}  $gizmo     gizmo params of view
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		*/
		topSpacingGizmo : function ( $gizmo ) {

			var that = this,
				options = {
					maxHeight   : 700,
					minHeight   : 0,
					handles : {},
					start: function ( event, UI ) {
						that.showMouseToolTip( event );
						that.toggleShortcodeGizmo( "add" );
						that.updateGizmoValue( UI, that.el, 'padding-top' );

					},
					stop : function ( event, UI ) {

						that.removeMouseToolTip( event );
						that.updateElementModel( 'topspacepadding', UI.element.height());
						that.toggleShortcodeGizmo( "remove" );

					},
					resize: function( event, UI ){

						var elementId 	= that.elementSelector(),
						value = ( UI.size.height <= 0 ) ? 0 : UI.size.height + 'px';
						that.renderCss( "#" + elementId + "" , 'padding-top', value , that.currentDevice());

					}
				};

				options.handles.s = $gizmo.find( '.ui-resizable-s' );
				this.$el.find( '.karma-top-spacing' ).css( "height", this.getAttributes(['topspacepadding']).topspacepadding + "px" );
				this.$el.find( '.karma-top-spacing' ).resizable( options );

		},

		/**
		 *@summery update hidden gizmo status
		 *
		 * @since 0.1.1
		 *
		 * @return {void}
		 */
		updateHiddenGizmoStatus : function () {

			var hiddenGizmo = this.$el.find( ' > .karma-gizmo-template .karma-visibility-option' ),
				mode = document.body.getAttribute( 'karma-device-mode' );

			if( null == hiddenGizmo ){
				return ;
			}
			var visibilty = this.getAttributes( ['visibleon' + mode ] )['visibleon' + mode ] ;

			if( 'undefined' == typeof visibilty ){
				return ;
			}

			if( 'off' == visibilty ){
				hiddenGizmo.addClass( 'visibility-line' );
			}else{
				hiddenGizmo.removeClass( 'visibility-line' );
			}

		},

		/**
		 *@summery create options for right and left spacing gizmo
		 *
		 *@param	{string} spacingSelector left or right spacing gizmo of column
		 *@param	{string} paddingDirection type of padding (paddingLeft or paddingRight)
		 *
		 * @since 0.1.0
		 *
		 * @return {object} return options for right and left spacing gizmo
		 */
		createRightLeftSpacingGizmo : function ( spacingSelector, paddingDirection ) {

			var calculating = this.calculateMaxWidthSpacing( spacingSelector ),
				maxWidth = calculating,
				that = this,
				options = {
					maxWidth   : maxWidth,
					minWidth   : 0,
					handles : {},
					start : function( event , UI ){

						that.$el.find( '.karma-image-resize' ).css( {'width': ''});
						if ('padding-left' == paddingDirection) {
							that.updateGizmoValue( UI, that.el.querySelector('.karma-column'), 'padding-left' );
						}else{
							that.updateGizmoValue( UI, that.el.querySelector('.karma-column'), 'padding-right' );
						}
						that.showMouseToolTip( event );
						that.el.classList.add( 'karma-resizing-padding' );
						KarmaView.removeActiveElement();


					},

					stop : function ( event, ui ) {

						var value = ( parseInt( ui.element.width() ) < 0 ) ? 0 : parseInt( ui.element.width() );
						if ('padding-left' == paddingDirection) {
							that.updateElementModel( 'leftspace', value );
						} else {
							that.updateElementModel( 'rightspace', value );
						}
						that.removeMouseToolTip( event );
						that.el.classList.remove( 'karma-resizing-padding' );
						that.$el.trigger('karma/finish/modifyColumns');

					},
					resize: function( event, ui ){

						var calculating = that.calculateMaxWidthSpacing( spacingSelector );
						ui.element.resizable( "option", "maxWidth", calculating );
						var value = ( ui.size.width < 0 ) ? 0 : parseInt( ui.size.width );
						that.renderCss( '.karma-no-gutters > #' + that.elementSelector() + '> .karma-column', paddingDirection, value + 'px', that.currentDevice() );

					}
				};
			return options;

		},


		/**
		 * @summery call resize and crop on image Element
		 *
		 * @since 0.1.0
		 *
		 * @returns { void }
		 */
		imageResizeGizmo : function () {

			var that = this,
				options = {
					handles 	: "se,sw,nw,ne",
					aspectRatio	: true,
					scroll 		: true ,
					maxWidth	: that.el.closest( '.karma-column-margin' ).clientWidth,
					minWidth	: 50,
					minHeight	: 50,
					start: function ( event,UI ) {

						that.el.querySelector( '.image-gizmo-group' ).classList.add( 'karma-hide-gizmo' );
						UI.element.resizable( "option", "maxWidth", that.el.closest( '.karma-column-margin' ).clientWidth );

					},
					stop : function ( event, UI ) {

						that.el.querySelector( '.image-gizmo-group' ).classList.remove( 'karma-hide-gizmo' );
						that.setAttributes( {
							'width'			: UI.size.width,
							'height'		: UI.size.height,
							'resizing'	: that.el.querySelector( 'img' ).classList.contains( 'karma-image-both-resize' )
						}, true );
						that.el.querySelector( '.karma-image' ).setAttribute( 'width', UI.size.width );

					},
					
					resize: function( event, UI ){

						var IMG			= that.el.querySelector( 'img' ),
							cropElem 	= that.el.querySelector( '.karma-image-resize-crop' );

						UI.element.resizable( "option", "maxWidth", that.el.closest( '.karma-column-margin' ).clientWidth );
						IMG.classList.add( 'karma-image-both-resize' );
						if ( undefined != cropElem ){
							cropElem.style.width 	= UI.size.width + 'px';
							cropElem.style.height 	= UI.size.height + 'px';
						}

					}
				};

			// call resizable in image resize
			this.$el.find( '.karma-image-resize' ).resizable( options );

			// update options for crop and call resizable in image crop
			options.handles = 's,w,e';
			options.aspectRatio = false;
			options.resize = function(  event, UI ){

				UI.element.resizable( "option", "maxWidth", that.el.closest( '.karma-column-margin' ).clientWidth );
				$(this).parent().css( 'width' , UI.size.width + 'px' );
				that.el.querySelector( '.karma-image' ).setAttribute( 'width', UI.size.width );
				$(this).parent().css( 'height' , 'auto' );

			}
			this.$el.find( '.karma-image-resize-crop' ).resizable( options );

		},

		/**
		 * Build gizmo resizeable for left
		 *
		 * @param {object} $gizmo left spacing gizmo of column
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		leftSpacingGizmo : function ( $gizmo ) {

			var that = this;
			var options = this.createRightLeftSpacingGizmo( '.karma-right-spacing' , 'padding-left');
			that.$el.attr( 'data-direction','left' );
			options.handles.e = $gizmo.find( '.ui-resizable-e' );
			this.$el.find( '.karma-left-spacing' ).resizable( options );

		},

		/**
		 * Build gizmo resizeable for right
		 *
		 * @param {object} $gizmo  right spacing gizmo of column
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		rightSpacingGizmo : function ( $gizmo ) {

			var that = this;
			var options = this.createRightLeftSpacingGizmo( '.karma-left-spacing' , 'padding-right' );
			that.$el.attr( 'data-direction', 'left' );
			options.handles.w = $gizmo.find(  '.ui-resizable-w' );
			this.$el.find( '.karma-right-spacing' ).resizable( options );

		},

		/**
		 * return device mode
		 *
		 * @since 0.1.0
		 *
		 * @returns {string} name of device
		 */
		currentDevice : function () {

			if( document.body.classList.contains( 'karma-device-mode-desktop' ) ){
				return	'';
			}else if( document.body.classList.contains( 'karma-device-mode-tablet' ) ){
				return	'tablet';
			}else if( document.body.classList.contains( 'karma-device-mode-mobile' ) ){
				return	'mobile';
			}

		},

		/**
		 *@summery calculate maxWidth of left and  right spacing
		 *
		 * @param {string} spacingGizmo element which is resizing
		 * @since 0.1.0
		 *
		 * @return {number} returns value of maxWidth padding right
		 */
		calculateMaxWidthSpacing : function ( spacingGizmo ) {

			var $element = this.$el,
				elementWidth = $element.width(),
				elementSpacing = $element.find( spacingGizmo ).width(),
				// -10 is for the  item's size ( minimum ) on the page
				paddingValue = elementWidth - elementSpacing -10;
			return paddingValue;

		},

		/**
		 * show spacing tooltip on mouse down
		 *
		 * @since   0.1.0
		 *
		 *  @returns {void}
		 */
		showMouseToolTip : function( e ) {

			var that = this;
			var tooltipDiv = document.body.querySelector( '.tooltip-div' );
			tooltipDiv.style.display = 'block';
			tooltipDiv.style.top = ( e.clientY + 20 ) + 'px';
			tooltipDiv.style.left = ( e.clientX - 20 ) + 'px';
			tooltipDiv.innerText = '';

			e.target.classList.add( 'target-moving' );
			var direction = $( e.target ).closest( '.karma-spacing' ).attr( 'data-direction' );
			this.showMouseToolTipValue( tooltipDiv, direction );

			document.documentElement.addEventListener( 'mousemove', function(e){
				that.moveMouseToolTip( e, that, direction );
			} , false );

		},

		/**
		 * move spacing tooltip on mouse move
		 *
		 * @param {object} that element view
		 * @param {string} direction Spacing gizmo which is resizing
		 *
		 * @since   0.1.0
		 *
		 *  @returns {boolean | void}
		 */
		moveMouseToolTip : function( e, that, direction ) {

			var tooltipDiv = document.body.querySelector( '.tooltip-div' );

			if ( 'none' === tooltipDiv.style.display ) {
				return false;
			}
			var x = e.clientX,
				y = e.clientY;
			tooltipDiv.style.top = ( y + 20 ) + 'px';
			tooltipDiv.style.left = ( x - 20 ) + 'px';
			that.showMouseToolTipValue( tooltipDiv, direction );

		},

		/**
		 * check direction of spacing and set tooltip inner text
		 *
		 * @param	{object} 	tooltip    element
		 * @param	{string} 	direction  direction of spacing
		 *
		 * @since 0.1.0
		 *
		 * @return void
		 */
		showMouseToolTipValue : function( tooltipDiv, direction ){

			switch ( direction ){

				case 'left':
					tooltipDiv.innerText = ( this.$el.find( '> .karma-spacing-container .karma-spacing.karma-left-spacing' ).width() ) + ' px';
					break;
				case 'right':
					tooltipDiv.innerText = ( this.$el.find( '> .karma-spacing-container .karma-spacing.karma-right-spacing' ).width() ) + ' px';
					break;
				case 'both':
					tooltipDiv.innerText = ( this.$el.find( '> .karma-spacing-container .karma-spacing.karma-bottom-spacing' ).height() ) + ' px';
					break;
				case 'top':
					tooltipDiv.innerText = ( this.$el.find( '> .karma-element-content .karma-spacing-container  .karma-spacing.karma-top-spacing' ).height() ) + ' px';
					break;

			}

		},

		/**
		 *remove mouse tooltip in spacing
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		removeMouseToolTip : function( e ) {

			var tooltipDiv = document.body.querySelector( '.tooltip-div' );
			if( null != tooltipDiv ){
				tooltipDiv.style.display = 'none';
				e.target.classList.remove( 'target-moving' );
				document.documentElement.removeEventListener( 'mousemove', this.moveMouseToolTip );
				document.documentElement.removeEventListener( 'mouseup', this.removeMouseToolTip );
			}

		},

		/**
		 *create html fot tooltip
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		toolTipHtml: function () {

			if( ! document.querySelectorAll( '.tooltip-div' ).length ){
				var tooltip = document.createElement( 'div' );
				tooltip.setAttribute( 'class', 'tooltip-div' );
				document.body.appendChild( tooltip );
			}
		},

		/**
		 * Set the listener on build gizmo
		 *
		 * @param   {string}    tempName      Name of gizmo
		 * @param   {string}    gizmoParam    Gizmo options
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		gimzoAction : function ( e, tempName, gizmoParam ) {

			if ( 'bothSpacingGizmoTemplate' === tempName ) {

				var space = this.getAttributes(['space']);
				gizmoParam['space'] = space.space;

			} else if ( 'leftSpacingGizmoTemplate' === tempName ){

				var space = this.getAttributes(['leftspace']);
				gizmoParam['leftspace'] = space.leftspace;

			}else if ( 'rightSpacingGizmoTemplate' === tempName ){

				var space = this.getAttributes(['rightspace']);
				gizmoParam['rightspace'] = space.rightspace;

			}
			return gizmoParam;

		},

		/**
		 * Set the active element gizmo
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		showElementGizmo: function ( e ) {

			e.stopPropagation();
			var lastActiveElement = document.querySelector( '.karma-active-element' );
			this.removeElementChildGizmo();

			// If selected elements, its current element
			if ( null != lastActiveElement && false == this.el.classList.contains('karma-active-element') ) {
				lastActiveElement.classList.remove( 'karma-active-element' );
				this.removeDropDownGizmo();
				$( document ).trigger( "click.hideColorPickerContainer" );
			}

			KarmaView.$el.trigger( 'karma/callParent', [ this.el, [ 'activeColumn' ] , 1  ] );
			this.$el.trigger( 'karma/after/clickElement' );
			this.el.classList.add( 'karma-active-element' );
			KarmaView.closeElementPanel().removeSettingPanel();

		},

		/**
		 * Show element gizmo
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		showElementChildGizmo : function( e ){

			e.stopPropagation();
			this.showElementGizmo( e );
			var childGizmo = ( e.target.classList.contains( 'karma-have-child-gizmo' ) ) ? e.target : e.target.closest( '.karma-have-child-gizmo' );

			childGizmo.classList.add( 'karma-show-child-gizmo' );

		},

		removeElementChildGizmo : function () {

			var childGizmo = document.querySelector( '.karma-show-child-gizmo' ),
				childGizmoDropDown = document.querySelector('.open-drop-down-gizmo');

			if( null != childGizmo ){
				childGizmo.classList.remove( 'karma-show-child-gizmo' );
			}

			if( null != childGizmoDropDown ){
				childGizmoDropDown.classList.remove('open-drop-down-gizmo');
			}

			$( document ).trigger( "click.hideColorPickerContainer" );

		},

		/**
		 * close more sub menu when click in document
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		removeMoreSubmenu: function () {

			var moreSubmenu = document.querySelector('.karma-more-submenu'),
				moreOptions = document.querySelector('.karma-open-more-options');

			if( null != moreSubmenu ){
				moreSubmenu.classList.remove('karma-more-submenu');
			}

			if( null != moreOptions ){
				moreOptions.classList.remove('karma-open-more-options');
			}

		},

		/**
		 * show and hide options under more in gizmo panel
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		showGizmoRelatedToMore : function ( e ) {

			e.stopPropagation();
			var selector =  this.model.get('shortcode_name');
			selector = selector.replace( 'karma_', '' );

			selector = selector.replace( /_/g , '-' );
			selector = '.' + selector + '-gizmo-group';
			var elementGizmoSetting = this.el.querySelector( selector ),
				moreElements 		= elementGizmoSetting.querySelectorAll( 'div[data-form="more-panel"]:not(.karma-more-setting)' ),
				moreButton			= elementGizmoSetting.querySelector( '.karma-more-setting' ),
				moreButtonStatus	= moreButton.classList.contains( 'karma-open-more-options' ) ;

			$( ".open-drop-down-gizmo" ).removeClass( 'open-drop-down-gizmo' );
			for ( var i = 0 ; i < moreElements.length; i++ ){

				if ( moreButtonStatus ){

					moreElements[ i ].classList.remove( 'karma-more-submenu' );
					moreButton.classList.remove( 'karma-open-more-options' )

				}else {

					moreElements[ i ].classList.add( 'karma-more-submenu' );
					moreButton.classList.add( 'karma-open-more-options' )

				}
			}

		},

		/**
		 * open dropDown in gizmo
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		openDropDownGizmo: function ( e ) {

			e.stopPropagation();
			var dropDownIcon = (  e.target.classList.contains( 'karma-drop-down-icon' ) ) ? e.target : e.target.closest( 'button' ),
					dropDownBox = dropDownIcon.nextElementSibling;

			if( null != dropDownBox ){
				this.removeDropDownGizmo();
				dropDownBox.classList.add( 'open-drop-down-gizmo' );
				$( document ).trigger( "click.hideColorPickerContainer" );
			}

		},

		/**
		 * Close dropDown in gizmo
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		removeDropDownGizmo : function () {

			var openedDropDown = document.querySelector('.open-drop-down-gizmo');
			if( null != openedDropDown ){
				openedDropDown.classList.remove('open-drop-down-gizmo');
			}

		},

		/**
		 * Add new section
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		newSectionButton: function () {

			var newSectionPanel = KarmaView.getWpTemplate('karma-new-section'),
				that = this;
			this.el.insertAdjacentHTML( 'afterend', newSectionPanel );
			this.$el.next( '.karma-new-section' ).find( '.karma-new-section-layout' ).on( 'click', function ( e ) {
				
				var domNode = $( this )[0],
					newGrid = JSON.parse(domNode.getAttribute( 'data-value' ) ),
					placeholder = document.querySelectorAll( '.karma-section-placeholder-' + that.model.get( 'element_key' ) ),
					elementName = 'karma_section';

				if ( 1 === that.model.get( 'order' ) ) {
					placeholder = placeholder[ 1 ];
				} else {
					placeholder = placeholder[ 0 ];
				}

				var newSection = KarmaView.createKarmaElement( [ placeholder , 'after' ], elementName , { order : ( that.model.get( 'order' ) + 1 ) } );
				newSection.changeRowLayout( newGrid );
				KarmaView.createStyleSheetForElements( newSection.model.attributes.shortcode_attributes, newSection );
				KarmaView.reorderSections();
				KarmaView.$el.trigger('karma/after/sortSections');
				that.closeNewSectionPanel();
				newSection.showBorder( e );

			});
		},



		/**
		 * close new section Dropdown
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		closeNewSectionPanel : function () {

			var closeNewSectionPanel = document.querySelector('.open-new-section');
			if( null != closeNewSectionPanel ){
				closeNewSectionPanel.classList.remove( 'open-new-section' );
			}
			var button = document.querySelector('.section-button-rotate');
			if( null != button  ){
				button.classList.remove('section-button-rotate');
			}

		},

		/**
		 * open and close new section Dropdown
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		newSectionDropDown : function( e ){

			e.stopPropagation();

			var sectionButton = this.el.querySelector('.karma-new-section-icon');
			sectionButton.classList.toggle("section-button-rotate");

			var section = this.el.nextElementSibling;
			section.classList.toggle("open-new-section");

		},

		/**
		 * update dropDown gizmo and add class to active item
		 * @param {object}  event
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		updateDropDownBox: function ( e ) {

			e.stopPropagation();
			var dropDownItem = $( e.target ).closest( 'button' ),
				dropDownBox  = $( e.target ).closest( '.karma-drop-down-box' ),
				allDropDownItem = dropDownBox.find( 'button' );

			if( null != dropDownItem ){

				if( allDropDownItem.hasClass( 'karma-drop-down-active-item' ) && false == dropDownBox.hasClass('karma-font-style-drop-down') ){
					allDropDownItem.removeClass( 'karma-drop-down-active-item' );
				}
				if(  dropDownBox.hasClass('karma-font-style-drop-down') ){
					dropDownItem.toggleClass( 'karma-drop-down-active-item' );
					dropDownBox.prev().find('.karma-default-icon').css({
						backgroundImage : dropDownItem.find(' > div ').css('background-image')
					});
				}else{
					dropDownItem.addClass( 'karma-drop-down-active-item' );
					dropDownBox.prev().find('.karma-default-icon').css({
						backgroundImage : dropDownItem.find(' > div ').css('background-image')
					});
				}

			}


		}

	});


} )( jQuery, karmaBuilder );
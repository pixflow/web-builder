( function( $, karmaBuilder ){

	karmaBuilder.gizmos = Backbone.View.extend({


		gizmos: {},

		/**
		 *  Build html for new section button
		 */
		newSectionButtonTemplate : '<div class="karma-new-section-button">'
		+'<div class="karma-new-section-icon">'
		+'{{{data.icon}}}'
		+'</div>'
		+'</div>',


		/**
		 *  Build html for inner gizmo
		 */
		innerGizmoTemplate : '<div class=" karma-gizmo-template karma-inner-gizmo-template {{ data.className }} karma-gizmo-container"></div>' ,

		/**
		 *  Build html for outer gizmo
		 */
		outerGizmoTemplate : '<div class="karma-gizmo-template karma-outer-gizmo-template {{ data.className }} karma-gizmo-container"></div>' ,


		/**
		 *  Build html for text shortcode alignment
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
		 *  @summary Build html for gizmo resizeable for top & bottom
		 */
		bothSpacingGizmoTemplate : '<div class="{{ data.className }} karma-spacing-container">'
		+ '<div class="karma-spacing karma-top-spacing ui-resizable-handle ui-resizable-s " data-direction="both" style="height:{{ data.space }}px" >'
		+ '<div class="karma-spacing-dot-container karma-top-spacing-height">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-top-hover"><div class="spacing-dot-hover target-moving"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="karma-spacing karma-bottom-spacing ui-resizable-handle  ui-resizable-s " data-direction="both" style="height:{{ data.space }}px">'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-bottom-hover"><div class="spacing-dot-hover"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 *  @summary Build html for gizmo resizeable for left
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
		 *  @summary Build html for gizmo resizeable for right
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
		 * @summary Build html for gizmo resizeably for top
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
		 * @summary Build html for Gizmo crop
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
		 * @summary Build html for Gizmo resize
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
		 * @summary Set Gizmo Events
		 *
		 * @param {object}  gizmoParams     gizmo params of view
		 *
		 * @since 1.0.0
		 *
		 * @returns void
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
		 * @summary Build gizmo controller of elements base on params given
		 *
		 * @param	{object}	gizmoParams	Gizmo params
		 *
		 * @since 1.0.0
		 *
		 * @returns {string}    The HTML output of template
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
					this.$el.find( gizmoParams.selector ).append( $gizmoPlaceHolder );
				}


				for( var i in gizmoParams.params ) {



					if ( typeof karmaBuilder.gizmos[ gizmoParams.params[ i ].type ] !== "undefined" ) {

						var gizmo = new karmaBuilder.gizmos[ gizmoParams.params[ i ].type ]();
						gizmo.data = gizmoParams.params[ i ];
						gizmo.elementView = this;
						gizmo.$gizmoContainer = $gizmoContainer;
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
		 * @summary Build gizmo controller
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
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
		 * @summary Build gizmo resizeable for top and bottom
		 *
		 * @since 1.0.0
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
					scroll 		: true ,
					start: function ( event ) {
						karmaSection.addClass( "karma-resizable-active" );
						that.showMouseToolTip( event );
						document.querySelector('#karma-builder-layout').style.paddingBottom = "200px";
					},
					stop : function ( event, ui ) {
						karmaSection.removeClass( "karma-resizable-active" );
						that.setAttributes( { space: parseInt( ui.element.height() ) }, true );
						that.removeMouseToolTip( event );
						document.querySelector('#karma-builder-layout').style.paddingBottom = "0";
						that.el.querySelector( '.karma-top-spacing').style.height = ui.element.height() +"px";

					},
					resize: function( event, ui ){

						var padding = ui.size.height + 'px';
						karmaSection.find('.karma-section').css( {
							paddingTop 		: padding,
							paddingBottom	: padding
						});

						karmaSection.find('.karma-top-spacing').css( {
							height 	: padding
						});


					}
				};

			// Apply JQuery Ui resizable on bottom spacing
			options.handles.s = $gizmo.find( '.ui-resizable-s' ).eq(0);
			options.handles.n = $gizmo.find( '.ui-resizable-s' ).eq(1);
			this.$el.find( '.karma-bottom-spacing' ).resizable( options );


		},

		/**
		 * @summary show and hide element gizmo
		 * @param	{string} mode of action
		 *
		 * @since 1.0.0
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
		 * @summary Build gizmo resizeably for top
		 * @param {object}  gizmoParams     gizmo params of view
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		*/
		topSpacingGizmo : function ( $gizmo ) {

			var that = this,
				options = {
					maxHeight   : 700,
					minHeight   : 0,
					handles : {},
					start: function ( event ) {
						that.showMouseToolTip( event );
						that.toggleShortcodeGizmo( "add" );
					},
					stop : function ( event, ui ) {

						that.removeMouseToolTip( event );
						that.setAttributes( { topspacepadding : parseInt( ui.element.height() ) }, false );
						that.toggleShortcodeGizmo( "remove" );

					},
					resize: function( event, ui ){

						var currentSection = that.el;
						currentSection.style.paddingTop = ui.size.height + 'px';

					}
				};

			options.handles.s = $gizmo.find( '.ui-resizable-s' );
			this.$el.find( '.karma-top-spacing' ).css( "height", this.getAttributes(['topspacepadding']).topspacepadding + "px" );
			this.$el.find( '.karma-top-spacing' ).resizable( options );

		},

		/**
		 * @summery create options for right and left spacing gizmo
		 *
		 *@param	{string} paddingDirection type of padding (padddingleft or paddingRight)
		 *
		 * @since 1.0.0
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
					start : function( event ){

						that.$el.find( '.karma-image-resize' ).css( {'width': ''});
						that.showMouseToolTip( event );
						that.el.classList.add( 'karma-resizing-padding' );
						KarmaView.removeActiveElement();

					},

					stop : function ( event, ui ) {

						var value = ( parseInt( ui.element.width() ) < 0 ) ? 0 : parseInt( ui.element.width() );
						if ( 'padding-left' == paddingDirection ){
							that.setAttributes( { 'leftspace' : value }, true );
						}else {
							that.setAttributes( { 'rightspace' : value }, true );
						}
						that.removeMouseToolTip( event );
						that.el.classList.remove( 'karma-resizing-padding' );
						that.$el.trigger('karma/finish/modifyColumns');

					},
					resize: function( event, ui ){

						var calculating = that.calculateMaxWidthSpacing( spacingSelector );
						ui.element.resizable( "option", "maxWidth", calculating );
						var value = ( ui.size.width < 0 ) ? 0 : parseInt( ui.size.width );
						that.renderCss( '.karma-no-gutters > #' + that.elementSelector() + '> .karma-column', paddingDirection, value + 'px');

					}
				};
			return options;

		},


		/**
		 * @summery call resize and crop on image Element
		 *
		 * @since 1.0.0
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
				$(this).parent().css( 'height' , 'auto' );

			}
			this.$el.find( '.karma-image-resize-crop' ).resizable( options );

		},


		/**
		 * @summary Build gizmo resizeably for left
		 *
		 * @since 1.0.0
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
		 * @summary Build gizmo resizeable for right
		 *
		 * @since 1.0.0
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
		 *@summery calculate maxWidth of left and  right spacing
		 *
		 * @since 1.0.0
		 *
		 * @return {integer} returns value of maxwidth padding right
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
		 * @summary show spacing tooltip on mouse down
		 *
		 * @since   1.0.0
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
		 * @summary move spacing tooltip on mouse move
		 *
		 * @since   1.0.0
		 *
		 *  @returns {void}
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
		 * @param	{object} 	tooltip element
		 *
		 * @param	{string} 	direction of spacing
		 *
		 * @since 1.0.0
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
		 * remove mouse tooltip in spacing
		 *
		 * @since 1.0.0
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
		 * create html fot tooltip
		 *
		 * @since 1.0.0
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
		 * @summary Set the listener on build gizmo
		 *
		 * @param   {string}    tempName      Name of gizmo
		 * @param   {string}    gizmoParam    Gizmo options
		 *
		 * @since 1.0.0
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
		 * @summary Set the active shortcode gizmo
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		showElementGizmo: function ( e ) {

			e.stopPropagation();

			var lastActiveElement = document.querySelector( '.karma-active-element' );

			if ( null != lastActiveElement && false == this.el.classList.contains('karma-active-element') ) {
				lastActiveElement.classList.remove( 'karma-active-element' );
				this.removeDropDownGizmo();
				$( document ).trigger( "click.hideColorPickerContainer" );
			}

			KarmaView.$el.trigger( 'karma/callParent', [ this.el, [ 'activeColumn' ] , 1  ] );
			this.el.classList.add( 'karma-active-element' );
			KarmaView.closeElementPanel().removeSettingPanel();

		},


		/**
		 * @summary close more sub menu when click in document
		 *
		 * @since 1.0.0
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
		 * @summary show and hide options under more in gizmo panel
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		showGizmoRelatedToMore : function ( e ) {

			e.stopPropagation();
			var selector =  this.model.get('shortcode_name');
			selector = selector.replace( 'karma_', '' );
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
		 * @summary open dropDown in gizmo
		 *
		 * @since 1.0.0
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
		 * @summary Close dropDown in gizmo
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		removeDropDownGizmo : function () {

			var openedDropDown = document.querySelector('.open-drop-down-gizmo');
			if( null != openedDropDown ){
				openedDropDown.classList.remove('open-drop-down-gizmo');
			}

		},

		/**
		 * @summary Add new section
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		newSectionButton: function () {

			var newSectionPanel = KarmaView.getWpTemplate('karma-new-section'),
				that = this;
			this.el.insertAdjacentHTML( 'afterend', newSectionPanel );
			this.$el.next( '.karma-new-section' ).find( '.karma-new-section-layout' ).on( 'click', function () {
				var domNode = $(this)[0],
					newGrid = JSON.parse(domNode.getAttribute( 'data-value' ) ),
					placeholder = document.querySelector('.karma-section-placeholder-' + that.model.get( 'element_key' ) ),
					elementName = 'karma_section',
					validateModel = KarmaView.getValidateElementModel( placeholder, elementName ),
					model = karmaBuilder.karmaModels.add( validateModel );
				placeholder.insertAdjacentHTML( 'afterend', KarmaView.createBuilderModel( model ) );
				var newSection = KarmaView.createNewElement( elementName.replace('karma_', ''), model, true);
				newSection.changeRowLayout( newGrid );
				KarmaView.createStyleSheetForElements( newSection.model.attributes.shortcode_attributes, newSection );
				KarmaView.reorderSections();
				that.closeNewSectionPanel();
				newSection.$el.click();

			});
		},

		/**
		 * @summary close new section Dropdown
		 *
		 * @since 1.0.0
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
		 * @summary open and close new section Dropdown
		 *
		 * @since 1.0.0
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
		 * @summary close dropDown gizmo and add class to active item
		 * @param {object}  event
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		closeDropDownBox: function ( e ) {

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

			$( '.karma-drop-down-box' ).removeClass( 'open-drop-down-gizmo' );

		}

	});


} )( jQuery, karmaBuilder );
( function( $, karmaBuilder ){

	karmaBuilder.gizmos = Backbone.View.extend({

		gizmoTriggers: [],
		gizmos: {},



		/**
		 *  Build html for inner gizmo
		 */
		innerGizmoTemplate : '<div class=" karma-gizmo-template karma-inner-gizmo-template {{ data.className }}">'
		+ ' <# _.each( data.params, function( param ){ #>'
		+ ' <div class="karma-builder-gizmo-{{ param.type }} {{ param.className }} " data-form="{{ param.form }}">'
		+ '<# print( KarmaView.getUnderscoreTemplate( karmaBuilder.shortcodes.prototype[ param.type + "Template" ] , param.params ) ) #>'
		+ '</div>'
		+ '<# }) #>'
		+ '</div>' ,

		/**
		 *  Build html for outer gizmo
		 */
		outerGizmoTemplate : '<div class="karma-gizmo-template karma-outer-gizmo-template {{ data.className }}">'
		+ ' <# _.each( data.params, function( param ){ #>'
		+ ' <div class="karma-builder-gizmo-{{ param.type }} {{ param.className }} " data-form="{{ param.form }}">'
		+ '<# print( KarmaView.getUnderscoreTemplate( karmaBuilder.shortcodes.prototype[ param.type + "Template" ] , param.params ) ) #>'
		+ '</div>'
		+ '<# }) #>'
		+ '</div>' ,



		/**
		 *  Build html for text gizmo
		 */
		simpleTextTemplate : ' <div> {{ data.value }} </div> ',

		/**
		 *  Build html for icon gizmo
		 */
		simpleIconTemplate : ' <div> {{{ data.icon }}} </div> ',

		/**
		 *  Build html for color gizmo
		 */
		colorPickerTemplate: '<input class="karma-color-gizmo" id="{{{ data.id }}}"/>'
		+ '<# karmaBuilder.shortcodes.prototype.gizmoTriggers.push({ event: "colorPickerRender", data: data }); #>',

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
		 *  @summary Build html for text shortcode typography
		 */
		typographyGizmoTemplate : ' <button class="karma-drop-down-icon karma-typography-drop-down-gizmo"> {{{ data.defaultIcon }}} </button> '
			+ '<div class="karma-drop-down-box karma-typography-drop-down">'
			+'<div class="karma-typography-drop-down-icons">'
			+ '<div class="karma-typography-drop-down-right">'
			+ '<button class="karma-typography-h5" data-value="karma-typography-h5" >'
			+ '{{{data.h5Typography}}}'
			+ '</button>'
			+ '<button class="karma-typography-h6" data-value="karma-typography-h6" >'
			+ '{{{data.h6Typography}}}'
			+ '</button>'
			+ '<button class="karma-typography-p" data-value="karma-typography-p" >'
			+ '{{{data.pTypography}}}'
			+ '</button>'
			+ '</div>'
			+ '<div class="karma-typography-drop-down-left">'
			+ '<button class="karma-typography-h1" data-value="karma-typography-h1" >'
			+ '{{{data.h1Typography}}}'
			+ '</button>'
			+ '<button class="karma-typography-h2" data-value="karma-typography-h2" >'
			+ '{{{data.h2Typography}}}'
			+ '</button>'
			+ '<button class="karma-typography-h3" data-value="karma-typography-h3" >'
			+ '{{{data.h3Typography}}}'
			+ '</button>'
			+ '<button class="karma-typography-h4" data-value="karma-typography-h4" >'
			+ '{{{data.h4Typography}}}'
			+ '</button>'
			+ '</div>'
			+ '</div>'
			+ '<div class="karma-typography-link">'
			+ '<a href="">'
			+ '{{{data.typographyLink}}}'
			+ '</a>'
			+ '</div>'
			+ '</div>' ,



		/**
		 *  @summary Build html for gizmo resizeable for top & bottom
		 */
		bothSpacingGizmoTemplate : '<div class="{{ data.className }} karma-spacing-container">'
		+ '<div class="karma-spacing karma-top-spacing  " data-direction="both" >'
		+ '<div class="karma-spacing-dot-container ui-resizable-handle ui-resizable-s karma-top-spacing-height">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-top-hover"><div class="spacing-dot-hover target-moving"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="karma-spacing karma-bottom-spacing " data-direction="both" style="height:{{ data.space }}px">'
		+ '<div class="karma-spacing-dot-container ui-resizable-handle  ui-resizable-s">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-bottom-hover"><div class="spacing-dot-hover"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 *  @summary Build html for gizmo resizeable for left
		 */
		leftSpacingGizmoTemplate :'<div class="left-resizing {{ data.className }} karma-spacing-container">'
		+'<div class="karma-spacing karma-left-spacing " data-direction="left" style="width:{{ data.leftspace}}px">'
		+ '<div class="karma-spacing-dot-container ui-resizable-handle ui-resizable-e">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-left-hover"><div class="spacing-dot-hover target-moving"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 *  @summary Build html for gizmo resizeable for right
		 */
		rightSpacingGizmoTemplate :'<div class="{{ data.className }} karma-spacing-container">'
		+'<div class="karma-spacing karma-right-spacing" data-direction="right" style="width:{{ data.rightspace }}px">'
		+ '<div class="karma-spacing-dot-container  ui-resizable-handle ui-resizable-w ">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-right-hover"><div class="spacing-dot-hover target-moving"></div></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 * @summary Build html for gizmo resizeably for top
		 */
		topSpacingGizmoTemplate :'<div class="{{ data.className }} karma-spacing-container">'
		+'<div class="karma-spacing karma-top-spacing ui-resizable-handle ui-resizable-s ui-resizable-n " data-direction="top" style="height:{{ data.spaceing }}px">'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-dot-hover target-moving"></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,


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


		/** Drop area template for elements */
		fontStyleGizmoTemplate :  ' <button class="karma-drop-down-icon  karma-font-style-drop-down-gizmo"> {{{ data.defaultIcon }}} </button> '
		+ '<div class="karma-drop-down-box karma-font-style-drop-down">'
		+ '<button class="karma-set-bold-style" >'
		+ '{{{ data.bold }}}'
		+ '</button>'
		+ '<button class="karma-set-italic-style" >'
		+ '{{{ data.italic }}}'
		+ '</button>'
		+ '<button class="karma-set-underline-style" >'
		+ '{{{ data.underline }}}'
		+ '</button>'
		+ '</div>' ,


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

			if( gizmoParams.type !== 'icon' ) {
				var tempName = gizmoParams.type + 'Template',
					that = this;
				if ("undefined" !== typeof this[tempName]) {
					gizmoParams = that.$el.triggerHandler('before/buildGizmo', [tempName, gizmoParams]);
					return $(KarmaView.getUnderscoreTemplate(that[tempName], gizmoParams, that));
				}
			}
			var gizmo = new karmaBuilder.gizmos.icon();
			gizmo.data = gizmoParams;
			return gizmo.render();


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
				var $gizmo = this.gizmoBuilder( this.gizmoParams[ i ] );
				for ( var j in this.gizmoTriggers ) {
					$( document ).trigger( this.gizmoTriggers[ j ].event, [ this.gizmoTriggers[ j ].data ] );
				}
				this.gizmoTriggers = [];
				this.$el.append( $gizmo );
				if ( 'function' === typeof this[ this.gizmoParams[ i ].type.replace( /-/g, '' ) ] ) {
					this[ this.gizmoParams[ i ].type.replace( /-/g, '' ) ]( $gizmo );
				}
				this.gizmoEvents( this.gizmoParams[ i ].params );
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

			var that = this,
				options = {
					maxHeight 	: 700,
					minHeight 	: 0,
					handles 	: {},
					scroll 		: true ,
					stop : function ( event, ui ) {

						that.setAttributes( { space: parseInt( ui.element.height() ) }, true );

					},
					resize: function( event, ui ){

						that.renderCss( '.' + that.elementSelector(), 'padding-top', ui.size.height + 'px');
						that.renderCss( '.' + that.elementSelector(), 'padding-bottom', ui.size.height + 'px');
					}
				};

			// Apply JQuery Ui resizable on bottom spacing
			options.handles.s = $gizmo.find( '.ui-resizable-s' ).eq(0);
			options.handles.n = $gizmo.find( '.ui-resizable-s' ).eq(1);
			this.$el.find( '.karma-bottom-spacing' ).resizable( options );

		},

		/**
		 * @summary init karma color picker plugin on color picker gizmo
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		colorPicker: function ( e, data ) {

			var that = this,
				options = {
					selector            : "#" + data.id,
					multiColor          : true,
					firstColorTitle     : 'Main',
					secondColorTitle    : 'Hover',
					presetColors        : [
						'#FFFFFF'
						, '#FEF445'
						, '#FAC711'
						, '#F24726'
						, '#E6E6E6'
						, '#CEE741'
						, '#8FD14F'
						, '#DA0263'
						, '#808080'
						, '#13CDD4'
						, '#0DA789'
						, '#652CB3'
						, '#141414'
						, '#2D9BF0'
						, '#404BB2'
					]
				};

			new karmaColorPicker( options );

		},

		/**
		 * @summary Build gizmo resizeably for top
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
					stop : function ( event, ui ) {
						that.setAttributes( { space: parseInt( ui.element.height() ) }, true );
					},
					resize: function( event, ui ){
						var currentSection = that.el.querySelector( 'div:first-child' );
						currentSection.style.paddingTop = ui.size.height + 'px';
					}
				};
			options.handles.s = $gizmo.find( '.ui-resizable-s' );
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
					stop : function ( event, ui ) {

						var value = ( parseInt( ui.element.width() ) < 0 ) ? 0 : parseInt( ui.element.width() );
						if ( 'padding-left' == paddingDirection ){
							that.setAttributes( { 'leftspace' : value }, true );
						}else {
							that.setAttributes( { 'rightspace' : value }, true );
						}

					},
					resize: function( event, ui ){

						var calculating = that.calculateMaxWidthSpacing( spacingSelector );
						ui.element.resizable( "option", "maxWidth", calculating );
						var value = ( ui.size.width < 0 ) ? 0 : parseInt( ui.size.width );
						that.renderCss( '.karma-no-gutters > .karma-builder-element > .karma-column.' + that.elementSelector(), paddingDirection, value + 'px');

					}
				};
			return options;

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
				that.moveMouseToolTip(e , that, direction);
			} , false );
			document.documentElement.addEventListener( 'mouseup', this.removeMouseToolTip, false );

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
					tooltipDiv.innerText = ( this.$el.find( '> .karma-spacing-container .karma-spacing' ).height() ) + ' px';
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
			tooltipDiv.style.display = 'none';
			e.target.classList.remove( 'target-moving' );
			document.documentElement.removeEventListener( 'mousemove', this.moveMouseToolTip );
			document.documentElement.removeEventListener( 'mouseup', this.removeMouseToolTip );

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
			$( '.karma-builder-element' ).removeClass( 'karma-active-element' );
			this.$el.addClass( 'karma-active-element' );

		},

		/**
		 * @summary remove gizmo when click in document
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		removeGizmo: function () {

			$( document ).off( "click.removeGizmo" ).on( "click.removeGizmo", function(){

				$( ".karma-active-element" ).removeClass( 'karma-active-element' );
				$( ".open-drop-down-gizmo" ).removeClass( 'open-drop-down-gizmo' );

			})

		},

		/**
		 * @summary close more sub menu when click in document
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		removeMoreSubmenu: function () {

			$( document ).off( "click.removeMoreSubmenu" ).on( "click.removeMoreSubmenu", function(){

				$( ".karma-more-submenu" ).removeClass( 'karma-more-submenu' );
				$( ".karma-open-more-options" ).removeClass( 'karma-open-more-options' );

			})

		},

		/**
		 * @summary show and hide options under more in gizmo panel
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		showGizmoRelatedToMore : function () {

			var moreElements = this.el.querySelectorAll( 'div[data-form="more-panel"]:not(.karma-more-setting)' ),
				moreButtonStatus = this.el.querySelectorAll( '.karma-more-setting' )[ 0 ].classList.contains( 'karma-open-more-options' ) ;

			for ( var i = 0 ; i < moreElements.length; i++ ){

				if ( moreButtonStatus ){

					moreElements[ i ].classList.remove( 'karma-more-submenu' );
					this.el.querySelectorAll( '.karma-more-setting' )[ 0 ].classList.remove( 'karma-open-more-options' )

				}else {

					moreElements[ i ].classList.add( 'karma-more-submenu' );
					this.el.querySelectorAll( '.karma-more-setting' )[ 0 ].classList.add( 'karma-open-more-options' )

				}
			}

		},

		/**
		 * @summary open dropDown in gizmo
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		openDropDownGzmo: function ( e ) {

			var dropDownIcon = (  e.target.classList.contains('karma-drop-down-icon') ) ? e.target : e.target.closest( 'button' ),
					dropDownBox = dropDownIcon.nextElementSibling;
			if( null != dropDownBox ){
				if( dropDownBox.classList.contains('open-drop-down-gizmo') ){
					dropDownBox.classList.remove( 'open-drop-down-gizmo' );
				}else{
					$( '.karma-drop-down-box' ).removeClass( 'open-drop-down-gizmo' );
					dropDownBox.classList.add( 'open-drop-down-gizmo' );
				}
			}

		},

		/**
		 * @summary close dropDown gizmo
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		closeDropDownBox: function () {

			$( '.karma-drop-down-box' ).removeClass( 'open-drop-down-gizmo' );

		}


	});


} )( jQuery, karmaBuilder );
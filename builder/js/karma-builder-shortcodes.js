( function( $, karmaBuilder ){

	karmaBuilder.shortcodes = karmaBuilder.elementSettingPanel.extend({

		events:{
			'mousedown > .karma-spacing-container .karma-spacing-dot-container' 	: 'showMouseToolTip',
			'before/buildGizmo'														: 'gimzoAction' ,
			'click'																	: 'showElementGizmo',
			'click .karma-align-center'												: 'karmaTextShortcodealignCenter',
			'click .karma-align-left'												: 'karmaTextShortcodealignLeft',
			'click .karma-align-right'												: 'karmaTextShortcodealignRight',
			'click .karma-more-setting'											    : 'showGizmoRelatedToMore',
			'click .karma-drop-down-icon'											: 'openDropDownGzmo' ,
			'click .karma-set-bold-style'											: 'setBoldStyle' ,
			'click .karma-set-italic-style'											: 'setItalicStyle' ,
			'click .karma-set-underline-style'										: 'setUnderlineStyle' ,
		},


		documentEvents: {
			'colorPickerRender': 'colorPicker'
		},

		gizmoTriggers: [],

		shortcodeParams: {},

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
		 *  Build html for gizmo resizeable for top & bottom
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
		 *  Build html for gizmo resizeable for left
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
		 *  Build html for gizmo resizeable for right
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
		 * Build html for gizmo resizeably for top
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
		placeholderTemplate : '<div class="karma-element-placeholder {{ data.className }}" >'
			+ '<div class="karma-inner-placeholder" >'
			+ '</div>'
			+ '</div>' ,

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
		 * Set defaults in create
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		initialize : function( options ) {

			this.template = options.template;

			if( this.model ) {
				_.bindAll(this, "update","destroy");
				this.model.bind( 'change', this.update );
				this.model.bind( 'destroy', this.destroy );
			}
			this.delegateEventsOnDocument();
			this.gizmoParams = options.gizmoParams;
			this.toolTipHtml();
			this.removeGizmo();
			this.karmaLinksDocumentClick();
			this.removeMoreSubmenu();

		},

		/**
		 * @summary delegates events that set on document
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		delegateEventsOnDocument: function () {

			for ( var i in this.documentEvents ) {
				$( document ).off( i ).on( i, this[ this.documentEvents[ i ] ] );
			}

		},


		/**
		 * @summary align left for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaTextShortcodealignLeft: function () {

			document.execCommand( 'justifyLeft', true );

		},

		/**
		 * @summary align center for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaTextShortcodealignCenter: function () {

			document.execCommand( 'justifyCenter', true );

		},

		/**
		 * @summary align right for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaTextShortcodealignRight: function () {

			document.execCommand( 'justifyRight', true );

		},


		/**
		 * @summary trigger document click on links which have karma-document-click class
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaLinksDocumentClick : function () {

			this.$el.find( ".karma-document-click[href*=\"javascript:\"]" ).off( 'click.documentClick' ).on( 'click.documentClick', function(){

				$( document ).trigger( 'click' );

			} );

		},

		/**
		 * @summary Set italic style
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setItalicStyle : function () {

			document.execCommand( 'italic', true );

		} ,

		/**
		 * @summary Set underline style
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setUnderlineStyle : function () {

			document.execCommand( 'underline', true );

		},

		/**
		 * @summary Set bold style
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setBoldStyle : function () {

			document.execCommand( 'bold', true );

		},


		/**
		 * @summary Call necessary function after init any elements
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		renderSettings : function(){

			this.createPlaceHolders();
			this.createGizmo();
			this.delegateEvents();

		},

		/**
		 * @summary Create placeholders for each elements as drop area
		 * The function skip column and section for creating placeholders
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		createPlaceHolders : function () {

			var getName = this.model.get('shortcode_name'),
				placeholderHTML;
			if ( 'karma_column' != getName && 'karma_section' != getName ) {
				placeholderHTML = KarmaView.getUnderscoreTemplate( this.placeholderTemplate, { className : 'karma-insert-between-elements-placeholder' } );
				this.el.insertAdjacentHTML( 'afterend', placeholderHTML );
				if( 1 == this.model.get('order') ){
					this.el.insertAdjacentHTML( 'beforebegin', placeholderHTML );
				}
			} else if( 'karma_column' == getName && 0 == karmaBuilder.karmaModels.where({ parent_key : this.model.get('element_key') }).length ){
				placeholderHTML =  KarmaView.getUnderscoreTemplate( this.placeholderTemplate, { className : 'karma-column-placeholder' } );
				this.el.querySelector('.karma-column').innerHTML = placeholderHTML;
			}

		},

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
		 * @summary	Create the Object of params for all element
		 * Find the given element name param
		 *
		 * @param	{String}	elementName	The name of element
		 * @param	{String}	form	which form
		 *
		 * @since 1.0.0
		 * @returns {Array}	The element params
		 */
		getElementMap: function ( elementName, form ) {

			if ( this.shortcodeParams ) {
				this.shortcodeParams = JSON.parse( builderMaps );
			}
			return this.shortcodeParams[ elementName ][form];

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

			var tempName = gizmoParams.type + 'Template' ,
					that = this;
			if( "undefined" !== typeof this[ tempName ] ){
				gizmoParams  = that.$el.triggerHandler( 'before/buildGizmo', [ tempName, gizmoParams ] );
				return $( KarmaView.getUnderscoreTemplate( that[ tempName ], gizmoParams, that ) );
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
		//@TODO we dont need $gizmo here becuse this function now can acsees the current el and model of elements
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
		 * @summary call element method related to the changed attribute
		 *
		 * @param	{object} 	model	updated element model.
		 *
		 * @since 1.0.0
		 *
		 * @returns {boolean}
		 */
		update : function ( model ) {

			for ( var i in model.changed.shortcode_attributes.changed ){
				if( 'function' === typeof this[ i ] ){
					this[ i ]();

				} else {
					this.render();
				}
			}

		},

		/**
		 * @summary Render elements
		 *
		 * @since 1.0.0
		 * @returns {boolean}
		 */
		render : function () {

			this.el.innerHTML = this.template( this.model );
			$('body').trigger( 'karma_finish_render_html', [ this.model ] );
			return true;

		},

		/**
		 * @summary Delete elements model and html
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		destroy : function() {

			this.$el.find( '.karma-builder-element' ).each( function () {

				var childKey = $( this ).attr( 'data-element-key' ) ;
				karmaBuilder.karmaModels.remove( karmaBuilder.karmaModels.where( { "element_key" : childKey } ) );

			});

			// COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();
			this.$el.removeData().unbind();

			// Remove view from DOM
			this.remove();
			//karmaBuilder.karmaModels.remove( this.model );
			Backbone.View.prototype.remove.call(this);

		},

		/**
		 * @summary Update attribute(s) of element
		 *
		 * @param	{Object}	newAttributes list of new attribute
		 *
		 * @param	{boolean}	silent model in silent mode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setAttributes: function ( newAttributes, silent ) {

			var model = this.model,
				shortcodeAtrributes = JSON.parse( JSON.stringify( model.attributes.shortcode_attributes ) );

			shortcodeAtrributes.changed = {};
			for ( var attr in newAttributes ) {
				shortcodeAtrributes[ attr ] = newAttributes[ attr ];
				shortcodeAtrributes.changed[ attr ] = newAttributes[ attr ];
			}
			model.set( { 'shortcode_attributes': shortcodeAtrributes }, { silent : silent }  );

		},

		/**
		 * @summary GET Specific attribute(s) of element
		 * @example getAttributes ( ['space', 'slow'] ) // returns { space : 200, slow : false }
		 *
		 *
		 * @param	{Array}	attributesNames List of name attribute
		 *
		 * @since 1.0.0
		 *
		 * @returns {object}	 The value of given attribute
		 */
		getAttributes : function ( attributesNames ) {

			var model = this.model,
				shortcodeAtrributes = model.attributes.shortcode_attributes ,
				attributeValue = {} ;

			for ( var attr in attributesNames ) {
				if( shortcodeAtrributes[ attributesNames[ attr ] ] ){
					attributeValue[ attributesNames[ attr ] ] = shortcodeAtrributes[ attributesNames[ attr ] ];
				}
			}
			return attributeValue;

		},

		/**
		 * find children of model
		 *
		 * @since 1.0.0
		 *
		 * @returns array - children models id
		 */
		findChildren : function() {

			return karmaBuilder.karmaModels.where( { 'parent_key' : this.model.attributes['element_key'] } );

		},

		/**
		 * Open setting panel of each Element
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		showSettingPanel : function ( e ) {

			var form = $( e.currentTarget ).data('form');
			this.removeSettingPanel();
			this.openSettingPanel( form );
			window.elementSettingPanel = new karmaBuilder.elementSettingPanel( { model : this.model } );
			elementSettingPanel.delegateEvents();

		},

		/**
		 * Remove Class from javascript element
		 *
		 * @param	{object}    el   		element to remove Class
		 * @param	{string}    className   name of class to remove
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		removeClass: function ( el, className ) {

			if ( this.el.classList ){
				this.el.classList.remove( className );
			} else {
				this.el.className = this.el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			}

		},

		/**
		 * returns the element name with its key
		 *
		 * @since 1.0.0
		 *
		 * @returns { string }  Element name with its key
		 */
		elementSelector: function () {

			return this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' );

		},

		/**
		 * renders the css of model inside style tag
		 *
		 * @param	{ string } 	selector 	Css selector
		 * @param	{ string }	attribute	CSS attribute
		 * @param	{ string }	value		CSS value
		 *
		 * @since 1.0.0
		 *
		 * @returns { void }
		 */
		renderCss: function ( selector, attribute, value) {

			document.querySelector( '#style-' + this.elementSelector() ).innerHTML = this.generateNewStyle( selector, attribute, value );

		},

		/**
		 * renders the css of model inside style tag
		 *
		 * @param	{ string } 	selector 	Css selector
		 * @param	{ string }	attribute	CSS attribute
		 * @param	{ string }	value		CSS value
		 *
		 * @since 1.0.0
		 *
		 * @returns { string } new style of element to insert inside style tag
		 */
		generateNewStyle: function ( selector, attribute, value ) {

			var style 		= document.getElementById( 'style-'+this.elementSelector() ).innerHTML,
				styleResult = style.split(/[{}]+/),
				newStyle 	= "";

			if ( style.indexOf( selector ) < 0 ){
				newStyle = style + selector + '{' + attribute + ':' + value + ';}';
				return newStyle;
			}

			for ( var i = 0; i < styleResult.length ; i++ ){

				if ( i % 2 == 1 || "" == styleResult[ i ] )
					continue;
				if( selector == styleResult[ i ].replace(/^\s+|\s+$/g, '') ){
					newStyle +=  styleResult[ i ] + '{';
					newStyle += this.generateStyleString( styleResult[ i + 1 ], attribute, value )

				}else {
					newStyle += styleResult[ i ] + '{' + styleResult[ i + 1 ] + '}';
				}
			}

			return newStyle;

		},

		/**
		 * @summary renders the css of model inside style tag
		 *
		 * @param	{ string } 	styleResult Old style of element
		 * @param	{ string }	attribute	CSS attribute
		 * @param	{ string }	value		CSS value
		 *
		 * @since 1.0.0
		 *
		 * @returns { string } new style of element to insert inside style tag
		 */
		generateStyleString: function ( styleResult, attribute, value  ) {

			var newStyle = "";

			if ( styleResult.indexOf( attribute ) >= 0 ){

				var regex = new RegExp( attribute + ':([-0-9]*[a-z])*;' );
				newStyle += styleResult.replace( regex , attribute + ':' + value + ';');
				newStyle += '}';

			}else{
				newStyle += styleResult + attribute + ':' + value + ';}';
			}
			return newStyle;

		} ,


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

		openDropDownGzmo: function ( e ) {
			
			var dropDownIcon = (  e.target.classList.contains('karma-drop-down-icon') ) ? e.target : e.target.closest( 'button' ),
				dropDownBox = dropDownIcon.nextElementSibling;

			if( null != dropDownBox ){
			dropDownBox.classList.toggle( 'open-drop-down-gizmo' );
			}

		},



	});

	karmaBuilder.shortcodes.extend = function( child ) {

		var view = Backbone.View.extend.apply( this, arguments );
		if( true === child.denyEvents ){
			return view;
		}
		view.prototype.events = _.extend({}, this.prototype.events, child.events );
		return view;

	};

} )( jQuery, karmaBuilder );
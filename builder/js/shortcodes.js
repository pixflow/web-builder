( function( $, karmaBuilder ){

	karmaBuilder.shortcodes = karmaBuilder.elementSettingPanel.extend({

		events:{
			'mousedown > .karma-spacing-container .karma-spacing' 	: 'showMouseToolTip',
		},

		shortcodeParams: {},

		/*
		 * Underscore's default ERB-style templates are incompatible with PHP
		 * when asp_tags is enabled, so Karma uses Mustache-inspired templating syntax.
		 *
		 * Make the underscore template like wp.template function
		 *
		 */
		templateSettings : {
			evaluate	:  /<#([\s\S]+?)#>/g,
			interpolate	: /\{\{\{([\s\S]+?)\}\}\}/g,
			escape		: /\{\{([^\}]+?)\}\}(?!\})/g,
			variable	: 'data'
		},

		innerGizmoTemplate : '<div class="{{ data.className }}">'
		+ ' <# _.each( data.params, function( param ){ #>'
		+ ' <div class="karma-builder-gizmo-{{ param.type }} {{ param.className }} " data-form="{{ param.form }}">'
		+ ' <# if( "icon" === param.type ){ #>'
		+ ' <div>{{{ param.icon }}}</div>'
		+ '<# } else if( "text" === param.type ) {#>'
		+ '<div>{{{ param.value }}}</div>'
		+ '<# } #>'
		+ '</div>'
		+ '<# }) #>'
		+ '</div>' ,

		/**
		 * @summary Build html for gizmo resizeably for top&& bottom
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		bothSpacingGizmoTemplate : '<div class="{{ data.className }} karma-spacing-container">' +
		'<div class="karma-spacing karma-top-spacing ui-resizable-handle ui-resizable-s karma-top-spacing-height" data-direction="both" >'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-dot-hover target-moving"></div>'
		+ '</div>'
		+ '</div>'
		+ '<div class="karma-spacing karma-bottom-spacing ui-resizable-handle  ui-resizable-s" data-direction="both" style="height:{{ data.space }}px">'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-dot-hover"></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 * @summary Build html for gizmo resizeably for left
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		leftSpacingGizmoTemplate :'<div class="left-resizing {{ data.className }} karma-spacing-container">'
		+'<div class="karma-spacing karma-left-spacing ui-resizable-handle ui-resizable-e ui-resizable-e" data-direction="left" style="width:{{ data.spaceing }}px">'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-dot-hover target-moving"></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 * @summary Build html for gizmo resizeably for right
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		rightSpacingGizmoTemplate :'<div class="{{ data.className }} karma-spacing-container">'
		+'<div class="karma-spacing karma-right-spacing ui-resizable-handle ui-resizable-w ui-resizable-w" data-direction="right" style="width:{{ data.spaceing }}px">'
		+ '<div class="karma-spacing-dot-container">'
		+ '<div class="spacing-dot"></div>'
		+ '<div class="spacing-dot-hover target-moving"></div>'
		+ '</div>'
		+ '</div>'
		+ '</div>' ,

		/**
		 * @summary Build html for gizmo resizeably for top
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
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
				this.model.bind('change', this.update);
				this.model.bind('destroy', this.destroy);
			}
			this.gizmoParams = options.gizmoParams;
			this.toolTipHtml();

		},

		/**
		 * Set Gizmo Events
		 *
		 * @param {object}  gizmoParams     gizmo params of view
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		gizmoEvents: function ( gizmoParams ) {

			if ( 'undefined' == typeof gizmoParams ) {
				return;
			}

			for ( var i in gizmoParams ) {
				if ( 'undefined' != typeof gizmoParams[ i ].form ) {
					var event = {};
					event[ 'click .' + gizmoParams[ i ].className ] = 'showSettingPanel';
					this.delegateEvents( _.extend( this.events, event ) );
				}
			}

		},

		/**
		 * Create random string
		 *
		 * @param	integer	length	The length of random string that need to be produce
		 *
		 * @since 1.0.0
		 * @returns String	Random string
		 */
		createRandomString : function ( length ) {

			var characters = '0123456789abcdefghijklmnopqrstuvwxyz' ,
				charactersLength = characters.length ,
				randomString = '';

			for ( var i = 0; i < length; i++ ) {
				randomString += characters[ Math.floor( ( Math.random() * ( charactersLength - 1 ) ) + 1 ) ];
			}

			return randomString;

		},

		/**
		 * @summary	Create the Object of params for all element
		 * Find the given element name param
		 *
		 * @param	{String}	elementName	The name of element
		 * @param	{String}	form	which form
		 *
		 * @since 1.0.0
		 * @returns {array}	The element params
		 */
		getElementMap: function ( elementName, form ) {

			if ( this.shortcodeParams ) {
				this.shortcodeParams = JSON.parse( builderMaps );
			}
			return this.shortcodeParams[ elementName ][form];

		},

		/**
		 * @summary Fetch a JavaScript template for an id
		 *
		 * @param  	{string} 	templateName	A string that corresponds to a DOM element with an id prefixed with "tmpl-".
		 * @param 	{object}	templateParams	Data value for template
		 *
		 * @since 1.0.0
		 * @returns {string}    The HTML output of template
		 */
		getWpTemplate: function ( templateName, templateParams ) {

			if ( null === templateParams ) {
				templateParams = {};
			}
			var tempObject = wp.template( templateName ),
				tempHtml = tempObject( templateParams );

			return tempHtml;

		},

		/**
		 * @summary Fetch a Underscore ( JS ) template for an specific name
		 *
		 * @param	{string}	templateName	A string that corresponds for template.
		 * @param	{object}	params			Data value for template
		 *
		 * @since 1.0.0
		 * @returns {string}    The HTML output of template
		 */
		getUnderscoreTemplate : function ( templateName, params ) {

			var compiled,
				that = this ;
			compiled =  _.template( templateName, that.templateSettings );
			return compiled( params );

		},

		/**
		 * @summary Build gizmo controller of elements base on params given
		 *
		 * @param	{object}	params	Gizmo params
		 *
		 * @since 1.0.0
		 * @returns {string}    The HTML output of template
		 */
		gizmoBuilder: function ( gizmoParams ) {

			var tempName = gizmoParams.type + 'Template';
			if( "undefined" !== typeof this[ tempName ] ){
				var gizmoParams  = $('body').triggerHandler( 'before/buildGizmo', [ tempName, gizmoParams ] );
				return $( this.getUnderscoreTemplate( this[ tempName ], gizmoParams ) );
			}

		},

		/**
		 * @summary Build gizmo controller
		 *
		 * @since 1.0.0
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
				this.$el.append( $gizmo );
				if ( 'function' === typeof this[ this.gizmoParams[ i ].type.replace( /-/g, '' ) ] ) {
					this[ this.gizmoParams[ i ].type.replace( /-/g, '' ) ]( $gizmo );
				}
				this.gizmoEvents( this.gizmoParams[ i ].params );
			}

		},

		/**
		 * @summary Build gizmo resizeably for top and bottom
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		bothSpacingGizmo : function ( $gizmo ) {

			var that = this,
				options = {
					maxHeight   : 700,
					minHeight   : 0,
					handles : {},
					scroll : true ,
					stop : function ( event, ui ) {

						that.setAttributes( { space: parseInt( ui.element.height() ) }, true );

					},
					resize: function( event, ui ){

						var currentSection = that.el.querySelector( 'div:first-child' );
						currentSection.style.paddingTop = ui.size.height + 'px';
						currentSection.style.paddingBottom = ui.size.height + 'px';

					}
				};

			// Apply JQuery Ui resizable on bottom spacing
			options.handles.s = $gizmo.find( '.ui-resizable-s' ).eq(0);
			options.handles.n = $gizmo.find( '.ui-resizable-s' ).eq(1);
			this.$el.find( '.karma-bottom-spacing' ).resizable( options );

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
		 *@summery calculate maxWidth of left spacing
		 *
		 * @since 1.0.0
		 *
		 * @return {integer} return value of maxwidth padding left
		 */
		calculateMaxWidthLeftSpacing : function () {

			var element = this.$el,
				elementWidth = element.width(),
				elementRightSpacing = element.find( '.karma-right-spacing' ).width(),
				paddingLeftValue = elementWidth - elementRightSpacing;
			return paddingLeftValue;

		},


		/**
		 * @summary Build gizmo resizeably for left
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		leftSpacingGizmo : function ( $gizmo ) {

			var maxWidth = this.calculateMaxWidthLeftSpacing(),
				that = this,
				options = {
					maxWidth   : maxWidth,
					minWidth   : 0,
					handles : {},
					stop : function ( event, ui ) {
						that.setAttributes({space: parseInt(ui.element.width())}, true);
					},

					resize: function( event, ui ){
						ui.element.resizable( "option", "maxWidth", that.calculateMaxWidthLeftSpacing());
						var currentSection = that.el.querySelector('div:first-child');
						currentSection.style.paddingLeft = ui.size.width + 'px';
					}
				};
			that.$el.attr( 'data-direction','left' );
			options.handles.e = $gizmo.find( '.ui-resizable-e' );
			this.$el.find( '.karma-left-spacing' ).resizable( options );

		},

		/**
		 *@summery calculate maxWidth of right spacing
		 *
		 * @since 1.0.0
		 *
		 * @return {integer} return value of maxwidth padding right
		 */
		calculateMaxWidthRightSpacing : function () {

			var element = this.$el,
				elementWidth = element.width(),
				elementLeftSpacing = element.find( '.karma-left-spacing' ).width(),
				paddingRightValue = elementWidth - elementLeftSpacing;
			return paddingRightValue;

		},

		/**
		 * @summary Build gizmo resizeably for right
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		rightSpacingGizmo : function ( $gizmo ) {
			var maxWidth = this.calculateMaxWidthRightSpacing(),
				that = this,
				options = {
					maxWidth   : maxWidth,
					minWidth   : 0,
					handles : {},
					stop : function ( event, ui ) {
						that.setAttributes( {space: parseInt(ui.element.width())}, true );
					},
					resize: function( event, ui ){

						ui.element.resizable( "option", "maxWidth", that.calculateMaxWidthRightSpacing() );
						var currentSection = that.el.querySelector( 'div:first-child' );
						currentSection.style.paddingRight = ui.size.width + 'px';

					}
				};
			that.$el.attr( 'data-direction','right' );
			options.handles.w = $gizmo.find(  '.ui-resizable-w');
			this.$el.find( '.karma-right-spacing' ).resizable( options );

		},

		/**
		 * show mouse tooltip in spacing
		 *
		 * @since 1.0.0
		 *
		 * add event to tooltip
		 */
		showMouseToolTip : function( e ) {

			var that = this;
			var tooltipDiv = document.body.querySelector( '.tooltip-div' );
			tooltipDiv.style.display = 'block';
			tooltipDiv.style.top = ( e.clientY + 20 ) + 'px';
			tooltipDiv.style.left = ( e.clientX - 20 ) + 'px';
			tooltipDiv.innerText = '';

			e.target.classList.add( 'target-moving' );
			var direction = $(e.target).closest('.karma-spacing').attr('data-direction');
			this.showMouseToolTipValue( tooltipDiv, direction );

			document.documentElement.addEventListener('mousemove', function(e){
				that.moveMouseToolTip(e , that, direction);
			} , false );
			document.documentElement.addEventListener( 'mouseup', this.removeMouseToolTip, false );

		},

		/**
		 * move mouse tooltip in spacing
		 *
		 * @since 1.0.0
		 *
		 * give position to tooltip div
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
		 * remove all event from tooltip
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
		 */
		toolTipHtml: function () {

			if( ! document.querySelectorAll( '.tooltip-div' ).length ){
				var tooltip = document.createElement( 'div' );
				tooltip.setAttribute( 'class', 'tooltip-div' );
				document.body.appendChild( tooltip );
			}
		},

		/**
		 * Create unique id for each element of drop
		 *
		 * @since 1.0.0
		 *
		 * @returns String	Random string
		 */
		createNewElementKey : function () {

			var randomString = this.createRandomString( 6 ) ;
			if( karmaBuilder.karmaModels.where( { 'element_key' : randomString } ).length ){
				return this.createNewElementKey();
			}
			return randomString;

		},

		/**
		 * Set defaults in create
		 *
		 *  @param	{object} 	element	Javascript Element.
		 *
		 * @since 1.0.0
		 *
		 * @returns boolean
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
		 * Render new elements in defined placeHolder
		 *
		 *
		 * @since 1.0.0
		 *
		 * @returns boolean
		 */
		render : function () {

			this.el.innerHTML = this.template( this.model );
			$('body').trigger( 'karma_finish_render_html', [ this.model ] );
			return true;

		},

		/**
		 * Delete elements model and html
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		destroy : function() {

			this.$el.find( '.karma-builder-element' ).each( function () {

				var childId = $( this ).attr( 'data-element-id' ) ;
				karmaBuilder.karmaModels.remove( karmaBuilder.karmaModels.where( { "shortcode_id" : parseInt( childId ) } ) );

			});

			// COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();
			this.$el.removeData().unbind();

			// Remove view from DOM
			this.remove();
			Backbone.View.prototype.remove.call(this);

		},

		/**
		 * Update attribute(s) of element
		 *
		 * @param	{Object}	newAttributes list of new attribute
		 *
		 * @param	{boolean}	update model in silent mode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setAttributes: function ( newAttributes, silent ) {

			var model = this.model,
				shortcodeAtrributes = model.attributes.shortcode_attributes;
			for ( var attr in newAttributes ) {

				shortcodeAtrributes[ attr ] = newAttributes[ attr ];

			}
			model.set( { 'shortcode_attributes': shortcodeAtrributes }, { silent: silent } );

		},

		/**
		 * GET Specific attribute(s) of element
		 * @example // returns { space : 200, slow : false }
		 * getAttributes ( Space, Slow )
		 *
		 * @param	{array}	attributesNames List of name attribute
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

			return karmaBuilder.karmaModels.where( { 'parent_id' : this.model.attributes['shortcode_id'] } )

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
			this.openSettingPanel( this.model, form );
			window.builder = new karmaBuilder.elementSettingPanel( { model : this.model } );
			builder.delegateEvents();

		},

		/**
		 * Remove Class from javascript element
		 *
		 * @param	{object}    el   		element to remove Class
		 * @param	string	    className   name of class to remove
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		removeClass: function ( el, className ) {

			if ( this.el.classList ){
				this.el.classList.remove( className );
			} else{
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
		renderCss: function (selector,attribute,value) {

			var newStyle = this.generateNewStyle(selector,attribute,value);
			document.getElementById( this.elementSelector() ).innerHTML = newStyle;

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

			var style 		= document.getElementById( this.elementSelector() ).innerHTML,
				styleResult = style.replace( /\s/g, '' ).split(/[{}]+/),
				newStyle 	= "";

			for ( var i = 0; i < styleResult.length ; i++ ){

				if ( i % 2 == 1 || "" == styleResult[ i ] )
					continue;

				if( selector == styleResult[ i ] ){

					newStyle +=  styleResult[ i ] + '{';
					newStyle += this.generateStyleString( styleResult[ i + 1 ], attribute, value )

				}else {
					newStyle += styleResult[ i ] + '{' + styleResult[ i + 1 ] + '}';
				}
			}

			return newStyle;

		},

		/**
		 * renders the css of model inside style tag
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

				var regex = new RegExp( attribute + ':([0-9]*[a-z])*;' )
				newStyle += styleResult.replace( regex , attribute + ':' + value + ';');
				newStyle += '}';

			}else{
				newStyle += styleResult + attribute + ':' + value + ';}';
			}
			return newStyle;

		}

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
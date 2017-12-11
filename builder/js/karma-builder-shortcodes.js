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
			'click .karma-drop-down-box'											: 'closeDropDownBox' ,
			'click .karma-typography-h1'											: 'setTypographyH1' ,
			'click .karma-typography-h2'											: 'setTypographyH2' ,
			'click .karma-typography-h3'											: 'setTypographyH3' ,
			'click .karma-typography-h4'											: 'setTypographyH4' ,
			'click .karma-typography-h5'											: 'setTypographyH5' ,
			'click .karma-typography-h6'											: 'setTypographyH6' ,
			'click .karma-typography-p'												: 'setTypographyP' ,
		},


		documentEvents: {

			'colorPickerRender': 'colorPicker'

		},

		shortcodeParams: {},

		/** Drop area template for elements */
		placeholderTemplate : '<div class="karma-element-placeholder {{ data.className }}" >'
		+ '<div class="karma-inner-placeholder" >'
		+ '</div>'
		+ '</div>' ,

		shortcodeParams: {},

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
			this.gizmoParams = options.gizmoParams;
			this.toolTipHtml();
			this.removeGizmo();
			this.karmaLinksDocumentClick();
			this.removeMoreSubmenu();

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
		 * @summary set h1 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH1: function () {

			this.setAttributes( { 'tag': 'h1' }, false );

		},

		/**
		 * @summary set h2 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH2: function () {

			this.setAttributes( { 'tag': 'h2' }, false );

		},

		/**
		 * @summary set h3 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH3: function () {

			this.setAttributes( { 'tag': 'h3' }, false );

		},

		/**
		 * @summary set h4 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH4: function () {

			this.setAttributes( { 'tag': 'h4' }, false );

		},

		/**
		 * @summary set h5 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH5: function () {

			this.setAttributes( { 'tag': 'h5' }, false );

		},

		/**
		 * @summary set h6 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH6: function () {

			this.setAttributes( { 'tag': 'h6' }, false );

		},

		/**
		 * @summary set p typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyP: function () {

			this.setAttributes( { 'tag': 'p' }, false );

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

	});

	karmaBuilder.shortcodes.extend = function( child ) {

		var view = Backbone.View.extend.apply( this, arguments );
		if( true === child.denyEvents ){
			return view;
		}
		view.prototype.events = _.extend({}, this.prototype.events, child.events );
		return view;

	};

	karmaBuilder.shortcodes = karmaBuilder.shortcodes.extend( karmaBuilder.gizmos.prototype );

} )( jQuery, karmaBuilder );
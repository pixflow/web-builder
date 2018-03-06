( function( $, karmaBuilder ){

	karmaBuilder.button = karmaBuilder.shortcodes.extend({

		events: {

			'keyup .karma-button-link'			: 'checkEmptyLink',
			'click .karma-button-link'			: 'titleLink',
			'blur  .karma-button-link '    		: 'saveTitleLink',
			'keypress .karma-button-link'		: 'deactiveEnter'

		},

		initialize: function ( options ) {

			karmaBuilder.button.__super__.initialize.apply( this, arguments );
			this.options = options;

			if( this.options.renderStatus ){
				this.render();
			}

		},


		/**
		 * @summary Render button element
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		render : function () {

			var source = this.template( this.model );
			this.el.querySelector( '.karma-element-content' ).innerHTML = source;

		},


		/**
		 * @summary  Deactivate enter in link text
		 *
		 * @since 0.1.1
		 * @return {number}
		 */
		deactiveEnter : function ( e ) {

			return e.which != 13;

		},


		/**
		 * @summary check empty link text
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		checkEmptyLink : function () {

			var content 	= this.el.querySelector( '.karma-button-link' ),
				contentData = content.innerHTML;

			if ( "" == contentData.trim() ) {
				content.innerText = "";
				this.el.querySelector( '.karma-button-link-shape' ).style.display = 'none';
			}

			this.setAttributes( { 'linkcontent' : contentData },  true );

		},


		/**
		 * @summary Active editable link
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		titleLink : function ( e ) {

			e.preventDefault();
			e.stopPropagation();
			var content = this.el.querySelector( '.karma-button-link span' );

			if( null != content ){
				if(document.body.classList.contains( 'karma-device-mode-desktop' )) {
					content.contentEditable = true;
					content.focus();
				}
			}

			this.showElementGizmo( e );

		},


		/**
		 * @summary Save the title of button
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		saveTitleLink : function () {

			var content 	= this.el.querySelector( '.karma-button-link span' ),
				contentData = this.el.querySelector( '.karma-button-link span' ).innerHTML;

			if ( "" == contentData.trim() ) {
				content.innerText = "";
			}

			this.setAttributes( { 'linkcontent' : contentData },  true );

		},
		
		/**
		 * @summary Set color for link
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		generalcolor : function () {

			var elementId 	= this.elementSelector(),
				colorValue  = this.getAttributes( ['generalcolor'] );

			this.renderCss( "#" + elementId + " .karma-button-container.karma-button-fill", 'background-color', colorValue.generalcolor  );
			this.renderCss( "#" + elementId + " .karma-button-outline .karma-button-link span", 'color', colorValue.generalcolor  );
			this.renderCss( "#" + elementId + " .karma-button-container.karma-button-outline", 'border-color', colorValue.generalcolor  );
			this.renderCss( "#" + this.elementSelector() + " .karma-button-container.karma-button-fill", 'border-color', colorValue.generalcolor  );


		},

		/**
		 * @summary Set color for link
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		textcolor : function () {

			var elementId 	= this.elementSelector(),
				colorValue  = this.getAttributes( ['textcolor'] );

			this.renderCss( "#" + elementId + " .karma-button-fill .karma-button-link span", 'color', colorValue.textcolor  );

		},


		/**
		 * @summary Set border radius for button
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		rangemodel : function () {

			var elementId 	= this.elementSelector(),
				border		= this.getAttributes(['rangemodel']);

			this.renderCss( "#" + elementId + " .karma-button-container", 'border-radius', border.rangemodel + "px"  );

		} ,

		/**
		 * @summary set link for text
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		linkurl: function () {

			var elementId 	= this.$el,
				linkValue  = this.getAttributes( ['linkurl'] );

			elementId.find( '.karma-button-link' ) .attr( "href", linkValue.linkurl );
		},

		/**
		 * @summary set link target for text
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		target: function () {

			var elementId 	= this.$el,
				linktarget  = this.getAttributes( ['target'] );

			elementId.find( '.karma-button-link' ).attr( "target", linktarget.target );
		},


		/**
		 * @summary background color changes
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		backgroundcolor: function () {

			var elementId = this.elementSelector();
			this.renderCss( '#' + elementId + ' .karma-button', 'background-color', this.getAttributes( [ 'backgroundcolor' ] ).backgroundcolor );

		},


		/**
		 * @summary Update type of element
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		type : function () {

			if( 'outline' == this.getAttributes( ['type'] ).type ) {
				this.$el.find( '.karma-button-container' ).removeClass( 'karma-button-fill' ).addClass( 'karma-button-outline' );
			}else{
				this.$el.find( '.karma-button-container' ).addClass( 'karma-button-fill' ).removeClass( 'karma-button-outline' );
				this.renderCss( "#" + this.elementSelector() + " .karma-button-container.karma-button-fill", 'border-color', this.getAttributes( ['generalcolor'] ).generalcolor );

			}
		}
		
	});

})( jQuery, karmaBuilder );

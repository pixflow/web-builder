( function( $, karmaBuilder ){

	karmaBuilder.gizmos.typography = Backbone.View.extend({

		events: {

			'click .karma-typography-drop-down-icons button'		: 'setTypography' ,
		},

		/**
		 * Build html for typography gizmo
		 */
		template : '<# var link = window.top.document.querySelector(".builder-Typography-label a").getAttribute("href") #>' +
		' <button class="karma-drop-down-icon karma-typography-drop-down-gizmo"> <div class="karma-default-icon" style="background-image: url({{ data.params.defaultIcon }})" ></div> </button> '
			+ '<div class="karma-drop-down-box karma-typography-drop-down">'
				+'<div class="karma-typography-drop-down-icons">'
					+ '<div class="karma-typography-drop-down-right">'
						+ '<button class="karma-typography-h5 <# if( "h5" == data.tag ){ print("karma-drop-down-active-item"); } #> " data-karma-value="h5" >'
							+ '<div class="karma-typography-h5-icon" style="background-image: url({{ data.params.h5Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-h6 <# if( "h6" == data.tag ){ print("karma-drop-down-active-item"); } #>  " data-karma-value="h6" >'
							+ '<div class="karma-typography-h6-icon" style="background-image: url({{ data.params.h6Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-p <# if( "p" == data.tag ){ print("karma-drop-down-active-item"); } #>" data-karma-value="p" >'
							+ '<div class="karma-typography-p-icon" style="background-image: url({{ data.params.pTypography }})"></div>'
						+ '</button>'
					+ '</div>'
					+ '<div class="karma-typography-drop-down-left">'
						+ '<button class="karma-typography-h1 <# if( "h1" == data.tag ){ print("karma-drop-down-active-item"); } #> " data-karma-value="h1" >'
							+ '<div class="karma-typography-h1-icon" style="background-image: url({{ data.params.h1Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-h2 <# if( "h2" == data.tag ){ print("karma-drop-down-active-item"); } #> " data-karma-value="h2" >'
							+ '<div class="karma-typography-h2-icon" style="background-image: url({{ data.params.h2Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-h3 <# if( "h3" == data.tag ){ print("karma-drop-down-active-item"); } #> " data-karma-value="h3" >'
							+ '<div class="karma-typography-h3-icon" style="background-image: url({{ data.params.h3Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-h4 <# if( "h4" == data.tag ){ print("karma-drop-down-active-item"); } #> " data-karma-value="h4" >'
							+ '<div class="karma-typography-h4-icon" style="background-image: url({{ data.params.h4Typography }})"></div>'
						+ '</button>'
					+ '</div>'
				+ '</div>'
				+ '<div class="karma-typography-link">'
					+ '<a href="{{link}}">'
						+ '{{{ data.params.typographyLink }}}'
					+ '</a>'
				+ '</div>'
			+ '</div>' ,

		/**
		 * @summary initialize typography
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		initialize :function(){

			this.setElement( $( '<div>' ) );

		},

		/**
		 * @summary render typography
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		render: function(){

			this.update();
			this.$gizmoContainer.append( this.el );

		},

		update: function(){

			if( 'undefined' != typeof this.data.params.model ){
				var modelName = this.data.params.model;
				this.data.tag = this.elementView.getAttributes( [ modelName ] )[ modelName ];
			}else{
				this.data.tag = this.elementView.getAttributes( ['tag'] ).tag;

			}
			this.data.params[ 'defaultIcon' ] = this.data.params[ this.data.tag + 'Typography' ];
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );


		},

		/**
		 * @summary functionality of h1 typography
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		h1Typography: function () {

			var that = this;

			if( 'undefined' != typeof that.data.params.model ){
				var modelNameChange = {};

				modelNameChange[ that.data.params.model ] = 'h1';
				that.elementView.setAttributes( modelNameChange, false );
			}else {
				this.elementView.setAttributes( { 'tag' : 'h1' }, false );
			}

		},

		/**
		 * @summary functionality of h2 typography
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		h2Typography: function () {

			var that = this;

			if( 'undefined' != typeof that.data.params.model ){
				var modelNameChange = {};

				modelNameChange[ that.data.params.model ] = 'h2';
				that.elementView.setAttributes( modelNameChange, false );
			}else {
				this.elementView.setAttributes( { 'tag' : 'h2' }, false );
			}

		},

		/**
		 * @summary functionality of h3 typography
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		h3Typography: function () {

			var that = this;
			if( 'undefined' != typeof that.data.params.model ){
				var modelNameChange = {};

				modelNameChange[ that.data.params.model ] = 'h3';
				that.elementView.setAttributes( modelNameChange, false );
			}else {
				this.elementView.setAttributes( { 'tag' : 'h3' }, false );
			}

		},

		/**
		 * @summary functionality of h4 typography
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		h4Typography: function () {

			var that = this;
			if( 'undefined' != typeof that.data.params.model ){
				var modelNameChange = {};

				modelNameChange[ that.data.params.model ] = 'h4';
				that.elementView.setAttributes( modelNameChange, false );
			}else {
				this.elementView.setAttributes( { 'tag' : 'h4' }, false );
			}

		},

		/**
		 * @summary functionality of h5 typography
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		h5Typography: function () {

			var that = this;
			if( 'undefined' != typeof that.data.params.model ){
				var modelNameChange = {};

				modelNameChange[ that.data.params.model ] = 'h5';
				that.elementView.setAttributes( modelNameChange, false );
			}else {
				this.elementView.setAttributes( { 'tag' : 'h5' }, false );
			}

		},

		/**
		 * @summary functionality of h6 typography
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		h6Typography: function () {

			var that = this;
			if( 'undefined' != typeof that.data.params.model ){
				var modelNameChange = {};

				modelNameChange[ that.data.params.model ] = 'h6';
				that.elementView.setAttributes( modelNameChange, false );
			}else {
				this.elementView.setAttributes( { 'tag' : 'h6' }, false );
			}

		},

		/**
		 * @summary functionality of p typography
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		pTypography: function () {

			var that = this;
			if( 'undefined' != typeof that.data.params.model ){
				var modelNameChange = {};

				modelNameChange[ that.data.params.model ] = 'p';
				that.elementView.setAttributes( modelNameChange, false );
			}else {
				this.elementView.setAttributes( { 'tag' : 'p' }, false );
			}

		},

		/**
		 * @summary set  typography for text element
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		setTypography: function ( e ) {

			var typographySelector 	= $( e.target ).closest( 'button' ),
				typographyAttr 		= typographySelector.attr( 'data-karma-value' );


			switch ( typographyAttr )
			{
				case 'h1':
					this.h1Typography();
					break;
				case 'h2':
					this.h2Typography();
					break;
				case 'h3':
					this.h3Typography();
					break;
				case 'h4':
					this.h4Typography();
					break;
				case 'h5':
					this.h5Typography();
					break;
				case 'h6':
					this.h6Typography();
					break;
				case 'p':
					this.pTypography();
					break;
				default:
					break;
			}


		}

	});


} )( jQuery, karmaBuilder );

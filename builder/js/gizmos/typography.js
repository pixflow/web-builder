( function( $, karmaBuilder ){

	karmaBuilder.gizmos.typography = Backbone.View.extend({

		events: {

			'click .karma-typography-h1'											: 'setTypographyH1' ,
			'click .karma-typography-h2'											: 'setTypographyH2' ,
			'click .karma-typography-h3'											: 'setTypographyH3' ,
			'click .karma-typography-h4'											: 'setTypographyH4' ,
			'click .karma-typography-h5'											: 'setTypographyH5' ,
			'click .karma-typography-h6'											: 'setTypographyH6' ,
			'click .karma-typography-p'												: 'setTypographyP' ,
		},

		/**
		 * Build html for typography gizmo
		 */
		template : ' <button class="karma-drop-down-icon karma-typography-drop-down-gizmo"> {{{ data.params.defaultIcon }}} </button> '
			+ '<div class="karma-drop-down-box karma-typography-drop-down">'
				+'<div class="karma-typography-drop-down-icons">'
					+ '<div class="karma-typography-drop-down-right">'
						+ '<button class="karma-typography-h5" data-value="karma-typography-h5" >'
							+ '{{{ data.params.h5Typography }}}'
						+ '</button>'
						+ '<button class="karma-typography-h6" data-value="karma-typography-h6" >'
							+ '{{{ data.params.h6Typography }}}'
						+ '</button>'
						+ '<button class="karma-typography-p" data-value="karma-typography-p" >'
							+ '{{{ data.params.pTypography }}}'
						+ '</button>'
					+ '</div>'
					+ '<div class="karma-typography-drop-down-left">'
						+ '<button class="karma-typography-h1" data-value="karma-typography-h1" >'
							+ '{{{ data.params.h1Typography }}}'
						+ '</button>'
						+ '<button class="karma-typography-h2" data-value="karma-typography-h2" >'
							+ '{{{ data.params.h2Typography }}}'
						+ '</button>'
						+ '<button class="karma-typography-h3" data-value="karma-typography-h3" >'
							+ '{{{ data.params.h3Typography }}}'
						+ '</button>'
						+ '<button class="karma-typography-h4" data-value="karma-typography-h4" >'
							+ '{{{ data.params.h4Typography }}}'
						+ '</button>'
					+ '</div>'
				+ '</div>'
				+ '<div class="karma-typography-link">'
					+ '<a href="">'
						+ '{{{ data.params.typographyLink }}}'
					+ '</a>'
				+ '</div>'
			+ '</div>' ,

		/**
		 * @summary initialize typography
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		initialize :function(){

			this.setElement( $( '<div>' ) );

		},

		/**
		 * @summary render typography
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		render: function( $el ){

			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );
			$el.append( this.el );

		},


		/**
		 * @summary set h1 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH1: function () {

			this.elementView.setAttributes( { 'tag': 'h1' }, false );

		},

		/**
		 * @summary set h2 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH2: function () {

			this.elementView.setAttributes( { 'tag': 'h2' }, false );

		},

		/**
		 * @summary set h3 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH3: function () {

			this.elementView.setAttributes( { 'tag': 'h3' }, false );

		},

		/**
		 * @summary set h4 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH4: function () {

			this.elementView.setAttributes( { 'tag': 'h4' }, false );

		},

		/**
		 * @summary set h5 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH5: function () {

			this.elementView.setAttributes( { 'tag': 'h5' }, false );

		},

		/**
		 * @summary set h6 typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyH6: function () {

			this.elementView.setAttributes( { 'tag': 'h6' }, false );

		},

		/**
		 * @summary set p typography for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypographyP: function () {

			this.elementView.setAttributes( { 'tag': 'p' }, false );

		},

	});


} )( jQuery, karmaBuilder );

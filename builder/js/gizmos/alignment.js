( function( $, karmaBuilder ){

	karmaBuilder.gizmos.alignment = Backbone.View.extend({

		events: {

			'click .karma-align-center'			: 'karmaTextShortcodealignCenter',
			'click .karma-align-left'			: 'karmaTextShortcodealignLeft',
			'click .karma-align-right'			: 'karmaTextShortcodealignRight',
		},

		/**
		 * Build html for alignment gizmo
		 */
		template :' <button class="karma-drop-down-icon karma-alignment-drop-down-gizmo"><div class="karma-default-icon" style="background-image: url({{ data.params.defaultIcon }})" ></div> </button> '
			+ '<div class="karma-drop-down-box karma-alignment-drop-down">'
				+ '<button class="karma-align-left <# if( "left" == data.align ){ print("karma-drop-down-active-item"); } #>" data-value="align-left" >'
					+ '<div class="karma-alignment-left-icon" style="background-image: url({{ data.params.leftAlignIcon }})"></div>'
				+ '</button>'
				+ '<button class="karma-align-center <# if( "center" == data.align ){ print("karma-drop-down-active-item"); } #> " data-value="align-center" >'
					+ '<div class="karma-alignment-center-icon" style="background-image: url({{ data.params.centerAlignIcon }})"></div>'
				+ '</button>'
				+ '<button class="karma-align-right <# if( "right" == data.align ){ print("karma-drop-down-active-item"); } #> " data-value="align-right" >'
					+ '<div class="karma-alignment-right-icon" style="background-image: url({{ data.params.rightAlignIcon }})"></div>'
				+ '</button>'
			+ '</div>' ,

		/**
		 * @summary initialize alignment
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		initialize :function(){

			this.setElement( $( '<div>' ) );

		},

		/**
		 * @summary render alignment
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		render: function(){

			this.update();
			this.$gizmoContainer.append( this.el );

		},

		update: function(){

			this.data.align = this.elementView.getAttributes( ['align'] ).align;
			this.data.params['defaultIcon'] = this.data.params[ this.data.align  + 'AlignIcon' ];
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		},

		/**
		 * @summary align left for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaTextShortcodealignLeft: function () {

			this.elementView.setAttributes( { 'align' : 'left' }, false );

		},

		/**
		 * @summary align center for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaTextShortcodealignCenter: function () {

			this.elementView.setAttributes( { 'align' : 'center' }, false );

		},

		/**
		 * @summary align right for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaTextShortcodealignRight: function () {

			this.elementView.setAttributes( { 'align' : 'right' }, false );

		},

	});

} )( jQuery, karmaBuilder );


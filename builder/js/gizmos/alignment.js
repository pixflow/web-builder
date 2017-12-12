( function( $, karmaBuilder ){

	karmaBuilder.gizmos.alignment = Backbone.View.extend({

		events: {

			'click .karma-align-center'												: 'karmaTextShortcodealignCenter',
			'click .karma-align-left'												: 'karmaTextShortcodealignLeft',
			'click .karma-align-right'												: 'karmaTextShortcodealignRight',
		},

		/**
		 * Build html for alignment gizmo
		 */
		template :' <button class="karma-drop-down-icon karma-alignment-drop-down-gizmo"> {{{ data.params.defaultIcon }}} </button> '
			+ '<div class="karma-drop-down-box karma-alignment-drop-down">'
				+ '<button class="karma-align-left" data-value="align-left" >'
					+ '{{{ data.params.leftAlignIcon }}}'
				+ '</button>'
				+ '<button class="karma-align-right" data-value="align-right" >'
					+ '{{{ data.params.rightAlignIcon }}}'
				+ '</button>'
				+ '<button class="karma-align-center" data-value="align-center" >'
					+ '{{{ data.params.centerAlignIcon }}}'
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

			this.elementView.setAttributes( { 'align': 'left' }, false );

		},

		/**
		 * @summary align center for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaTextShortcodealignCenter: function () {

			this.elementView.setAttributes( { 'align': 'center' }, false );

		},

		/**
		 * @summary align right for text shortcode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaTextShortcodealignRight: function () {

			this.elementView.setAttributes( { 'align': 'right' }, false );

		},

	});


} )( jQuery, karmaBuilder );


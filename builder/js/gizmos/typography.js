( function( $, karmaBuilder ){

	karmaBuilder.gizmos.typography = Backbone.View.extend({

		events: {

			'click .karma-typography-drop-down-icons button'		: 'setTypography' ,
		},

		/**
		 * Build html for typography gizmo
		 */
		template : ' <button class="karma-drop-down-icon karma-typography-drop-down-gizmo"> <div class="karma-default-icon" style="background-image: url({{ data.params.defaultIcon }})" ></div> </button> '
			+ '<div class="karma-drop-down-box karma-typography-drop-down">'
				+'<div class="karma-typography-drop-down-icons">'
					+ '<div class="karma-typography-drop-down-right">'
						+ '<button class="karma-typography-h5" data-karma-value="h5" >'
							+ '<div class="karma-typography-h5-icon" style="background-image: url({{ data.params.h5Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-h6" data-karma-value="h6" >'
							+ '<div class="karma-typography-h6-icon" style="background-image: url({{ data.params.h6Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-p" data-karma-value="p" >'
							+ '<div class="karma-typography-p-icon" style="background-image: url({{ data.params.pTypography }})"></div>'
						+ '</button>'
					+ '</div>'
					+ '<div class="karma-typography-drop-down-left">'
						+ '<button class="karma-typography-h1" data-karma-value="h1" >'
							+ '<div class="karma-typography-h5-icon" style="background-image: url({{ data.params.h1Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-h2" data-karma-value="h2" >'
							+ '<div class="karma-typography-h5-icon" style="background-image: url({{ data.params.h2Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-h3" data-karma-value="h3" >'
							+ '<div class="karma-typography-h5-icon" style="background-image: url({{ data.params.h3Typography }})"></div>'
						+ '</button>'
						+ '<button class="karma-typography-h4" data-karma-value="h4" >'
							+ '<div class="karma-typography-h5-icon" style="background-image: url({{ data.params.h5Typography }})"></div>'
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
		render: function(){

			this.update();
			this.$gizmoContainer.append( this.el );

		},

		update: function(){

			this.data.params['defaultIcon'] = this.data.params[ this.elementView.getAttributes( ['tag'] ).tag + 'Typography' ];
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		},

		/**
		 * @summary set  typography for text element
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setTypography: function ( e ) {

			var typographySelector 	= $( e.target ).closest( 'button' ),
				typographyAttr 		= typographySelector.attr( 'data-karma-value' );

			switch ( typographyAttr )
			{
				case 'h1':
					this.elementView.setAttributes( { 'tag' : 'h1' }, false );
					break;
				case 'h2':
					this.elementView.setAttributes( { 'tag' : 'h2' }, false );
					break;
				case 'h3':
					this.elementView.setAttributes( { 'tag' : 'h3' }, false );
					break;
				case 'h4':
					this.elementView.setAttributes( { 'tag' : 'h4' }, false );
					break;
				case 'h5':
					this.elementView.setAttributes( { 'tag' : 'h5' }, false );
					break;
				case 'h6':
					this.elementView.setAttributes( { 'tag' : 'h6' }, false );
					break;
				case 'p':
					this.elementView.setAttributes( { 'tag' : 'p' }, false );
					break;
				default:
					break;
			}


		}

	});


} )( jQuery, karmaBuilder );

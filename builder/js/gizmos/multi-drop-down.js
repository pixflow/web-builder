( function( $, karmaBuilder ){

	karmaBuilder.gizmos.multiDropDown = Backbone.View.extend({

		events: {

			'click .karma-gizmo-multi-drop-down-content-box div'   			: 'changeValue',
		},

		/**
		 * Build html for position gizmo
		 */
		template: ' <button class="karma-drop-down-icon karma-multi-drop-down-gizmo" ><div class="karma-default-icon"  >{{{ data.icon }}}</div> </button> '
		+ '<div class="karma-gizmo-multi-drop-down-content karma-drop-down-box">'
		+ '<div class="karma-gizmo-multi-drop-down-content-box">'
		+ ' <# _.each( data.params, function( params ){  #>'
		+ '<div class="karma-gizmo-multi-drop-down-box" data-drop-down-value="{{params.value}}">'
		+"<# if(!('' == params.icon || undefined == params.icon) ){ #>"
		+ '<div class="karma-gizmo-multi-drop-down-icon" style="background-image: url( {{ params.icon }})">'
		+ '</div>'
		+'<# } #>'
		+"<# if(!('' == params.text || undefined == params.text) ){ #>"
		+ '<div class="karma-gizmo-multi-drop-down-text">{{{ params.text }}}'
		+ '</div>'
		+'<# } #>'
		+ '</div>'
		+ '<# }) #>'
		+ '</div>'
		+ '</div>',

		/**
		 * @summary initialize position
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		initialize: function () {

			this.setElement( $('<div>') );

		},

		/**
		 * @summary render position
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		render: function () {

			this.update();
			this.$gizmoContainer.append( this.el );
		},

		/**
		 * @summary update position
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		update: function () {
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		},
		/**
		 * @summary change model
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		changeValue: function ( e ) {

			var content = e.target.closest( '.karma-gizmo-multi-drop-down-box' ).getAttribute( 'data-drop-down-value' );

			if ( "" !== content  ) {
				var dataModel = {};

				dataModel[ this.data.model ] = content;this.elementView.setAttributes( dataModel ,  false );
			}

		}

	});
} )( jQuery, karmaBuilder );


( function( $, karmaBuilder ){

	karmaBuilder.gizmos.multiDropDown = Backbone.View.extend({

		events: {
		},

		/**
		 * Build html for position gizmo
		 */
		template: ' <button class="karma-drop-down-icon karma-multi-drop-down-gizmo"><div class="karma-default-icon"  >{{{ data.icon }}}</div> </button> '
		+ '<div class="karma-gizmo-position-content karma-drop-down-box">'
		+ '<div class="karma-gizmo-position-content-box">'
		+ '<#var positionArray = ["top-left", "top-center", "top-right", "center-left", "center-center", "center-right", "bottom-left", "bottom-center", "bottom-right"]; #>'
		+ '<# for( var i in positionArray ) { #>'
		+ '<# var selected = ( data.params.position == positionArray[i] ) ? "karma-gizmo-position-selected-item" : "" #>'
		+ '<div class="karma-gizmo-position-box karma-gizmo-position-{{positionArray[i]}}-dot {{selected}}" data-value={{positionArray[i]}}>'
		+ '<div class="karma-gizmo-position-dot "></div>'
		+ '</div>'
		+ '<# } #>'
		+ '</div>'
		+ '<input	type="text" name="{{{ data.name }}}" class="hidden-input gizmo-position-input" value="{{{ data.params.position }}}">'
		+ '</div>',

		/**
		 * @summary initialize position
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		initialize: function () {

			this.setElement( $('<div>') );

		},

		/**
		 * @summary render position
		 *
		 * @since 0.1.0
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
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		update: function () {

			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		},


	});
} )( jQuery, karmaBuilder );

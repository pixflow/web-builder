( function( $, karmaBuilder ){

	karmaBuilder.gizmos.position = Backbone.View.extend({

		events: {
			'click .karma-gizmo-position-box'  : 'karmaPosition'
		},

		/**
		 * Build html for position gizmo
		 */
		template: ' <button class="karma-drop-down-icon karma-position-drop-down-gizmo"><div class="karma-default-icon"  >{{{ data.params.icon }}}</div> </button> '
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

			if ( 'undefined' != typeof this.data.params.model ) {
				this.position = this.elementView.getAttributes( [ this.data.params.model ] );
				this.data.params.position = this.position[ this.data.params.model ];
			}

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

		/**
		 * @summary functional for position gizmo
		 * @param {event} event
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		karmaPosition: function ( e ) {

			var element =( e.target.classList.contains( 'karma-gizmo-position-box' ) ) ? e.target : e.target.closest( '.karma-gizmo-position-box' ),
			dataValue = element.getAttribute( 'data-value' );

			this.$el.find( '.karma-gizmo-position-box' ).removeClass('karma-gizmo-position-selected-item');
			element.classList.add( 'karma-gizmo-position-selected-item' );

			if( 'undefined' != typeof this.data.params.model ){
				var modelNameChange = {};
				modelNameChange[ this.data.params.model ] = dataValue;
				this.elementView.setAttributes( modelNameChange, false );
			}else{
				this.elementView.setAttributes( { 'gizmoposition' : dataValue }, false );
			}

		},

	});
} )( jQuery, karmaBuilder );



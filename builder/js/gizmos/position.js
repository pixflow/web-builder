( function( $, karmaBuilder ){

	karmaBuilder.gizmos.position = Backbone.View.extend({

		events: {
			'click .karma-image-position-box'  : 'karmaPosition'
		},

		/**
		 * Build html for position gizmo
		 */
		template: ' <button class="karma-drop-down-icon karma-position-drop-down-gizmo"><div class="karma-default-icon"  >{{{ data.params.icon }}}</div> </button> '
		+ '<div class="karma-image-position-content karma-drop-down-box">'
		+ '<div class="karma-image-position-content-box">'
		+ '<div class="karma-image-position-box karma-image-position-top-left-dot" data-value="top-left">'
		+ '<div class="karma-image-position-dot "></div>'
		+ '</div>'
		+ '<div class="karma-image-position-box karma-image-position-top-center-dot" data-value="top-center">'
		+ '<div class="karma-image-position-dot"></div>'
		+ '</div>'
		+ '<div class="karma-image-position-box karma-image-position-top-right-dot" data-value="top-right">'
		+ '<div class="karma-image-position-dot "></div>'
		+ '</div>'
		+ '<div class="karma-image-position-box karma-image-position-center-left-dot" data-value="center-left">'
		+ '<div class="karma-image-position-dot"></div>'
		+ '</div>'
		+ '<div class="karma-image-position-box karma-image-position-center-dot " data-value="center-center">'
		+ '<div class="karma-image-position-dot"></div>'
		+ '</div>'
		+ '<div class="karma-image-position-box karma-image-position-center-right-dot" data-value="center-right">'
		+ '<div class="karma-image-position-dot"></div>'
		+ '</div>'
		+ '<div class="karma-image-position-box karma-image-position-bottom-left-dot" data-value="bottom-left">'
		+ '<div class="karma-image-position-dot "></div>'
		+ '</div>'
		+ '<div class="karma-image-position-box karma-image-position-bottom-center-dot" data-value="bottom-center">'
		+ '<div class="karma-image-position-dot"></div>'
		+ '</div>'
		+ '<div class="karma-image-position-box karma-image-position-bottom-right-dot" data-value="bottom-right">'
		+ '<div class="karma-image-position-dot"></div>'
		+ '</div>'
		+ '</div>'
		+ '<input	type="text" name="{{{ data.name }}}" class="hidden-input image-position-input" value="{{{ data.values }}}">'
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

		/**
		 * @summary functional for position gizmo
		 * @param {event} event
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		karmaPosition: function ( e ) {
			this.$el.find( '.karma-image-position-box' ).removeClass('karma-image-position-selected-item');
			var element =( e.target.classList.contains( 'karma-image-position-box' ) ) ? e.target : e.target.closest( '.karma-image-position-box' );
			element.classList.add( 'karma-image-position-selected-item' );
			var dataValue = element.getAttribute( 'data-value' );
			if( 'undefined' != typeof this.data.params.model ){
				var modelNameChange = {};
				modelNameChange[ this.data.params.model ] = dataValue;
				this.elementView.setAttributes( modelNameChange, false );
			}else{
				this.elementView.setAttributes( { 'textposition' : dataValue }, false );
			}

		},

	});
} )( jQuery, karmaBuilder );



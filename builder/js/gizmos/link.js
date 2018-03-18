
( function( $, karmaBuilder ){

	karmaBuilder.gizmos.link = Backbone.View.extend({

		events: {

			'input .karma-text-link'	:	'karmatextlink',
			'click .karma-text-link'	:	'karmatextlinkstop',
			'click .check-box-circle'	:	'karmatextlinkaction'

		},

		/**
		 * Build html for alignment gizmo
		 */
		template :' <button class="karma-drop-down-icon karma-link-drop-down-gizmo"><div class="karma-default-icon" style="background-image: url({{ data.params.defaultIcon }})" ></div> </button> '
		+ '<div class="karma-drop-down-box karma-link-drop-down">'
	 		+ '<div>'
				+ '<input type="text" name="{{{ data.name }}}" class="karma-text-link" value="{{{ data.values }}}" placeholder="Paste a link">'
				+ '<div class="karma-check-box-contain">'
				+ '<div class="karma-check-box-container">'
					+ '<div class="check-box-circle">'
						+ '<input type="checkbox" id="karma-input-checkbox-controller" name="{{{ data.name }}}" class="check-box-input">'
						+ '<label class="check-box-circle-fill" for="karma-input-checkbox-controller"></label>'
					+ '</div>'
				+ '</div>'
				+ '<div class="karma-link-open-new-tab-text">Open in new tab'
				+ '</div>'
			+ '</div>'
		+ '</div>' ,

		/**
		 * initialize alignment
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		initialize :function(){

			this.setElement( $( '<div>' ) );

		},

		/**
		 * render alignment
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

			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		},
		/**
		 * link functionality and update model
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		karmatextlink: function() {

			var input = this.elementView.el.querySelector( '.karma-text-link' ).value;
			
			if( 'undefined' != typeof this.data.params.model ){
				var modelNameChange = {};
				modelNameChange[ this.data.params.model ] = input;
				this.elementView.setAttributes( modelNameChange, false );
			}else {
				this.elementView.setAttributes( { 'textlink': input }, false );
			}

		},

		/**
		 * link button stop
		 * @param {event}  event
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		karmatextlinkstop: function( e ) {

			e.stopPropagation()

		},

		/**
		 * link target functionality and update model
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		karmatextlinkaction: function() {

			var input = this.elementView.el.querySelector( '#karma-input-checkbox-controller' ).checked,
				target = ( true == input ) ? '_blank' : '_self' ;

				this.elementView.setAttributes( { 'target' : target }, false );


		},
		


	});

} )( jQuery, karmaBuilder );


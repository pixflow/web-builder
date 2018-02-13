
( function( $, karmaBuilder ){

	karmaBuilder.gizmos.link = Backbone.View.extend({

		events: {

			'input .karma-text-link'	:	'karmaTextLink',
			'click .karma-text-link'	:	'karmaTextLinkstop',
			'click .check-box-circle'	:	'karmaTextLinkAction'

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
		 * @summary initialize alignment
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		initialize :function(){

			this.setElement( $( '<div>' ) );

		},

		/**
		 * @summary render alignment
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
		 * @summary link functionality and update model
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		karmaTextLink: function() {

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
		 * @summary link button stop
		 * @param {event}  event
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		karmaTextLinkstop: function( e ) {

			e.stopPropagation()

		},

		/**
		 * @summary link target functionality and update model
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		karmaTextLinkAction: function() {

			var input = this.elementView.el.querySelector( '#karma-input-checkbox-controller' ).checked,
				target = ( true == input ) ? '_blank' : '_self' ;

			if( 'undefined' != typeof this.data.params.model ){
				var modelNameChange = {};
				modelNameChange[ this.data.params.model ] = target;
				this.elementView.setAttributes( modelNameChange, false );
			}else {
				this.elementView.setAttributes( { 'textLinkAction' : target }, false );
			}

		},
		


	});

} )( jQuery, karmaBuilder );


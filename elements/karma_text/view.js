( function( $, karmaBuilder ){

	karmaBuilder.text = karmaBuilder.shortcodes.extend({

		events: {

		},

		initialize: function ( options ) {

			karmaBuilder.text.__super__.initialize.apply( this, arguments );
			this.options = options;

			if( this.options.renderStatus ){
				this.render();
			}

		},

		/**
		 * @summary Render text element
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		render : function () {

			var source = this.template( this.model.get('shortcode_attributes') );
			this.el.innerHTML = source;

		},

	});

})( jQuery, karmaBuilder );
( function( $, karmaBuilder ){

	karmaBuilder.text = karmaBuilder.shortcodes.extend({

		events: {

		},

		initialize: function ( options ) {

			this.template = options.template;
			this.render();

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
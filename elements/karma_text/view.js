( function( $, karmaBuilder ){

	karmaBuilder.text = karmaBuilder.shortcodes.extend({

		events: {
			'blur .karma-text-content' : 'saveContent'
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


		/**
		 * @summary Save the content of the text element
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		saveContent : function () {

			var content = this.el.querySelector('.karma-text-content').innerHTML ;
			this.setAttributes( { 'content' : content }, true );

		}



	});

})( jQuery, karmaBuilder );
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

			var model =  JSON.parse( JSON.stringify( this.model.get( 'shortcode_attributes' ) ) );
			model['content'] = this.model.get( 'shortcode_content' ) ;
			var source = this.template( model );
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
			this.model.set( { 'shortcode_content' : content }, { silent : true } );

		},

		/**
		 * @summary get text typography and change innerHtml of text
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		tag: function(){

			var element = this.el.querySelector( '.karma-text-tag' ),
				tagAttr = this.getAttributes( ['tag'] ),
				newTag = document.createElement( tagAttr.tag );
			newTag.innerHTML = element.innerHTML;
			newTag.classList.add( 'karma-text-tag' );
			element.parentNode.replaceChild( newTag, element );

		}


	});

})( jQuery, karmaBuilder );
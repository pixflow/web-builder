( function( $, karmaBuilder ){

	karmaBuilder.image = karmaBuilder.shortcodes.extend({

		events: {
			'click .karma-image-link' 	: 'preventFromOpen',
			'click .karma-image' 		: 'showGizmo',
		},

		initialize: function () {

			karmaBuilder.image.__super__.initialize.apply( this, arguments );


		},

		preventFromOpen : function ( e ) {

			e.preventDefault();

		},

		showGizmo : function () {

			this.el.classList.add( 'karma-active-element' );

		},

		imgurl : function () {

			var imageAddress = this.getAttributes( [ 'imgurl' ] );
			this.el.querySelector('img').setAttribute( 'src', imageAddress.imgurl );

		},

		scale: function () {

			var imageScale = this.getAttributes( [ 'scale' ] ),
				containerClass	= ( 'fill' == imageScale.scale ) ? 'karma-image-fill' : 'karma-image-real';
			this.el.querySelector( 'img' ).setAttribute( "class", containerClass );

		},
		
		position : function () {

			var regex = new RegExp('(?:^|\\s)karma-position-(.*?)(?!\\S)'),
				imagePosition = this.getAttributes( [ 'position' ] );
			this.el.firstElementChild.className = this.el.firstElementChild.className.replace( regex, " karma-position-" + imagePosition.position );


		},

		/**
		 * @summary change image alt attribute on change alt field in advanced option
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		alt: function () {

			var imageAlt = this.getAttributes( [ 'alt' ] );
			this.el.querySelector( 'img' ).setAttribute( "alt", imageAlt.alt );

		}

	});

})( jQuery, karmaBuilder );
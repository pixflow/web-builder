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

	});

})( jQuery, karmaBuilder );
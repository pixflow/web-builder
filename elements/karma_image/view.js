( function( $, karmaBuilder ){

	karmaBuilder.image = karmaBuilder.shortcodes.extend({

		events: {
			'click .karma-image-link' : 'preventFromOpen',
			'click .karma-image' : 'showGizmo',
		},

		initialize: function () {

			karmaBuilder.image.__super__.initialize.apply( this, arguments );

		},

		preventFromOpen : function ( e ) {

			e.preventDefault();

		},

		showGizmo : function () {

			this.el.classList.add( 'karma-active-element' );

		}

	});

})( jQuery, karmaBuilder );
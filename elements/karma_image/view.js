( function( $, karmaBuilder ){

	karmaBuilder.image = karmaBuilder.shortcodes.extend({

		events: {},

		initialize: function (options) {

			karmaBuilder.image.__super__.initialize.apply( this, arguments );

		},

	});

})( jQuery, karmaBuilder );
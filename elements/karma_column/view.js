(function($, karmaBuilder) {
	karmaBuilder.column = karmaBuilder.shortcodes.extend({

		events:{

			'click'	: 'activeColumn',

		},

		initialize: function( options ){

			karmaBuilder.section.__super__.initialize.apply( this, arguments );

		},

		/**
		 * @summary Set the active row with specific class
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		activeColumn: function (e) {

			if( this.$el.hasClass('karma-active-column') ){
				return;
			}

			$('.karma-active-column').removeClass('karma-active-column');
			this.$el.addClass('karma-active-column');

		},

	});
})(jQuery,karmaBuilder);
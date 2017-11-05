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

		/**
		 * @right spacing of column setting panel
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		rightSpace: function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				padding		= this.model.attributes.shortcode_attributes.space + 'px';

			document.getElementById( elementId ).innerHTML = '.' + elementId + '{ padding-right: ' +  padding  + ';}';

		},

		/**
		 * extra class field changes. Add class to the column
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		extraClass: function(){

			var elementClass = this.model.get( 'shortcode_name' ).replace( '_', '-' ) + '-' + this.model.attributes.shortcode_attributes.element_key,
				defaultClasses =  elementClass + " karma-column  "  + this.model.attributes.shortcode_attributes.extraClass;
			this.el.firstElementChild.setAttribute( 'class', defaultClasses );

		}

	});
})(jQuery,karmaBuilder);
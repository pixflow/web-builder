(function($, karmaBuilder) {
	karmaBuilder.column = karmaBuilder.shortcodes.extend({

		events:{

			'click'	: 'activeColumn',

		},

		initialize: function( options ){

			karmaBuilder.section.__super__.initialize.apply( this, arguments );
			this.liveChangeGrid()

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

		},

		/**
		 * apply live change grid on column
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		liveChangeGrid: function () {
			var that = this,
				key = this.model.get( 'element_key' );
			var changeGridOptions = {
				selector: '.karma-builder-element[data-element-key="' + key + '"]',
				snapToGrid: true,
				gridPrefix: 'karma-col-md',
				onStop: function ( result ) {
					var newGrid = result.grid;
					that.newGrid( newGrid );
				}
			};
			gridResizer( changeGridOptions );
		},

		/**
		 * calculate new parent section grid and update grid
		 *
		 * @since 1.0.0
		 *
		 * @param   {object}    newGrid  new Width of current column and next column
		 *
		 * @returns {void}
		 */
		newGrid: function ( newGrid ) {
			var newLayout = this.$el.parent().backboneView().currentGrid();
			newLayout[ newGrid.currentColumnIndex ] = newGrid.currentColumnWidth;
			newLayout[ newGrid.nextColumnIndex ] = newGrid.nextColumnWidth;
			this.$el.parent().backboneView().changeRowLayout( newLayout );
		}

	});
})(jQuery,karmaBuilder);
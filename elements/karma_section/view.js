(function($, karmaBuilder){
	karmaBuilder.section = karmaBuilder.shortcodes.extend({

		events:{

			'click'				 							: 'showBorder',
			'mousedown .section-spacing' 					: 'showMouseToolTip',
			'mousedown .row-top-spacing-dot-container' 		: 'showMouseToolTip',
			'mousedown .row-bottom-spacing-dot-container' 	: 'showMouseToolTip',
		},

		initialize: function( options ){

			karmaBuilder.section.__super__.initialize.apply( this, arguments );
			this.liveSpacing();

		},

		showSettingPanel : function(){
			this.model.attributes.shortcode_attributes['add_grid'] = this.currentGrid();
			karmaBuilder.section.__super__.showSettingPanel.apply( this, arguments );

		},


		/**
		 * @summary Set the active row with specific class
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		showBorder: function () {

			$('.karma-active-section').removeClass('karma-active-section');
			this.$el.addClass('karma-active-section');

		},

		/**
		 * return current layout grid
		 *
		 * @since 1.0.0
		 *
		 * @returns Array - current layout of section
		 */
		currentGrid : function( ) {

			var childrenModels = this.findChildren();

			var currentGrid = [];
			for (var i = 0, len = childrenModels.length; i < len; i++) {
				currentGrid.push( parseInt( childrenModels[i].attributes.shortcode_attributes.sm_size ) )
			}
			return currentGrid;

		},

		/**
		 * Calculate new layout grid after append nw column
		 *
		 * @since 1.0.0
		 *
		 * @returns Array - new layout of section after add new column
		 */
		calculateNewGrid : function( ) {
			var newGrid = this.currentGrid();
			newGrid.reverse();
			for (var i = 0, len = newGrid.length; i < len; i++) {
				if(newGrid[i] > 1) {
					newGrid[i] = parseInt(newGrid[i] - 1);
					break;
				}
			}
			newGrid.reverse();
			newGrid.push(1);
			return newGrid;
		},

		/**
		 * show mouse tooltip in spacing
		 *
		 * @since 1.0.0
		 *
		 * add event to tooltip
		 */
		showMouseToolTip : function(e) {
			var tooltipDiv = document.body.querySelector('.tooltip-div');
			tooltipDiv.style.display = 'block';
			e.target.classList.add('target-moving');
			document.documentElement.addEventListener( 'mousemove', this.moveMouseToolTip, false );
			document.documentElement.addEventListener( 'mouseup', this.removeMouseToolTip, false );
		},

		/**
		 * move mouse tooltip in spacing
		 *
		 * @since 1.0.0
		 *
		 * give position to tooltip div
		 */
		moveMouseToolTip : function(e) {
			var tooltipDiv = document.body.querySelector('.tooltip-div');
			if( 'none' === tooltipDiv.style.display ){
				return false;
			}
			var x = e.clientX,
				y = e.clientY;
			tooltipDiv.style.top = (y + 20) + 'px';
			tooltipDiv.style.left = (x - 20) + 'px';
			tooltipDiv.innerText = (document.querySelector('.section-spacing').offsetHeight) + ' px';

		},

		/**
		 * remove mouse tooltip in spacing
		 *
		 * @since 1.0.0
		 *
		 * remove all event from tooltip
		 */
		removeMouseToolTip : function(e) {
			var tooltipDiv = document.body.querySelector('.tooltip-div');
			tooltipDiv.style.display = 'none';
			e.target.classList.remove('target-moving');
			document.documentElement.removeEventListener('mousemove', this.moveMouseToolTip);
			document.documentElement.removeEventListener('mouseup', this.removeMouseToolTip);
		},

		/**
		 * create html fot tooltip
		 *
		 * @since 1.0.0
		 *
		 */
		toolTipHtml: function () {
			if( ! document.querySelectorAll('.tooltip-div').length ){
				var tooltip = document.createElement( 'div' );
				tooltip.setAttribute( 'class', 'tooltip-div' )
				document.body.appendChild( tooltip );
			}
		},

		/**
		 * Add live spacing ability to section elements
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		liveSpacing: function () {
			this.currentGrid()
			this.calculateNewGrid()
			this.toolTipHtml()

			var that = this,
				options = {
					maxHeight   : 700,
					minHeight   : 0,
					handles     : {},
					stop        : function ( event, ui ) {
						that.setAttributes( { space: parseInt( ui.element.height() ) }, true );
					}
				};
			$( function () {

				// Apply JQuery Ui resizable on top spacing
				options.handles.s = document.querySelector( '[data-element-key="' + that.el.dataset.elementKey + '"] .section-top-spacing' );
				options.handles.n = document.querySelector( '[data-element-key="' + that.el.dataset.elementKey + '"] .section-top-spacing' );
				options.alsoResize = '[data-element-key="' + that.el.dataset.elementKey + '"] .section-bottom-spacing';
				$( '[data-element-key="' + that.el.dataset.elementKey + '"] .section-top-spacing' ).resizable( options );

				// Apply JQuery Ui resizable on bottom spacing
				options.alsoResize = '[data-element-key="' + that.el.dataset.elementKey + '"] .section-top-spacing';
				options.handles.s = document.querySelector( '[data-element-key="' + that.el.dataset.elementKey + '"] .section-bottom-spacing' );
				options.handles.n = document.querySelector( '[data-element-key="' + that.el.dataset.elementKey + '"] .section-bottom-spacing' );
				$( '[data-element-key="' + that.el.dataset.elementKey + '"] .section-bottom-spacing' ).resizable( options );

			} );
		}

	} );
})(jQuery,karmaBuilder);
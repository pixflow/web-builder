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

			if( this.$el.hasClass('karma-active-section') ){
				return;
			}
			$('.karma-active-section .karma-active-column').removeClass('karma-active-column');
			$('.karma-active-section').removeClass('karma-active-section');
			this.$el.addClass('karma-active-section');

		},

		/**
		 * @summary Get the if of all row columns
		 *
		 * @since 1.0.0
		 * @returns {array}	Contain the ids
		 */
		getColumnsId : function () {

			var columns = [] ;
			_.each( this.findChildren(), function ( column ) {
				columns.push( column.attributes.shortcode_id );
			} );
			return columns;

		},

		/**
		 * @summary Update the size of columns
		 *
		 * @param {array}	attributes	The old attributes of column
		 * @param {number}	value		New value
		 *
		 * @since 1.0.0
		 * @returns {array}	New attributes
		 */
		updateWidthColumn : function ( attributes, value ) {

			attributes['lg_size'] = value;
			attributes['md_size'] = value;
			attributes['sm_size'] = value;
			attributes['xl_size'] = value;
			return attributes;

		},

		/**
		 * @summary Update the column model by id given.
		 * Function just update size of column
		 *
		 * @params {number}	columnId		The column id
		 * @params {number}	parentId		The row id
		 * @params {number}	newWidth		The new width of column
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		updateColumnModel : function ( columnId, parentId, newWidth ) {

			var model = karmaBuilder.karmaModels.findWhere( { 'parent_id' : parentId , 'shortcode_id' : columnId } ),
				attributes;
			attributes = model.attributes.shortcode_attributes ;
			attributes = this.updateWidthColumn( attributes, newWidth );
			model.set( { 'shortcode_attributes' : attributes } , { silent : true } );

		},

		/**
		 * @summary Delete The column id
		 * Function before delete the model move all content into the
		 * last column in row
		 *
		 * @params {number}	columnId			The column id
		 * @params {number}	lastColumnId		The last column in row id
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		deleteColumnModel : function ( columnId, lastColumnId ) {

			var models = karmaBuilder.karmaModels.where( { 'parent_id' : columnId } );
			_.each( models, function ( model ) {
				model.set( { 'parent_id' : lastColumnId } , { silent : true } );
			});
			var columnModel = karmaBuilder.karmaModels.findWhere( { 'shortcode_id' : columnId } );
			karmaBuilder.karmaModels.remove( columnModel );

		},

		/**
		 * @summary Delete The column id
		 * Function before delete the model
		 *
		 * @params {number}	total	The total number
		 * @params {number}	num		The new number
		 *
		 * @since 1.0.0
		 * @returns {number}	Sum of number given
		 */
		getSum : function ( total, num ) {

			return total + num;

		},

		/**
		 * @summary Check the grid given is equal 12
		 *
		 * @params {array}	grid	The grid layout
		 *
		 * @since 1.0.0
		 * @returns {boolean}	true if layout is correct
		 */
		validateColumnLayout : function ( grid ) {

			if ( 12 == grid.reduce( this.getSum ) ) {
				return true ;
			}
			return false;

		},

		/**
		 * @summary Change the layout of row grid
		 *
		 * @params {array}	newLayout	The grid layout
		 *
		 * @since 1.0.0
		 * @returns {boolean}	true if layout is successfully changed
		 */
		changeRowLayout : function ( newLayout ) {

			if( false === this.validateColumnLayout( newLayout ) ){
				return false;
			}

			var currentGrid = this.currentGrid(),
				parentId = this.model.attributes.shortcode_id,
				lastColumn ,
				columns = this.getColumnsId();


			for ( var counter in currentGrid ){
				if ( newLayout[ counter ] ){
					this.updateColumnModel( columns[ counter ], parentId, newLayout[ counter ] );
					lastColumn = counter ;
				} else {
					this.deleteColumnModel( columns[ counter ], columns[ lastColumn ] );
				}
			}

			if ( newLayout.length > currentGrid.length ) {
				this.modifyColumns( counter, newLayout, columns[ counter ] );
			}

			this.model.trigger( 'change', this.model );
			return true;

		},

		/**
		 * @summary Create new column
		 *
		 * @params {number}	counter			Columns that should be created
		 * @params {array}	newLayout		New layout
		 * @params {number}	columnId		ID of last column updated
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		modifyColumns : function ( counter, newLayout, columnId ) {

			counter = parseInt( counter ) + 1;
			for( counter; counter < newLayout.length; counter++ ){
				var model = karmaBuilder.karmaModels.findWhere( { 'shortcode_id' : columnId } ) ,
					attributes = model.attributes ;
				attributes.shortcode_attributes = this.updateWidthColumn( attributes.shortcode_attributes, newLayout[ counter ] );
				attributes.shortcode_attributes['element_key'] = this.createNewElementKey();
				attributes['shortcode_id'] = attributes['shortcode_id'] + 1;
				attributes['order'] = attributes['order'] + 1;
				karmaBuilder.karmaModels.add( attributes );
			}

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
( function( $, karmaBuilder ){

	karmaBuilder.section = karmaBuilder.shortcodes.extend({

		events:{

			'click'	: 'showBorder',

		},
		
		initialize: function( options ){

			karmaBuilder.section.__super__.initialize.apply( this, arguments );

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
		showBorder: function (e) {

			if( this.$el.hasClass('karma-active-section') && $( e.target ).closest( '.karma-builder-element' ).hasClass('karma-active-column') ){
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
		 * @returns {Array}	Contain the ids
		 */
		getColumnsKey : function () {

			var columns = [] ;
			_.each( this.findChildren(), function ( column ) {
				columns.push( column.attributes.element_key );
			} );
			return columns;

		},

		/**
		 * @summary return current layout grid
		 *
		 * @since 1.0.0
		 *
		 * @returns Array - current layout of section
		 */
		currentGrid : function( ) {
			//@TODO responsiveTool
			var childrenModels = this.findChildren();

			var currentGrid = [];
			for (var i = 0, len = childrenModels.length; i < len; i++) {
				//@TODO change sm_size to whatever may apply on responsive tool :)
				currentGrid.push( parseInt( childrenModels[i].attributes.shortcode_attributes.sm_size ) )
			}
			return currentGrid;

		},

		/**
		 * @summary Calculate new layout grid after append nw column
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
		 * @summary Delete The column id
		 *
		 * @params {number}	columnKey			The column id
		 * @params {number}	lastColumnKey		The last column in row id
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		deleteColumnModel : function ( columnKey, lastColumnKey ) {

			var model = karmaBuilder.karmaModels.findWhere( { 'element_key' : columnKey } ) ,
				columnInstance = $( '[data-element-key="' + model.attributes.element_key + '"]' ).backboneView();
			columnInstance.deleteColumn( lastColumnKey  );

		},

		/**
		 * @summary Sum the numbers
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
		updateColumnModel : function ( columnKey, parentId, newWidth ) {

			var model = karmaBuilder.karmaModels.findWhere( { 'element_key' : columnKey } ) ,
				columnInstance = $( '[data-element-key="' + model.attributes.element_key + '"]' ).backboneView();
			columnInstance.updateWidthColumn( newWidth );

		},

		/**
		 * @summary Change the layout of row grid
		 *
		 * @params {array}	newLayout The grid layout
		 *
		 * @since 1.0.0
		 * @returns {boolean}	true if layout is successfully changed
		 */
		changeRowLayout : function ( newLayout ) {

			if( false === this.validateColumnLayout( newLayout ) ){
				return false;
			}

			var currentGrid = this.currentGrid(),
				parentKey = this.model.attributes.element_key,
				lastColumn ,
				columns = this.getColumnsKey();


			for ( var counter in currentGrid ){
				if ( newLayout[ counter ] ){
					this.updateColumnModel( columns[ counter ], parentKey, newLayout[ counter ] );
					lastColumn = counter ;
				} else {
					this.deleteColumnModel( columns[ counter ], columns[ lastColumn ] );
				}
			}

			if ( newLayout.length > currentGrid.length ) {
				this.createNewColumn( counter, newLayout, columns[ counter ] );
			}

			$( document ).trigger( 'changeRowLayout/finished' );
			return true;

		},

		/**
		 * @summary Create new column
		 *
		 * @params {number}	counter			Columns that should be created
		 * @params {array}	newLayout		New layout
		 * @params {number}	columnKey		ID of last column updated
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		createNewColumn : function ( counter, newLayout, columnKey ) {

			counter = parseInt( counter ) + 1;
			for( counter; counter < newLayout.length; counter++ ){
				var model = karmaBuilder.karmaModels.findWhere( { 'element_key' : columnKey } ).attributes,
					newModel = {
						'element_key'           : KarmaView.createNewElementKey(),
						'parent_key'            : model.parent_key ,
						'order'                 : model.order + 1 ,
						'shortcode_content'     : '' ,
						'shortcode_name'        : model.shortcode_name ,
						'shortcode_attributes'  : JSON.parse( JSON.stringify( model.shortcode_attributes ) )
					};

				newModel.shortcode_attributes.lg_size = newLayout[ counter ];
				newModel.shortcode_attributes.sm_size = newLayout[ counter ];
				newModel.shortcode_attributes.xl_size = newLayout[ counter ];
				newModel.shortcode_attributes.md_size = newLayout[ counter ];
				var CID = karmaBuilder.karmaModels.add( newModel ).cid,
					ColumnModel = karmaBuilder.karmaModels.get({ 'cid' : CID })
				$( '[data-element-key="' + model.parent_key + '"]' ).find('.karma-row').append( KarmaView.createBuilderModel( ColumnModel ) );
				KarmaView.createNewElement( 'column', ColumnModel );

			}

		},


		/**
		 * @summary create html fot tooltip
		 *
		 * @since 1.0.0
		 *
		 */
		toolTipHtml: function () {

			if( ! document.querySelectorAll('.tooltip-div').length ){
				var tooltip = document.createElement( 'div' );
				tooltip.setAttribute( 'class', 'tooltip-div' );
				document.body.appendChild( tooltip );
			}

		},

		/**
		 * @summary structure field changes. Change Container of Section instead of render
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		structure: function () {

			var defaultClasses 	= 'karma-row karma-no-gutters ',
				containerClass	= ( 'container' == this.model.attributes.shortcode_attributes.structure ) ? 'karma-container' : 'karma-container-fluid',
				newStructure 	= defaultClasses + containerClass;

			this.el.firstElementChild.firstElementChild.setAttribute( "class", newStructure );

		},

		/**
		 * @summary space field changes. It updates the space of section
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		space: function () {

			 var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
			 	padding		= this.model.attributes.shortcode_attributes.space + 'px';
			this.$el.find( '.karma-bottom-spacing' ).css( 'height', padding )
			this.renderCss( '.' + elementId, 'padding-top', padding );
			this.renderCss( '.' + elementId, 'padding-bottom', padding );

		},

		/**
		 * @summary extra class field changes. Add class to the element instead of render
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		extraclass: function(){

			var elementClass = this.model.get( 'shortcode_name' ).replace( '_', '-' ) + '-' + this.model.attributes.shortcode_attributes.element_key,
				defaultClasses =  elementClass + " karma-section  "  + this.model.attributes.shortcode_attributes.extraclass;

			this.el.firstElementChild.setAttribute( 'class', defaultClasses );

		}

	} );
})( jQuery, karmaBuilder );
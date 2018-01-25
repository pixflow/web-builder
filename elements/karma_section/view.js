( function( $, karmaBuilder ){

	karmaBuilder.section = karmaBuilder.shortcodes.extend({

		events:{

			'click'	                   : 'showBorder',
			'click.closeExtraPanel'    : 'closeExtraPanel'  ,

		},
		
		initialize: function( options ){

			karmaBuilder.section.__super__.initialize.apply( this, arguments );
			this.options = options;
			if( this.options.renderStatus ){
				this.render();
			}
			this.setSortable();


		},

		/**
		 * @summary Add specific class for empty columns
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		checkEmptyColumn : function () {

			var parentSection = this.el;

			if( 0 == parentSection.querySelectorAll('.karma-column .karma-builder-element').length ){
				$( parentSection ).find('.karma-builder-element[data-name="karma_column"]').addClass('karma-empty-column');
			}

		},

		showSettingPanel : function(){

			this.model.attributes.shortcode_attributes['add_grid'] = this.currentGrid();
			karmaBuilder.section.__super__.showSettingPanel.apply( this, arguments );

		},

		/**
		 * @summary Add section to sortable sections
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		setSortable: function () {

			$( "#karma-builder-layout" ).sortable( "refresh" );

		},


		/**
		 * @summary Close element setting panel and Close element panel
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		closeExtraPanel : function(){

			KarmaView.removeSettingPanel()
						.closeElementPanel()
						.removeActiveElement();

		},

		/**
		 * @summary Set the active row with specific class
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		showBorder: function ( e ) {

			e.stopPropagation();

			this.removeDropDownGizmo();
			this.removeMoreSubmenu();
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
			columnInstance.$el.trigger('karma/finish/modifyColumns');

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

			this.setAttributes( { grid : '' }, true );
			$( document ).trigger( 'changeRowLayout/finished', [ newLayout ] );
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
			
			counter = ( counter ) ? parseInt( counter ) + 1 : 0;
			var model =  $( document ).triggerHandler( 'karma/before/createElement/karma_column' ),
				order = ( columnKey ) ? ( karmaBuilder.karmaModels.findWhere( { 'element_key' : columnKey } ).attributes.order + 1 ) : 1,
				that = this;

			for( counter; counter < newLayout.length; counter++ ){

				var newModel = {
						shortcode_name          : 'karma_column',
						shortcode_content       : '',
						element_key             : KarmaView.createNewElementKey(),
						shortcode_attributes    : JSON.parse( JSON.stringify( model ) ),
						order                   : order ,
						parent_key              : that.model.get('element_key')
				 }
				order++;
				newModel.shortcode_attributes.lg_size = newLayout[ counter ];
				newModel.shortcode_attributes.sm_size = newLayout[ counter ];
				newModel.shortcode_attributes.xl_size = newLayout[ counter ];
				newModel.shortcode_attributes.md_size = newLayout[ counter ];


				var columnModel = karmaBuilder.karmaModels.add( newModel );
				$( '[data-element-key="' + columnModel.get('parent_key') + '"] .karma-row' ).append( KarmaView.createBuilderModel( columnModel ) );
				KarmaView.createNewElement( 'column', columnModel );

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
				containerClass	= ( 'container' == this.getAttributes( ['structure'] ).structure ) ? 'karma-container' : 'karma-container-fluid',
				newStructure 	= defaultClasses + containerClass;

			this.el.querySelector('.karma-row').setAttribute( "class", newStructure );

		},

		/**
		 * @summary space field changes. It updates the space of section
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		space: function () {

			var padding	= this.getAttributes( ['space'] ).space + 'px';
			this.$el.find('.karma-bottom-spacing').css( 'height', padding )
			this.$el.find('.karma-section').css({
				'padding-top'      : padding,
				'padding-bottom'   : padding
			});

		},

		/**
		 * @summary extra class field changes. Add class to the element instead of render
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		extraclass: function(){

			var elementClass = this.model.get( 'shortcode_name' ).replace( '_', '-' ) + '-' + this.model.get('element_key'),
				defaultClasses =  elementClass + " karma-section  "  + this.getAttributes( ['extraclass'] ).extraclass;

			this.el.querySelector('.karma-section').setAttribute( 'class', defaultClasses );

		},

		/**
		 * @summary background type changes. change background type
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		backgroundtype: function () {

			var backgroundClasses = 'karma-background-section ',
				backgroundType = this.getAttributes( [ 'backgroundtype' ] ).backgroundtype;
			if ( 'color' == backgroundType ) {
				backgroundClasses = backgroundClasses + ' karma-section-color-background';
			} else if ( 'image' == backgroundType ) {
				backgroundClasses = backgroundClasses + ' karma-section-image-background karma-background-image-' + this.getAttributes( [ 'backgroundsize' ] ).backgroundsize + ' karma-background-position-' + this.getAttributes( [ 'backgroundposition' ] ).backgroundposition;
			}

			this.el.querySelector( '.karma-background-section' ).setAttribute( 'class', backgroundClasses );

		},

		/**
		 * @summary background color changes. change background color
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		backgroundcolor: function () {

			var elementId = this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' );
			this.renderCss( '#' + elementId + ' .karma-background-section.karma-section-color-background', 'background-color', this.getAttributes( [ 'backgroundcolor' ] ).backgroundcolor );

		},

		/**
		 * @summary Change the grid layout
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		grid: function () {

			var grid = this.getAttributes( ['grid'] ).grid;
			if( '' == grid || 'undefined' == typeof grid ){
				return ;
			}
			var newGrid = JSON.parse( grid );
			this.changeRowLayout( newGrid );

		},

		/**
		 * @summary extra class field changes. Add class to the element instead of render
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		columnspace : function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				margin = this.getAttributes( ['columnspace'] ).columnspace + 'px';
			this.renderCss( '#' + elementId + ' .karma-column-margin', 'margin-left', margin );
			this.renderCss( '#' + elementId + ' .karma-column-margin', 'margin-right', margin );

		},

		/**
		 * @summary fire on change background image controller
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		backgroundimage : function () {

			var imageAddress = this.getAttributes( [ 'backgroundimage' ] ),
				elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				imageUrl = '' ;

			if( 'none' == imageAddress.backgroundimage ){
				imageUrl = 'none';
			}else{
				imageUrl = 'url('+ imageAddress.backgroundimage  +')';
			}
			this.renderCss( '#' + elementId + ' .karma-background-section.karma-section-image-background', 'background-image', imageUrl );


		},

		/**
		 * @summary change background size to cover and contain
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		backgroundsize  : function () {

			var regex = new RegExp('(?:^|\\s)karma-background-image-(.*?)(?!\\S)'),
				backgroundsize = this.getAttributes( [ 'backgroundsize' ] ).backgroundsize,
				sectionBackground = this.el.querySelector( '.karma-background-section' );

			sectionBackground.className = sectionBackground.className.replace( regex, " karma-background-image-" + backgroundsize );

		},

		/**
		 * @summary change position of background image
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		backgroundposition : function () {

			var regex = new RegExp('(?:^|\\s)karma-background-position-(.*?)(?!\\S)'),
				imagePosition = this.getAttributes( [ 'backgroundposition' ] );

			this.el.querySelector( '.karma-background-section' ).className = this.el.querySelector( '.karma-background-section' ).className.replace( regex, " karma-background-position-" + imagePosition.backgroundposition );

		},

	} );

})( jQuery, karmaBuilder );
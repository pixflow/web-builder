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
		 *  Add specific class for empty columns
		 *
		 * @since 0.1.0
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
		 *  Add section to sortable sections
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		setSortable: function () {

			$( "#karma-builder-layout" ).sortable( "refresh" );

		},


		/**
		 *  Close element setting panel and Close element panel
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		closeExtraPanel : function(){

			KarmaView.removeSettingPanel()
						.closeElementPanel()
						.removeActiveElement();

		},

		/**
		 *  Set the active row with specific class
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		showBorder: function ( e ) {

			e.stopPropagation();
			window.top.karmaBuilderEnviroment.closeCodeEditorDropDown();
			this.$el.trigger( 'karma/after/clickElement' );
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
		 *  Get the if of all row columns
		 *
		 * @since 0.1.0
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
		 *  return current layout grid
		 *
		 * @since 0.1.0
		 *
		 * @returns {Array} - current layout of section
		 */
		currentGrid : function() {

			var childrenModels = this.findChildren();

			var currentGrid = [];
			for (var i = 0, len = childrenModels.length; i < len; i++) {
				currentGrid.push( parseInt( childrenModels[i].attributes.shortcode_attributes.lg_size ) );
			}
			return currentGrid;

		},

		/**
		 *  Calculate new layout grid after append nw column
		 *
		 * @since 0.1.0
		 *
		 * @returns {Array} - new layout of section after add new column
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
		 *  Delete The column id
		 *
		 * @param {number}	columnKey		The column id
		 * @param {number}	lastColumnKey	The last column in row id
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		deleteColumnModel : function ( columnKey, lastColumnKey ) {

			var model = karmaBuilder.karmaModels.findWhere( { 'element_key' : columnKey } ) ,
				columnInstance = $( '[data-element-key="' + model.attributes.element_key + '"]' ).backboneView();
			columnInstance.deleteColumn( lastColumnKey  );

		},

		/**
		 *  Sum the numbers
		 *
		 * @param {number}	total	The total number
		 * @param {number}	num		The new number
		 *
		 * @since 0.1.0
		 * @returns {number}	Sum of number given
		 */
		getSum : function ( total, num ) {

			return total + num;

		},

		/**
		 *  Check the grid given is equal 12
		 *
		 * @param {array}	grid	The grid layout
		 *
		 * @since 0.1.0
		 * @returns {boolean}	true if layout is correct
		 */
		validateColumnLayout : function ( grid ) {

			if ( 12 == grid.reduce( this.getSum ) ) {
				return true ;
			}

			return false;

		},

		/**
		 *  Update the column model by id given.
		 * Function just update size of column
		 *
		 * @param {number}	columnKey		The column id
		 * @param {number}	newWidth		The new width of column
		 * @param {number}	newGridColumns	The count of columns in new grid
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		updateColumnModel : function ( columnKey, newWidth, newGridColumns ) {

			var model = karmaBuilder.karmaModels.findWhere( { 'element_key': columnKey } ),
				columnInstance = $( '[data-element-key="' + model.attributes.element_key + '"]' ).backboneView(),
				mdSize = this.calcMediumWidthColumn( newGridColumns ),
				newSize = { lg_size: newWidth, xl_size: newWidth, md_size: mdSize };
			columnInstance.updateWidthColumn( newSize );
			columnInstance.$el.trigger('karma/finish/modifyColumns');

		},

		/**
		 *  Change the layout of row grid
		 *
		 * @param {array}	newLayout The grid layout
		 *
		 * @since 0.1.0
		 * @returns {boolean}	true if layout is successfully changed
		 */
		changeRowLayout : function ( newLayout ) {

			if( false === this.validateColumnLayout( newLayout ) ){
				return false;
			}

			var currentGrid = this.currentGrid(),
				lastColumn ,
				columns = this.getColumnsKey();

			for ( var counter in currentGrid ){
				if ( newLayout[ counter ] ){
					this.updateColumnModel( columns[ counter ], newLayout[ counter ], newLayout.length );
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
		 *  Create new column
		 *
		 * @param {number}	counter			Columns that should be created
		 * @param {array}	newLayout		New layout
		 * @param {number}	columnKey		ID of last column updated
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		createNewColumn : function ( counter, newLayout, columnKey ) {
			
			counter = ( counter ) ? parseInt( counter ) + 1 : 0;
			var order = ( columnKey ) ? ( karmaBuilder.karmaModels.findWhere( { 'element_key' : columnKey } ).attributes.order + 1 ) : 1,
				that = this,
				columnModel = $( document ).triggerHandler( 'karma/before/createElement/karma_column' ),
				model = columnModel ;

			if( 'undefined' !== typeof that.block ){
				model = jQuery.extend( columnModel, that.block.childes[ counter ].parent.shortcode_attributes );
			}

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
				newModel.shortcode_attributes.sm_size = 12;
				newModel.shortcode_attributes.xl_size = newLayout[ counter ];
				newModel.shortcode_attributes.md_size = this.calcMediumWidthColumn( newLayout.length );

				var columnModel = karmaBuilder.karmaModels.add( newModel );
				$( '[data-element-key="' + columnModel.get('parent_key') + '"] .karma-row' ).append( KarmaView.createBuilderModel( columnModel ) );
				var elementView = KarmaView.createNewElement( 'column', columnModel );
				KarmaView.createStyleSheetForElements( elementView.model.attributes.shortcode_attributes, elementView );

			}

		},


		/**
		 *  create html for tooltip
		 *
		 * @since 0.1.0
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
		 *  fit to screen option for section
		 *
		 * @since 2.0
		 *
		 */
		fittoheight : function () {
			
			if( this.el.querySelector('.karma-section').classList.contains('karma-fit-to-screen') ){
				this.el.querySelector('.karma-section').classList.remove('karma-fit-to-screen');
			}else{
				this.el.querySelector('.karma-section').classList.add('karma-fit-to-screen');
			}

		},


		/**
		 *  structure field changes. Change Container of Section instead of render
		 *
		 * @since 0.1.0
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
		 *  space field changes. It updates the space of section
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		space: function () {

			var padding	= this.getAttributes( ['space'] ).space + 'px';
			this.renderCss( '#' + this.elementSelector() + ' .karma-section', 'padding-top', padding );
			this.renderCss( '#' + this.elementSelector() + ' .karma-section', 'padding-bottom', padding );

		},

		/**
		 *  create default responsive space
		 *
		 * @since   2.0
		 * @returns {void}
		 */
		createDefaultResponsiveSpace: function () {

			// Tablet
			var tabletPadding = this.getAttributes( [ 'tabletspace' ] ).tabletspace + 'px';
			this.renderCss( '#' + this.elementSelector() + ' .karma-section', 'padding-top', tabletPadding, 'tablet' );
			this.renderCss( '#' + this.elementSelector() + ' .karma-section', 'padding-bottom', tabletPadding, 'tablet' );

			// Mobile
			var mobilePadding = this.getAttributes( [ 'mobilespace' ] ).mobilespace + 'px';
			this.renderCss( '#' + this.elementSelector() + ' .karma-section', 'padding-top', mobilePadding, 'mobile' );
			this.renderCss( '#' + this.elementSelector() + ' .karma-section', 'padding-bottom', mobilePadding, 'mobile' );

		},

		/**
		 *  extra class field changes. Add class to the element instead of render
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		extraclass: function(){

			var elementClass = this.model.get( 'shortcode_name' ).replace( '_', '-' ) + '-' + this.model.get('element_key'),
				defaultClasses =  elementClass + " karma-section  "  + this.getAttributes( ['extraclass'] ).extraclass,
				section = this.el.querySelector('.karma-section');

			if ( section.classList.contains('karma-fit-to-screen') ){
				defaultClasses += ' karma-fit-to-screen'
			}

			section.setAttribute( 'class', defaultClasses );

		},

		/**
		 *  background type changes. change background type
		 *
		 * @since 0.1.0
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
		 *  background color changes. change background color
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		backgroundcolor: function () {

			this.renderCss( '#' + this.elementSelector() + ' .karma-background-section.karma-section-color-background', 'background-color', this.getAttributes( [ 'backgroundcolor' ] ).backgroundcolor );

		},

		/**
		 *  Change the grid layout
		 *
		 * @since 0.1.0
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
		 *  extra class field changes. Add class to the element instead of render
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		columnspace : function () {

			var margin = this.getAttributes( ['columnspace'] ).columnspace + 'px';
			this.renderCss( '#' + this.elementSelector() + ' .karma-column-margin', 'margin-left', margin );
			this.renderCss( '#' + this.elementSelector() + ' .karma-column-margin', 'margin-right', margin );

		},

		/**
		 *  fire on change background image controller
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		backgroundimage : function () {

			var imageAddress = this.getAttributes( [ 'backgroundimage' ] ),
				imageUrl = '' ;

			if( 'none' == imageAddress.backgroundimage ){
				imageUrl = 'none';
			}else{
				imageUrl = 'url('+ imageAddress.backgroundimage  +')';
			}
			this.renderCss( '#' + this.elementSelector() + ' .karma-background-section.karma-section-image-background', 'background-image', imageUrl );


		},

		/**
		 *  change background size to cover and contain
		 *
		 * @since 0.1.0
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
		 *  change position of background image
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		backgroundposition : function () {

			var regex = new RegExp('(?:^|\\s)karma-background-position-(.*?)(?!\\S)'),
				imagePosition = this.getAttributes( [ 'backgroundposition' ] );

			this.el.querySelector( '.karma-background-section' ).className = this.el.querySelector( '.karma-background-section' ).className.replace( regex, " karma-background-position-" + imagePosition.backgroundposition );

		},

		/**
		 *  show and hide section white hide gizmo in tablet
		 *
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		visibleontablet : function () {

			var tabletVisible = this.getAttributes( ['visibleontablet'] ).visibleontablet;

			if( "on" == tabletVisible ){
				this.el.querySelector( 'section' ).classList.remove( "karma-deactive-on-tablet" );
			}else{
				this.el.querySelector( 'section' ).classList.add( "karma-deactive-on-tablet" );
			}

		},

		/**
		 *  show and hide section white hide gizmo in mobile
		 *
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		visibleonmobile : function () {

			var mobileVisible = this.getAttributes( ['visibeonmobile'] ).visibleonmobile;

			if( "on" == mobileVisible ){
				this.el.querySelector( 'section' ).classList.remove( "karma-deactive-on-mobile" );
			}else{
				this.el.querySelector( 'section' ).classList.add( "karma-deactive-on-mobile" );
			}

		},

		/**
		 * @summary update column responsive sizes and change class
		 *
		 * @param {number}    newLayout The grid layout
		 *
		 * @since 2.0
		 * @return {void}
		 */
		changeColumnResponsive: function ( newSize ) {

			var currentGrid = this.currentGrid(),
				columns = this.getColumnsKey();

			for ( var counter in currentGrid ) {

				var model = karmaBuilder.karmaModels.findWhere( { 'element_key': columns[ counter ] } ),
					columnInstance = $( '[data-element-key="' + model.attributes.element_key + '"]' ).backboneView();
				var newColumnSize = {
					lg_size: model.attributes.shortcode_attributes.lg_size
					, xl_size: model.attributes.shortcode_attributes.xl_size
					, md_size: newSize
				};
				columnInstance.updateWidthColumn( newColumnSize );
				columnInstance.$el.trigger( 'karma/finish/modifyColumns' );

			}

		},

		/**
		 * @summary return the medium size of column base on columns count
		 *
		 * @param {number}    columnsCount   no of columns
		 *
		 * @since 2.0
		 * @returns {number}
		 */
		calcMediumWidthColumn: function ( columnsCount ) {

			var mdSize = 12;
			if ( 1 === columnsCount || 3 == columnsCount ) {
				mdSize = 12;
			} else if ( 2 === columnsCount || 4 == columnsCount ) {
				mdSize = 6;
			} else if ( 6 === columnsCount ) {
				mdSize = 4;
			}
			return mdSize;

		},

	} );

})( jQuery, karmaBuilder );
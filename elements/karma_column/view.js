(function($, karmaBuilder) {

	karmaBuilder.column = karmaBuilder.shortcodes.extend({

		events:{

				'click'	: 'activeColumn',

		},

		initialize: function( options ){

			karmaBuilder.section.__super__.initialize.apply( this, arguments );
			this.liveChangeGrid();
		},

		/**
		 * @summary Render column element
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		render : function () {

			var source = this.template( this.model );
			this.el.innerHTML = source;
			this.createGizmo();
			this.delegateEvents();

		},


		/**
		 * @summary Set the active row with specific class
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		activeColumn: function () {

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
				padding		= this.model.attributes.shortcode_attributes.rightSpace + 'px';

			this.renderCss( '.' + elementId, 'padding-right', padding );

		},

		/**
		 * @right spacing of column setting panel
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		leftSpace: function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				padding		= this.model.attributes.shortcode_attributes.leftSpace + 'px';

			this.renderCss( '.' + elementId, 'padding-left', padding );

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

		},

		/**
		 * @summary Change column class names by type
		 *
		 * @param {string}  gridType    Grid type of column ( ex: lg || sm )
		 * @param {number}  newCol      New column grid value
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		changeColumnClassName : function( gridType, newCol ){

			var regex = new RegExp('(?:^|\\s)karma-col-' + gridType + '-(.*?)(?!\\S)'),
				childCol = this.el.querySelector('.karma-column');
			this.el.className = this.el.className
				.replace( regex, ' karma-col-' + gridType + '-' + newCol );
			childCol.className = childCol.className
				.replace( regex, ' karma-col-' + gridType + '-' + newCol );

		},

		/**
		 * @summary Change column LG size
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		lg_size : function () {

			var newCol = this.model.attributes.shortcode_attributes.lg_size;
			this.changeColumnClassName( 'lg', newCol );

		},

		/**
		 * @summary Change column MD size
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		md_size : function () {

			var newCol = this.model.attributes.shortcode_attributes.md_size;
			this.changeColumnClassName( 'md', newCol );

		},

		/**
		 * @summary Change column XL size
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		xl_size : function () {

			var newCol = this.model.attributes.shortcode_attributes.xl_size;
			this.changeColumnClassName( 'xl', newCol );

		},

		/**
		 * @summary Change column SM size
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		sm_size : function () {

			var newCol = this.model.attributes.shortcode_attributes.sm_size;
			this.changeColumnClassName( 'sm', newCol );

		},

		/**
		 * @summary Update the size of columns
		 *
		 * @param {number}	value   New value
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		updateWidthColumn : function ( value ) {

			var newAttributes = {
				'sm_size' : value ,
				'lg_size' : value ,
				'md_size' : value ,
				'xl_size' : value ,
			};

			this.setAttributes( newAttributes, false);

		},

		/**
		 * @summary Delete column completely
		 * Before delete column,it move all content in the last column in same row
		 *
		 * @param {number}  lastColumnKey   Element key of before the last column
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		deleteColumn : function( lastColumnKey ) {

			var columnKey = this.model.attributes.element_key,
				models = karmaBuilder.karmaModels.where({ 'parent_key': columnKey }),
				lastColChild = karmaBuilder.karmaModels.where({ 'parent_key': lastColumnKey }),
				newOrder = 1 ;

			if( lastColChild.length ){
				newOrder = lastColChild.last().attributes.order + 1;
			}

			_.each( models, function ( model) {
				var newAtttibutes = JSON.parse( JSON.stringify( model.attributes.shortcode_attributes ) );
				newAtttibutes.order = newOrder ;
				newOrder++;
				model.set({ 'parent_key': lastColumnKey , 'shortcode_attributes' : newAtttibutes }, { silent: true } );
			});

			this.moveContent( lastColumnKey );
			this.model.destroy();

		} ,

		/**
		 * @summary Move the content from column to another column
		 *
		 * @param {number}  lastColumnKey   Element key of before the last column
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		moveContent : function ( lastColumnKey ) {

			var contentWithData = this.el.querySelector('.karma-column').cloneNode( true ) ;
			$( '[data-element-key="' + lastColumnKey + '"]' ).find('.karma-column')
				.append( contentWithData.innerHTML );

		}

	});
})(jQuery,karmaBuilder);
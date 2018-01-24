(function($, karmaBuilder) {

	karmaBuilder.column = karmaBuilder.shortcodes.extend({

		events : {

			'click'                                          : 'activeColumn',
			'click.closeExtraPanel'                          : 'closeExtraPanel'  ,
			'karma/finish/modifyColumns.karmaImage'          : 'updateImageSize'

		},


		initialize: function( options ){

			karmaBuilder.column.__super__.initialize.apply( this, arguments );
			this.options = options;
			if( this.options.renderStatus ){
				this.render();
			}
			this.liveChangeGrid();
			this.checkEmptyColumn();

		},

		/**
		 * @summary Add specific class for empty columns
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		checkEmptyColumn : function () {

			var parentSection = $('[data-element-key="' + this.model.get('parent_key') + '"]').backboneView();
			parentSection.checkEmptyColumn();

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

		},

		/**
		 * @summery update images width  on their column resize
		 *
		 * @since 1.0.0
		 *
		 * @return {void}
		 */
		updateImageSize : function () {

			var imageLinks =  this.el.querySelectorAll('.karma-builder-element[data-name="karma_image"]') ;
			_.each( imageLinks, function( image ){

				var trueWidth = image.offsetWidth;
				if( trueWidth < image.querySelector('img').offsetWidth ){
					image.querySelector('.karma-image-resize').style.width = trueWidth + 'px';
					image.querySelector('.karma-image-resize-crop').style.width = trueWidth + 'px';
				}

			} );


		},

		/**
		 * @summary Close element setting panel and Close element panel
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		closeExtraPanel : function(){

			// Close element setting panel
			if( 'undefined' != typeof elementSettingPanel ){
				elementSettingPanel.removeSettingPanel();
			}

			// Close element panel
			if( 'undefined' != typeof window.top.karmaElementPanel ){
				window.top.karmaElementPanel.closeElementPanel();
			}

			var activeElement = document.querySelector('.karma-active-element')
			if( null != activeElement ){
				activeElement.classList.remove('karma-active-element');
			}


		},


		/**
		 * @summary Set the active row with specific class
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		activeColumn: function ( e ) {

			e.stopPropagation();

			if( this.$el.hasClass('karma-active-column') ){
				return;
			}

			$('.karma-active-column').removeClass('karma-active-column');
			this.$el.addClass('karma-active-column');
			KarmaView.$el.trigger( 'karma/callParent', [ this.el, ['showBorder'], 2 ] );

		},

		/**
		 * @right spacing of column setting panel
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		rightspace: function () {
			
			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				padding		= this.model.attributes.shortcode_attributes.rightspace + 'px';

			this.$el.trigger('karma/finish/modifyColumns');
			this.renderCss( '.karma-no-gutters > #' + elementId + '> .karma-column', 'padding-right', padding );

		},

		/**
		 * @right spacing of column setting panel
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		leftspace: function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				padding		= this.model.attributes.shortcode_attributes.leftspace + 'px';

			this.$el.trigger('karma/finish/modifyColumns');
			this.renderCss( '.karma-no-gutters > .karma-builder-element > .karma-column.' + elementId, 'padding-left', padding );

		},

		/**
		 * extra class field changes. Add class to the column
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		extraclass: function(){

			var elementClass = this.model.get( 'shortcode_name' ).replace( '_', '-' ) + '-' + this.model.attributes.shortcode_attributes.element_key,
				defaultClasses =  elementClass + " karma-column  "  + this.model.attributes.shortcode_attributes.extraclass;
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
				onStart : function () {

					KarmaView.removeActiveElement();

				},
				onStop: function ( result ) {

					var newGrid = result.grid,
						nextSibilingColumn = that.$el.next('.karma-builder-element[data-name="karma_column"]');

					that.newGrid( newGrid );
					that.$el.trigger('karma/finish/modifyColumns');
					if( nextSibilingColumn.length ){
						var columnInstance = nextSibilingColumn.backboneView();
						columnInstance.$el.trigger('karma/finish/modifyColumns')
					}

				}
			};

			gridResizer( changeGridOptions );

		},

		/**
		 * @summary calculate new parent section grid and update grid
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

			var columnKey = this.model.get( 'element_key' ),
				models = karmaBuilder.karmaModels.where({ 'parent_key': columnKey }),
				lastColChild = karmaBuilder.karmaModels.where({ 'parent_key': lastColumnKey }),
				newOrder = 1 ,
				that = this;

			if( lastColChild.length ){
				newOrder = lastColChild[ Object.keys( lastColChild )[ Object.keys( lastColChild ).length - 1] ].attributes.order + 1;
			}

			_.each( models, function ( model) {
				model.set({ 'parent_key': lastColumnKey , 'order' : newOrder }, { silent: true } );
				that.moveContent( lastColumnKey, model );
				newOrder++;
			});

			this.el.innerHTML = '';
			this.model.destroy();

		} ,

		/**
		 * @summary Move the content from column to another column
		 *
		 * @param {number}  lastColumnKey   Element key of before the last column
		 * @param {object{  model           Element model
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		moveContent : function ( lastColumnKey, model ) {

			var viewObject = $('[data-element-key="' + model.get('element_key') + '"]').backboneView() ,
				elementID = model.get('shortcode_name').replace( '_', '-' ) + '-' + model.get('element_key'),
				moveToColumn = $( '[data-element-key="' + lastColumnKey + '"]' ).find('.karma-column-margin'),
				script = $( '#script-' + elementID ).clone(),
				style = $( '#style-' + elementID ).clone();

			this.removeExtraAssets( elementID );
			moveToColumn.append( viewObject.$el );
			moveToColumn.append( script );
			moveToColumn.append( style );

		},

	});
})(jQuery,karmaBuilder);
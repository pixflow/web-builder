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
		 * Add specific class for empty columns
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		checkEmptyColumn : function () {

			var parentSection = $('[data-element-key="' + this.model.get('parent_key') + '"]').backboneView();
			parentSection.checkEmptyColumn();

		},


		/**
		 * Render column element
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		render : function () {

			var source = this.template( this.model );
			this.el.innerHTML = source;

		},

		/**
		 * @summery update images width  on their column resize
		 *
		 * @param {object}  specificImage   Just execute for specific image
		 * @since 0.1.0
		 *
		 * @return {void}
		 */
		updateImageSize : function ( e, specificImage ) {

			var imageLinks =  ( 'undefined' == typeof specificImage ) ? this.el.querySelectorAll('.karma-builder-element[data-name="karma_image"]') : [ specificImage ] ;

			_.each( imageLinks, function( image ){

				var trueWidth = image.offsetWidth;
				if( trueWidth < image.querySelector('img').offsetWidth ){
					image.querySelector('.karma-image-resize').style.width = trueWidth + 'px';
					image.querySelector('.karma-image-resize-crop').style.width = trueWidth + 'px';
					image.querySelector( '.karma-image' ).setAttribute( 'width' , trueWidth );
					$( image ).backboneView().setAttributes( {
						width : trueWidth,
					}, true );
				}

			} );


		},

		/**
		 * Close element setting panel and Close element panel
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
		 * Set the active row with specific class
		 *
		 * @since 0.1.0
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
			if( null == this.el.querySelector( '.karma-builder-element' ) ){
				this.$el.trigger( 'karma/after/clickElement' );
			}


		},

		/**
		 * spacing of column setting panel
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		rightspace: function () {
			
			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				padding		= this.model.attributes.shortcode_attributes.rightspace + 'px';

			this.$el.trigger('karma/finish/modifyColumns');
			this.renderCss( '.karma-no-gutters > #' + elementId + '> .karma-column', 'padding-right', padding );
			this.el.querySelector('.karma-right-spacing').style.width = padding ;


		},

		/**
		 * spacing of column setting panel
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		leftspace: function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				padding		= this.model.attributes.shortcode_attributes.leftspace + 'px';

			this.renderCss( '.karma-no-gutters > #' + elementId + '> .karma-column', 'padding-left', padding );
			this.el.querySelector('.karma-left-spacing').style.width = padding ;
			this.$el.trigger('karma/finish/modifyColumns');

		},

		/**
		 * create default responsive space
		 *
		 * @since   2.0
		 * @returns {void}
		 */
		createDefaultResponsiveSpace: function () {

			// Tablet
			var tabletPaddingRight = this.getAttributes( [ 'tabletrightspace' ] ).tabletrightspace + 'px';
			this.renderCss( '.karma-no-gutters > #' + this.elementSelector() + '> .karma-column', 'padding-right', tabletPaddingRight, 'tablet' );
			var tabletPaddingLeft = this.getAttributes( [ 'tabletleftspace' ] ).tabletleftspace + 'px';
			this.renderCss( '.karma-no-gutters > #' + this.elementSelector() + '> .karma-column', 'padding-left', tabletPaddingLeft, 'tablet' );

			// Mobile
			var mobilePaddingRight = this.getAttributes( [ 'mobilerightspace' ] ).mobilerightspace + 'px';
			this.renderCss( '.karma-no-gutters > #' + this.elementSelector() + '> .karma-column', 'padding-right', mobilePaddingRight, 'mobile' );
			var mobilePaddingLeft = this.getAttributes( [ 'mobileleftspace' ] ).mobileleftspace + 'px';
			this.renderCss( '.karma-no-gutters > #' + this.elementSelector() + '> .karma-column', 'padding-left', mobilePaddingLeft, 'mobile' );

		},

		/**
		 *extra class field changes. Add class to the column
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		extraclass: function(){

			var elementClass = this.model.get( 'shortcode_name' ).replace( '_', '-' ) + '-' + this.model.attributes.shortcode_attributes.element_key,
				defaultClasses =  elementClass + " karma-column  "  + this.model.attributes.shortcode_attributes.extraclass;

				this.el.firstElementChild.setAttribute( 'class', defaultClasses );

		},

		/**
		 *apply live change grid on column
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		liveChangeGrid: function () {

			var that = this,
				key = this.model.get( 'element_key' ),
				allColumnInSection = $ ( this.el.closest('.karma-row') ).find('.karma-builder-element[data-name="karma_column"]');

			var changeGridOptions = {
				selector: '.karma-builder-element[data-element-key="' + key + '"]',
				snapToGrid: true,
				gridPrefix: 'karma-col-md',
				onStart : function () {

					KarmaView.removeActiveElement();
					allColumnInSection.addClass('karma-resizing-padding');

				},
				onStop: function ( result ) {

					var newGrid = result.grid,
						nextSibilingColumn = that.$el.next('.karma-builder-element[data-name="karma_column"]');

					allColumnInSection.removeClass('karma-resizing-padding');
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
		 * calculate new parent section grid and update grid
		 *
		 * @since 0.1.0
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
		 * Change column class names by type
		 *
		 * @param {string}  gridType    Grid type of column ( ex: lg || sm )
		 * @param {number}  newCol      New column grid value
		 *
		 * @since 0.1.0
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
		 * Change column LG size
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		lg_size : function () {

			var newCol = this.model.attributes.shortcode_attributes.lg_size;
			this.changeColumnClassName( 'lg', newCol );

		},

		/**
		 * Change column MD size
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		md_size : function () {

			var newCol = this.model.attributes.shortcode_attributes.md_size;
			this.changeColumnClassName( 'md', newCol );

		},

		/**
		 * Change column XL size
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		xl_size : function () {

			var newCol = this.model.attributes.shortcode_attributes.xl_size;
			this.changeColumnClassName( 'xl', newCol );

		},

		/**
		 * Change column SM size
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		sm_size : function () {

			var newCol = this.model.attributes.shortcode_attributes.sm_size;
			this.changeColumnClassName( 'sm', newCol );

		},

		/**
		 * Update the size of columns
		 *
		 * @param {number}	value   New value
		 *
		 * @since 0.1.0
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
		 * Delete column completely
		 * Before delete column,it move all content in the last column in same row
		 *
		 * @param {number}  lastColumnKey   Element key of before the last column
		 *
		 * @since 0.1.0
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
		 * Move the content from column to another column
		 *
		 * @param {number}  lastColumnKey   Element key of before the last column
		 * @param {object}  model           Element model
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		moveContent : function ( lastColumnKey, model ) {

			var viewObject = $('[data-element-key="' + model.get('element_key') + '"]').backboneView() ,
				elementID = model.get('shortcode_name').replace( '_', '-' ) + '-' + model.get('element_key'),
				moveToColumn = $( '[data-element-key="' + lastColumnKey + '"]' ).find('.karma-column-margin'),
				columnPlaceholder = moveToColumn.find( '.karma-column-placeholder' ),
				script = $( '#script-' + elementID ).clone(),
				style = $( '#style-' + elementID ).clone();

			this.removeExtraAssets( elementID );
			if ( columnPlaceholder.length ){
				columnPlaceholder.remove();
			}
			moveToColumn.append( viewObject.$el );
			moveToColumn.append( script );
			moveToColumn.append( style );

		},

		/**
		 * show and hide column white hide gizmo in tablet
		 *
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		visibleontablet : function () {

			var tabletVisible = this.getAttributes( ['visibleontablet'] ).visibleontablet;

			if( "on" == tabletVisible ){
				this.el.querySelector( ".karma-column" ).classList.remove( "karma-deactive-on-tablet" );
			}else{
				this.el.querySelector(".karma-column").classList.add( "karma-deactive-on-tablet" );
			}

		},


		/**
		 * show and hide column white hide gizmo in mobile
		 *
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		visibleonmobile : function () {

			//var mobileVisible = this.getAttributes( ['visibeonmobile'] ).visibleonmobile;
			var mobileVisible = this.model.attributes.shortcode_attributes.visibleonmobile;

			if( "on" == mobileVisible ){
				this.el.querySelector( ".karma-column" ).classList.remove( "karma-deactive-on-mobile" );
			}else{
				this.el.querySelector( ".karma-column" ).classList.add( "karma-deactive-on-mobile" );
			}

		}

	});
})(jQuery,karmaBuilder);
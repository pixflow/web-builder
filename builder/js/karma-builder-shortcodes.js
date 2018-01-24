( function( $, karmaBuilder ){

	karmaBuilder.shortcodes = Backbone.View.extend({

		events: {
			'before/buildGizmo'									: 'gimzoAction' ,
			'karma/before/deleteElement'                        : 'removeElementPlaceholder',
			'karma/after/deleteElement'                        	: 'createPlaceholderOnDelete',
			'click .karma-drop-down-icon'						: 'openDropDownGizmo' ,
			'click'												: 'showElementGizmo',
			'click.showGizmo .karma-more-setting'				: 'showGizmoRelatedToMore',
			'click .karma-drop-down-box'						: 'closeDropDownBox' ,
			'click .karma-delete-element-setting'				: "deleteElementBox",
			'click .karma-duplicate-element-setting'			: "duplicateElement",
			'click.removeActiveElement'         			    : 'callBlur',
			'click .karma-delete-message-box-delete-button'     : 'DeleteElement',
			'click .karma-delete-message-box-cancel-button'     : 'cancelDeleteElement',
			'click .karma-delete-message-box'   			    : 'cancelDeleteElement',
			'click .karma-delete-message-container'   			: 'deleteBoxStopPropagation',
			'click .karma-new-section-button'   				: 'newSectionDropDown',

		},


		/** Drop area template for elements */
		placeholderTemplate: '<div class="karma-element-placeholder {{ data.className }}" >'
		+ '<div class="karma-inner-placeholder" >'
		+ '</div>'
		+ '</div>',

		/** Alignment placeholder for elements */
		alignmentPlaceholderTemplate: '<div class="karma-left-alignment-placeholder" data-element-align="left" >'
		+ '</div>'
		+ '<div class="karma-center-alignment-placeholder" data-element-align="center" >'
		+ '</div>'
		+ '<div class="karma-right-alignment-placeholder" data-element-align="right" >'
		+ '</div>',


		/**
		 * @summary Set defaults in create
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		initialize : function( options ) {

			this.template = options.template;

			if( this.model ) {
				_.bindAll(this, "update","destroy");
				this.model.bind( 'change', this.update );
				this.model.bind( 'destroy', this.destroy );
			}
			this.gizmoParams = options.gizmoParams;
			this.toolTipHtml();
			this.karmaLinksDocumentClick();
			this.initSortable();

		},

		/**
		 * @summary Call blur inside sortable elements
		 * jQuery stops the default functionality of the browser when sorting a list,
		 * so the blur is never called
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		callBlur : function () {

			if ( 'karma_text' != this.model.get( 'shortcode_name' ) ){
				document.activeElement.blur();
			}

			this.closeNewSectionPanel();

		},

		/**
		 * @summary Init sortable on elements
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		initSortable: function (){

			var elementName = this.model.get( 'shortcode_name' ),
				that        = this;
			if ( 'karma_column' != elementName && 'karma_section' != elementName ){

				that.$el.find( '.karma-element-content' ).draggable( {
					zIndex  : 999999,
					helper  : 'clone',
					appendTo: '#karma-builder-layout',
					cancel  : ".karma-active-element",
					helper: function( event ) {
						return $( event.target ).closest(".karma-builder-element").clone();
					},
					start   : function ( event, UI ){

						KarmaView.createOverlay();
						var helperNode      = UI.helper[ 0 ],
							originalElement = $( this )[ 0 ],
							oldStyle        = helperNode.getAttribute( 'style' ),
							newStyle        = oldStyle + 'width:'
								+ originalElement.offsetWidth
								+ 'px;height:'
								+ originalElement.offsetHeight
								+ 'px;transform:scale(.7);opacity:.7';
						helperNode.setAttribute( 'style', newStyle );
						originalElement.parentElement.classList.add( 'karma-self-placeholder' );


					},
					drag: function ( event, UI ){

						KarmaView.scroll( UI, event );
						KarmaView.detectDropAreas( event, UI );

					},
					stop: function ( event ){

						KarmaView.removeOverlay();
						clearInterval( KarmaView.flyScroll );
						var dropArea        = document.querySelector( '.karma-show-placeholder' ),
							originalElement = $( this )[ 0 ],
							orginalContainer = originalElement.closest(".karma-builder-element");

						if ( null != dropArea && dropArea.classList.contains('karma-element-placeholder-' + orginalContainer.getAttribute('data-element-key') ) ) {
							orginalContainer.classList.remove( 'karma-self-placeholder' );
						} else if ( null != dropArea && dropArea.classList.contains( 'karma-alignment-placeholder' ) ){
							that.alignmentPlaceholder( originalElement, dropArea, event );
						}else if ( null != dropArea && !dropArea.classList.contains( 'karma-self-placeholder' ) ) {
							that.beforeSortElement( dropArea, orginalContainer );
						} else if ( null == dropArea && null != originalElement && orginalContainer.classList.contains('karma-self-placeholder')) {
							orginalContainer.classList.remove( 'karma-self-placeholder' );
						}
						KarmaView.removePlaceHolders();
					}
				} );
			}

		},
		/**
		 * @summary If drop area of element is alignment drop area set the element alignment
		 *
		 * @param   {object}    originalElement Sortable element
		 * @param   {object}    dropArea        DOM node
		 * @param 	{object}  	event	DOM events
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		alignmentPlaceholder :function ( originalElement, dropArea, event ){

			var alignPosition = document.elementFromPoint( event.clientX, event.clientY ).getAttribute( 'data-element-align');
				if ( undefined != alignPosition ) {
					this.setAttributes( {'elementalign' : alignPosition }, false );
				}
				originalElement. closest( '.karma-builder-element').classList.remove( 'karma-self-placeholder' );
				dropArea.classList.remove( 'karma-show-placeholder' );

			},


		/**
		 * @summary set Element alignment to element
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		elementalign : function (){

			var regex = new RegExp('(?:^|\\s)karma-element-alignment-(.*?)(?!\\S)'),
				align = this.getAttributes( [ 'elementalign' ] ),
				element = this.el;


			element.className = element.className.replace( regex, " karma-element-alignment-" + align.elementalign );

		},

		topspacepadding : function () {

			

		},

		/**
		 * @summary Remove all active elements
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		removeActiveElement: function (){

			var activeElement = document.querySelector( '.karma-active-element' );
			if ( null != activeElement ){
				activeElement.classList.remove( 'karma-active-element' );
			}

		},

		/**
		 * @summary Sort elements
		 *
		 * @param   {object}    dropArea        DOM node
		 * @param   {object}    originalElement Sortable element
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		beforeSortElement: function ( dropArea, originalElement ){

			if ( null == dropArea ){
				/** It means the draggable should revert back to original position */
				originalElement.classList.remove( 'karma-self-placeholder' );
				return;
			}

			var viewObject       = $( originalElement ).backboneView(),
				oldParentKey     = viewObject.model.get( 'element_key' ),
				newParentKey     = dropArea.closest( '.karma-builder-element' ).getAttribute( 'data-element-key' ),
				parentColumnView = viewObject.$el.parents( '.karma-builder-element' ).backboneView(),
				elementID        = viewObject.model.get( 'shortcode_name' ).replace( '_', '-' ) + '-' + viewObject.model.get( 'element_key' ),
				script           = $( '#script-' + elementID ).clone(),
				style            = $( '#style-' + elementID ).clone();

			//@TODO Refine style and script tag
			this.sortElement( viewObject, dropArea, newParentKey );
			this.removeExtraAssets( elementID );
			viewObject.$el.append( script );
			viewObject.$el.append( style );
			KarmaView.$el.trigger( 'karma/after/dropElement', [ newParentKey ] );
			KarmaView.$el.trigger( 'karma/after/dropElement', [ oldParentKey ] );

			parentColumnView.createPlaceHolders();


		},

		/**
		 * @summary Sort elements
		 *
		 * @param   {object}    viewObject      Instance of sortable element view
		 * @param   {object}    dropArea        DOM node
		 * @param   {number}    newParentKey    Parent key of sortable element
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		sortElement: function ( viewObject, dropArea, newParentKey ){

			var htmlOBJ = viewObject.$el;
			viewObject.el.parentNode.removeChild( viewObject.el.nextElementSibling );
			viewObject.el.outerHTML = '';
			$( dropArea ).replaceWith( htmlOBJ );
			viewObject.el.classList.remove( 'karma-self-placeholder' );
			viewObject.model.set( { 'parent_key': newParentKey, 'order': 1 }, { silent: true } );
			viewObject.createPlaceHolders();
			if ( "karma_image" == viewObject.model.get( 'shortcode_name' ) ){
				var elementWidth = viewObject.el.closest( '.karma-column-margin' ).offsetWidth + 'px';
				viewObject.el.querySelector( '.karma-image-resize' ).style.width = elementWidth;
				viewObject.el.querySelector( '.karma-image-resize-crop' ).style.width = elementWidth;
			}

		},

		/**
		 * @summary trigger document click on links which have karma-document-click class
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaLinksDocumentClick: function (){

			this.$el.find( ".karma-document-click[href*=\"javascript:\"]" ).off( 'click.documentClick' ).on( 'click.documentClick', function (){

				$( document ).trigger( 'click' );

			} );

		},

		/**
		 * @summary Call necessary function after init any elements
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		renderSettings: function (){

			this.createPlaceHolders();
			this.createGizmo();
			this.delegateEvents();
			this.$el.trigger( 'karma/finish/renderElement' );

		},

		/**
		 * @summary Create placeholders for each elements as drop area
		 * The function skip column and section for creating placeholders
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		createPlaceHolders: function (){

			var getName    = this.model.get( 'shortcode_name' ),
				elementKey = this.model.get( 'element_key' ),
				placeholderHTML;

			if ( 'karma_column' != getName && 'karma_section' != getName ){
				placeholderHTML = KarmaView.getUnderscoreTemplate( this.placeholderTemplate,
					{
						className: 'karma-insert-between-elements-placeholder karma-element-placeholder-' + elementKey
					});
				this.el.insertAdjacentHTML( 'afterend', placeholderHTML );
				if ( 1 == this.model.get( 'order' ) ){
					this.el.insertAdjacentHTML( 'beforebegin', placeholderHTML );
				}
				this.createSelfPlaceholder();
			}else if ( 'karma_column' == getName && 0 == karmaBuilder.karmaModels.where( { parent_key: this.model.get( 'element_key' ) } ).length ){
				placeholderHTML = KarmaView.getUnderscoreTemplate( this.placeholderTemplate, { className: 'karma-column-placeholder' } );
				this.el.querySelector( '.karma-column-margin' ).innerHTML = placeholderHTML;
			}else if ( 'karma_section' == getName ){
				placeholderHTML = KarmaView.getUnderscoreTemplate(
					this.placeholderTemplate,
					{
						className: 'karma-insert-between-sections-placeholder karma-section-placeholder-' + elementKey
					}
				);
				this.el.insertAdjacentHTML( 'afterend', placeholderHTML );

			}

		},

		/**
		 * @summary Create placeholders for each elements as alignment
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		createSelfPlaceholder: function (){

			if ( undefined == this.el.querySelector( '.karma-alignment-placeholder' ) ){
				var alingmentPlaceholder = KarmaView.getUnderscoreTemplate( this.alignmentPlaceholderTemplate ),
					div                  = document.createElement( "div" );
				div.classList.add( 'karma-alignment-placeholder' );
				div.innerHTML = alingmentPlaceholder;
				this.el.appendChild( div );
			}

		},

		/**
		 * @summary call element method related to the changed attribute
		 *
		 * @param    {object}    model    updated element model.
		 *
		 * @since 1.0.0
		 *
		 * @returns {boolean}
		 */
		update: function ( model ){

			for ( var i in model.changed.shortcode_attributes.changed ){
				if ( 'function' === typeof this[ i ] ){
					this[ i ]();

				}else{
					this.render();
				}
			}

		},

		/**
		 * @summary Render elements
		 *
		 * @since 1.0.0
		 * @returns {boolean}
		 */
		render: function (){

			this.el.innerHTML = this.template( this.model );

		},

		/**
		 * @summary Delete elements model and html
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		destroy: function (){

			var parentKey   = this.model.get( 'parent_key' ),
				element_key = this.model.get( 'element_key' ),
				elementName = this.model.get( 'shortcode_name' );

			this.beforeDeleteElements();
			this.$el.find( '.karma-builder-element' ).each( function (){

				var childKey = $( this ).attr( 'data-element-key' );
				karmaBuilder.karmaModels.remove( karmaBuilder.karmaModels.where( { "element_key": childKey } ) );

			} );

			// COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();
			this.$el.removeData().unbind();

			// Remove view from DOM
			this.remove();
			this.removeExtraAssets( element_key );
			karmaBuilder.karmaModels.remove( this.model );
			Backbone.View.prototype.remove.call( this );
			this.afterDeleteElement( parentKey, elementName );
			this.loadBlankPage();

		},

		/**
		 * @summary load blank page when content is empty
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		loadBlankPage : function () {

			var karmaLayout = document.querySelector( '#karma-builder-layout' );

			if( null == document.querySelector( '.karma-section' ) ){
				var template = KarmaView.getWpTemplate( 'karma-blank-page' ) ;
				karmaLayout.innerHTML=template;
			}

		},

		/**
		 * @summary Remove element placeholders after delete element
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		beforeDeleteElements: function (){

			// REMOVE THE PLACEHOLDER
			this.$el.next( '.karma-insert-between-elements-placeholder' ).remove();

			if ( 'karma_section' == this.model.get( 'shortcode_name' ) ){
				this.$el.next( '.karma-new-section' ).remove();
			}

		},

		/**
		 * @summary Reorder elements after delete
		 *
		 * @param {string}  parentKey       Element key of parent element
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		reorderAfterDelete: function ( parentKey ){

			if ( '' == parentKey ){
				KarmaView.reorderSections();
			}else{
				KarmaView.$el.trigger( 'karma/after/dropElement/', [ parentKey ] );
			}

		},

		/**
		 * @summary Do some extra work after delete element
		 * If all elements remove in specific column this function create placeholder for that empty column
		 *
		 * @param {string}  parentKey       Element key of parent element
		 * @param {string}  elementName     Element name
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		afterDeleteElement: function ( parentKey, elementName ){


			this.reorderAfterDelete( parentKey );
			if ( 'karma_column' != elementName && 'karma_section' != elementName ){
				var columnInstance = $( '[data-element-key="' + parentKey + '"]' ).backboneView(),
					parentSection  = columnInstance.el.closest( '.karma-section' );

				columnInstance.createPlaceHolders();
				if ( 0 == parentSection.querySelectorAll( '.karma-column .karma-builder-element' ).length ){
					$( parentSection ).find( '.karma-builder-element[data-name="karma_column"]' ).addClass( 'karma-empty-column' );
				}
			}

		},

		/**
		 * @summary Duplicate elements
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		duplicateElement: function (){

			var that                   = this,
				duplicatedElementModel = {
					parent : JSON.parse( JSON.stringify( that.model ) ),
					childes: that.getChildElements( that.model.get( 'element_key' ) )
				};

			KarmaView.renderElementsChildes( duplicatedElementModel, this );

		},

		getChildElements: function ( parentElementKey ){

			var childElementsModel = karmaBuilder.karmaModels.where( { parent_key: parentElementKey } ),
				that               = this,
				elementsModel      = [];

			_.each( childElementsModel, function ( model ){
				var elementModel = {
					parent : JSON.parse( JSON.stringify( model ) ),
					childes: that.getChildElements( model.get( 'element_key' ) )
				};
				elementsModel.push( elementModel );
			} );

			return elementsModel;

		},

		/**
		 * @summary open box of delete element
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		deleteElementBox: function (){

			var deleteBox       = this.el.querySelector( '.karma-delete-message-box' ),
				deletecontainer = this.el.querySelector( '.karma-delete-message-container' );

			if ( null == deleteBox ){
				var template = KarmaView.getWpTemplate( 'karma-delete-message-box' );
				this.$el.append( template );
			}else{

				if ( deleteBox.classList.contains( "karma-delete-box-animation" ) ){
					deleteBox.classList.remove( "karma-delete-box-animation" );
				}
				if ( deletecontainer.classList.contains( "karma-delete-container-animation" ) ){
					deletecontainer.classList.remove( "karma-delete-container-animation" );
				}
				deleteBox.style.display = "flex";
			}

		},

		/**
		 * @summary cancel delete element on click in cancel box
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		cancelDeleteElement: function (){

			var deleteBox       = this.el.querySelector( '.karma-delete-message-box' ),
				deletecontainer = this.el.querySelector( '.karma-delete-message-container' );
			deletecontainer.classList.add( "karma-delete-container-animation" );
			deleteBox.classList.add( "karma-delete-box-animation" );
			setTimeout( function (){

				deleteBox.style.display = "none";

			}, 300 );

		},

		/**
		 * @summary  delete element on click in delete box
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		DeleteElement : function (){

			var that = this;
			var deleteBox       = this.el.querySelector( '.karma-delete-message-box' ),
				deletecontainer = this.el.querySelector( '.karma-delete-message-container' ),
				selectAll       = this.$el.find( '.karma-builder-element div:not(.karma-delete-message-box)' );
			deletecontainer.classList.add( "karma-delete-container-animation" );
			deleteBox.classList.add( "karma-delete-box-animation" );
			selectAll.css( "display", "none" );
			setTimeout( function (){

				that.destroy();

			}, 100 );

		},

		/**
		 * @summary stop click in delete box container
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		deleteBoxStopPropagation: function ( e ){

			e.stopPropagation();

		},

		/**
		 * @summary Remove script and style tag of element
		 *
		 * @param   {string}    elementID
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		removeExtraAssets: function ( elementID ){

			var style  = $( '#style-' + elementID ),
				script = $( '#script-' + elementID );

			if ( script.length ){
				script.remove();
			}

			if ( style.length ){
				style.remove();
			}

		},

		/**
		 * @summary Update attribute(s) of element
		 *
		 * @param    {Object}    newAttributes list of new attribute
		 *
		 * @param    {boolean}    silent model in silent mode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setAttributes: function ( newAttributes, silent ){

			var model               = this.model,
				shortcodeAtrributes = JSON.parse( JSON.stringify( model.attributes.shortcode_attributes ) );

			shortcodeAtrributes.changed = {};
			for ( var attr in newAttributes ){
				shortcodeAtrributes[ attr ] = newAttributes[ attr ];
				shortcodeAtrributes.changed[ attr ] = newAttributes[ attr ];
			}

			model.set( { 'shortcode_attributes': shortcodeAtrributes }, { silent: silent } );

		},

		/**
		 * @summary GET Specific attribute(s) of element
		 * @example getAttributes ( ['space', 'slow'] ) // returns { space : 200, slow : false }
		 *
		 *
		 * @param    {Array}    attributesNames List of name attribute
		 *
		 * @since 1.0.0
		 *
		 * @returns {object}     The value of given attribute
		 */
		getAttributes: function ( attributesNames ){

			var model               = this.model,
				shortcodeAtrributes = JSON.parse( JSON.stringify( model.attributes.shortcode_attributes ) ),
				attributeValue      = {};

			for ( var attr in attributesNames ){
				if ( 'undefined' != typeof shortcodeAtrributes[ attributesNames[ attr ] ] ){
					attributeValue[ attributesNames[ attr ] ] = shortcodeAtrributes[ attributesNames[ attr ] ];
				}
			}
			return attributeValue;

		},

		/**
		 * find children of model
		 *
		 * @since 1.0.0
		 *
		 * @returns array - children models id
		 */
		findChildren: function (){

			return karmaBuilder.karmaModels.where( { 'parent_key': this.model.attributes[ 'element_key' ] } );

		},

		/**
		 * Open setting panel of each Element
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		showSettingPanel : function ( e ) {

			e.stopPropagation();
			var form = $( e.currentTarget ).data('form'),
				that = this;

			window.elementSettingPanel = new window.top.karmaBuilderActions.elementSettingPanel( { model : this.model, form : form, viewInstance : that  } );
			elementSettingPanel.delegateEvents();

		},

		/**
		 * Remove Class from javascript element
		 *
		 * @param    {object}    el        element to remove Class
		 * @param    {string}    className   name of class to remove
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		removeClass: function ( el, className ){

			if ( this.el.classList ){
				this.el.classList.remove( className );
			}else{
				this.el.className = this.el.className.replace( new RegExp( '(^|\\b)' + className.split( ' ' ).join( '|' ) + '(\\b|$)', 'gi' ), ' ' );
			}

		},

		/**
		 * returns the element name with its key
		 *
		 * @since 1.0.0
		 *
		 * @returns { string }  Element name with its key
		 */
		elementSelector: function (){

			return this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' );

		},

		/**
		 * renders the css of model inside style tag
		 *
		 * @param    { string }    selector    Css selector
		 * @param    { string }    attribute    CSS attribute
		 * @param    { string }    value        CSS value
		 *
		 * @since 1.0.0
		 *
		 * @returns { void }
		 */
		renderCss: function ( selector, attribute, value ){

			document.querySelector( '#style-' + this.elementSelector() ).innerHTML = this.generateNewStyle( selector, attribute, value );

		},

		/**
		 * renders the css of model inside style tag
		 *
		 * @param    { string }    selector    Css selector
		 * @param    { string }    attribute    CSS attribute
		 * @param    { string }    value        CSS value
		 *
		 * @since 1.0.0
		 *
		 * @returns { string } new style of element to insert inside style tag
		 */
		generateNewStyle: function ( selector, attribute, value ){

			var oldStyle = document.querySelector( '#style-' + this.elementSelector() ).innerHTML,
				regex    = /(.*?){(.*?)}/g,
				pattern  = new RegExp( regex ),
				content  = '',
				result;

			if ( '' != oldStyle ){
				while ( ( result = pattern.exec( oldStyle ) ) !== null ){
					// This is necessary to avoid infinite loops with zero-width matches
					if ( result.index === regex.lastIndex ){
						regex.lastIndex++;
					}

					if ( result[ 1 ].trim() == selector ){
						content = result[ 2 ];
						break;
					}
				}
			}


			if ( '' != content ){
				var splitContent = content.split( ';' ),
					cssProperty  = {};

				_.each( splitContent, function ( property ){
					var cssString = property.split( ':' );
					if ( "" != cssString[ 0 ] ){
						cssProperty[ cssString[ 0 ] ] = cssString[ 1 ];
					}
				} );

				cssProperty[ attribute ] = value;
				oldStyle = this.removeOldSelector( selector, oldStyle );
				return oldStyle + this.generateStyleString( selector, cssProperty );
			}else{
				var cssProperty = {};
				cssProperty[ attribute ] = value;
				return oldStyle + this.generateStyleString( selector, cssProperty );
			}

		},

		/**
		 * @summary Remove old style string
		 *
		 * @param    { string }    selector        CSS attribute
		 * @param    { string }    oldStyle        Old css string
		 *
		 * @since 1.0.0
		 *
		 * @returns { string } new style of element without old css block
		 */
		removeOldSelector: function ( selector, oldStyle ){

			var pattern = selector + '{(.*?)}',
				regex   = new RegExp( pattern, 'g' );

			return oldStyle.replace( regex, "" );

		},

		/**
		 * @summary renders the css of model inside style tag
		 *
		 * @param    { string }    selector        CSS attribute
		 * @param    { object }    cssProperty        CSS value
		 *
		 * @since 1.0.0
		 *
		 * @returns { string } new style of element to insert inside style tag
		 */
		generateStyleString: function ( selector, cssProperty ){

			var style = selector + '{';
			_.each( cssProperty, function ( value, property ){
				style += property + ':' + value + ';';
			} );
			style += '}';
			return style;
		},

});

	karmaBuilder.shortcodes.extend = function( child ) {

		var view = Backbone.View.extend.apply( this, arguments );
		if( true === child.denyEvents ){
			return view;
		}
		view.prototype.events = _.extend({}, this.prototype.events, child.events );
		return view;

	};

	karmaBuilder.shortcodes = karmaBuilder.shortcodes.extend( karmaBuilder.gizmos.prototype );

} )( jQuery, karmaBuilder );
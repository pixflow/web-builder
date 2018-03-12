
( function( $, karmaBuilderActions ){

	karmaBuilderActions.elementSettingPanel = karmaBuilderActions.view.extend({

		KarmaView : null,

		/** The params of each elements */
		shortcodeParams: {},

		viewInstance : {},

		events : {
			"click.stopParent"                                                                  : "stopFromCallingParent",
			"click .delete-karma-element"				                                        : "removeElement",
			"click .karma-setting-panel-close-svg" 		                                        : "removeSettingPanel",
			"input #karma-element-setting-panel-container input:not(.no-trigger)"				: "updateModel",
			"input #karma-element-setting-panel-container textarea:not(.no-trigger)"			: "updateModel" ,
			"change #karma-element-setting-panel-container input[type=checkbox]"				: "updateModel" ,
		},

		initialize: function( options ) {

			this.viewInstance = options.viewInstance ;
			karmaElementPanel.closeElementPanel();
			this.setElement( $( 'body' ) );

		},

		/**
		 * Create the Object of params for all element
		 * Find the given element name param
		 *
		 * @param	{String}	elementName	The name of element
		 * @param	{String}	form	which form
		 *
		 * @since 0.1.0
		 * @returns {Array}	The element params
		 */
		getElementMap: function ( elementName, form ) {

			if ( this.shortcodeParams ) {
				this.shortcodeParams = JSON.parse( this.getIframe().builderMaps );
			}

			return this.shortcodeParams[ elementName ][form];

		},

		/**
		 * Element setting panel draggable event
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		bindDragEvents: function () {

			$('#karma-element-setting-panel-container').draggable({
				containment: "body" ,
				scroll: true,
				scrollSpeed: 100 ,
				distance: 10,
				cancel: ".karma-shortcode-setting-panel-extra, input, .rangeslider__handle",
				start : function () {

					karmaBuilderEnviroment.createOverlay();

				},

				stop: function () {

					karmaBuilderEnviroment.removeOverlay();

				},

				drag : function() {
					$( this ).css({ width : '', height : '' });
				}
			});

		},

		/**
		 * Make element stop calling its parent
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		stopFromCallingParent : function ( e ) {

			e.stopPropagation();
			$( document ).trigger( "click.hideColorPickerContainer" );

		},

		/**
		 * On click removes element
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		removeElement: function () {

			if ( !confirm("are you sure?") ) return;

			this.model.destroy();
			this.removeSettingPanel();

		},

		/**
		 * On click open element setting panel
		 *
		 * @param	{string}	form of element
		 *
		 * @since	0.1.0
		 *
		 * @returns	{boolean}
		 */
		openSettingPanel: function( form ){

			this.KarmaView = document.getElementById('karma-builder-iframe').contentWindow.window.KarmaView;
			var html = document.createElement( 'div' ),
				formHtml = this.formBuilder( form );
			if( null == formHtml ){
				return false;
			}
			var elementAttributes = this.model.attributes,
				elementSelector = elementAttributes[ 'shortcode_name' ].replace( '_', '-' ) + '-' + elementAttributes.element_key;
			html.innerHTML = this.KarmaView.getWpTemplate( 'karma-element-setting-panel' , {
				headerTitle: formHtml.title,
				content: formHtml.content,
				selector: elementSelector
			} , 1 );

			document.body.appendChild( html );
			this.bindDragEvents();
			this.applyDependency();
			$( document ).trigger('karma_finish_form_builder', [ this.viewInstance ] );
			this.scrollSettingPanel();
			return true;

		},

		/**
		 * update each param value with its model
		 *
		 * @param	{object} 	model			model of clicked element.
		 * @param	{object} 	elementParam	default controllers value in define.
		 *
		 * @since 0.1.0
		 *
		 * @returns {object}	updated param value
		 */
		updateElementParams: function ( model, elementParam ) {

			for ( var index in elementParam.params ){
				var paramName = elementParam.params[ index ].name;
				if ( 'color-picker' === elementParam.params[ index ].type
					&& ( 'undefined' != typeof elementParam.params[ index ].params
					&& 'undefined' != typeof elementParam.params[ index ].params.multiColor
					&& true === elementParam.params[ index ].params.multiColor ) ) {
					elementParam.params[ index ].secondValue = model.shortcode_attributes[ elementParam.params[ index ].params.secondName ];
				}
				if( 'gridlayout' === paramName ){
					elementParam.params[ index ].value = this.viewInstance.currentGrid().length;
				}
				if( undefined !== model.shortcode_attributes[ paramName ] ) {

					elementParam.params[ index ].value = model.shortcode_attributes[ paramName ];
				}
			}
			return elementParam;

		},

		/**
		 *create form builder html
		 *
		 * @param	{string}	form	of element
		 *
		 * @since	0.1.0
		 *
		 * @returns	{object | void } form builder html and form title
		 */
		formBuilder : function( form ) {

			var elementModel = this.model.attributes ,
				elementParams = this.getElementMap( elementModel.shortcode_name, form );

			if( null == elementParams ){
				return;
			}
			var popup = document.createElement('div'),
				settingPanelHeight = elementParams.height,
				karmaFormHtml = '<form id="karma-Builder-form" style="height :'+  settingPanelHeight +'px"  data-height ="'+  settingPanelHeight +'"  autocomplete="off" onsubmit="return false">',
				formBuilderContents = this.formBuilderContentHtml( form );

			karmaFormHtml += '<div id="elementRow" >' + formBuilderContents  + '</div> </form>';
			popup.innerHTML = karmaFormHtml ;
			return { content: popup.innerHTML, title: elementParams.title };

		},

		/**
		 * create form builder content html
		 *
		 * @param	{string}    form	        The name of from
		 *
		 * @since	0.1.0
		 *
		 * @returns	{object} form builder content html
		 */
		formBuilderContentHtml : function ( form ) {

			var elementModel = this.model.attributes ,
				elementParams = this.getElementMap( elementModel.shortcode_name, form ),
				elementParams = this.updateElementParams( elementModel, elementParams );
			return this.formBuilderContentAction( elementParams );

		},
		
		/**
		 * form builder content action to create  html
		 *
		 * @param	{object}	elementParams model attribute
		 *
		 * @since	0.1.0
		 *
		 * @returns	{object} form builder content html
		 */
		formBuilderContentAction : function ( elementParams ) {

			var groupHtml = '',
				controllerSource,
				groupHtml_group = [];
			for( var counter in elementParams.params ){
				if ( ! elementParams.params[counter].group && "switch-panel" != elementParams.params[counter].type ) {
					controllerSource = this.KarmaView.getWpTemplate( 'karma-' + elementParams.params[counter].type + '-controller', elementParams.params[ counter ], 1 );
					groupHtml += this.setGeneralContainer( controllerSource, elementParams.params[counter] ) ;
				}else if( "switch-panel" === elementParams.params[counter].type ) {
					if( "undefined" !== typeof elementParams.params[counter].form ){
						elementParams.params[counter]['view'] = this;
						elementParams.params[counter]['formBuilder'] = true;
						controllerSource = this.KarmaView.getWpTemplate( 'karma-' + elementParams.params[counter].type + '-controller', elementParams.params[ counter ], 1 );
						groupHtml += this.setGeneralContainer( controllerSource, elementParams.params[counter] );
					}else{
						elementParams.params[counter]['formBuilder'] = false;
						controllerSource = this.KarmaView.getWpTemplate( 'karma-' + elementParams.params[counter].type + '-controller', elementParams.params[ counter ], 1 );
						groupHtml += this.setGeneralContainer( controllerSource, elementParams.params[counter] );
					}
				} else {
					if( undefined === groupHtml_group[ elementParams.params[counter].group] ){
						groupHtml_group[ elementParams.params[counter].group ] = {
							items: [],
							title: elementParams.params[counter].group
						};
					}
					controllerSource = this.KarmaView.getWpTemplate( 'karma-' + elementParams.params[counter].type + '-controller', elementParams.params[counter], 1 );
					var html = this.setGeneralContainer( controllerSource, elementParams.params[counter] );
					groupHtml_group[ elementParams.params[counter].group ]['items'].push( html );
				}
				var formBuilderGroupHtml = this.formBuilderGroupHtml( groupHtml_group );
			}
			var formBuilderContent = groupHtml + formBuilderGroupHtml;
			return  formBuilderContent;

		},

		/**
		 * create form builder html
		 *
		 * @param	{object}	all controller in group
		 *
		 * @since	0.1.0
		 *
		 * @returns	{object} form builder group html
		 */
		formBuilderGroupHtml : function ( htmlGroup ) {

			var settingPanelGroup = '' ,
				controllerSource ;
			for( var counter in htmlGroup ) {
				controllerSource = this.KarmaView.getWpTemplate( 'karma-setting-panel-groups-extend', htmlGroup[counter], 1 );
				settingPanelGroup += this.setGeneralContainer( controllerSource, htmlGroup[ counter ] );
			}
			return settingPanelGroup;
		},

		/**
		 * remove setting panel
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		removeSettingPanel : function() {

			var settingPanel = document.querySelector( '#karma-element-setting-panel-container' );
			$( document ).trigger( "click.hideColorPickerContainer" );

			if( null != settingPanel ) {
				settingPanel.parentNode.removeChild(settingPanel);
			}


			if( 'undefined' != typeof karmaBuilderEnviroment.getIframe().elementSettingPanel ){
				// COMPLETELY UNBIND THE ELEMENT SETTING PANEL VIEW
				karmaBuilderEnviroment.getIframe().elementSettingPanel.undelegateEvents();
				karmaBuilderEnviroment.getIframe().elementSettingPanel.$el.removeData().unbind();
				delete karmaBuilderEnviroment.getIframe().elementSettingPanel;
			}

		},

		/**
		 * form builder content action to create  html
		 *
		 * @param	{String}    source             get model attribute
		 * @param   {Object}    dependencyParams    Dependency params
		 *
		 * @since	0.1.0
		 *
		 * @returns	{string} Return controller with general container
		 */
		setGeneralContainer : function ( source, dependencyParams ) {

			var classes = 'karma-controller-' + dependencyParams.name,
				newSource = '<div class="karma-controller ' + classes + '"';
			if( "undefined" != typeof dependencyParams.dependency ){
				newSource += 'data-dependency=\'' + JSON.stringify( dependencyParams.dependency ) + '\'';
				newSource += 'data-dependency-element=\'' + dependencyParams.dependency.controller + '\'';
			}
			newSource  += ' >' + source + '</div>';
			return newSource ;

		},

		/**
		 * Apply dependencies to the element setting panel
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		applyDependency : function(){

			var dependentElements = document.querySelectorAll('.karma-controller[data-dependency]') ,
				that = this,
				dependecyInfo ;

			_.each( dependentElements, function( dependentElement ){
				dependecyInfo = JSON.parse( dependentElement.getAttribute( 'data-dependency' ) )  ,
					dependentElementOBJ = document.querySelector('input[name="' + dependecyInfo.controller + '"]');
				that.applyDependencyOnLoad( dependentElement, dependecyInfo, dependentElementOBJ );
				dependentElementOBJ.addEventListener( 'change', function(){
					that.doDependency(  dependentElement, this.value );
				});
			});

		},

		/**
		 * Apply dependencies to the element setting panel when the html created
		 *
		 * @param {Object}  dependentElement    Dependent element
		 * @param {Object}  dependencyInfo      Dependent element info
		 * @param {Object}  dependentElementOBJ Java script DOM node
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		applyDependencyOnLoad : function ( dependentElement, dependencyInfo, dependentElementOBJ ) {

			var dependentValue = dependentElementOBJ.value ;
			this.doDependency( dependentElement, dependentValue );

		},

		/**
		 * Apply dependencies to the element setting panel when the html created
		 *
		 * @param {Object}  dependentElement    Dependent element
		 * @param {String}  dependentValue      Value of input
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		doDependency : function ( dependentElement, dependentValue ) {

			var isHide,
				dependencyInfo = JSON.parse( dependentElement.getAttribute( 'data-dependency' ) );

			if ( dependencyInfo.value == dependentValue ) {
				dependentElement.classList.remove('karma-hide-controller');
				isHide = false;
			} else {
				dependentElement.classList.add('karma-hide-controller');
				isHide = true;
			}
			this.findDependentElements( dependentElement, isHide );

		},

		/**
		 * Apply dependencies to the child dependent element
		 *
		 * @param   {Object}  dependentElement    Dependent element
		 * @param   {boolean} isHide              Should show or hide dependent on parent depend element
		 *
		 * @since   0.1.0
		 * @return  {void}
		 */
		findDependentElements : function ( dependentElement, isHide ) {

			var dependInput = dependentElement.querySelector('input');
			if( null == dependInput  ){
					return;
			}
			var controller = dependentElement.querySelector('input').getAttribute( 'name') ,
				dependentElements = document.querySelectorAll('[data-dependency-element="' + controller + '"]') ,
				that = this,
				hide,
				lastElement;

			if( dependentElements.length ){

				_.each( dependentElements, function ( element ) {
					if( isHide || dependentElement.classList.contains('karma-hide-controller') ){
						element.classList.add('karma-hide-controller');
					}else {
						element.classList.remove('karma-hide-controller');
						that.doDependency( element, dependentElement.querySelector('input').value );
						this.callScrollOnResize();
					}
					lastElement = element;
				});

				hide = ( lastElement.classList.contains('karma-hide-controller') ) ? true : false ;
				that.findDependentElements( lastElement, hide );

			}

		},

		/**
		 * update model attribute from setting panel
		 *
		 * @since 0.1.0
		 *
		 * @returns void
		 */
		updateModel: function ( event ) {

			// @TODO: change this to use this.setAttributes method
			var attributes = JSON.parse( JSON.stringify( this.model.attributes.shortcode_attributes ) );
			attributes[ event.target.name ] = event.target.value;
			attributes.changed = {};
			attributes.changed[ event.target.name ] = event.target.value;
			this.model.set( 'shortcode_attributes', attributes );

		},

		/**
		 * use niceScroll for setting panel
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		scrollSettingPanel: function () {

			$(".karma-element-setting-panel-content").niceScroll({
				cursorcolor:"#A9A9A9",
				cursorwidth:"2px",
				cursoropacitymax:0.56,
				cursorborder : "none",
				horizrailenabled : false
			});

		},

		/**
		 * call niceScroll on content panel resize
		 *
		 * @since   0.1.0
		 * @returns {void}
		 */
		callScrollOnResize: function () {

			$(".karma-element-setting-panel-content").getNiceScroll().resize();

		},

	});


} )( jQuery, karmaBuilderActions );
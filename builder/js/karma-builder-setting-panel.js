
( function( $, karmaBuilderActions ){

	karmaBuilderActions.elementSettingPanel = karmaBuilderActions.view.extend({

		KarmaView : null,

		/** The params of each elements */
		shortcodeParams: {},

		viewInstance : {},

		/**
		 * Define elements event
		 *
		 * @since   1.0.0
		 */
		events : {
			"click.stopParent"                                                                  : "stopFromCallingParent",
			"click .delete-karma-element"				                                        : "removeElement",
			"click .karma-setting-panel-close-svg" 		                                        : "removeSettingPanel",
			"input #karma-element-setting-panel-container input:not(.no-trigger)"				: "updateModel",
			"input #karma-element-setting-panel-container textarea:not(.no-trigger)"			: "updateModel" ,
			"change #karma-element-setting-panel-container input[type=checkbox]"				: "updateModel" ,
		},

		/**
		 * Set defaults on initialize
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		initialize: function( options ) {

			this.viewInstance = options.viewInstance ;
			this.setElement( $( 'body' ) );
			this.removeSettingPanel();
			this.openSettingPanel( options.form );


		},

		/**
		 * @summary	Create the Object of params for all element
		 * Find the given element name param
		 *
		 * @param	{String}	elementName	The name of element
		 * @param	{String}	form	which form
		 *
		 * @since 1.0.0
		 * @returns {Array}	The element params
		 */
		getElementMap: function ( elementName, form ) {

			if ( this.shortcodeParams ) {
				this.shortcodeParams = JSON.parse( this.getIframe().builderMaps );
			}

			return this.shortcodeParams[ elementName ][form];

		},


		/**
		 * @summary Element setting panel draggable event
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		bindDragEvents: function () {

			$('#karma-element-setting-panel-container').draggable({
				containment: "body" ,
				scroll: true,
				scrollSpeed: 100 ,
				distance: 10,
				cancel: ".karma-shortcode-setting-panel-extra, input, .rangeslider__handle",
				drag : function() {
					$( this ).css({ width : '', height : '' });
				}
			});

		},

		stopFromCallingParent : function ( e ) {

			e.stopPropagation();
			$( document ).trigger( "click.hideColorPickerContainer" );


		},

		/**
		 * @summary On click removes element
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		removeElement: function () {

			if ( !confirm("are you sure?") ) return;

			this.model.destroy();
			this.removeSettingPanel();

		},

		/**
		 * @summary On click removes element
		 *
		 * @param	{string}	form of element
		 *
		 * @since	1.0.0
		 *
		 * @returns	{mixed}
		 */
		openSettingPanel: function( form ){

			this.KarmaView = document.getElementById('karma-builder-iframe').contentWindow.window.KarmaView;
			this.removeSettingPanel();
			var html = document.createElement( 'div' ),
				formHtml = this.formBuilder( form );
			if( null == formHtml ){
				return;
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

		},

		/**
		 * @summary update each param value with its model
		 *
		 * @param	{object} 	model			model of clicked element.
		 * @param	{object} 	elementParam	default controllers value in define.
		 *
		 * @since 1.0.0
		 *
		 * @returns {object}	updated param value
		 */
		updateElementParams: function ( model, elementParam ) {

			for ( var index in elementParam.params ){
				var paramName = elementParam.params[ index ].name;
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
		 * create form builder html
		 *
		 * @param	{string}	form	of element
		 *
		 * @since	1.0.0
		 *
		 * @returns	{object} form builder html and form title
		 */
		formBuilder : function( form ) {

			var shortcodeModel = this.model.attributes ,
				shortcodeParams = this.getElementMap( shortcodeModel.shortcode_name, form );

			if( null == shortcodeParams ){
				return;
			}
			var popup = document.createElement('div'),
				settingPanelHeight = shortcodeParams.height;
			karmaformhtml = '<form id="karma-Builder-form" style="height :'+  settingPanelHeight +'px"  data-height ="'+  settingPanelHeight +'"  autocomplete="off" onsubmit="return false">',
				formBuilderContents = this.formBuilderContentHtml( form );

			karmaformhtml += '<div id="elementRow" >' + formBuilderContents  + '</div> </form>';
			popup.innerHTML = karmaformhtml ;
			return { content: popup.innerHTML, title: shortcodeParams.title };

		},

		/**
		 * @summary create form builder content html
		 *
		 * @param	{string}    form	        The name of from
		 *
		 * @since	1.0.0
		 *
		 * @returns	{object} form builder content html
		 */
		formBuilderContentHtml : function ( form ) {

			var shortcodeModel = this.model.attributes ,
				shortcodeParams = this.getElementMap( shortcodeModel.shortcode_name, form ),
				shortcodeParams = this.updateElementParams( shortcodeModel, shortcodeParams );
			return this.formBuilderContentAction( shortcodeParams );

		},


		/**
		 * @summary form builder content action to create  html
		 *
		 * @param	{object}	get model attribute
		 *
		 * @since	1.0.0
		 *
		 * @returns	{object} form builder content html
		 */
		formBuilderContentAction : function ( shortcodeParams ) {

			var groupHtml = '',
				controllerSource,
				groupHtml_group = [];
			for( var counter in shortcodeParams.params ){
				if ( ! shortcodeParams.params[counter].group && "switch-panel" != shortcodeParams.params[counter].type ) {
					controllerSource = this.KarmaView.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[ counter ], 1 );
					groupHtml += this.setGeneralContainer( controllerSource, shortcodeParams.params[counter] ) ;
				}else if( "switch-panel" === shortcodeParams.params[counter].type ) {
					if( "undefined" !== typeof shortcodeParams.params[counter].form ){
						shortcodeParams.params[counter]['view'] = this;
						shortcodeParams.params[counter]['formBuilder'] = true;
						controllerSource = this.KarmaView.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[ counter ], 1 );
						groupHtml += this.setGeneralContainer( controllerSource, shortcodeParams.params[counter] );
					}else{
						shortcodeParams.params[counter]['formBuilder'] = false;
						controllerSource = this.KarmaView.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[ counter ], 1 );
						groupHtml += this.setGeneralContainer( controllerSource, shortcodeParams.params[counter] );
					}
				} else {
					if( undefined === groupHtml_group[ shortcodeParams.params[counter].group] ){
						groupHtml_group[ shortcodeParams.params[counter].group ] = {
							items: [],
							title: shortcodeParams.params[counter].group
						};
					}
					controllerSource = this.KarmaView.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[counter], 1 );
					var html = this.setGeneralContainer( controllerSource, shortcodeParams.params[counter] );
					groupHtml_group[ shortcodeParams.params[counter].group ]['items'].push( html );
				}
				var formBuilderGroupHtml = this.formBuilderGroupHtml( groupHtml_group );
			}
			var formBuilderContent = groupHtml + formBuilderGroupHtml;
			return  formBuilderContent;

		},

		/**
		 * @summary create form builder html
		 *
		 * @param	{object}	all controller in group
		 *
		 * @since	1.0.0
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
		 * @summary remove setting panel
		 *
		 * @since 1.0.0
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
		 * @summary form builder content action to create  html
		 *
		 * @param	{String}    source             get model attribute
		 * @param   {Object}    dependencyParams    Dependecy params
		 *
		 * @since	1.0.0
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
		 * @summary Apply dependencies to the element setting panel
		 *
		 * @since 1.0.0
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
		 * @summary Apply dependencies to the element setting panel when the html created
		 *
		 * @param {Object}  dependentElement    Dependent element
		 * @param {Object}  dependencyInfo      Dependent element info
		 * @param {Object}  dependentElementOBJ Java script DOM node
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		applyDependencyOnLoad : function ( dependentElement, dependencyInfo, dependentElementOBJ ) {

			var dependentValue = dependentElementOBJ.value ;
			this.doDependency( dependentElement, dependentValue );

		},

		/**
		 * @summary Apply dependencies to the element setting panel when the html created
		 *
		 * @param {Object}  dependentElement    Dependent element
		 * @param {String}  dependentValue      Value of input
		 *
		 * @since 1.0.0
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
		 * @summary Apply dependencies to the child dependent element
		 *
		 * @param   {Object}  dependentElement    Dependent element
		 * @param   {boolean} isHide              Should show or hide dependent on parent depend element
		 *
		 * @since   1.0.0
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
		 * @summary update model attribute from setting panel
		 *
		 * @since 1.0.0
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
		 * @summary use niceScroll for setting panel
		 *
		 * @since   1.0.0
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
		 * @summary call nicescroll on content panel resize
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		callScrollOnResize: function () {

			$(".karma-element-setting-panel-content").getNiceScroll().resize();

		},

	});


} )( jQuery, karmaBuilderActions );
( function( $, karmaBuilder){

	karmaBuilder.elementSettingPanel = Backbone.View.extend({


		/**
		 * Define elements event
		 *
		 * @since   1.0.0
		 */
		events : {
			"click .delete-karma-element"				: "removeElement",
			"click .karma-setting-panel-close-svg" 		: "removeSettingPanel",
			"input input:not(.no-trigger)"				: "updateModel",
			"input textarea:not(.no-trigger)"			: "updateModel" ,
			"change input[type=checkbox]"				: "updateModel" ,
		},

		/**
		 * Set defaults on initialize
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		initialize: function() {

			this.setElement( $( 'body' ) );

		},

		/**
		 * call setting panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		render : function () {

		},

		/**
		 * shortcode setting panel draggable event
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
				drag : function() {
					$( this ).css({ width : '', height : '' });
				},
				cancel: ".karma-shortcode-setting-panel-extra, input"
			});

		},

		/**
		 * On click removes element
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
		 * On click removes element
		 *
		 * @param	{string}	form of element
		 *
		 * @since	1.0.0
		 *
		 * @returns	{mixed}
		 */
		 openSettingPanel: function( form ){

			var html = document.createElement( 'div' ),
				formHtml = this.formBuilder( form );
			if( null == formHtml ){
				return;
			}
			var elementAttributes = this.model.attributes,
				elementSelector = elementAttributes[ 'shortcode_name' ].replace( '_', '-' ) + '-' + elementAttributes.element_key;
			html.innerHTML = this.getWpTemplate( 'karma-element-setting-panel' , {
				headerTitle: formHtml.title,
				content: formHtml.content,
				selector: elementSelector
			}  );

			document.body.appendChild( html );
			this.bindDragEvents();
			this.applyDependency();
			$( document ).trigger('karma_finish_form_builder', [ this ] );

		},

		/**
		 * update each param value with its model
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
					elementParam.params[ index ].value = this.currentGrid().length;
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
		 * create form builder content html
		 *
		 * @param	{string}	form	of element
		 *
		 * @since	1.0.0
		 *
		 * @returns	{object} form builder content html
		 */
		formBuilderContentHtml : function ( form ) {

			var shortcodeModel = this.model.attributes ,
				shortcodeParams = this.getElementMap( shortcodeModel.shortcode_name, form );
				shortcodeParams = this.updateElementParams( shortcodeModel, shortcodeParams );
			return this.formBuilderContentAction( shortcodeParams );

		},


		/**
		 *  form builder content action to create  html
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
					controllerSource = this.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[ counter ] );
					groupHtml += this.setGeneralContainer( controllerSource, shortcodeParams.params[counter] ) ;
				}else if( "switch-panel" === shortcodeParams.params[counter].type ) {
					if( "undefined" !== typeof shortcodeParams.params[counter].form ){
						shortcodeParams.params[counter]['view'] = this;
						shortcodeParams.params[counter]['formBuilder'] = true;
						controllerSource = this.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[ counter ] );
						groupHtml += this.setGeneralContainer( controllerSource, shortcodeParams.params[counter] );
					}else{
						shortcodeParams.params[counter]['formBuilder'] = false;
						controllerSource = this.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[ counter ] );
						groupHtml += this.setGeneralContainer( controllerSource, shortcodeParams.params[counter] );
					}
				} else {
					if( undefined === groupHtml_group[ shortcodeParams.params[counter].group] ){
						groupHtml_group[ shortcodeParams.params[counter].group ] = {
							items: [],
							title: shortcodeParams.params[counter].group
						};
					}
					controllerSource = this.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[counter] );
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
				controllerSource = this.getWpTemplate( 'karma-setting-panel-groups-extend', htmlGroup[counter] );
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
			if( null != settingPanel ){
				settingPanel.parentNode.removeChild( settingPanel );

				// COMPLETELY UNBIND THE ELEMENT SETTING PANEL VIEW
				elementSettingPanel.undelegateEvents();
				elementSettingPanel.$el.removeData().unbind();
				delete elementSettingPanel;

			}

		},

		/**
		 * @summary form builder content action to create  html
		 *
		 * @param	{String}    source             get model attribute
		 * @param   {Object}    dependecyParams    Dependecy params
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
				dependecyInfo = JSON.parse( dependentElement.getAttribute( 'data-dependency' ) ) ,
					dependentElementOBJ = document.querySelector('input[name="' + dependecyInfo.controller + '"]');
				that.applyDependencyOnLoad( dependentElement, dependecyInfo, dependentElementOBJ );
				dependentElementOBJ.addEventListener( 'change', function(){
					that.doDependency(  dependentElement, dependecyInfo, this.value );
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
			this.doDependency( dependentElement, dependencyInfo, dependentValue );

		},

		/**
		 * @summary Apply dependencies to the element setting panel when the html created
		 *
		 * @param {Object}  dependentElement    Dependent element
		 * @param {Object}  dependencyInfo      Dependent element info
		 * @param {String}  dependentValue      Value of input
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		doDependency : function ( dependentElement, dependencyInfo, dependentValue ) {

			var isHide;
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
						that.doDependency( element, JSON.parse( dependentElement.getAttribute( 'data-dependency' ) ), dependentElement.querySelector('input').value );
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

			var attributes = JSON.parse( JSON.stringify( this.model.attributes.shortcode_attributes ) );
			attributes[ event.target.name ] = event.target.value;
			attributes.changed = {};
			attributes.changed[ event.target.name ] = event.target.value;
			this.model.set( 'shortcode_attributes', attributes );

		},

		/**
		 * @summary Open WordPress Media library and handle choose image from media library instead of unsplash
		 *
		 * @param {Object} 		 addImgLink    Selector dom object
		 * @param {function}	 callBack      callback function
		 * @param {String} 		 multiple      multiple in frame default false
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		openMediaLibrary : function ( addImgLink, callBack, multiple ) {

			// Set all variables to be used in scope
			var frame;

			// ADD IMAGE LINK
			addImgLink.addEventListener( 'click', function () {

				// If the media frame already exists, reopen it.
				if ( frame ) {
					frame.open();
					return;
				}

				// Create a new media frame
				frame = wp.media( {
					title: 'Select or Upload Media Of Your Chosen Persuasion',
					button: {
						text: 'Use this media'
					},
					multiple: ( multiple ) ? multiple : false
				} );

				// When an image is selected in the media frame...
				frame.on( 'select',  callBack.bind( frame, frame ) );

				// Finally, open the modal on click
				frame.open();
			}, false );

		},


	});

} )( jQuery, karmaBuilder );
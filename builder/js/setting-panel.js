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
			"click .karma-setting-panel-group-button" 	: "scrollInSettingPanel",
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
					formHtml = this.formBuilder( form ),
					elementAttributes = this.model.attributes,
					elementSelector = elementAttributes[ 'shortcode_name' ].replace( '_', '-' ) + '-' + elementAttributes.element_key;
			html.innerHTML = this.getWpTemplate( 'karma-element-setting-panel' , {
				headerTitle: formHtml.title,
				content: formHtml.content,
				selector: elementSelector
			}  );

			document.body.appendChild( html );
			this.bindDragEvents();
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
				shortcodeParams = this.getElementMap( shortcodeModel.shortcode_name, form ),
				settingPanelHeight = shortcodeParams.height,
				popup = document.createElement('div'),
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
			groupHtml_group = [];
			for( var counter in shortcodeParams.params ){
				if ( ! shortcodeParams.params[counter].group && "switch-panel" != shortcodeParams.params[counter].type ) {
					groupHtml += this.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[counter] );
				}else if( "switch-panel" === shortcodeParams.params[counter].type ) {
					if( "undefined" !== typeof shortcodeParams.params[counter].form ){
						shortcodeParams.params[counter]['view'] = this;
						shortcodeParams.params[counter]['formBuilder'] = true;
						groupHtml += this.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[counter] );
					}else{
						shortcodeParams.params[counter]['formBuilder'] = false;
						groupHtml += this.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[counter] );
					}
				} else {
					if( undefined === groupHtml_group[ shortcodeParams.params[counter].group] ){
						groupHtml_group[ shortcodeParams.params[counter].group ] = {
							items: [],
							title: shortcodeParams.params[counter].group
						};
					}
					var html = this.getWpTemplate( 'karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[counter] );
					groupHtml_group[ shortcodeParams.params[counter].group ]['items'].push( html );
				}
				var formBuilderGroupHtml = this.formBuilderGroupHtml(groupHtml_group);
			}
			var formBuilderContent = groupHtml + formBuilderGroupHtml;
			return  formBuilderContent;

		},

		/**
		 * create form builder html
		 *
		 * @param	{object}	all controller in group
		 *
		 * @since	1.0.0
		 *
		 * @returns	{object} form builder group html
		 */
		formBuilderGroupHtml : function (groupHtml_group) {

			var setting_panel_group= '';

			for( var counter in groupHtml_group ) {

				setting_panel_group += this.getWpTemplate( 'karma-setting-panel-groups-extend', groupHtml_group[counter] );


			}

			return setting_panel_group;
		},

		scrollInSettingPanel : function () {

			setTimeout( function () {
				var	$ = jQuery,
					objDiv = $('.karma-element-setting-panel-content'),
					obj = objDiv.height();
				objDiv.animate({ scrollTop: obj });
			})

		},

		/**
		 * remove setting panel
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
		 * update model attribute from setting pane
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		updateModel: function (event) {

			var attributes = JSON.parse(JSON.stringify(this.model.attributes.shortcode_attributes));
			attributes[ event.target.name ] = event.target.value;
			attributes.changed = {};
			attributes.changed[ event.target.name ] = event.target.value;
			this.model.set( 'shortcode_attributes', attributes );

		},

	});

} )( jQuery, karmaBuilder );
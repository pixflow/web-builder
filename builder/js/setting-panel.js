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
		 * @param	{object}	model of element
		 * @param	{string}	form of element
		 *
		 * @since	1.0.0
		 * @returns	{void}
		 */
		openSettingPanel: function( model, form ){

			var template = wp.template( 'karma-element-setting-panel' ),
				html = document.createElement( 'div' ),
				formHtml = this.formBuilder( model, form ),
				elementAttributes = model.attributes,
				elementSelector = elementAttributes[ 'shortcode_name' ].replace( '_', '-' ) + '-' + elementAttributes.element_key;

			html.innerHTML = template( {
				headerTitle: formHtml.title,
				content: formHtml.content,
				selector: elementSelector
			} );
			document.getElementById('page').appendChild( html );
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
		 * @param	{object}	model	of element
		 * @param	{string}	form	of element
		 *
		 * @since	1.0.0
		 *
		 * @returns	{object} form builder html and form title
		 */
		formBuilder : function( model, form ) {

			var shortcodeModel = model.attributes ,
				shortcodeParams = this.getElementMap( shortcodeModel.shortcode_name, form ),
				karmaformhtml = '<form id="karma-Builder-form"  autocomplete="off" onsubmit="return false">',
				groupHtml = '',
				groupHtml_group = [],
				setting_panel_group = '';

			shortcodeParams = this.updateElementParams( shortcodeModel, shortcodeParams );
			for( var counter in shortcodeParams.params ){
				if( ! shortcodeParams.params[counter].group ) {
					groupHtml += this.getWpTemplate('karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[counter]);

				}else{

					if( undefined === groupHtml_group[ shortcodeParams.params[counter].group ] ){

						groupHtml_group[ shortcodeParams.params[counter].group ] = {

							items : [],
							title: shortcodeParams.params[counter].group

						};

					}

					var html = this.getWpTemplate('karma-' + shortcodeParams.params[counter].type + '-controller', shortcodeParams.params[counter]);
					groupHtml_group[ shortcodeParams.params[counter].group ]['items'].push( html );

				}

			}
			for( var counter in groupHtml_group ) {

				setting_panel_group += this.getWpTemplate( 'karma-setting-panel-groups-extend', groupHtml_group[counter] );

			}

			karmaformhtml += '<div id="elementRow" >' +  groupHtml  + "</div>"  ;
			var popup = document.createElement('div');
			popup.innerHTML = karmaformhtml + setting_panel_group;
			return { content: popup.innerHTML, title: shortcodeParams.title };

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
var karmaBuilder = karmaBuilder || {};


(function ( $, karmaBuilder ) {
	'use strict';

	karmaBuilder.view = Backbone.View.extend({

		/*
		 * Map of all elements gizmo params
		 *
		 */
		gizmoParams: {},

		/**
		 * Defines events of Karma Builder
		 *
		 * @since 1.0.0
		 */
		events : {

		},

		/**
		 * In creating this view calls render
		 *
		 * @since 1.0.0
		 *
		 */
		initialize : function () {

			this.gizmoParams = JSON.parse( builderGizmo );
			this.render();

		},

		render: function () {

			var that = this;
			this.collection.each(function ( element ) {
				var elementName = element.attributes.shortcode_name.replace("karma_", "");
				if ("undefined" !== typeof karmaBuilder[elementName]) {
					var elementView = new karmaBuilder[elementName]({
						model 			: element,
						el 				: $('[data-element-key="' + element.attributes.shortcode_attributes.element_key + '"]'),
						gizmoParams 	: that.gizmoParams[element.attributes.shortcode_name],
						template 		: wp.template('karma-element-' + element.attributes.shortcode_name)
					});
					elementView.createGizmo();
					elementView.delegateEvents();
				}
			});

		},

		/**
		 * Create and send ajax
		 *
		 * @since 1.0.0
		 *
		 * @returns {XHR} - jquery ajax object
		 */
		prepareAjax : function () {

			return $.ajax({
				type	: 'post',
				url		: ajaxurl,
				action	: 'save_content',
				data	: {
					models	: JSON.stringify( karmaBuilder.karmaModels ),
					id		: $( 'meta[name="post-id"]' ).attr( 'content' )
				}
			});

		},

		/**
		 * Save element model and html
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		saveContent : function () {

			this.prepareAjax().done( function ( response ) {
				var result = JSON.parse( response );
				if ( true === result.result ) {
					return true;
				} else {
					return false;
				}
			});

		},

		/**
		 * Drag Element from Shortcodes collection
		 *
		 * @since 1.0.0
		 *
		 */
		dragElement : function(){

		},

		/**
		 * Drop Element function
		 *
		 * @param	{object} 	droppedElement	Element to drop in placeHolder.
		 * @param	{object} 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @returns void
		 */
		dropElement : function( droppedElement, placeHolder ){

		},

	});

	karmaBuilder.shortcodes = Backbone.View.extend({

		shortcodeParams: {},

		/*
		 * Underscore's default ERB-style templates are incompatible with PHP
		 * when asp_tags is enabled, so Karma uses Mustache-inspired templating syntax.
		 *
		 * Make the underscore template like wp.template function
		 *
		 */
		templateSettings : {
			evaluate	:  /<#([\s\S]+?)#>/g,
			interpolate	: /\{\{\{([\s\S]+?)\}\}\}/g,
			escape		: /\{\{([^\}]+?)\}\}(?!\})/g,
			variable	: 'data'
		},

		innerGizmoTemplate : '<div class="{{ data.className }}">'
		+ ' <# _.each( data.params, function( param ){ #>'
		+ ' <div class="karma-builder-gizmo-{{ param.type }} {{ param.className }} ">'
		+ ' <# if( "icon" === param.type ){ #>'
		+ ' <div>{{{ param.icon }}}</div>'
		+ '<# } else if( "text" === param.type ) {#>'
		+ '<div>{{{ param.value }}}</div>'
		+ '<# } #>'
		+ '</div>'
		+ '<# }) #>'
		+ '</div>' ,

		bothSpacingGizmoTemplate : '<div class="{{ data.className }}">' +
			'<div class="section-spacing section-top-spacing ui-resizable-handle ui-resizable-s ui-resizable-n">'
				+ '<div class="row-top-spacing-dot-container">'
					+ '<div class="spacing-top-dot"></div>'
					+ '<div class="spacing-top-dot-hover target-moving"></div>'
				+ '</div>'
			+ '</div>'
			+ '<div class="section-spacing section-bottom-spacing ui-resizable-handle ui-resizable-s ui-resizable-n">'
				+ '<div class="row-bottom-spacing-dot-container">'
					+ '<div class="spacing-bottom-dot"></div>'
					+ '<div class="spacing-bottom-dot-hover"></div>'
				+ '</div>'
			+ '</div>'
		+ '</div>' ,

		resizeGizmoTemplate : '<div class="{{data.class}}" data-snap="{{data.param.snapGrid}}" ></div>',

		topGizmoTemplate : '<div class="{{data.class}}">'
		+ ' <# _.each( data.params, function( param ){  #>'
		+ ' <div class="karma-builder-gizmo-{{ param.type }} {{ param.className }} ">'
		+ ' <# if( "icon" === param.type ){ #>'
		+ ' <div>{{{ param.icon }}}</div>'
		+ '<# } else if( "text" === param.type ) {#>'
		+ '<div>{{{ param.value }}}</div>'
		+ '<# } else if( "icon-text" === param.type ) {#>'
		+ '<span class="karama-gizmo-icon">{{{ param.icon }}}</span>'
		+ '<span class="karma-gizmo-title">{{{ param.text }}} {{param.counter}}</span>'
		+ '<# } #>'
		+ '</div>'
		+ '<# }) #>'
		+ '</div>' ,

		/**
		 * Define elements events
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		events : {
			"click .karma-element-setting" : "showSettingPanel",
		},


		/**
		 * Set defaults in create
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		initialize : function( options ) {

			this.template = options.template;
			if( this.model ) {
				_.bindAll(this, "update","destroy");
				this.model.bind('change', this.update);
				this.model.bind('destroy', this.destroy);
			}
			this.gizmoParams = options.gizmoParams;

		},


		/**
		 * Create random string
		 *
		 * @param	integer	length	The length of random string that need to be produce
		 *
		 * @since 1.0.0
		 * @returns String	Random string
		 */
		createRandomString : function ( length ) {

			var characters = '0123456789abcdefghijklmnopqrstuvwxyz' ,
				charactersLength = characters.length ,
				randomString = '';

			for ( var i = 0; i < length; i++ ) {
				randomString += characters[ Math.floor( ( Math.random() * ( charactersLength - 1 ) ) + 1 ) ];
			}

			return randomString;

		},

		/**
		 * @summary	Create the Object of params for all element
		 * Find the given element name param
		 *
		 * @param	{String}	elementName	The name of element
		 *
		 * @since 1.0.0
		 * @returns {array}	The element params
		 */
		getElementMap: function ( elementName ) {

			if ( this.shortcodeParams ) {
				this.shortcodeParams = JSON.parse( builderMaps );
			}

			return this.shortcodeParams[ elementName ];

		},

		/**
		 * @summary Fetch a JavaScript template for an id
		 *
		 * @param  	{string} 	templateName	A string that corresponds to a DOM element with an id prefixed with "tmpl-".
		 * @param 	{object}	templateParams	Data value for template
		 *
		 * @since 1.0.0
		 * @returns {string}    The HTML output of template
		 */
		getWpTemplate: function ( templateName, templateParams ) {

			if ( null === templateParams ) {
				templateParams = {};
			}

			var tempObject = wp.template( templateName ),
				tempHtml = tempObject( templateParams );

			return tempHtml;

		},

		/**
		 * @summary Fetch a Underscore ( JS ) template for an specific name
		 *
		 * @param	{string}	templateName	A string that corresponds for template.
		 * @param	{object}	params			Data value for template
		 *
		 * @since 1.0.0
		 * @returns {string}    The HTML output of template
		 */
		getUnderscoreTemplate : function ( templateName, params ) {

			var compiled,
				that = this ;
			compiled =  _.template( templateName, that.templateSettings );
			return compiled( params );

		},

		/**
		 * @summary Build gizmo controller of elements base on params given
		 *
		 * @param	{object}	params	Gizmo params
		 *
		 * @since 1.0.0
		 * @returns {string}    The HTML output of template
		 */
		gizmoBuilder: function ( gizmoParams ) {

			var tempName = gizmoParams.type + 'Template';
			if( "undefined" !== typeof this[ tempName ] ){
				return this.getUnderscoreTemplate( this[ tempName ], gizmoParams );
			}

		},

		/**
		 * @summary Build gizmo controller
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		createGizmo: function () {

			for( var i in this.gizmoParams ) {

				for( var param in this.gizmoParams[ i ].params ){

					if ( this.gizmoParams[ i ].params[param].hasOwnProperty( "showIndex" ) ){

						this.gizmoParams[ i ].params[param][ "counter" ] = this.$el.parent().find( '> div[class *= "col-sm"]' ).index( this.$el )+1;

					}else{

						this.gizmoParams[ i ].params[param][ "counter" ] = "";

					}
				}
				this.$el.append( $( this.gizmoBuilder( this.gizmoParams[ i ] ) ) );

			}

		},

		/**
		 * Create unique id for each element of drop
		 *
		 * @since 1.0.0
		 *
		 * @returns String	Random string
		 */
		createNewElementKey : function () {

			var randomString = this.createRandomString( 6 ) ;

			if( karmaBuilder.karmaModels.where( { 'element_key' : randomString } ).length ){
				return this.createNewElementKey();
			}

			return randomString;

		},

		/**
		 * Set defaults in create
		 *
		 *  @param	{object} 	element	Javascript Element.
		 *
		 * @since 1.0.0
		 *
		 * @returns boolean
		 */
		update : function ( model ) {

			for ( var i in model.changed.shortcode_attributes.changed ){
				if( 'function' === typeof this[ i ] ){
					this[ i ]();
				} else {
					this.render();
				}
			}

		},

		/**
		 * Render new elements in defined placeHolder
		 *
		 * @param	{object} 	placeHolder	Placeholder to drop Element.
		 *
		 * @since 1.0.0
		 *
		 * @returns boolean
		 */
		render : function (  ) {

			this.el.innerHTML = this.template( this.model );
			$('body').trigger( 'karma_finish_render_html', [ this.model ] );
			return true;

		},

		/**
		 * Delete elements model and html
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		destroy : function() {

			this.$el.find( '.karma-builder-element' ).each( function () {

				var childId = $( this ).attr( 'data-element-id' ) ;
				karmaBuilder.karmaModels.remove( karmaBuilder.karmaModels.where( { "shortcode_id" : parseInt( childId ) } ) );

			});

			// COMPLETELY UNBIND THE VIEW
			this.undelegateEvents();
			this.$el.removeData().unbind();

			// Remove view from DOM
			this.remove();
			Backbone.View.prototype.remove.call(this);

		},

		/**
		 * Update attribute(s) of element
		 *
		 * @param	{Object}	newAttributes list of new attribute
		 *
		 * @param	{boolean}	update model in silent mode
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		setAttributes: function ( newAttributes, silent ) {

			var model = this.model,
				shortcodeAtrributes = model.attributes.shortcode_attributes;
			for ( var attr in newAttributes ) {

				shortcodeAtrributes[ attr ] = newAttributes[ attr ];

			}
			model.set( { 'shortcode_attributes': shortcodeAtrributes }, { silent: silent } );

		},

		/**
		 * find children of model
		 *
		 * @since 1.0.0
		 *
		 * @returns array - children models id
		 */
		findChildren : function() {

			return karmaBuilder.karmaModels.where( { 'parent_id' : this.model.attributes['shortcode_id'] } )

		},

		/**
		 * Open setting panel of each Element
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		showSettingPanel : function () {

			window.builder = new karmaBuilder.elementSettingPanel( { el: jQuery('body') , model: this.model} );
			builder.delegateEvents();

		}

	});

	karmaBuilder.shortcodes.extend = function( child ) {

		var view = Backbone.View.extend.apply( this, arguments );
		if( true === child.denyEvents ){
			return view;
		}
		view.prototype.events = _.extend({}, this.prototype.events, child.events );
		return view;

	};

	karmaBuilder.elementSettingPanel = karmaBuilder.shortcodes.extend({

		denyEvents: true ,

		/**
		 * Define elements events
		 *
		 * @since 1.0.0
		 *
		 */
		events : {
			"click .karma-setting-panel-close-svg" 		: "removeSettingPanel",
			"click .delete-karma-element"				: "removeElement",
			"input input,textarea"						: "updateModel",
		},

		/**
		 * Set defaults in create
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		initialize: function( options ) {

			this.options = options;
			this.render();

		},

		/**
		 * call setting panel
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		render : function () {

			this.openSettingPanel( this.options.model );
			this.bindDragEvents();

		},

		/**
		 * shoercode setting panel draggable event
		 *
		 * @since 1.0.0
		 *
		 * @returns void
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
		 * @param	integer		shortcodeId	Id of element
		 *
		 * @since	1.0.0
		 *
		 * @returns	void
		 */
		openSettingPanel: function( model ){

			var template = wp.template('karma-element-setting-panel'),
				$html = document.createElement('div'),
				content = this.formBuilder( model ),
				elementAttributes = model.attributes,
				elementName = elementAttributes['shortcode_name'].replace('karma_',''),
				elementSelector =  elementAttributes['shortcode_name'].replace('_','-') +'-'+ elementAttributes.shortcode_attributes['element_key'];

			$html.innerHTML =  template( { headerTitle :  elementName +" Setting" , content : content, selector: elementSelector });
			document.getElementById('page').appendChild( $html );
			this.bindDragEvents();
			$('body').trigger('karma_finish_form_builder');

		},

		/**
		 * create formbuilder html
		 *
		 * @param	integer		shortcodeId	Id of element
		 *
		 * @since	1.0.0
		 *
		 * @returns	{object} formbuilder html
		 */

		formBuilder : function( model ) {
			var shortcodeModel = model.attributes ,
				ShortcodeParams = this.getElementMap( 	shortcodeModel.shortcode_name ),
				karmaformhtml = '<form id="karma-Builder-form"  autocomplete="off" onsubmit="return false">',
				groupHtml = '',
				groupHtml_group = [],
				setting_panel_group = '';

			ShortcodeParams = this.updateElementParams(shortcodeModel,ShortcodeParams);
			for( var counter in ShortcodeParams.params ){
				if( ! ShortcodeParams.params[counter].group ) {

					groupHtml += this.getWpTemplate('karma-' + ShortcodeParams.params[counter].type + '-controller', ShortcodeParams.params[counter]);

				}else{

					if( undefined === groupHtml_group[ ShortcodeParams.params[counter].group ] ){

						groupHtml_group[ ShortcodeParams.params[counter].group ] = {

							items : [],
							title: ShortcodeParams.params[counter].group

						};

					}
					var html = this.getWpTemplate('karma-' + ShortcodeParams.params[counter].type + '-controller', ShortcodeParams.params[counter]);
					groupHtml_group[ ShortcodeParams.params[counter].group ]['items'].push( html );

				}

			}
			for( var counter in groupHtml_group ) {

				setting_panel_group += this.getWpTemplate( 'karma-setting-panel-groups-extend', groupHtml_group[counter] );

			}

			karmaformhtml += '<div id="elementRow" >' +  groupHtml  + "</div>"  ;
			var popup = document.createElement('div');
			popup.innerHTML = karmaformhtml + setting_panel_group;
			return popup.innerHTML;

		},

		/**
		 * remove setting panel
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		removeSettingPanel : function() {

			var settingPanel = document.querySelector( '#karma-element-setting-panel-container' );
			settingPanel.parentNode.removeChild( settingPanel );

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
		updateElementParams: function (model, elementParam) {

			for (var index in elementParam.params){
				var paramName = elementParam.params[index].name;
				if( undefined !== model.shortcode_attributes[paramName] ) {
					elementParam.params[index].value = model.shortcode_attributes[paramName];
				}
			}
			return elementParam;
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

	karmaBuilder.model = Backbone.Model.extend({

		defaults : {
			"shortcode_name" 		: "karma-row" ,
			"shortcode_attributes"	: {
				"element_key"	: "",
				"padding"		: "200",
			},
			"shortcode_content" 	: "",
			"shortcode_id" 			: 1,
			"order" 				: 1,
			"parent_id" 			: 0
		}

	});

	// A list of element
	var KarmaShortcodesCollection = Backbone.Collection.extend({

		model : karmaBuilder.model

	});

	$(document).ready( function () {

		karmaBuilder.karmaModels = new KarmaShortcodesCollection( JSON.parse( builderModels ) );
		var KarmaView = new karmaBuilder.view( { collection : karmaBuilder.karmaModels } );

	});


})(jQuery,karmaBuilder);
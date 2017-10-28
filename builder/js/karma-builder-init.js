/**
 * All of the code for your public-facing JavaScript source
 * should reside in this file.
 *
 * Note: It has been assumed you will write jQuery code here, so the
 * $ function reference has been prepared for usage within the scope
 * of this function.
 *
 * This enables you to define handlers, for when the DOM is ready:
 *
 * $(function() {
	 *
	 * });
 *
 * When the window is loaded:
 *
 * $( window ).load(function() {
	 *
	 * });
 *
 * ...and/or other possibilities.
 *
 * Ideally, it is not considered best practise to attach more than a
 * single DOM-ready or window-load handler for a particular page.
 * Although scripts in the WordPress core, Plugins and Themes may be
 * practising this, we should strive to set a better example in our own work.
 */


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
				var elementName = element.attributes.shortcode_name.replace( "karma_", "" );
				var elementView = new karmaBuilder[ elementName ]({
					model: element,
					el 		: $( '[data-element-key="' + element.attributes.shortcode_attributes.element_key + '"]' ),
					gimzoParams: that.gizmoParams[ element.attributes.shortcode_name ],
					template: wp.template( 'karma-element-' + element.attributes.shortcode_name )
				});
				elementView.createGizmo();
				elementView.delegateEvents();
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

		/**
		 * Define elements events
		 *
		 * @since 1.0.0
		 *
		 * @returns void
		 */
		events : {
			"click .row-gizmo-group" : "showSettingPanel",
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
				_.bindAll(this, "render","destroy");
				this.model.bind('change', this.render);
				this.model.bind('destroy', this.destroy);
			}

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

			switch ( gizmoParams.type ) {
				case 'inner-gizmo' :
					return this.getUnderscoreTemplate( this.innerGizmoTemplate, gizmoParams );
					break;
				case 'top-gizmo' :
					break;
				case 'over-gizmo' :
					break;
				default:
					return false;
					break;
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
		update : function (element) {

			var children,
				elementId = $(element).attr('data-element-id');

			if( $(element).children().length){

				children = $(element).children().clone(true);

			}
			this.el.innerHTML = this.template( this.model );
			$(this.el).find('*[data-element-id="'+elementId+'"]').append(children);
			$('body').trigger( 'finish_update_html', [ this.model ] );
			return true;

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
		 * Update shortcode model and html
		 *
		 * @param	{Object}	newAttributes list of new attribute
		 *
		 * @since 1.0.0
		 *
		 * @returns {Object} - Model of elements
		 */
		updateShortcode: function ( newAttributes ) {

			this.setAttributes( newAttributes, false );
			this.update( document.querySelector( '*[data-element-id="' + model.attributes.shortcode_id + '"]' ) );
			return karmaBuilder.karmaModels;

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
				elementSelector = '.'+ elementAttributes['shortcode_name']+'_'+ elementAttributes.shortcode_attributes['element_key'];

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
				elementParam.params[index].value = model.shortcode_attributes[paramName];
			}
			return elementParam;

		}

	});

	karmaBuilder.row = karmaBuilder.shortcodes.extend({

		rowGimzoParams: {},

		events:{

			'click'				 							: 'showBorder',
			'mousedown .section-spacing' 					: 'showMouseToolTip',
			'mousedown .row-top-spacing-dot-container' 		: 'showMouseToolTip',
			'mousedown .row-bottom-spacing-dot-container' 	: 'showMouseToolTip',
		},

		initialize: function( options ){

			karmaBuilder.row.__super__.initialize.apply( this, arguments );
			this.rowGimzoParams = options.gimzoParams[0];
			this.liveSpacing();

		},

		/**
		 * @summary Build gizmo controller
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		createGizmo: function () {

			this.$el.append( $( this.gizmoBuilder( this.rowGimzoParams ) ) );

		},

		/**
		 * @summary Set the active row with specific class
		 *
		 * @since 1.0.0
		 * @returns {void}
		 */
		showBorder: function () {

			$('.karma-active-section').removeClass('karma-active-section');
			this.$el.addClass('karma-active-section');

		},

		/**
		 * return current layout grid
		 *
		 * @since 1.0.0
		 *
		 * @returns Array - current layout of section
		 */
		currentGrid : function( ) {

			var childrenModels = this.findChildren();
			var currentGrid = [];
			for (var i = 0, len = childrenModels.length; i < len; i++) {
				currentGrid.push( parseInt( childrenModels[i].attributes.shortcode_attributes.width ) )
			}
			return currentGrid;

		},

		/**
		 * Calculate new layout grid after append nw column
		 *
		 * @since 1.0.0
		 *
		 * @returns Array - new layout of section after add new column
		 */
		calculateNewGrid : function( ) {
			var newGrid = this.currentGrid();
			newGrid.reverse();
			for (var i = 0, len = newGrid.length; i < len; i++) {
				if(newGrid[i] > 1) {
					newGrid[i] = parseInt(newGrid[i] - 1);
					break;
				}
			}
			newGrid.reverse();
			newGrid.push(1);
			return newGrid;
		},

		/**
		 * show mouse tooltip in spacing
		 *
		 * @since 1.0.0
		 *
		 * add event to tooltip
		 */
		showMouseToolTip : function(e) {
			var tooltipDiv = document.body.querySelector('.tooltip-div');
			tooltipDiv.style.display = 'block';
			e.target.classList.add('target-moving');
			document.documentElement.addEventListener( 'mousemove', this.moveMouseToolTip, false );
			document.documentElement.addEventListener( 'mouseup', this.removeMouseToolTip, false );
		},

		/**
		 * move mouse tooltip in spacing
		 *
		 * @since 1.0.0
		 *
		 * give position to tooltip div
		 */
		moveMouseToolTip : function(e) {
			var tooltipDiv = document.body.querySelector('.tooltip-div');
			if( 'none' === tooltipDiv.style.display ){
				return false;
			}
			var x = e.clientX,
				y = e.clientY;
			tooltipDiv.style.top = (y + 20) + 'px';
			tooltipDiv.style.left = (x - 20) + 'px';
			tooltipDiv.innerText = (document.querySelector('.target-moving').offsetHeight) + ' px';

		},

		/**
		 * remove mouse tooltip in spacing
		 *
		 * @since 1.0.0
		 *
		 * remove all event from tooltip
		 */
		removeMouseToolTip : function(e) {
			var tooltipDiv = document.body.querySelector('.tooltip-div');
			tooltipDiv.style.display = 'none';
			e.target.classList.remove('target-moving');
			document.documentElement.removeEventListener('mousemove', this.moveMouseToolTip);
			document.documentElement.removeEventListener('mouseup', this.removeMouseToolTip);
		},

		/**
		 * create html fot tooltip
		 *
		 * @since 1.0.0
		 *
		 */
		toolTipHtml: function () {
			if( ! document.querySelectorAll('.tooltip-div').length ){
				var tooltip = document.createElement( 'div' );
				tooltip.setAttribute( 'class', 'tooltip-div' )
				document.body.appendChild( tooltip );
			}
		},

		/**
		 * create html fot padding gizmo
		 *
		 * @since 1.0.0
		 *
		 */
		spacingGizmo: function () {
			var rowTopSpacingContainer = document.createElement('div');
			rowTopSpacingContainer.setAttribute( 'class', 'row-top-spacing-dot-container section-spacing' );

			var rowTopSpacing = document.createElement( 'div' );
			rowTopSpacing.setAttribute( 'class', 'spacing-top-dot-hover' );
			var rowTopSpacingDot = document.createElement( 'div' );
			rowTopSpacingDot.setAttribute( 'class', 'spacing-top-dot' );
			rowTopSpacingContainer.appendChild( rowTopSpacingDot );
			rowTopSpacingContainer.appendChild( rowTopSpacing );

			var rowBottomSpacingContainer = document.createElement('div');
			rowBottomSpacingContainer.setAttribute( 'class', 'row-bottom-spacing-dot-container section-spacing' );

			var rowBottomSpacing = document.createElement( 'div' );
			rowBottomSpacing.setAttribute( 'class', 'spacing-bottom-dot-hover' );
			var rowBottomSpacingDot = document.createElement( 'div' );
			rowBottomSpacingDot.setAttribute( 'class', 'spacing-bottom-dot' );
			rowBottomSpacingContainer.appendChild( rowBottomSpacingDot );
			rowBottomSpacingContainer.appendChild( rowBottomSpacing );

			this.el.appendChild( rowTopSpacingContainer );
			this.el.appendChild( rowBottomSpacingContainer );
		},


		/**
         * Add live spacing ability to section elements
         *
         * @since 1.0.0
         *
         * @returns {void}
         */
        liveSpacing: function () {
			this.spacingGizmo()
	        this.toolTipHtml()
        	var topSpacing = document.createElement('div');
			topSpacing.setAttribute( 'class', 'section-spacing section-top-spacing' );

			var bottomSpacing = document.createElement('div');
			bottomSpacing.setAttribute( 'class', 'section-spacing section-bottom-spacing' );

			this.el.appendChild(bottomSpacing);
			this.el.insertBefore( topSpacing, this.el.childNodes[0] );

			var that = this,
				options = {
					selector: '[data-element-key="'+ this.el.dataset.elementKey +'"] .section-spacing',
					minHeight: 0,
					maxHeight: 700,
					direction: 'y',
					onDrag: function ( el, value ) {
						var siblingSpacer = Array.prototype.filter.call( el.parentNode.children, function ( child ) {
							return ( child !== el && child.classList.contains( 'section-spacing' ) );
						} );
						siblingSpacer[ 0 ].style.height = value.height;
					},
					onStop: function ( value ) {
						that.setAttributes( { space: parseInt( value.height ) }, true );
					}
				};
			gridResizer( options );

		}

	});


	karmaBuilder.column = karmaBuilder.shortcodes.extend({

		initialize: function(){
			karmaBuilder.column.__super__.initialize.apply( this, arguments );
		},

		createGizmo: function () {
		},

	});

	karmaBuilder.model = Backbone.Model.extend({

		defaults : {
			"shortcode_name" 		: "karma_row" ,
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
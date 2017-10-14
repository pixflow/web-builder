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


(function ( $ , karmaBuilder ) {
	'use strict';

	karmaBuilder.view = Backbone.View.extend({

		shortcodeParams : {},

		initialize : function () {

			var pageModel = JSON.parse( builderModels );
			karmaBuilder.karmaModels.add( pageModel );

		},

		/**
		 * Define Karma-Builder events
		 */
		events : {
		},

		/**
		 * Create and send ajax
		 *
		 * @since 1.0.0
		 *
		 * @return XHR - jquery ajax object
		 */
		prepareAjax : function () {

			return $.ajax({
				type	: 'post',
				url		: ajaxurl,
				action	: 'save_content',
				data	: {
					models	: JSON.stringify( karmaBuilder.karmaModel ),
					id		: $( 'meta[name="post-id"]' ).attr( 'content' )
				}
			});

		},

		/**
		 * Save element model and html
		 *
		 * @since 1.0.0
		 *
		 * @return Boolean - Return true or false from AJAX request
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
		 * @return true
		 */
		dragElement : function(){

		},

		/**
		 * Drop Element function
		 *
		 * @param	object 	droppedElement	Element to drop in placeHolder.
		 * @param	object 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @return true
		 */
		dropElement : function( droppedElement, placeHolder ){

			var shortcodeName 	= droppedElement.getAttribute('data-name');
			var shortcodeId		= karmaBuilder.karmaModels.length + 1;
			var newModel 		=  new karmaBuilder.model({
				"shortcode_id"		: shortcodeId,
				"shortcode_name" 	: shortcodeName,
			});
			var newElement = new karmaBuilder.shortcodes( {
				//@TODO : template : wp.template(shortcodeName)
				template	:	_.template( '<div class="row delete-elements" ><%= attributes.shortcode_id %></div>' ),
				model		:	newModel,
			});

			newElement.create( placeHolder );

		},


		getElementMap: function ( shortcodeName ) {

			if( this.shortcodeParams ) {
				this.shortcodeParams = JSON.parse( builderMaps );
			}

			return this.shortcodeParams[ shortcodeName ];

		},

		getWpTemplate: function ( templateName, templateParams ) {

			if( null === templateParams ){
				templateParams = {} ;
			}

			var tempObject = wp.template( templateName ),
				tempHtml = tempObject( templateParams );

			return tempHtml;

		},

		formBuilder : function ( shortcodeId ) {
			console.log(shortcodeId);


			var shortcodeModel = karmaBuilder.karmaModels.where( { 'shortcode_id' : shortcodeId } )[0].attributes ,
				ShortcodeParams = this.getElementMap( 	shortcodeModel.shortcode_name ),
				karmaformhtml = '<form id="karma-Builder-form" autocomplete="off">',
				groupHtml = '';
			console.log(ShortcodeParams.params);
			for( var counter in ShortcodeParams.params ){
				switch ( ShortcodeParams.params[ counter ].type ){
					case 'text' :
						groupHtml += this.getWpTemplate( 'karma-' + ShortcodeParams.params[ counter ].type + '-controller', {
							labelHeading : ShortcodeParams.params[counter].label,
							name: ShortcodeParams.params[counter].name
						} );
						break;

					case 'title' :
						groupHtml += this.getWpTemplate( 'karma-' + ShortcodeParams.params[ counter ].type + '-controller', {
							title: ShortcodeParams.params[counter].label,
							name: ShortcodeParams.params[counter].name
						} );
						break;

					case 'radio-image' :
						groupHtml += this.getWpTemplate( 'karma-' + ShortcodeParams.params[ counter ].type + '-controller', {
							field : ShortcodeParams.params[counter].field,
							column : ShortcodeParams.params[counter].columns
						} );
						break;

					default:
						break;

				}


			}


			karmaformhtml += '<div id="elementRow" >' +  groupHtml + "</div>" ;
			var popup = document.createElement('div');
			popup.innerHTML = karmaformhtml;
			return popup.innerHTML;




		}

	});

	karmaBuilder.model = Backbone.Model.extend({


		defaults:{
			"shortcode_id"			: 0,
			"shortcode_name"		: '',
			"parent_id" 			: 0,
			"order" 				: 1,
			"shortcode_attributes" 	: {},
			"shortcode_content" 	: "",
		}
	});

	karmaBuilder.shortcodes = Backbone.View.extend({

		/**
		 * Set defaults in create
		 */
		initialize : function( options ) {

			this.template = options.template;

		},

		/**
		 * Define shortcodes events
		 */
		events : {
			"click .delete-elements" : "deleteShortcode",
		},

		/**
		 * Create new elements model to karma models
		 *
		 * @param	object 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @return object	New elements model
		 */
		create : function( placeHolder ){

			karmaBuilder.karmaModels.add( this.model );
			this.render( placeHolder );
			return karmaBuilder.karmaModels;

		},


		/**
		 * Render new elements in defined placeHolder
		 *
		 * @param	object 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @return true
		 */
		render : function ( placeHolder ) {

			this.el.innerHTML = this.template( this.model );
			placeHolder.appendChild( this.el );
			$('body').trigger( 'finish_render_html', [ this.model ] );
			return true;

		},




		/**
		 * Delete elements model and html
		 *
		 * @param	object	model	The shortcode model
		 *
		 * @since 1.0.0
		 *
		 * @return Object - Model of shortcodes
		 */
		deleteShortcode : function( model ) {

			var elementId = model.attributes['shortcode_id'];
			var $selectedElement = $( '.karma-builder-element [data-element-id=' + elementId + ']' );

			$selectedElement.find( '.karma-builder-element' ) .each( function () {

				var childId = $( this ).attr( 'data-element-id' ) ;
				karmaBuilder.karmaModels.remove( karmaBuilder.karmaModels.where( { "shortcode_id" : parseInt( childId ) } ) );

			});

			$selectedElement.remove();
			karmaBuilder.karmaModels.remove( karmaBuilder.karmaModels.where( { "shortcode_id" : parseInt( elementId ) } ) );
			return karmaBuilder.karmaModels;

		},

		/**
		 * Update shortcode model and html
		 *
		 * @param	integer id of element
		 *
		 * @param	Object newAttributes list of new attribute
		 *
		 * @since 1.0.0
		 *
		 * @return Object - Model of elements
		 */
		updateShortcode : function( id, newAttributes ){

			var model = karmaBuilder.karmaModels.where({"shortcode_id" : id})[0];
			var shortcodeAtrributes = model.attributes.shortcode_attributes;

			for( var attr in newAttributes ){

				shortcodeAtrributes[attr] = newAttributes[attr]

			}

			model.set({'shortcode_attributes' : shortcodeAtrributes})
			this.model = model;
			this.render( document.querySelectorAll( '*[data-element-id="'+id+'"]' )[0] );
			return karmaBuilder.karmaModels;

		}

	});

	var KarmaShortcodesCollection = Backbone.Collection.extend({

		model : karmaBuilder.model

	});

	karmaBuilder.karmaModels = new KarmaShortcodesCollection();


	window.onload = function () {
		var temp =    wp.template('karma-element-setting-panel');
		var $html = document.createElement('div');
		$html.innerHTML =  temp( { headerTitle : "Section Setting" , shortcodeId : 1});
		document.getElementById('page').appendChild( $html );
	}



})(jQuery,karmaBuilder);






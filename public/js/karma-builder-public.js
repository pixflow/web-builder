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
		 * @returns {Boolean} - Return true or false from AJAX request
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
		 * @returns true
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
		 * @returns {true}
		 */
		dropElement : function( droppedElement, placeHolder ){

			var shortcodeName 	= droppedElement.getAttribute('data-name');
			var shortcodeId		= karmaBuilder.karmaModels.length + 1;
			var newModel 		=  new karmaBuilder.model({
				"shortcode_id"		: shortcodeId,
				"shortcode_name" 	: shortcodeName,
			});
			var newElement 		= new karmaBuilder.shortcodes( {
				//template : wp.template(shortcodeName),
				template	: wp.template(shortcodeName),
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

		openSettingPanel: function(shortcodeId){

			var template = wp.template('karma-element-setting-panel');
			var $html = document.createElement('div');
			var content = this.formBuilder( shortcodeId );
			$html.innerHTML =  template( { headerTitle : "Section Setting" , content : content});
			document.getElementById('page').appendChild( $html );

			$('body').trigger('karma_finish_form_builder');

		},

		formBuilder : function ( shortcodeId ) {

			var shortcodeModel = karmaBuilder.karmaModels.where( { 'shortcode_id' : shortcodeId } )[0].attributes ,
				ShortcodeParams = this.getElementMap( 	shortcodeModel.shortcode_name ),
				karmaformhtml = '<form id="karma-Builder-form" autocomplete="off">',
				groupHtml = '';

			for( var counter in ShortcodeParams.params ){
				groupHtml += this.getWpTemplate( 'karma-' + ShortcodeParams.params[ counter ].type + '-controller', ShortcodeParams.params[counter] );
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
			console.log(this.collection)
			this.template = options.template;

		},

		/**
		 * Define elements events
		 */
		events : {
			"click .delete-element" : "deleteShortcode",
		},

		/**
		 * Create new elements model to karma models
		 *
		 * @param	{object} 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @returns {object}	New elements model
		 */
		create : function( placeHolder ){

			karmaBuilder.karmaModels.add( this.model );
			this.render( placeHolder );
			return karmaBuilder.karmaModels;

		},

		update : function (element) {

			var children;
			if( $(element).children().length){

				children = $(element).children().clone(true);

			}
			this.el.innerHTML = this.template( this.model );
			var elementId = $(element).attr('data-element-id');
			$(this.el).find('*[data-element-id="'+elementId+'"]').append(children);
			$('body').trigger( 'finish_update_html', [ this.model ] );
			return true;

		},

		/**
		 * Render new elements in defined placeHolder
		 *
		 * @param	{object} 	placeHolder	Placeholder to drop shortcode.
		 *
		 * @since 1.0.0
		 * @returns true
		 */
		render : function ( placeHolder ) {

			this.el.innerHTML = this.template( this.model );
			placeHolder.appendChild( this.el );
			$('body').trigger( 'karma_finish_render_html', [ this.model ] );
			return true;

		},


		/**
		 * Delete elements model and html
		 *
		 * @param	{object}	model	The shortcode model
		 *
		 * @since 1.0.0
		 *
		 * @returns {Object} - Model of shortcodes
		 */
		deleteShortcode : function() {

			var elementId = this.model.attributes['shortcode_id'];
			var $selectedElement = $( '.karma-builder-element [data-element-id=' + elementId + ']' );

			$selectedElement.find( '.karma-builder-element' ).each( function () {

				var childId = $( this ).attr( 'data-element-id' ) ;
				karmaBuilder.karmaModels.remove( karmaBuilder.karmaModels.where( { "shortcode_id" : parseInt( childId ) } ) );

			});

			$selectedElement.remove();
			karmaBuilder.karmaModels.remove( this.model );

			return karmaBuilder.karmaModels;

		},

		/**
		 * Update shortcode model and html
		 *
		 * @param	{integer} id of element
		 *
		 * @param	{Object}	newAttributes list of new attribute
		 *
		 * @since 1.0.0
		 *
		 * @returns {Object} - Model of elements
		 */
		updateShortcode : function( newAttributes ){

			var model = this.model;
			var shortcodeAtrributes = model.attributes.shortcode_attributes;
			for( var attr in newAttributes ){

				shortcodeAtrributes[attr] = newAttributes[attr];

			}
			model.set({'shortcode_attributes' : shortcodeAtrributes});
			this.update( document.querySelector( '*[data-element-id="'+model.attributes.shortcode_id+'"]' ) );
			return karmaBuilder.karmaModels;

		},

        /**
         * find children of model
         *
         * @since 1.0.0
         *
         * @return array - children models id
         */
        findChildren : function( ) {
        	return karmaBuilder.karmaModels.where( { 'parent_id' : this.model.attributes['shortcode_id'] } )
        },

	});

    karmaBuilder.sectionElement = karmaBuilder.shortcodes.extend({

        /**
         * return current layout grid
         *
         * @since 1.0.0
         *
         * @returns {array} - current layout of section
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
         * @returns {array} - new layout of section after add new column
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
        }

    });

	var KarmaShortcodesCollection = Backbone.Collection.extend({

		model : karmaBuilder.model

	});

	karmaBuilder.karmaModels = new KarmaShortcodesCollection();
	

	window.builder = new karmaBuilder.view();

	window.onload = function () {

		builder.openSettingPanel(1);
	}


})(jQuery,karmaBuilder);






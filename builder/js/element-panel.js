( function( $, karmaBuilder ){

	karmaBuilder.elementPanel = Backbone.View.extend({

		/**
		 * Define elements event
		 *
		 * @since   1.0.0
		 */
		events : {

			"click .element-panel-add-element-button"		: "openAddElementView",
			"click "										: "stopClickInPanel",

		},

		/**
		 * Set defaults on initialize
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		initialize: function() {

			this.setElement( $( '<div class="karma-element-panel-container">' ) );
			this.render();
			this.createAddElementPanel();
			this.createTemplatesPanel();
			this.createUnsplashPanel();
			this.closeElementPanel();


		},

		/**
		 * stop close panel when click in panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		stopClickInPanel : function (e) {

			e.stopPropagation();

		},

		/**
		 * call element-panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		render : function () {

			document.body.appendChild( this.el );

		},


		/**
		 * create add element panel with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createAddElementPanel: function(){
			
			var templateParams = {} ;
			templateParams['elementInfo'] = KarmaView.getElementInfo();
			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-add-element', templateParams ) + '</div>';
			this.el.appendChild( $( template )[0] );
			$( document ).trigger( 'karma_finish_element_panel_html', [ this ] );

		},

		/**
		 * create Templates panel with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createTemplatesPanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-templates', {} ) + '</div>';
			this.el.appendChild( $( template )[0] )
			$( document ).trigger( 'karma_finish_element_panel_html', [ this ] );

		},

		/**
		 * create Unsplash with import template
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		createUnsplashPanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate( 'karma-element-panel-unsplash', {} ) + '</div>';
			this.el.appendChild( $( template )[0] );
			$( document ).trigger( 'karma_finish_element_panel_html', [ this ] );

		},

		/**
		 * open add element panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		openAddElementView: function () {

			var addElement = document.querySelector( '.karma-element-panel-add-element-view' );
			if( null != addElement ){
				addElement.classList.add( "element-panel-show" );
			}

		},

		/**
		 * close add element panel
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		closeElementPanel: function() {

			$( document ).on( 'click', function(){
				var addElement = document.querySelector( '.karma-element-panel-add-element-view' );
				if( null != addElement ) {
					addElement.classList.remove("element-panel-show");
				}
			});

		},

	});

} )( jQuery, karmaBuilder );

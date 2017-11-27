( function( $, karmaBuilder){

	karmaBuilder.elementPanel = Backbone.View.extend({

		/**
		 * Define elements event
		 *
		 * @since   1.0.0
		 */
		events : {
			"click .element-panel-add-element-button"		: "openAddElementView",

		},

		/**
		 * Set defaults on initialize
		 *
		 * @since   1.0.0
		 * @returns {void}
		 */
		initialize: function() {

			this.setElement( $( '<div class="karma-element-panel-container">' ) );
			this.createAddElementPanel();
			this.createTemplatesPanel();
			this.createUnsplashPanel();

			this.render();

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

		createAddElementPanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate('karma-element-panel-add-element', {} ) + '</div>';
			this.el.appendChild( $( template )[0] );
			$( document ).trigger( 'karma_finish_element_panel_html', [ this ] );

		},

		createTemplatesPanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate('karma-element-panel-templates', {} ) + '</div>';

			this.el.appendChild( $( template )[0] )
			$( document ).trigger( 'karma_finish_element_panel_html', [ this ] );

		},

		createUnsplashPanel: function(){

			var template = '<div>' + KarmaView.getWpTemplate('karma-element-panel-unsplash', {} ) + '</div>';

			this.el.appendChild( $( template )[0] );
			$( document ).trigger( 'karma_finish_element_panel_html', [ this ] );

		},

		openAddElementView: function () {

			var addElement = document.querySelector( '.karma-element-panel-add-element-view' );
			if( null != addElement ){

				addElement.classList.add("element-panel-show");

			}

		},


	});

} )( jQuery, karmaBuilder );

( function( $, karmaBuilder ){

	karmaBuilder.gizmos.icon = Backbone.View.extend({

		/**
		 * Build html for icon gizmo
		 */
		template : '<div class="karma-builder-gizmo-icon {{ data.className }} " data-form="{{ data.form }}"> {{{ data.params.icon }}} </div>',

		data: {},

		initialize :function(){
			this.setElement( $('<div>') );
		},

		setIcon: function( icon ){
			this.data.params.icon = icon;
			this.render();
		},

		render: function( $el ){
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );
			$el.append( this.el );
		}

	});


} )( jQuery, karmaBuilder );
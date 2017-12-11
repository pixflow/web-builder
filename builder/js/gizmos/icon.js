( function( $, karmaBuilder ){

	karmaBuilder.gizmos.icon = Backbone.View.extend({

		/**
		 * Build html for icon gizmo
		 */
		template : '{{{ data.icon }}}',

		data: {
			icon: '<svg></svg>'
		},

		initialize :function(){
			this.setElement( $('<div>') );
		},

		setIcon: function( icon ){
			this.data.icon = icon;
			this.render();
		},

		render: function(){
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );
		}

	});


} )( jQuery, karmaBuilder );
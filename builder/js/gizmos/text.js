( function( $, karmaBuilder ){

	karmaBuilder.gizmos.text = Backbone.View.extend({

		/**
		 * Build html for icon gizmo
		 */
		template : '<div class="karma-builder-gizmo-text {{ data.className }} " data-form="{{ data.form }}"> {{{ data.params.value }}} </div>',

		data: {},

		initialize :function(){
			this.setElement( $('<div>') );
		},

		setValue: function( value ){
			this.data.params.value = value;
			this.render();
		},

		render: function( $el ){
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );
			$el.append( this.el );
		}

	});


} )( jQuery, karmaBuilder );
( function( $, karmaBuilder ){

	karmaBuilder.gizmos.color = Backbone.View.extend({

		/**
		 * Build html for icon gizmo
		 */


		template: '<input class="karma-color-gizmo"/>',

		initialize :function(){

			this.setElement( $('<div>') );

		},

		setColor: function(){

			this.update();

		},

		render: function( $el ){

			this.data = this.data.params;
			this.selector = this.elementView.$el.selector + ' input.karma-color-gizmo';
			this.update();
			this.$gizmoContainer.append( this.el );
			this.initColorPicker();

		},

		update: function(){
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );
		},

		/**
		 * @summary init karma color picker plugin on color picker gizmo
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		initColorPicker: function () {

			var options = {
					selector            : this.selector,
					multiColor          : true,
					firstColorTitle     : 'Main',
					secondColorTitle    : 'Hover',
					presetColors        : [
						'#FFFFFF'
						, '#FEF445'
						, '#FAC711'
						, '#F24726'
						, '#E6E6E6'
						, '#CEE741'
						, '#8FD14F'
						, '#DA0263'
						, '#808080'
						, '#13CDD4'
						, '#0DA789'
						, '#652CB3'
						, '#141414'
						, '#2D9BF0'
						, '#404BB2'
					]
				};
			new karmaColorPicker( options );

		}

	});


} )( jQuery, karmaBuilder );
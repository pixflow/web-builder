( function( $, karmaBuilder ){

	karmaBuilder.gizmos.color = Backbone.View.extend({

		/**
		 * Build html for icon gizmo
		 */


		template: '<input class="karma-color-gizmo"/>'
		+'<input class="karma-color-gizmo-hover"/>',


		initialize :function(){

			this.setElement( $('<div>') );

		},

		/**
		 * @summary Set event on input text colors
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		updateColor : function () {

			var that = this;
			$( this.selector ).on( 'change/updateColor', function ( event, color, inputType ) {

				if( ! inputType ){
					that.elementView.setAttributes( { 'color' : color }, false );
				}else{
					that.elementView.setAttributes( { 'hovercolor' : color }, false );
				}

			});

		},

		render: function(){

			this.data = this.data.params;
			this.selector = this.elementView.$el.selector ;
			this.colorAttribute = this.elementView.getAttributes(['color']);
			this.update();
			this.$gizmoContainer.append( this.el );
			this.initColorPicker();
			this.updateColor();

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
					color               : this.colorAttribute.color,
					opacity             : this.data.opacity,
					multiColor          : this.data.multiColor,
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
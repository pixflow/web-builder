( function( $, karmaBuilder ){

	karmaBuilder.gizmos.color = Backbone.View.extend({

		/**
		 * Build html for icon gizmo
		 */


		template: '<input class="karma-color-gizmo karma-colorpicker-main-color"/>'
		+'<input class="karma-color-gizmo-hover karma-colorpicker-second-color"/>',


		initialize :function(){

			this.setElement( $('<div>') );

		},

		/**
		 * @summary Set event on input text colors
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		updateColor : function () {

			var that = this;
			$( this.selector + ' ' + this.orginalSelector ).on( 'change/updateColor', function ( event, color, secondColor ) {
				if ( secondColor && 'undefined' != typeof that.data.secondColorModel ) {
					var modelNameChange = {};
					modelNameChange[ that.data.secondColorModel ] = color;
					that.elementView.setAttributes( modelNameChange, false );
				} else {
					if ( 'undefined' != typeof that.data.model ) {
						var modelNameChange = {};
						modelNameChange[ that.data.model ] = color;
						that.elementView.setAttributes( modelNameChange, false );
					} else {
						that.elementView.setAttributes( { 'color': color }, false );
					}
				}

			} );

		},

		render: function(){

			this.data = this.data.params;
			this.selector = this.elementView.$el.selector ;
			if ( 'undefined' != typeof this.data.model ) {
				this.colorAttribute = this.elementView.getAttributes( [ this.data.model ] );
				this.data.colorValue = this.colorAttribute[ this.data.model ];
			} else {
				this.colorAttribute = this.elementView.getAttributes( [ 'color' ] );
				this.data.colorValue = this.colorAttribute.color;
			}
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
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		initColorPicker: function () {

			var options = {
					selector            : this.selector + ' ' + this.orginalSelector,
					color               : this.data.colorValue,
					opacity             : this.data.opacity,
					multiColor          : this.data.multiColor,
					firstColorTitle     : this.data.firstColorTitle,
					secondColorTitle    : this.data.secondColorTitle,
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
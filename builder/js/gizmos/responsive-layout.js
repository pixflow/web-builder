( function( $, karmaBuilder ){

	//@TODO : Refine with multi dropdown gizmo
	karmaBuilder.gizmos.responsiveLayout = Backbone.View.extend({

		events:{
			'click .karma-responsive-layout-drop-down button'	: 'setLayout'
		},

		/**
		 * Drop area template for elements
		 **/
		template :' <button class="karma-drop-down-icon  karma-responsive-layout-drop-down-gizmo"> {{{ data.params.defaultIcon }}} </button> '
			+ '<div class="karma-drop-down-box karma-responsive-layout-drop-down">'
			+ '<button class="karma-responsive-one-column" data-value="12" >'
			+ '{{{ data.params.oneColumn }}}'
			+ '</button>'
			+ '<button class="karma-responsive-two-column" data-value="6" >'
			+ '{{{ data.params.twoColumn }}}'
			+ '</button>'
			+ '<button class="karma-responsive-three-column" data-value="4" >'
			+ '{{{ data.params.threeColumn }}}'
			+ '</button>'
			+ '<button class="karma-responsive-four-column" data-value="3" >'
			+ '{{{ data.params.fourColumn }}}'
			+ '</button>'
			+ '</div>' ,


		initialize :function(){

			this.setElement( $('<div>') );

		},

		render: function(){

			this.update();
			this.$gizmoContainer.append( this.el );

		},

		update: function(){

			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		},


		/**
		 * @summary Set layout style
		 *
		 * @since 2.0
		 *
		 * @returns {void}
		 */
		setLayout : function ( e ) {

			var currentTarget = ( 'BUTTON' == e.target.tagName ) ? e.target : e.target.closest('button'),
				changeLayout = currentTarget.getAttribute('data-value');

			this.elementView.changeColumnResponsive( parseInt( changeLayout ) );

		},


	});


} )( jQuery, karmaBuilder );
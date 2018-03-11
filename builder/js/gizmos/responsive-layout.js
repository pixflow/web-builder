( function( $, karmaBuilder ){

	karmaBuilder.gizmos.responsiveLayout = Backbone.View.extend({

		events:{
			'click .karma-responsive-one-column'		: 'setOneColumn' ,
			'click .karma-responsive-two-column'		: 'setTwoColumn' ,
			'click .karma-responsive-three-column'		: 'setThreeColumn' ,
			'click .karma-responsive-four-column'		: 'setFourColumn' ,
		},
		/**
		 * Drop area template for elements
		 **/
		template :' <button class="karma-drop-down-icon  karma-responsive-layout-drop-down-gizmo"> {{{ data.params.defaultIcon }}} </button> '
		+ '<div class="karma-drop-down-box karma-responsive-layout-drop-down">'
		+ '<button class="karma-responsive-one-column" >'
		+ '{{{ data.params.oneColumn }}}'
		+ '</button>'
		+ '<button class="karma-responsive-two-column" >'
		+ '{{{ data.params.twoColumn }}}'
		+ '</button>'
		+ '<button class="karma-responsive-three-column" >'
		+ '{{{ data.params.threeColumn }}}'
		+ '</button>'
		+ '<button class="karma-responsive-four-column" >'
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

	});


} )( jQuery, karmaBuilder );
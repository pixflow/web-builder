( function( $, karmaBuilder ){

	karmaBuilder.gizmos.hidden = Backbone.View.extend({

		events: {
			'click .karma-visibility-option'   			: 'visibleElement',
		},

		/**
		 * Build html for hidden gizmo
		 */
		template : '<div class="karma-builder-gizmo-hidden karma-visibility-option {{ data.defaultClass }}" data-form="{{ data.form }}" >  </div>',


		initialize: function(){

			this.setElement( $( '<div>' ) );

		},

		render: function(){

			var desktopVisible = this.elementView.getAttributes( [ 'visibleondesktop' ] ).visibleondesktop;

			if( 'undefined' != typeof desktopVisible ){
				if( 'off' == desktopVisible ){

					this.data.defaultClass = 'visibility-line';
				}
			}else{
				this.data.defaultClass = ' ';
			}

			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );
			this.$gizmoContainer.append( this.el );

		},

		/**
		 * @summary visibility of element
		 *
		 * @since 0.1.1
		 * @returns {void}
		 */
		visibleElement : function () {

			this.$el.find( '.karma-visibility-option' ).toggleClass( "visibility-line" );
			var body = document.body,
				deviceMode =  body.getAttribute( 'karma-device-mode' ),
				that = this;

			switch ( deviceMode ) {

				case 'mobile':
					if(this.elementView.getAttributes( [ 'visibleonmobile' ] ) ){
						var mobileVisible =  that.elementView.getAttributes( [ 'visibleonmobile' ] ).visibleonmobile;
						
						if( "on" == mobileVisible ){
							that.elementView.setAttributes( { 'visibleonmobile' : "off" }, false );
						}else{
							that.elementView.setAttributes( { 'visibleonmobile' : "on" }, false );
						}
					}
					break;

				case 'tablet':
					if(this.elementView.getAttributes( [ 'visibleontablet' ] ) ) {
						var tabletVisible = that.elementView.getAttributes( [ 'visibleontablet' ] ).visibleontablet;

						if( "on" == tabletVisible ){
							that.elementView.setAttributes( { 'visibleontablet' : "off" }, false );
						}else{
							that.elementView.setAttributes( { 'visibleontablet' : "on" }, false );
						}
					}
					break;

				case 'desktop':
					if(this.elementView.getAttributes( [ 'visibleondesktop' ] ) ) {
						var desktopVisible = that.elementView.getAttributes( [ 'visibleondesktop' ] ).visibleondesktop;

						if( "on" == desktopVisible ){
							that.elementView.setAttributes( { 'visibleondesktop' : "off" }, false );
						}else{
							that.elementView.setAttributes( { 'visibleondesktop' : "on" }, false );
						}
					}
					break;

				default:
					return false;
			}

		},



	});


} )( jQuery, karmaBuilder );

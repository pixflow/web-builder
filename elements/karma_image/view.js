( function( $, karmaBuilder ){

	karmaBuilder.image = karmaBuilder.shortcodes.extend({

		events: {
			'click .karma-image-link' 	: 'preventFromOpen',
			'click .karma-image' 		: 'showGizmo',
		},

		initialize: function ( options ) {

			karmaBuilder.image.__super__.initialize.apply( this, arguments );
			this.options = options;

			if( this.options.renderStatus ){
				this.render();
			}

		},

		/**
		 * @summary Render image element
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		render : function () {

			var source = this.template( this.model.get('shortcode_attributes') );
			this.el.innerHTML = source;

		},

		preventFromOpen : function ( e ) {

			e.preventDefault();

		},

		showGizmo : function () {

			this.el.classList.add( 'karma-active-element' );

		},

		imgurl : function () {

			var imageAddress = this.getAttributes( [ 'imgurl' ] );
			this.el.querySelector('img').setAttribute( 'src', imageAddress.imgurl );

		},

		scale: function () {

			var imageScale = this.getAttributes( [ 'scale' ] ),
				containerClass	= ( 'fill' == imageScale.scale ) ? 'karma-image-fill' : 'karma-image-real';
			this.el.querySelector( 'img' ).setAttribute( "class", containerClass );

		},
		
		position : function () {

			var regex = new RegExp('(?:^|\\s)karma-position-(.*?)(?!\\S)'),
				imagePosition = this.getAttributes( [ 'position' ] );
			this.el.firstElementChild.className = this.el.firstElementChild.className.replace( regex, " karma-position-" + imagePosition.position );


		},

		/**
		 * @summary change image alt attribute on change alt field in advanced option
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		alt: function () {

			var imageAlt = this.getAttributes( [ 'alt' ] );
			this.el.querySelector( 'img' ).setAttribute( "alt", imageAlt.alt );

		},

		/**
		 * @summary set image url attribute on change url field
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		linkurl: function () {

			var imageLink = this.getAttributes( [ 'linkurl' ] );
			this.el.querySelector( '.karma-image-link' ).setAttribute( "href", imageLink.linkurl );

		},

		/**
		 * @summary set image target attribute on change target field
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		linktarget: function () {

			var imageTarget = this.getAttributes( [ 'linktarget' ] );
			this.el.querySelector( '.karma-image-link' ).setAttribute( "target", imageTarget.linktarget );

		},
		/**
		 * @summary change image click action
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		action: function () {

			var action = this.getAttributes( [ 'action' ] ),
				elClass = '',
				elLink = '';
			switch (action.action) {
				case 'none':
					elClass = "karma-image-without-action";
					elLink = "javascript:void(0);";
					$( this.el.querySelector( '.karma-image-link' ) ).off( 'click.karma-lightbox' );
					break;
				case 'popup':
					elClass = "karma-image-popup-mode";
					var img = this.getAttributes( [ 'imgurl' ] );
					elLink = img.imgurl;
					new karmaImageLightbox('.karma-image-' + this.el.dataset.elementKey + ' a.karma-image-link');
					break;
				case 'link':
					elClass = "karma-image-with-url";
					var link = this.getAttributes( [ 'linkurl' ] );
					elLink = link.linkurl;
					$( this.el.querySelector( '.karma-image-link' ) ).off( 'click.karma-lightbox' );

					break;
				default:
					return false;
			}
			// Change Class
			this.el.querySelector( '.karma-image-container' ).setAttribute( "class", 'karma-image-container '+elClass );
			// Change link
			this.el.querySelector( '.karma-image-link' ).setAttribute( "href", elLink );

		}

	});

})( jQuery, karmaBuilder );
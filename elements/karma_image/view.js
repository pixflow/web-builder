( function( $, karmaBuilder ){

	karmaBuilder.image = karmaBuilder.shortcodes.extend({

		events: {
			'click .karma-image-link' 					: 'preventFromOpen',
			'karma/finish/renderElement.karma-image' 	: 'openMediaLibraryOnEditImage'
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

			var source = this.template( this.model );
			this.el.querySelector('.karma-element-content').innerHTML = source;
			this.setImageSize();
			var parentColumnInstance = $('.karma-builder-element[data-element-key="' + this.model.get('element_key') +'"]').backboneView();
			parentColumnInstance.$el.trigger('karma/finish/modifyColumns');

		},

		/**
		 * @summary set Image width and height attribute of image
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		setImageSize : function () {

			var IMG = this.el.querySelector('img'),
				that = this,
				newIMG = new Image();

			newIMG.onload = function () {

				var naturalWidth = this.naturalWidth,
					naturalHeight = this.naturalHeight;

				IMG.style.width = naturalWidth + 'px';
				IMG.style.height = naturalHeight + 'px';
				that.setAttributes( {
					naturalwidth : naturalWidth,
					naturalheight : naturalHeight
				}, true );

			}
			newIMG.src = IMG.getAttribute('src');

		},

		/**
		 * @summary stop image to call its parent
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		preventFromOpen : function ( e ) {

			e.preventDefault();

		},

		/**
		 * @summary change image URL
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		imgurl : function () {

			var imageAddress = this.getAttributes( [ 'imgurl' ] );
			this.el.querySelector('img').setAttribute( 'src', imageAddress.imgurl );
			this.setImageSize();

		},

		/**
		 * @summary set image to fill or real according to user selection
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		scale: function () {

			var imageScale = this.getAttributes( [ 'scale' ] ),
				containerClass	= ( 'fill' == imageScale.scale ) ? 'karma-image-fill' : 'karma-image-real';
			this.el.querySelector( 'img' ).setAttribute( "class", containerClass );

		},

		/**
		 * @summary change position of image
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		position : function () {

			var regex = new RegExp('(?:^|\\s)karma-position-(.*?)(?!\\S)'),
				imagePosition = this.getAttributes( [ 'position' ] );
			this.el.querySelector( '.karma-image-resize-crop' ).className = this.el.querySelector( '.karma-image-resize-crop' ).className.replace( regex, " karma-position-" + imagePosition.position );

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
		 * @summary open media library
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		openMediaLibraryOnEditImage : function () {

			var imgBackgroundSetting =this.el.querySelector( '.karma-image-background-setting' );

			if( imgBackgroundSetting ){
				window.top.karmaBuilderEnviroment.openMediaLibrary( imgBackgroundSetting, this.karmaEditImage, this );
			}

		},

		/**
		 * @summary change image url
		 *
		 * @since 1.0.0
		 *
		 * @returns {void}
		 */
		karmaEditImage : function ( frame, view ) {

			view.setAttributes( {
				imgurl  : frame.state().get( 'selection' ).first().toJSON().url,
			}, false );

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

		},

	});

})( jQuery, karmaBuilder );
( function( $, karmaBuilder ){

		karmaBuilder.videobox = karmaBuilder.shortcodes.extend({

		events: {
			'blur .karma-video-box-title-tag '      : 'saveVideoTitle',
			'blur .karma-video-box-description-tag' : 'saveVideoDescription',
			'keyup .karma-video-box-link-tag'		: 'saveVideoLink',
			'click .karma-video-box-title'			: 'titleEditable',
			'click .karma-video-box-description'	: 'titleDescription',
			'click .karma-video-box-link'			: 'titleLink',

		},

		initialize: function ( options ) {

			karmaBuilder.videobox.__super__.initialize.apply( this, arguments );
			this.options = options;

			if( this.options.renderStatus ){
				this.render();
			}
		},

		/**
		 * @summary Save the description of video box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		saveVideoDescription : function () {

			var content = this.el.querySelector( '.karma-video-box-description-tag' ),
				contentData = content.innerHTML;

			if ( "" == contentData.trim() ) {
				content.innerText = "";
			}

			this.setAttributes( { 'descriptiontext' : contentData },  true );

		},

		/**
		 * @summary Save the title of video box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		saveVideoTitle : function () {

			var content = this.el.querySelector( '.karma-video-box-title-tag' ),
				contentData = this.el.querySelector( '.karma-video-box-title-tag' ).innerHTML;

			if ( "" == contentData.trim() ) {
				content.innerText = "";
			}

			this.setAttributes( { 'titletext' : contentData },  true );

		},

		/**
		 * @summary check empty link text
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		saveVideoLink : function () {

			var content = this.el.querySelector( '.karma-video-box-link-tag' ),
				contentData = content.innerHTML;

			if ( "" == contentData.trim() ) {
				content.innerText = "";
				this.el.querySelector( '.karma-video-box-link-shape' ).style.display = 'none';
			}else{
				this.el.querySelector( '.karma-video-box-link-shape' ).style.display = 'block';
			}
			this.setAttributes( { 'linktext' : contentData },  true );

		},

		 /**
		 * @summary Render video element
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		render : function () {

			var source = this.template( this.model );
			this.el.querySelector( '.karma-element-content' ).innerHTML = source;
			this.openVideoPopup();

		},

		/**
		 * @summary open video url
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		openVideoPopup : function () {

			var that = this
			$('.karma-video-box-player').off( 'click.openVideoPanel' ).on( 'click.openVideoPanel' , function(  ){

				new karmaVideoPopup('#karma-video-box-' + that.el.dataset.elementKey + ' .karma-video-box' );

			});

		},

		/**
		 * @summary get data url
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		videourl : function () {

			var defaultClasses =  this.model.attributes.shortcode_attributes.videourl;
			this.el.querySelector( '.karma-video-box' ).setAttribute( "data-url", defaultClasses );

		},

		/**
		 * @summary Active editable title
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		titleEditable : function () {

			var content = this.el.querySelector( '.karma-video-box-title-tag' );

			if( null != content ){
				content.contentEditable = true ;
				content.focus();
			}
		},
			
		/**
		 * @summary Active editable description
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		titleDescription : function () {

			var content = this.el.querySelector( '.karma-video-box-description-tag' );

			if( null != content ){
				content.contentEditable = true ;
				content.focus();
			}

		},

		/**
		 * @summary Active editable link
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		titleLink : function ( e ) {

			e.preventDefault();
			var content = this.el.querySelector( '.karma-video-box-link-tag' );

			if( null != content ){
				content.contentEditable = true ;
				content.focus();
			}
		},

		/**
		 * @summary change image URL
		 *
		 * @since 0.1.1
		 *
		 * @returns {void}
		 */
		imgurl : function () {

			var imageAddress = this.getAttributes( [ 'imgurl' ] ),
				elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' );

			this.renderCss( '#' + elementId + ' .karma-video-box' , 'background-image', 'url('+ imageAddress.imgurl +')' );

		},

		/**
		 * @summary Set color for title
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		titlecolor : function(){

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				colorValue  = this.getAttributes( ['titlecolor'] );

			this.renderCss( "#" + elementId + " .karma-video-box-title .karma-video-box-title-tag", 'color', colorValue.titlecolor  );


		},

		/**
		 * @summary Set color for description
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		descriptioncolor : function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				colorValue  = this.getAttributes( ['descriptioncolor'] );

			this.renderCss( "#" + elementId + " .karma-video-box-description .karma-video-box-description-tag", 'color', colorValue.descriptioncolor  );
			this.renderCss( "#" + elementId + " .karma-video-box-player svg * ", 'fill', colorValue.descriptioncolor  );

		},

		/**
		 * @summary Set color for link
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		linkcolor : function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				colorValue = this.getAttributes( ['linkcolor'] );

			this.renderCss( "#" + elementId + " .karma-video-box-link .karma-video-box-link-tag", 'color', colorValue.linkcolor  );
			this.renderCss( "#" + elementId + " .karma-video-box-link .karma-video-box-link-shape svg * ", 'stroke', colorValue.linkcolor  );


		},

		/**
		 * @summary set link for text
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		textlink: function () {

			var elementId 	= this.$el,
				linkValue  = this.getAttributes( ['textlink'] );

			elementId.find('.karma-video-box-link-tag ').attr( "href", linkValue.textlink );
		},

		/**
		 * @summary set link target for text
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		textlinkaction: function () {

			var elementId 	= this.$el,
				linktarget  = this.getAttributes( ['textlinkaction'] );
			elementId.find( '.karma-video-box-link-tag ' ).attr( "target", linktarget.textlinkaction );

		},

		/**
		 * @summary get title typography and change innerHtml of title
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		titletag: function(){

			var element = this.el.querySelector( '.karma-video-box-title-tag' ),
				tagAttr = this.getAttributes( [ 'titletag' ] ),
				newTag = document.createElement( tagAttr.titletag );

			newTag.innerHTML = element.innerHTML;
			newTag.classList.add( 'karma-video-box-title-tag' );
			element.parentNode.replaceChild( newTag, element );

		},

		/**
		 * @summary get description typography and change innerHtml of description
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		descriptiontag: function(){

			var element = this.el.querySelector( '.karma-video-box-description-tag' ),
				tagAttr = this.getAttributes( ['descriptiontag'] ),
				newTag = document.createElement( tagAttr.descriptiontag );

			newTag.innerHTML = element.innerHTML;
			newTag.classList.add( 'karma-video-box-description-tag' );
			element.parentNode.replaceChild( newTag, element );

		},

		/**
		 * @summary get link typography and change innerHtml of link
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		linktag: function(){

			var element = this.el.querySelector( '.karma-video-box-link-tag' ),
				tagAttr = this.getAttributes( ['linktag'] ),
				newTag = document.createElement( tagAttr.linktag );

			newTag.innerHTML = element.innerHTML;
			newTag.classList.add( 'karma-video-box-link-tag' );
			element.parentNode.replaceChild( newTag, element );

		},

		/**
		 * @summary change position of text box in image
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		textposition: function () {

			var dataValue = this.getAttributes( [ 'textposition' ] ),
				regex = new RegExp( '(?:^|\\s)karma-video-box-content-position-(.*?)(?!\\S)' );

			this.el.querySelector( '.karma-video-box' ).className = this.el.querySelector( '.karma-video-box' ).className.replace( regex, " karma-video-box-content-position-" + dataValue.textposition );
		},



		/**
		 * @summary Set border radius for video box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		radiusbox : function () {
			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				radiusBox  = this.getAttributes( ['radiusbox'] );

			this.renderCss( "#" + elementId + " .karma-video-box", 'border-radius', radiusBox.radiusbox + "px"  );
			this.renderCss( "#" + elementId + " .karma-video-box-overlay", 'border-radius', radiusBox.radiusbox + "px"  );
		},

		/**
		 * @summary Set height for video box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		videoheight : function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				videoHeight  = this.getAttributes( ['videoheight'] );

			this.renderCss( "#" + elementId + " .karma-video-box ", 'height', videoHeight.videoheight + "px"  );

		},

		/**
		 * @summary Set color for overlay
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		coloroverlay : function(){

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				colorValue  = this.getAttributes( ['coloroverlay'] );

			this.renderCss( "#" + elementId + " .karma-video-box-overlay ", 'background-color', colorValue.coloroverlay  );

		},

		/**
		 * @summary Set color for overlay
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		colorbackground : function(){

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				colorValue  = this.getAttributes( ['colorbackground'] );

			this.renderCss( "#" + elementId + " .karma-video-box ", 'background-color', colorValue.colorbackground  );

		},

	});

})( jQuery, karmaBuilder );

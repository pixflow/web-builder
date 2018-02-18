( function( $, karmaBuilder ){

	karmaBuilder.imagebox = karmaBuilder.shortcodes.extend({

		events: {

			'blur .karma-image-text-box-title-tag '     : 'saveImageTitle',
			'blur .karma-image-text-box-description-tag': 'saveImageDescription',
			'keyup .karma-image-text-box-link-tag'		: 'checkEmptyLink',
			'click .karma-image-text-box-title'			: 'titleEditable',
			'click .karma-image-text-box-description'	: 'titleDescription',
			'click .karma-image-text-box-link'			: 'titleLink',

		},

		initialize: function ( options ) {

			karmaBuilder.imagebox.__super__.initialize.apply( this, arguments );
			this.options = options;

			if( this.options.renderStatus ){
				this.render();
			}

		},

		/**
		 * @summary Render image element
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		render : function () {

			var source = this.template( this.model );
			this.el.querySelector( '.karma-element-content' ).innerHTML = source;

		},

		/**
		 * @summary Active editable title
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		titleEditable : function () {

			var content = this.el.querySelector( '.karma-image-text-box-title-tag' );

			if( null != content ){
				content.contentEditable = true ;
				content.focus();
			}

		},

		/**
		 * @summary Save the description of image text box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		saveImageDescription : function () {

			var content 	= this.el.querySelector( '.karma-image-text-box-description-tag' ),
				contentData = content.innerHTML;

			if ( "" == contentData.trim() ) {
				content.innerText = "";
			}

			this.setAttributes( { 'descriptiontext' : contentData },  true );

		},

		/**
		 * @summary Save the title of image  text box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		saveImageTitle : function () {

			var content 	= this.el.querySelector( '.karma-image-text-box-title-tag' ),
				contentData = this.el.querySelector( '.karma-image-text-box-title-tag' ).innerHTML;

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
		checkEmptyLink : function () {
			var content 	= this.el.querySelector( '.karma-image-text-box-link-tag' ),
				contentData = content.innerHTML;

			if ( "" == contentData.trim() ) {
				content.innerText = "";
				this.el.querySelector( '.karma-image-text-box-link-shape' ).style.display = 'none';
			}else{
				this.el.querySelector( '.karma-image-text-box-link-shape' ).style.display = 'block';
			}

			this.setAttributes( { 'linktext' : contentData },  true );
		},

		/**
		 * @summary Active editable description
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		titleDescription : function () {

			var content = this.el.querySelector( '.karma-image-text-box-description-tag' );

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
		titleLink : function () {

			var content = this.el.querySelector( '.karma-image-text-box-link-tag' );

			if( null != content ){
				content.contentEditable = true ;
				content.focus();
			}

		},

		/**
		 * @summary change background size to cover and contain
		 *
		 * @since 0.1.1
		 *
		 * @returns {void}
		 */
		backgroundsize  : function () {

			var regex 				= new RegExp( '(?:^|\\s)karma-image-text-box-background-size-(.*?)(?!\\S)' ),
				backgroundsize		= this.getAttributes( [ 'backgroundsize' ] ).backgroundsize,
				sectionBackground	= this.el.querySelector( '.karma-image-text-box' );

			sectionBackground.className = sectionBackground.className.replace( regex, " karma-image-text-box-background-size-" + backgroundsize );

		},

		/**
		 * @summary change position of background image
		 *
		 * @since 0.1.1
		 *
		 * @returns {void}
		 */
		backgroundposition : function () {

			var regex			= new RegExp( '(?:^|\\s)karma-image-text-box-position-(.*?)(?!\\S)' ),
				imagePosition	= this.getAttributes( [ 'backgroundposition' ] );

			this.el.querySelector( '.karma-image-text-box' ).className = this.el.querySelector( '.karma-image-text-box' ).className.replace( regex, " karma-image-text-box-position-" + imagePosition.backgroundposition );

		},

		/**
		 * @summary change image URL
		 *
		 * @since 0.1.1
		 *
		 * @returns {void}
		 */
		imgurl : function () {

			var imageAddress	= this.getAttributes( [ 'imgurl' ] ),
				elementId		= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' );

			this.renderCss( '#' + elementId + ' .karma-image-text-box' , 'background-image', 'url('+ imageAddress.imgurl +')' );

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

			this.renderCss( "#" + elementId + " .karma-image-text-box-title .karma-image-text-box-title-tag", 'color', colorValue.titlecolor  );

		},

		/**
		 * @summary Set color for description
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		descriptioncolor : function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				colorValue  = this.getAttributes( ['descriptioncolor'] );

			this.renderCss( "#" + elementId + " .karma-image-text-box-description .karma-image-text-box-description-tag", 'color', colorValue.descriptioncolor  );

		},

		/**
		 * @summary Set color for link
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		linkcolor : function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				colorValue	= this.getAttributes( ['linkcolor'] );

			this.renderCss( "#" + elementId + " .karma-image-text-box-link .karma-image-text-box-link-tag", 'color', colorValue.linkcolor  );
			this.renderCss( "#" + elementId + " .karma-image-text-box-link .karma-image-text-box-link-shape svg * ", 'stroke', colorValue.linkcolor  );

		},

		/**
		 * @summary Set border radius for Image box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		radiusbox : function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				radiusBox	= this.getAttributes( ['radiusbox'] );

			this.renderCss( "#" + elementId + " .karma-image-text-box", 'border-radius', radiusBox.radiusbox + "px"  );
			this.renderCss( "#" + elementId + " .karma-image-text-box-overlay", 'border-radius', radiusBox.radiusbox + "px"  );

		},

		/**
		 * @summary Set height for Image box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		imageheight : function () {

			var elementId	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				imageHeight	= this.getAttributes( ['imageheight'] );

			this.renderCss( "#" + elementId + " .karma-image-text-box ", 'height', imageHeight.imageheight + "px"  );

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

			elementId.find( '.karma-image-text-box-link-tag' ) .attr( "href", linkValue.textlink );
		},

		/**
		 * @summary set link target for text
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		opennewtab: function () {

			var elementId 	= this.$el,
				linktarget  = this.getAttributes( ['opennewtab'] );

			elementId.find( '.karma-image-text-box-link-tag ' ).attr( "target", linktarget.opennewtab );
		},

		/**
		 * @summary get title typography and change innerHtml of title
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		titletag: function(){

			var element = this.el.querySelector( '.karma-image-text-box-title-tag' ),
				tagAttr = this.getAttributes( [ 'titletag' ] ),
				newTag	= document.createElement( tagAttr.titletag );

			newTag.innerHTML = element.innerHTML;
			newTag.classList.add( 'karma-image-text-box-title-tag' );
			element.parentNode.replaceChild( newTag, element );

		},

		/**
		 * @summary get description typography and change innerHtml of description
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		descriptiontag: function(){

			var element = this.el.querySelector( '.karma-image-text-box-description-tag' ),
				tagAttr = this.getAttributes( ['descriptiontag'] ),
				newTag	= document.createElement( tagAttr.descriptiontag );

			newTag.innerHTML = element.innerHTML;
			newTag.classList.add( 'karma-image-text-box-description-tag' );
			element.parentNode.replaceChild( newTag, element );

		},

		/**
		 * @summary get link typography and change innerHtml of link
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		linktag: function(){

			var element = this.el.querySelector( '.karma-image-text-box-link-tag' ),
				tagAttr = this.getAttributes( ['linktag'] ),
				newTag	= document.createElement( tagAttr.linktag );

			newTag.innerHTML = element.innerHTML;
			newTag.classList.add( 'karma-image-text-box-link-tag' );
			element.parentNode.replaceChild( newTag, element );

		},

		/**
		 * @summary change position of text box in image
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		textposition: function () {

			var dataValue	= this.getAttributes( [ 'textposition' ] ),
				regex		= new RegExp( '(?:^|\\s)karma-image-text-box-content-position-(.*?)(?!\\S)' );

			this.el.querySelector( '.karma-image-text-box' ).className = this.el.querySelector( '.karma-image-text-box' ).className.replace( regex, " karma-image-text-box-content-position-" + dataValue.textposition );

		},

		/**
		 * @summary background color changes. change background color
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		backgroundcolor: function () {

			var elementId = this.elementSelector();
			this.renderCss( '#' + elementId + ' .karma-image-text-box', 'background-color', this.getAttributes( [ 'backgroundcolor' ] ).backgroundcolor );

		},

		/**
		 * @summary overlay color changes. change overlay color
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		overlaycolor: function () {

			var elementId = this.elementSelector();
			this.renderCss( '#' + elementId + ' .karma-image-text-box-overlay', 'background-color', this.getAttributes( [ 'overlaycolor' ] ).overlaycolor );

		}

	});

})( jQuery, karmaBuilder );

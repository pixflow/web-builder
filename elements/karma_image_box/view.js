( function( $, karmaBuilder ){

	karmaBuilder.imagebox = karmaBuilder.shortcodes.extend({

		events: {

			'blur .karma-image-text-box-title-tag '    			: 'saveImageTitle',
			'mousedown .karma-image-text-box-title-tag '		: 'changeImageTitle',
			'keypress .karma-image-text-box-title-tag ' 		: 'changeClassImageTitle',
			'blur .karma-image-text-box-description-tag'		: 'saveImageDescription',
			'mousedown .karma-image-text-box-description-tag '	: 'changeImageDescription',
			'keypress .karma-image-text-box-description-tag'	: 'changeClassImageDescription',
			'keyup .karma-image-text-box-link-tag'				: 'checkEmptyLink',
			'mousedown .karma-image-text-box-link-tag'			: 'changeTextLink',
			'click .karma-image-text-box-title'					: 'titleEditable',
			'click .karma-image-text-box-description'			: 'titleDescription',
			'click .karma-image-text-box-link'					: 'titleLink',
			'keypress .karma-image-text-box-link'				: 'deactiveEnter'

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
				if(document.body.classList.contains( 'karma-device-mode-desktop' )) {
					content.contentEditable = true;
					content.focus();
				}

			}

		},

		/**
		 * @summary  Deactivate enter in link text
		 *
		 * @since 0.1.1
		 * @return {number}
		 */
		deactiveEnter : function ( e ) {

			return e.which != 13;

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
				content.innerText = "With good Karma";
				content.classList.add('karma-image-box-description-opacity');
			}


			if( '' == contentData ){
				this.setAttributes( { 'descriptiontext' : "With good Karma" },  true );
			}else{
				this.setAttributes( { 'descriptiontext' : contentData },  true );
			}



		},

		/**
		 * @summary change the description of image  text box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		changeImageDescription : function () {

			var content 	= this.el.querySelector( '.karma-image-text-box-description-tag' ),
					contentData = content.innerHTML;


			if ( "With good Karma" == contentData.trim() ) {
				if( document.body.classList.contains( 'karma-device-mode-desktop' ) ) {
					content.innerText = "";
					content.contentEditable = true;
				}
			}

		},

		/**
		 * @summary change class title of image  text box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		changeClassImageDescription : function () {

			var content 	= this.el.querySelector( '.karma-image-text-box-description-tag' );

			if( content.classList.contains( 'karma-image-box-description-opacity' ) ) {
				content.className = content.className.replace( "karma-image-box-description-opacity", "" );
			}

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
				content.innerText = "MAKE WEBSITE";
				content.classList.add('karma-image-box-title-opacity');
			}

			if( '' == contentData ){
				this.setAttributes( { 'titletext' : "MAKE WEBSITE" },  true );
			}else{
				this.setAttributes( { 'titletext' : contentData },  true );
			}

		},

		/**
		 * @summary change the title of image  text box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		changeImageTitle : function () {

			var content 	= this.el.querySelector( '.karma-image-text-box-title-tag' ),
				contentData = this.el.querySelector( '.karma-image-text-box-title-tag' ).innerHTML;

			if ( "MAKE WEBSITE" == contentData.trim() ) {
				if(document.body.classList.contains( 'karma-device-mode-desktop' )) {
					content.innerText = "";
					content.contentEditable = true;
				}
			}

		},

		/**
		 * @summary change class title of image  text box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		changeClassImageTitle : function () {

			var content 	= this.el.querySelector( '.karma-image-text-box-title-tag' );

			if( content.classList.contains( 'karma-image-box-title-opacity' ) ) {
				content.className = content.className.replace( "karma-image-box-title-opacity", "" );
			}

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
		 * @summary change link text
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		changeTextLink : function () {

			var content 	= this.el.querySelector( '.karma-image-text-box-link-tag' ),
				contentData = content.innerHTML;

			if( "Explore more" == contentData.trim() ){
				if( document.body.classList.contains( 'karma-device-mode-desktop' ) ) {
					content.innerText = "";
				}
			}
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
				if( document.body.classList.contains( 'karma-device-mode-desktop' ) ) {
					content.contentEditable = true;
					content.focus();
				}

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
				if( document.body.classList.contains( 'karma-device-mode-desktop' ) ) {
					content.contentEditable = true;
					content.focus();
				}

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
		target: function () {

			var elementId 	= this.$el,
				linktarget  = this.getAttributes( ['target'] );

			elementId.find( '.karma-image-text-box-link-tag ' ).attr( "target", linktarget.target );
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

		},

		type : function () {

			var className = this.getAttributes(['type']).type;
			if( 'outline' == className ) {
				this.$el.find('.karma-image-text-box-link').removeClass('karma-button-fill karma-button-link').addClass('karma-button-outline');
			}else if('fill' == className ){
				this.$el.find('.karma-image-text-box-link').addClass('karma-button-fill').removeClass('karma-button-outline karma-button-link');
			}else{
				this.$el.find('.karma-image-text-box-link').addClass('karma-button-link').removeClass('karma-button-outline karma-button-fill');
			}
		},

		rangemodel : function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
					border		= this.getAttributes(['rangemodel']);

			this.renderCss( "#" + elementId + " .karma-image-text-box-link", 'border-radius', border.rangemodel + "px"  );


		} ,
        /**
         * @summary Set color for link
         *
         * @since 0.1.1
         * @return {void}
         */
        textcolor : function () {

            var elementId 	= this.elementSelector(),
                colorValue  = this.getAttributes( ['textcolor'] );

            this.renderCss( "#" + elementId + " .karma-button-fill .karma-image-text-box-link-tag ", 'color', colorValue.textcolor  );

        },

        /**
         * @summary Set color for link
         *
         * @since 0.1.1
         * @return {void}
         */
        generalcolor : function () {

            var elementId 	= this.elementSelector(),
                colorValue  = this.getAttributes( ['generalcolor'] );

            this.renderCss( "#" + elementId + " .karma-image-text-box-link.karma-button-fill", 'background-color', colorValue.generalcolor  );
            this.renderCss( "#" + elementId + " .karma-button-outline .karma-image-text-box-link-tag", 'color', colorValue.generalcolor  );
            this.renderCss( "#" + elementId + " .karma-image-text-box-link.karma-button-outline", 'border-color', colorValue.generalcolor  );
            this.renderCss( "#" + elementId + " .karma-image-text-box-link.karma-button-fill", 'border-color', colorValue.generalcolor  );
            this.renderCss( "#" + elementId + " .karma-image-text-box-link .karma-image-text-box-link-shape svg *", 'stroke', colorValue.generalcolor  );
            this.renderCss( "#" + elementId + " .karma-image-text-box-link.karma-button-link .karma-image-text-box-link-tag", 'color', colorValue.generalcolor  );

        },
		/**
		 * @summary show and hide button with hide gizmo in desktop
		 *
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		visibleondesktop : function () {

			var desktopVisible = this.getAttributes( ['visibleondesktop'] ).visibleondesktop;

			if( "on" == desktopVisible ){
				this.el.querySelector( '.karma-image-text-box-link' ).classList.remove( "karma-deactive-on-desktop" );
			}else{
				this.el.querySelector( '.karma-image-text-box-link' ).classList.add( "karma-deactive-on-desktop" );
			}

		},

		/**
		 * @summary show and hide column white hide gizmo in tablet
		 *
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		visibleontablet : function () {

			var tabletVisible = this.getAttributes( ['visibleontablet'] ).visibleontablet;

			if( "on" == tabletVisible ){
				this.el.querySelector( '.karma-image-text-box-link' ).classList.remove( "karma-deactive-on-tablet" );
			}else{
				this.el.querySelector( '.karma-image-text-box-link' ).classList.add( "karma-deactive-on-tablet" );
			}

		},


		/**
		 * @summary show and hide column white hide gizmo in mobile
		 *
		 *
		 * @since 0.1.0
		 * @return {void}
		 */
		visibleonmobile : function () {

			var mobileVisible = this.getAttributes( ['visibeonmobile'] ).visibleonmobile;

			if( "on" == mobileVisible ){
				this.el.querySelector( '.karma-image-text-box-link' ).classList.remove( "karma-deactive-on-mobile" );
			}else{
				this.el.querySelector( '.karma-image-text-box-link' ).classList.add( "karma-deactive-on-mobile" );
			}

		}



    });

})( jQuery, karmaBuilder );

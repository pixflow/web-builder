( function( $, karmaBuilder ){

		karmaBuilder.videobox = karmaBuilder.shortcodes.extend({

		events: {
			'blur .karma-video-box-title-tag '      		: 'saveVideoTitle',
			'mousedown .karma-video-box-title-tag '			: 'changeVideoTitle',
			'keypress .karma-video-box-title-tag ' 			: 'changeClassVideoTitle',
			'blur .karma-video-box-description-tag' 		: 'saveVideoDescription',
			'mousedown .karma-video-box-description-tag'	: 'changeVideoDescription',
			'keypress .karma-video-box-description-tag'		: 'changeClassVideoDescription',
			'keyup .karma-video-box-link-tag'				: 'saveVideoLink',
			'mousedown .karma-video-box-link-tag'			: 'changeTextLink',
			'click .karma-video-box-title'					: 'titleEditable',
			'click .karma-video-box-description'			: 'titleDescription',
			'click .karma-video-box-link'					: 'titleLink',
			'keypress .karma-video-box-link'				: 'deactiveEnter'

		},

		initialize: function ( options ) {

			karmaBuilder.videobox.__super__.initialize.apply( this, arguments );
			this.options = options;

			if( this.options.renderStatus ){
				this.render();
			}
			this.el.querySelector('.karma-video-box-link-tag').contentEditable = true ;
			this.el.querySelector('.karma-video-box-description-tag').contentEditable = true ;
			this.el.querySelector('.karma-video-box-title-tag').contentEditable = true ;
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
				content.innerText = "Live Text Editor";
				content.classList.add('karma-video-box-description-opacity');
			}

			if( '' == contentData ){
				this.setAttributes( { 'descriptiontext' : "Live Text Editor" },  true );
			}else{
				this.setAttributes( { 'descriptiontext' : contentData },  true );
			}

		},

		/**
		 * @summary change the description of video  text box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		changeVideoDescription : function () {

			var content = this.el.querySelector( '.karma-video-box-description-tag' ),
				contentData = content.innerHTML;


			if ( "Live Text Editor" == contentData.trim() ) {
				if(document.body.classList.contains( 'karma-device-mode-desktop' )) {
					content.innerText = "";
				}
			}

		},

		/**
		 * @summary change class title of image  text box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		changeClassVideoDescription : function () {

			var content = this.el.querySelector( '.karma-video-box-description-tag' );

			if( content.classList.contains( 'karma-video-box-description-opacity' ) ) {
				content.className = content.className.replace( "karma-video-box-description-opacity", "" );
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
		 * @summary Save the title of video box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		saveVideoTitle : function () {

			var content = this.el.querySelector( '.karma-video-box-title-tag' ),
				contentData = this.el.querySelector( '.karma-video-box-title-tag' ).innerHTML;

			if ( "" == contentData.trim() ) {
				content.innerText = "Great idea";
				content.classList.add('karma-video-box-title-opacity');
			}

			if( '' == contentData ){
				this.setAttributes( { 'titletext' : "Great idea" },  true );
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
		changeVideoTitle : function () {

			var content = this.el.querySelector( '.karma-video-box-title-tag' ),
				contentData = this.el.querySelector( '.karma-video-box-title-tag' ).innerHTML;

			if ( "Great idea" == contentData.trim() ) {
				if(document.body.classList.contains( 'karma-device-mode-desktop' )) {
					content.innerText = "";
				}
			}

		},

		/**
		 * @summary change class title of image  text box
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		changeClassVideoTitle : function () {

			var content = this.el.querySelector( '.karma-video-box-title-tag' );

			if( content.classList.contains( 'karma-video-box-title-opacity' ) ) {
				content.className = content.className.replace( "karma-video-box-title-opacity", "" );
			}

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
		 * @summary change link text
		 *
		 * @since 0.1.1
		 * @return {void}
		 */
		changeTextLink : function () {

			var content = this.el.querySelector( '.karma-video-box-link-tag' ),
				contentData = content.innerHTML;
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
				if( document.body.classList.contains( 'karma-device-mode-desktop' ) ) {
					content.focus();
				};

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

				if( document.body.classList.contains( 'karma-device-mode-desktop' ) ) {
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
		titleLink : function ( e ) {

			e.preventDefault();
			var content = this.el.querySelector( '.karma-video-box-link-tag' );

			if( null != content ){

				if( document.body.classList.contains( 'karma-device-mode-desktop' ) ) {
					content.focus();
				}

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
		target: function () {

			var elementId 	= this.$el,
				linktarget  = this.getAttributes( ['target'] );
			elementId.find( '.karma-video-box-link-tag ' ).attr( "target", linktarget.target );

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

		type : function () {

			var className = this.getAttributes(['type']).type;
			if( 'outline' == className ) {
				this.$el.find('.karma-video-box-link').removeClass('karma-button-fill karma-button-link').addClass('karma-button-outline');
			}else if('fill' == className ){
				this.$el.find('.karma-video-box-link').addClass('karma-button-fill').removeClass('karma-button-outline karma-button-link');
			}else{
				this.$el.find('.karma-video-box-link').addClass('karma-button-link').removeClass('karma-button-outline karma-button-fill');
			}
		},

		rangemodel : function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( /_/g, '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
					border		= this.getAttributes(['rangemodel']);

			this.renderCss( "#" + elementId + " .karma-video-box-link", 'border-radius', border.rangemodel + "px"  );


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

			this.renderCss( "#" + elementId + " .karma-button-fill .karma-video-box-link-tag ", 'color', colorValue.textcolor  );

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

			this.renderCss( "#" + elementId + " .karma-video-box-link.karma-button-fill", 'background-color', colorValue.generalcolor  );
			this.renderCss( "#" + elementId + " .karma-button-outline .karma-video-box-link-tag", 'color', colorValue.generalcolor  );
			this.renderCss( "#" + elementId + " .karma-video-box-link.karma-button-outline", 'border-color', colorValue.generalcolor  );
			this.renderCss( "#" + elementId + " .karma-video-box-link.karma-button-fill", 'border-color', colorValue.generalcolor  );
			this.renderCss( "#" + elementId + " .karma-video-box-link .karma-video-box-link-shape svg *", 'stroke', colorValue.generalcolor  );
			this.renderCss( "#" + elementId + " .karma-video-box-link.karma-button-link .karma-video-box-link-tag", 'color', colorValue.generalcolor  );


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
				this.el.querySelector( '.karma-video-box-link' ).classList.remove( "karma-deactive-on-desktop" );
			}else{
				this.el.querySelector( '.karma-video-box-link' ).classList.add( "karma-deactive-on-desktop" );
			}

		},
			/**
			 * @summary  show and hide button with hide gizmo in tablet
			 *
			 *
			 * @since 0.1.0
			 * @return {void}
			 */
			visibleontablet : function () {

				var tabletVisible = this.getAttributes( ['visibleontablet'] ).visibleontablet;

				if( "on" == tabletVisible ){
					this.el.querySelector( '.karma-video-box-link' ).classList.remove( "karma-deactive-on-tablet" );
				}else{
					this.el.querySelector( '.karma-video-box-link' ).classList.add( "karma-deactive-on-tablet" );
				}

			},

			/**
			 * @summary  show and hide button with hide gizmo in mobile
			 *
			 *
			 * @since 0.1.0
			 * @return {void}
			 */
			visibleonmobile : function () {

				var mobileVisible = this.getAttributes( ['visibeonmobile'] ).visibleonmobile;

				if( "on" == mobileVisible ){
					this.el.querySelector( '.karma-video-box-link' ).classList.remove( "karma-deactive-on-mobile" );
				}else{
					this.el.querySelector( '.karma-video-box-link' ).classList.add( "karma-deactive-on-mobile" );
				}

			}

	});

})( jQuery, karmaBuilder );

( function( $, karmaBuilder ){

	karmaBuilder.text = karmaBuilder.shortcodes.extend({

		events: {
			'blur .karma-editable-content'               : 'saveContent',
			'click .karma-editable-content'              : 'updateFontStyleGizmo',
			'click.focusElement'						 : 'focusElement',
			'keydown .karma-editable-content'	         : 'preventFromNewLine',
			'paste [contenteditable]'					 : 'pasteAsPlainText'
		},

		initialize: function ( options ) {

			karmaBuilder.text.__super__.initialize.apply( this, arguments );
			this.options = options;
			if( this.options.renderStatus ){
				this.render();
			}

		},

		/**
		 * @summary Render text element
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		render : function () {

			var model =  JSON.parse( JSON.stringify( this.model.get( 'shortcode_attributes' ) ) );
			model['content'] = this.model.get( 'shortcode_content' ) ;
			var source = this.template( model );
			this.el.querySelector('.karma-element-content').innerHTML = source;

		},


		/**
		 * @summary Save the content of the text element
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		saveContent : function () {

			var content = this.el.querySelector( '.karma-text-tag' ),
				contentData = this.el.querySelector('.karma-text-tag').innerHTML,
				focusElement = this.el.querySelector('.karma-editable-content'),
				contentValue = content.innerText ;

			if ( "" == contentValue.trim() ) {
				content.innerText = "Click here to edit content...";
			}

			focusElement.classList.remove('karma-text-element-focus');

			this.model.set( { 'shortcode_content' : contentData }, { silent : true } );

		},

		/**
		 * @summary get text typography and change innerHtml of text
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		tag: function(){
			
			var element = this.el.querySelector( '.karma-text-tag' ),
				tagAttr = this.getAttributes( ['tag'] ),
				newTag = document.createElement( tagAttr.tag );
			newTag.innerHTML = element.innerHTML;
			newTag.classList.add( 'karma-text-tag', 'karma-document-click', 'karma-editable-content' );
			newTag.contentEditable = true ;
			element.parentNode.replaceChild( newTag, element );

		},

		/**
		 * @summary get text element alignment
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		align: function () {

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				alignAttr = this.getAttributes( ['align'] );
			this.renderCss( "#" + elementId + " .karma-text-tag", 'text-align', alignAttr.align  );


		},


		/**
		 * @summary Set color for text element
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		color : function(){

			var elementId 	= this.el.getAttribute( 'data-name' ).replace( '_', '-' ) + '-' + this.el.getAttribute( 'data-element-key' ),
				colorValue = this.getAttributes( ['color'] );
			this.renderCss( "#" + elementId + " .karma-text-tag", 'color', colorValue.color  );

		},


		/**
		 * @summary Active on editable elements and check inner text
		 *
		 * @since 1.0.0
		 * @return {boolean}
		 */
		focusElement : function () {

			var content = this.el.querySelector( '.karma-text-tag' ),
				contentValue = content.innerText ,
				focusElement = this.el.querySelector( '.karma-editable-content' );

			if ( "Click here to edit content..." == contentValue.trim() ) {
				content.innerText = "";
			}
			if( false == focusElement.classList.contains( 'focus' ) ){
				focusElement.contentEditable = true ;
				focusElement.classList.add( 'karma-text-element-focus' );
				focusElement.focus();
			}

			return true;

		},

		/**
		 * @summary Update font styles for text element
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		updateFontStyleGizmo : function ( event ) {

			var selectedText = this.getSelectionHtml(),
				getClickedElement = ( '' != selectedText.html ) ? $( selectedText.parent ).get( 0 ) : document.elementFromPoint( event.clientX, event.clientY ),
				computedObject = window.getComputedStyle( getClickedElement ),
				tagName = getClickedElement.tagName;

			this.updateBoldStyle( computedObject, tagName );
			this.updateItalicStyle( computedObject, tagName );
			this.updateUnderlineStyle( computedObject, tagName , getClickedElement );

		},

		/**
		 * @summary Update bold styles for text element
		 *
		 * @param   {Object}    computedObject  Selected DOM node.
		 * @param   {tagName}   tagName         The tag name of Selected DOM node.
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		updateBoldStyle : function( computedObject, tagName ){

			if ( 'B' == tagName || '700' == computedObject.getPropertyValue('font-weight') ) {
				this.el.querySelector('.karma-set-bold-style').classList.add('karma-drop-down-active-item');
			} else {
				this.el.querySelector('.karma-set-bold-style').classList.remove('karma-drop-down-active-item');
			}

		},

		/**
		 * @summary Update bold styles for text element
		 *
		 * @param   {Object}    computedObject  Selected DOM node.
		 * @param   {tagName}   tagName         The tag name of Selected DOM node.
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		updateUnderlineStyle : function( computedObject, tagName, getClickedElement ){
			
			if ( 'U' == tagName || 'underline' == computedObject.getPropertyValue('text-decoration')  || getClickedElement.closest("U")  ){
				this.el.querySelector('.karma-set-underline-style').classList.add('karma-drop-down-active-item');
			} else {
				this.el.querySelector('.karma-set-underline-style ').classList.remove('karma-drop-down-active-item');
			}

		},

		/**
		 * @summary Update bold styles for text element
		 *
		 * @param   {Object}    computedObject  Selected DOM node.
		 * @param   {tagName}   tagName         The tag name of Selected DOM node.
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		updateItalicStyle : function ( computedObject, tagName  ) {

			if ( 'I' == tagName || 'italic' == computedObject.getPropertyValue('font-style') ){
				this.el.querySelector('.karma-set-italic-style').classList.add('karma-drop-down-active-item');
			} else {
				this.el.querySelector('.karma-set-italic-style').classList.remove('karma-drop-down-active-item');
			}

		},

		/**
		 * @summary Return HTML of selected text
		 *
		 *
		 * @since 1.0.0
		 * @return {Object} html : return html of selected text , parent : parent element of selected text
		 */
		getSelectionHtml : function(){

			var html = "";
			if ( typeof window.getSelection != "undefined" ) {
				var selected = window.getSelection();
				if ( selected.rangeCount ) {
					var container = document.createElement("div");
					for ( var i = 0, len = selected.rangeCount; i < len; ++i ) {
						container.appendChild( selected.getRangeAt(i).cloneContents() );
					}
					html = container.innerHTML;
					var parentEl = selected.getRangeAt(0).commonAncestorContainer;
					if ( parentEl.nodeType != 1 ) {
						parentEl = parentEl.parentNode;
					}
				}
			} else if ( typeof document.selection != "undefined" ) {
				if ( document.selection.type == "Text" ) {
					html = document.selection.createRange().htmlText;
					var parentEl = sel.createRange().parentElement();
				}
			}

			return {
				'html'      : html,
				'parent'    : parentEl
			};

		},

		/**
		 * @summary paste as plain text for pasting in text shortcode
		 *
		 * @param   {Object}    event
		 *
		 * @since 1.0.0
		 * @return {void}
		 */
		pasteAsPlainText : function ( e ) {

				e.preventDefault();
				var text = ( e.originalEvent || e ).clipboardData.getData('text/plain');
				document.execCommand( 'insertText', false, text );

		},

	});

})( jQuery, karmaBuilder );
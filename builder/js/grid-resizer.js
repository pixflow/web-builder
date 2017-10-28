/**
 * gridResizer is a column resize tool which support grids and flexbox
 *
 * URL: http://pixflow.net
 * License: MIT
 */
(function () {

	/**
	 * initial function of gridResizer
	 *
	 * @param    {object}    option    initialize options
	 * @returns  {Array | boolean}    DOM elements which are resizable or false if not exists
	 */
	function gridResizer( option ) {

		this.options = {};
		this.defaultOptions = {
				selector    : ".grid-resizable",
				minHeight   : 0,
				maxHeight   : 5000,
				minWidth    : 0,
				maxWidth    : 5000,
				snapToGrid  : false,
				direction   : 'x',
				gridPrefix  : 'col-md',
				onStop      : function () {},
				onDrag      : function () {}
			};

		for ( var i in this.defaultOptions ) {
			this.options[ i ] = option[ i ] || this.defaultOptions[ i ];
		}

		this.els = document.querySelectorAll( this.options.selector );

		if ( null === this.els ) {
			return false;
		}
		this.init();

		return this.els;

	}

	/**
	 * find elements which should be resizable then add handler to them
	 *
	 * @returns   {Array}    DOM elements which are resizable
	 */
	gridResizer.prototype.init = function() {

		for ( var i = 0; i < this.els.length; i++ ) {

			var el = this.els[ i ];

			if ( this.options.snapToGrid ) {

				if ( this.isLastElement( el ) ) {
					continue;
				}

				this.checkPaddingsToPreventLineBreaks( el );
			}

			this.createHandlers( el );

		}
		return this.els;

	};

	/**
	 * Min width of columns shouldn't be lower that their padding
	 *
	 * @param {object}    el    DOM element
	 * @returns {boolean}
	 */
	gridResizer.prototype.checkPaddingsToPreventLineBreaks = function( el ) {

		var oldWidth = el.style.width;
		var oldMaxWidth = el.style.maxWidth;
		var oldFlexBasis = el.style.flexBasis;
		el.style.width = '0px';
		el.style.maxWidth = '0px';
		el.style.flexBasis = '0px';
		if ( el.offsetWidth > this.options.min ) {
			this.options.min = el.offsetWidth;
		}
		el.style.width = oldWidth;
		el.style.maxWidth = oldMaxWidth;
		el.style.flexBasis = oldFlexBasis;

		return true;

	};

	/**
	 * create a handler for a column
	 *
	 * @param {object}    el    DOM element
	 * @returns {boolean}
	 */
	gridResizer.prototype.createHandlers = function( el ) {

		var handler = document.createElement( 'div' );
		handler.setAttribute( 'class', 'resize-handler' );

		el.appendChild( handler );
		handler.addEventListener( 'mousedown', this.initDrag.bind( this ), false );

		return true;
	};

	/**
	 * returns true if a column is the last column in a row
	 *
	 * @param 	{object}    el    DOM element
	 * @returns	{boolean}
	 */
	gridResizer.prototype.isLastElement = function( el ) {

		nextElement = this.findNextSibling( el );
		if ( !nextElement ) {
			return true;
		}
		return false;

	};

	/**
	 * Start Dragging
	 *
	 * @param {event}    e
	 * @returns {boolean}
	 */
	gridResizer.prototype.initDrag = function( e ) {

		var el = e.target.parentNode;

		el.classList.add( 'resize-dragging' );
		document.body.classList.add( 'grid-resizer-noselect' );

		if ( this.options.direction == 'x' || this.options.direction == 'both' ) {
			el.dataset.originalWidth = el.offsetWidth - 1;
			el.dataset.originalX = el.getBoundingClientRect().left + window.scrollX;

			if ( options.snapToGrid ) {
				nextElement = findNextSibling( el );
				nextElement.dataset.originalWidth = nextElement.offsetWidth;
				nextElement.dataset.originalX = nextElement.getBoundingClientRect().left + window.scrollX;
			}

		}

		if ( ( this.options.direction == 'y' || this.options.direction == 'both' ) && ! this.options.snapToGrid ) {
			el.style.minHeight = this.options.minHeight + 'px';
			el.style.maxHeight = this.options.maxHeight + 'px';
			el.dataset.originalHeight = el.offsetHeight - 1;
			el.dataset.originalY = e.pageY;
		}

		this.doDragFunc = this.doDrag.bind( this );
		this.stopDragFunc = this.stopDrag.bind( this );

		document.documentElement.addEventListener( 'mousemove', this.doDragFunc, false );
		document.documentElement.addEventListener( 'mouseup', this.stopDragFunc, false );

		return true;

	};

	/**
	 * Do drag while mouse is moving
	 *
	 * @param {event}    e
	 * @returns {boolean}
	 */
	gridResizer.prototype.doDrag = function( e ) {


		var el = document.querySelector( '.resize-dragging' ),
			returnObject = {};

		if ( this.options.direction == 'x' || this.options.direction == 'both' ) {
			var newWidth = e.pageX - el.dataset.originalX;
			if ( newWidth >= this.options.minWidth
				&& newWidth <= this.options.maxWidth
				&& e.pageX < document.documentElement.offsetWidth - this.options.minWidth ) {

				if ( this.options.snapToGrid ) {
					var nextElement = findNextSibling( el );
					var nextElementNewWidth = parseInt( nextElement.dataset.originalWidth ) + parseInt( el.dataset.originalWidth ) - newWidth;
					if ( nextElementNewWidth >= this.options.minWidth
						&& nextElementNewWidth <= this.options.maxWidth ) {

						nextElementWidth = nextElementNewWidth;
						nextElement.style.width = nextElementWidth + 'px';
						nextElement.style.maxWidth = nextElementWidth + 'px';
						nextElement.style.flexBasis = nextElementWidth + 'px';


						el.style.width = newWidth + 'px';
						el.style.maxWidth = newWidth + 'px';
						el.style.flexBasis = newWidth + 'px';

					}

				} else {
					el.style.width = newWidth + 'px';
					el.style.maxWidth = newWidth + 'px';
					el.style.flexBasis = newWidth + 'px';
				}

				returnObject.width = el.style.width;


			}
		}

		if ( ( this.options.direction == 'y' || this.options.direction == 'both' ) && ! this.options.snapToGrid ) {
			var newHeight = e.pageY - el.dataset.originalY;
			el.style.height = el.dataset.originalHeight * 1 + newHeight * 1 + 'px';
			returnObject.height = el.style.height;
		}

		this.options.onDrag( el, returnObject );
		return true;

	};

	/**
	 * find next sibling column
	 *
	 * @param {object}    el DOM element
	 * @returns {object | null}
	 */
	gridResizer.prototype.findNextSibling = function( el ) {

		var nextElement = el;
		while ( nextElement.nextSibling
		&& ( !nextElement.nextSibling.classList
		|| !nextElement.nextSibling.classList.contains( options.selector ) ) ) {
			nextElement = nextElement.nextSibling;
			break;
		}
		return nextElement.nextSibling;

	};

	/**
	 * Stop dragging after mouseup
	 *
	 * @returns {boolean}
	 */
	gridResizer.prototype.stopDrag = function() {

		var el = document.querySelector( '.resize-dragging' ),
			returnObject = {};

		el.classList.remove( 'resize-dragging' );
		document.body.classList.remove( 'grid-resizer-noselect' );

		document.documentElement.removeEventListener( 'mousemove', this.doDragFunc, false );
		document.documentElement.removeEventListener( 'mouseup', this.stopDragFunc, false );

		if ( true === this.options.snapToGrid ) {
			returnObject.grid = this.updateGrid( el );
		}

		if ( this.options.direction === 'x' || this.options.direction === 'both' ) {
			el.removeAttribute( 'data-original-width' );
			el.removeAttribute( 'data-original-x' );
			if ( this.options.snapToGrid ) {
				nextElement = findNextSibling( el );
				nextElement.removeAttribute( 'data-original-width' );
				nextElement.removeAttribute( 'data-original-x' );
			}
			returnObject.width = el.style.width;

		}

		if ( ( this.options.direction === 'y' || this.options.direction === 'both' ) && ! this.options.snapToGrid ) {
			el.removeAttribute( 'data-original-height' );
			el.removeAttribute( 'data-original-y' );
			returnObject.height = el.style.height;
		}

		this.options.onStop( returnObject );
		return true;

	};

	/**
	 * if snapToGrid was true, it finds the closest column width and set that class to the element
	 *
	 * @param {object}    el    DOM element
	 * @returns {boolean}
	 */
	gridResizer.prototype.updateGrid = function( el ) {

		var nextElement = this.findNextSibling( el ),
			elWidth = el.offsetWidth,
			nextElementWidth = nextElement.offsetWidth,
			oneColumnSize;

		el.style.width = '';
		el.style.flexBasis = '';
		el.style.maxWidth = '';

		nextElement.style.width = '';
		nextElement.style.flexBasis = '';
		nextElement.style.maxWidth = '';

		oneColumnSize = el.parentNode.offsetWidth * 8.333 / 100;

		elColumnWidth = Math.round( elWidth / oneColumnSize );
		nextElementColumnWidth = Math.round( nextElementWidth / oneColumnSize );

		if ( 0 === elColumnWidth ) {
			elColumnWidth = 1;
			nextElementColumnWidth--;
		}

		if ( 0 === nextElementColumnWidth ) {
			nextElementColumnWidth = 1;
			elColumnWidth--;
		}

		var regex = new RegExp( "(?:^|.)" + this.options.gridPrefix + "-([0-9]+)(?!\S)", "ig" );

		el.className = el.className.replace( regex, ' ' + this.options.gridPrefix + "-" + elColumnWidth + ' ' );
		nextElement.className = nextElement.className.replace( regex, ' ' + this.options.gridPrefix + "-" + nextElementColumnWidth + ' ' );

		return {
			currentColumnWidth  : elColumnWidth,
			nextColumnWidth     : nextElementColumnWidth
		};

	};

	window.gridResizer = function( option ){

		return new gridResizer( option );
		
	};

})();
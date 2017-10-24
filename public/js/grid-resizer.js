/**
 * gridResizer is a column resize tool which support grids and flexbox
 *
 * URL: http://pixflow.net
 * License: MIT
 */
(function () {

	var options = {};

	/**
	 * initial function of gridResizer
	 *
	 * @param    {object}    option    initialize options
	 * @returns    {array}    DOM elements which are resizable
	 */
	function gridResizer( option ) {

		var defaultOptions = {
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

		for ( i in defaultOptions ) {
			options[ i ] = option[ i ] || defaultOptions[ i ];
		}

		var els = document.querySelectorAll( options.selector );

		if ( null == els ) {
			return false;
		}

		init( els );

		return els;

	}

	/**
	 * find elements which should be resizable then add handler to them
	 *
	 * @param    {array}    els        DOM elements selected by selector
	 * @returns    {array}    DOM elements which are resizable
	 */
	function init( els ) {

		for ( var i = 0; i < els.length; i++ ) {

			var el = els[ i ];

			if ( options.snapToGrid ) {

				if ( isLastElement( el ) ) {
					continue;
				}

				checkPaddingsToPreventLineBreaks( el );
			}

			createHandlers( el );

		}
		return els;

	}

	/**
	 * Min width of columns shouldn't be lower that their padding
	 *
	 * @param {object}    el    DOM element
	 * @returns {boolean}
	 */
	function checkPaddingsToPreventLineBreaks( el ) {

		var oldWidth = el.style.width;
		var oldMaxWidth = el.style.maxWidth;
		var oldFlexBasis = el.style.flexBasis;
		el.style.width = '0px';
		el.style.maxWidth = '0px';
		el.style.flexBasis = '0px';
		if ( el.offsetWidth > options.min ) {
			options.min = el.offsetWidth;
		}
		el.style.width = oldWidth;
		el.style.maxWidth = oldMaxWidth;
		el.style.flexBasis = oldFlexBasis;

		return true;

	}

	/**
	 * create a handler for a column
	 *
	 * @param {object}    el    DOM element
	 * @returns {boolean}
	 */
	function createHandlers( el ) {

		var handler = document.createElement( 'div' );
		handler.setAttribute( 'class', 'resize-handler' );

		el.appendChild( handler );
		handler.addEventListener( 'mousedown', initDrag, false );

		return true;
	}

	/**
	 * returns true if a column is the last column in a row
	 *
	 * @param {object}    el    DOM element
	 * @returns {boolean}
	 */
	function isLastElement( el ) {

		nextElement = findNextSibling( el );
		if ( !nextElement ) {
			return true;
		}
		return false;

	}

	/**
	 * Start Dragging
	 *
	 * @param {event}    e
	 * @returns {boolean}
	 */
	function initDrag( e ) {

		var el = this.parentNode;

		el.classList.add( 'resize-dragging' );
		document.body.classList.add( 'grid-resizer-noselect' );

		if ( options.direction == 'x' || options.direction == 'both' ) {
			el.dataset.originalWidth = el.offsetWidth - 1;
			el.dataset.originalX = el.getBoundingClientRect().left + window.scrollX;

			if ( options.snapToGrid ) {
				nextElement = findNextSibling( el );
				nextElement.dataset.originalWidth = nextElement.offsetWidth;
				nextElement.dataset.originalX = nextElement.getBoundingClientRect().left + window.scrollX;
			}

		}

		if ( ( options.direction == 'y' || options.direction == 'both' ) && !options.snapToGrid ) {
			el.style.minHeight = options.minHeight + 'px';
			el.style.maxHeight = options.maxHeight + 'px';
			el.dataset.originalHeight = el.offsetHeight - 1;
			el.dataset.originalY = e.pageY;
		}

		document.documentElement.addEventListener( 'mousemove', doDrag, false );
		document.documentElement.addEventListener( 'mouseup', stopDrag, false );

		return true;

	}

	/**
	 * Do drag while mouse is moving
	 *
	 * @param {event}    e
	 * @returns {boolean}
	 */
	function doDrag( e ) {


		var el = document.querySelector( '.resize-dragging' ),
			returnObject = {};

		if ( options.direction == 'x' || options.direction == 'both' ) {
			var newWidth = e.pageX - el.dataset.originalX;
			if ( newWidth >= options.minWidth
				&& newWidth <= options.maxWidth
				&& e.pageX < document.documentElement.offsetWidth - options.minWidth ) {

				if ( options.snapToGrid ) {
					var nextElement = findNextSibling( el );
					var nextElementNewWidth = parseInt( nextElement.dataset.originalWidth ) + parseInt( el.dataset.originalWidth ) - newWidth;
					if ( nextElementNewWidth >= options.minWidth
						&& nextElementNewWidth <= options.maxWidth ) {

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

		if ( (options.direction == 'y' || options.direction == 'both') && !options.snapToGrid ) {
			var newHeight = e.pageY - el.dataset.originalY;
			el.style.height = el.dataset.originalHeight*1 + newHeight*1 + 'px';
			returnObject.height = el.style.height;
		}

		options.onDrag( el, returnObject );
		return true;

	}

	/**
	 * find next sibling column
	 *
	 * @param {object}    el DOM element
	 * @returns {object | null}
	 */
	function findNextSibling( el ) {

		var nextElement = el;
		while ( nextElement.nextSibling
		&& ( !nextElement.nextSibling.classList
		|| !nextElement.nextSibling.classList.contains( options.selector ) ) ) {
			nextElement = nextElement.nextSibling;
			break;
		}
		return nextElement.nextSibling;

	}

	/**
	 * Stop dragging after mouseup
	 *
	 * @param {event}    e
	 * @returns {boolean}
	 */
	function stopDrag( e ) {

		var el = document.querySelector( '.resize-dragging' ),
			returnObject = {};

		el.classList.remove( 'resize-dragging' );
		document.body.classList.remove( 'grid-resizer-noselect' );

		document.documentElement.removeEventListener( 'mousemove', doDrag, false );
		document.documentElement.removeEventListener( 'mouseup', stopDrag, false );

		if ( true == options.snapToGrid ) {
			returnObject.grid = updateGrid( el );
		}

		if ( options.direction == 'x' || options.direction == 'both' ) {
			el.removeAttribute( 'data-original-width' );
			el.removeAttribute( 'data-original-x' );
			if ( options.snapToGrid ) {
				nextElement = findNextSibling( el );
				nextElement.removeAttribute( 'data-original-width' );
				nextElement.removeAttribute( 'data-original-x' );
			}
			returnObject.width = el.style.width;

		}

		if ( ( options.direction == 'y' || options.direction == 'both' ) && !options.snapToGrid ) {
			el.removeAttribute( 'data-original-height' );
			el.removeAttribute( 'data-original-y' );
			returnObject.height = el.style.height;
		}

		options.onStop( returnObject );
		return true;

	}

	/**
	 * if snapToGrid was true, it finds the closest column width and set that class to the element
	 *
	 * @param {object}    el    DOM element
	 * @returns {boolean}
	 */
	function updateGrid( el ) {

		var nextElement = findNextSibling( el ),
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

		var regex = new RegExp( "(?:^|.)" + options.gridPrefix + "-([0-9]+)(?!\S)", "ig" );

		el.className = el.className.replace( regex, ' ' + options.gridPrefix + "-" + elColumnWidth + ' ' );
		nextElement.className = nextElement.className.replace( regex, ' ' + options.gridPrefix + "-" + nextElementColumnWidth + ' ' );

		return {
			currentColumnWidth  : elColumnWidth,
			nextColumnWidth     : nextElementColumnWidth
		};

	}

	window.gridResizer = gridResizer;
})();
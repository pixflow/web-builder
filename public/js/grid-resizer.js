
/**
 * gridResizer is a column resize tool which support grids and flexbox
 *
 * URL: http://pixflow.net
 * License: MIT
 */
(function(){

	var options = {};

	/**
	 * initial function of gridResizer
	 *
	 * @param	{object}	option	initialize options
	 * @returns	{array}	DOM elements which are resizable
	 */
	function gridResizer( option ) {

		var defaultOptions = {
			selector	: ".grid-resizable",
			min			: 0,
			max			: 5000,
			snapToGrid	: false,
			gridPrefix	: 'col-md'
		};

		for( i in defaultOptions ){
			options[ i ] = option[ i ] || defaultOptions[ i ];
		}

		var els = document.querySelectorAll(options.selector);

		if ( null == els ) {
			return false;
		}

		init( els );

		return els;

	}

	/**
	 * find elements which should be resizable then add handler to them
	 *
	 * @param	{array}	els		DOM elements selected by selector
	 * @returns	{array}	DOM elements which are resizable
	 */
	function init( els ){

		for ( var i = 0; i < els.length; i++ ) {

			var el = els[ i ];
			if( isLastElement( el ) ){
				continue;
			}
			checkPaddingsToPreventLineBreaks( el );
			createHandlers( el );

		}
		return els;

	}

	/**
	 * Min width of columns shouldn't be lower that their padding
	 *
	 * @param {object}	el	DOM element
	 * @returns {boolean}
	 */
	function checkPaddingsToPreventLineBreaks( el ){

		var oldWidth = el.style.width;
		var oldMaxWidth = el.style.maxWidth;
		var oldFlexBasis = el.style.flexBasis;
		el.style.width = '0px';
		el.style.maxWidth = '0px';
		el.style.flexBasis = '0px';
		if( el.offsetWidth > options.min ){
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
	 * @param {object}	el	DOM element
	 * @returns {boolean}
	 */
	function createHandlers( el ){

		var handler = document.createElement('div');
		handler.style.position = "absolute";
		handler.style.top = "0";
		handler.style.right = "0";
		handler.style.height = "100%";
		handler.style.width = "5px";
		handler.style.cursor = "col-resize";
		handler.setAttribute('class','resize-handler');

		el.appendChild(handler);
		handler.addEventListener('mousedown', initDrag, false);

		return true;
	}

	/**
	 * returns true if a column is the last column in a row
	 *
	 * @param {object}	el	DOM element
	 * @returns {boolean}
	 */
	function isLastElement( el ){

		nextElement = findNextSibling( el );
		if( ! nextElement ){
			return true;
		}
		return false;

	}

	/**
	 * Start Dragging
	 *
	 * @param {event}	e
	 * @returns {boolean}
	 */
	function initDrag( e ) {

		var el = this.parentNode,
			nextElement = findNextSibling( el );

		el.classList.add('resize-dragging');
		document.body.classList.add('grid-resizer-noselect');

		el.dataset.originalWidth = el.offsetWidth - 1;
		el.dataset.originalX = el.offsetLeft;

		nextElement.dataset.originalWidth = nextElement.offsetWidth;
		nextElement.dataset.originalX = nextElement.offsetLeft;

		document.documentElement.addEventListener('mousemove', doDrag, false);
		document.documentElement.addEventListener('mouseup', stopDrag, false);

		return true;

	}

	/**
	 * Do drag while mouse is moving
	 *
	 * @param {event}	e
	 * @returns {boolean}
	 */
	function doDrag( e ) {

		var el = document.querySelector( '.resize-dragging' );
		var newWidth = e.pageX - el.dataset.originalX;
		if ( newWidth >= options.min
			&& newWidth <= options.max
			&& e.pageX < document.documentElement.offsetWidth - options.min ) {

			var nextElement = findNextSibling( el );
			var nextElementNewWidth = parseInt( nextElement.dataset.originalWidth ) + parseInt( el.dataset.originalWidth ) - newWidth ;
			if( nextElementNewWidth >= options.min
				&& nextElementNewWidth <= options.max ) {

				nextElementWidth = nextElementNewWidth;
				nextElement.style.width = nextElementWidth + 'px';
				nextElement.style.maxWidth = nextElementWidth + 'px';
				nextElement.style.flexBasis = nextElementWidth + 'px';

				el.style.width = newWidth + 'px';
				el.style.maxWidth = newWidth + 'px';
				el.style.flexBasis = newWidth + 'px';

			}

		}

		return true;

	}

	/**
	 * find next sibling column
	 *
	 * @param {object}	el DOM element
	 * @returns {object | null}
	 */
	function findNextSibling( el ){

		var nextElement = el;
		while( nextElement.nextSibling
		&& ( ! nextElement.nextSibling.classList
		|| ! nextElement.nextSibling.classList.contains( options.selector ) ) ) {
			nextElement = nextElement.nextSibling;
			break;
		}
		return nextElement.nextSibling;

	}

	/**
	 * Stop dragging after mouseup
	 *
	 * @param {event}	e
	 * @returns {boolean}
	 */
	function stopDrag( e ) {

		var el = document.querySelector( '.resize-dragging' ),
			nextElement = findNextSibling( el );

		el.classList.remove('resize-dragging');
		document.body.classList.remove('grid-resizer-noselect');

		document.documentElement.removeEventListener('mousemove', doDrag, false);
		document.documentElement.removeEventListener('mouseup', stopDrag, false);

		if (true == options.snapToGrid) {
			updateGrid(el);
		}

		el.removeAttribute('data-original-width');
		el.removeAttribute('data-original-x');
		nextElement.removeAttribute('data-original-width');
		nextElement.removeAttribute('data-original-x');

		return true;

	}

	/**
	 * if snapToGrid was true, it finds the closest column width and set that class to the element
	 *
	 * @param {object}	el	DOM element
	 * @returns {boolean}
	 */
	function updateGrid(el) {

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

		if( 0 === elColumnWidth ){
			elColumnWidth = 1;
			nextElementColumnWidth--;
		}

		if( 0 === nextElementColumnWidth ){
			nextElementColumnWidth = 1;
			elColumnWidth--;
		}

		var regex = new RegExp("(?:^|.)" + options.gridPrefix + "-([0-9]+)(?!\S)", "ig");

		el.className = el.className.replace( regex, ' '+ options.gridPrefix + "-" + elColumnWidth + ' ' );
		nextElement.className = nextElement.className.replace( regex, ' '+ options.gridPrefix + "-" + nextElementColumnWidth + ' ' );

		return true;

	}
	window.gridResizer = gridResizer;
})();
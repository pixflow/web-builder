/*
 * transform: A jQuery cssHooks adding cross-browser 2d transform capabilities to $.fn.css() and $.fn.animate()
 *
 * limitations:
 * - requires jQuery 1.4.3+
 * - Should you use the *translate* property, then your elements need to be absolutely positionned in a relatively positionned wrapper **or it will fail in IE678**.
 * - transformOrigin is not accessible
 *
 * latest version and complete README available on Github:
 * https://github.com/louisremi/jquery.transform.js
 *
 * Copyright 2011 @louis_remi
 * Licensed under the MIT license.
 *
 * This saved you an hour of work?
 * Send me music http://www.amazon.co.uk/wishlist/HNTU0468LQON
 *
 */
(function( $, window, document, Math, undefined ) {

	/*
	 * Feature tests and global variables
	 */
	var div = document.createElement("div"),
		divStyle = div.style,
		suffix = "Transform",
		testProperties = [
			"O" + suffix,
			"ms" + suffix,
			"Webkit" + suffix,
			"Moz" + suffix
		],
		i = testProperties.length,
		supportProperty,
		supportMatrixFilter,
		supportFloat32Array = "Float32Array" in window,
		propertyHook,
		propertyGet,
		rMatrix = /Matrix([^)]*)/,
		rAffine = /^\s*matrix\(\s*1\s*,\s*0\s*,\s*0\s*,\s*1\s*(?:,\s*0(?:px)?\s*){2}\)\s*$/,
		_transform = "transform",
		_transformOrigin = "transformOrigin",
		_translate = "translate",
		_rotate = "rotate",
		_scale = "scale",
		_skew = "skew",
		_matrix = "matrix";

// test different vendor prefixes of these properties
	while ( i-- ) {
		if ( testProperties[i] in divStyle ) {
			$.support[_transform] = supportProperty = testProperties[i];
			$.support[_transformOrigin] = supportProperty + "Origin";
			continue;
		}
	}
// IE678 alternative
	if ( !supportProperty ) {
		$.support.matrixFilter = supportMatrixFilter = divStyle.filter === "";
	}

// px isn't the default unit of these properties
	$.cssNumber[_transform] = $.cssNumber[_transformOrigin] = true;

	/*
	 * fn.css() hooks
	 */
	if ( supportProperty && supportProperty != _transform ) {
		// Modern browsers can use jQuery.cssProps as a basic hook
		$.cssProps[_transform] = supportProperty;
		$.cssProps[_transformOrigin] = supportProperty + "Origin";

		// Firefox needs a complete hook because it stuffs matrix with "px"
		if ( supportProperty == "Moz" + suffix ) {
			propertyHook = {
				get: function( elem, computed ) {
					return (computed ?
							// remove "px" from the computed matrix
							$.css( elem, supportProperty ).split("px").join(""):
							elem.style[supportProperty]
					);
				},
				set: function( elem, value ) {
					// add "px" to matrices
					elem.style[supportProperty] = /matrix\([^)p]*\)/.test(value) ?
						value.replace(/matrix((?:[^,]*,){4})([^,]*),([^)]*)/, _matrix+"$1$2px,$3px"):
						value;
				}
			};
			/* Fix two jQuery bugs still present in 1.5.1
			 * - rupper is incompatible with IE9, see http://jqbug.com/8346
			 * - jQuery.css is not really jQuery.cssProps aware, see http://jqbug.com/8402
			 */
		} else if ( /^1\.[0-5](?:\.|$)/.test($.fn.jquery) ) {
			propertyHook = {
				get: function( elem, computed ) {
					return (computed ?
							$.css( elem, supportProperty.replace(/^ms/, "Ms") ):
							elem.style[supportProperty]
					);
				}
			};
		}
		/* TODO: leverage hardware acceleration of 3d transform in Webkit only
		 else if ( supportProperty == "Webkit" + suffix && support3dTransform ) {
		 propertyHook = {
		 set: function( elem, value ) {
		 elem.style[supportProperty] =
		 value.replace();
		 }
		 }
		 }*/

	} else if ( supportMatrixFilter ) {
		propertyHook = {
			get: function( elem, computed, asArray ) {
				var elemStyle = ( computed && elem.currentStyle ? elem.currentStyle : elem.style ),
					matrix, data;

				if ( elemStyle && rMatrix.test( elemStyle.filter ) ) {
					matrix = RegExp.$1.split(",");
					matrix = [
						matrix[0].split("=")[1],
						matrix[2].split("=")[1],
						matrix[1].split("=")[1],
						matrix[3].split("=")[1]
					];
				} else {
					matrix = [1,0,0,1];
				}

				if ( ! $.cssHooks[_transformOrigin] ) {
					matrix[4] = elemStyle ? parseInt(elemStyle.left, 10) || 0 : 0;
					matrix[5] = elemStyle ? parseInt(elemStyle.top, 10) || 0 : 0;

				} else {
					data = $._data( elem, "transformTranslate", undefined );
					matrix[4] = data ? data[0] : 0;
					matrix[5] = data ? data[1] : 0;
				}

				return asArray ? matrix : _matrix+"(" + matrix + ")";
			},
			set: function( elem, value, animate ) {
				var elemStyle = elem.style,
					currentStyle,
					Matrix,
					filter,
					centerOrigin;

				if ( !animate ) {
					elemStyle.zoom = 1;
				}

				value = matrix(value);

				// rotate, scale and skew
				Matrix = [
					"Matrix("+
					"M11="+value[0],
					"M12="+value[2],
					"M21="+value[1],
					"M22="+value[3],
					"SizingMethod='auto expand'"
				].join();
				filter = ( currentStyle = elem.currentStyle ) && currentStyle.filter || elemStyle.filter || "";

				elemStyle.filter = rMatrix.test(filter) ?
					filter.replace(rMatrix, Matrix) :
					filter + " progid:DXImageTransform.Microsoft." + Matrix + ")";

				if ( ! $.cssHooks[_transformOrigin] ) {

					// center the transform origin, from pbakaus's Transformie http://github.com/pbakaus/transformie
					if ( (centerOrigin = $.transform.centerOrigin) ) {
						elemStyle[centerOrigin == "margin" ? "marginLeft" : "left"] = -(elem.offsetWidth/2) + (elem.clientWidth/2) + "px";
						elemStyle[centerOrigin == "margin" ? "marginTop" : "top"] = -(elem.offsetHeight/2) + (elem.clientHeight/2) + "px";
					}

					// translate
					// We assume that the elements are absolute positionned inside a relative positionned wrapper
					elemStyle.left = value[4] + "px";
					elemStyle.top = value[5] + "px";

				} else {
					$.cssHooks[_transformOrigin].set( elem, value );
				}
			}
		};
	}
// populate jQuery.cssHooks with the appropriate hook if necessary
	if ( propertyHook ) {
		$.cssHooks[_transform] = propertyHook;
	}
// we need a unique setter for the animation logic
	propertyGet = propertyHook && propertyHook.get || $.css;

	/*
	 * fn.animate() hooks
	 */
	$.fx.step.transform = function( fx ) {
		var elem = fx.elem,
			start = fx.start,
			end = fx.end,
			pos = fx.pos,
			transform = "",
			precision = 1E5,
			i, startVal, endVal, unit;

		// fx.end and fx.start need to be converted to interpolation lists
		if ( !start || typeof start === "string" ) {

			// the following block can be commented out with jQuery 1.5.1+, see #7912
			if ( !start ) {
				start = propertyGet( elem, supportProperty );
			}

			// force layout only once per animation
			if ( supportMatrixFilter ) {
				elem.style.zoom = 1;
			}

			// replace "+=" in relative animations (-= is meaningless with transforms)
			end = end.split("+=").join(start);

			// parse both transform to generate interpolation list of same length
			$.extend( fx, interpolationList( start, end ) );
			start = fx.start;
			end = fx.end;
		}

		i = start.length;

		// interpolate functions of the list one by one
		while ( i-- ) {
			startVal = start[i];
			endVal = end[i];
			unit = +false;

			switch ( startVal[0] ) {

				case _translate:
					unit = "px";
				case _scale:
					unit || ( unit = "");

					transform = startVal[0] + "(" +
						Math.round( (startVal[1][0] + (endVal[1][0] - startVal[1][0]) * pos) * precision ) / precision + unit +","+
						Math.round( (startVal[1][1] + (endVal[1][1] - startVal[1][1]) * pos) * precision ) / precision + unit + ")"+
						transform;
					break;

				case _skew + "X":
				case _skew + "Y":
				case _rotate:
					transform = startVal[0] + "(" +
						Math.round( (startVal[1] + (endVal[1] - startVal[1]) * pos) * precision ) / precision +"rad)"+
						transform;
					break;
			}
		}

		fx.origin && ( transform = fx.origin + transform );

		propertyHook && propertyHook.set ?
			propertyHook.set( elem, transform, +true ):
			elem.style[supportProperty] = transform;
	};

	/*
	 * Utility functions
	 */

// turns a transform string into its "matrix(A,B,C,D,X,Y)" form (as an array, though)
	function matrix( transform ) {
		transform = transform.split(")");
		var
			trim = $.trim
			, i = -1
			// last element of the array is an empty string, get rid of it
			, l = transform.length -1
			, split, prop, val
			, prev = supportFloat32Array ? new Float32Array(6) : []
			, curr = supportFloat32Array ? new Float32Array(6) : []
			, rslt = supportFloat32Array ? new Float32Array(6) : [1,0,0,1,0,0]
		;

		prev[0] = prev[3] = rslt[0] = rslt[3] = 1;
		prev[1] = prev[2] = prev[4] = prev[5] = 0;

		// Loop through the transform properties, parse and multiply them
		while ( ++i < l ) {
			split = transform[i].split("(");
			prop = trim(split[0]);
			val = split[1];
			curr[0] = curr[3] = 1;
			curr[1] = curr[2] = curr[4] = curr[5] = 0;

			switch (prop) {
				case _translate+"X":
					curr[4] = parseInt(val, 10);
					break;

				case _translate+"Y":
					curr[5] = parseInt(val, 10);
					break;

				case _translate:
					val = val.split(",");
					curr[4] = parseInt(val[0], 10);
					curr[5] = parseInt(val[1] || 0, 10);
					break;

				case _rotate:
					val = toRadian(val);
					curr[0] = Math.cos(val);
					curr[1] = Math.sin(val);
					curr[2] = -Math.sin(val);
					curr[3] = Math.cos(val);
					break;

				case _scale+"X":
					curr[0] = +val;
					break;

				case _scale+"Y":
					curr[3] = val;
					break;

				case _scale:
					val = val.split(",");
					curr[0] = val[0];
					curr[3] = val.length>1 ? val[1] : val[0];
					break;

				case _skew+"X":
					curr[2] = Math.tan(toRadian(val));
					break;

				case _skew+"Y":
					curr[1] = Math.tan(toRadian(val));
					break;

				case _matrix:
					val = val.split(",");
					curr[0] = val[0];
					curr[1] = val[1];
					curr[2] = val[2];
					curr[3] = val[3];
					curr[4] = parseInt(val[4], 10);
					curr[5] = parseInt(val[5], 10);
					break;
			}

			// Matrix product (array in column-major order)
			rslt[0] = prev[0] * curr[0] + prev[2] * curr[1];
			rslt[1] = prev[1] * curr[0] + prev[3] * curr[1];
			rslt[2] = prev[0] * curr[2] + prev[2] * curr[3];
			rslt[3] = prev[1] * curr[2] + prev[3] * curr[3];
			rslt[4] = prev[0] * curr[4] + prev[2] * curr[5] + prev[4];
			rslt[5] = prev[1] * curr[4] + prev[3] * curr[5] + prev[5];

			prev = [rslt[0],rslt[1],rslt[2],rslt[3],rslt[4],rslt[5]];
		}
		return rslt;
	}

// turns a matrix into its rotate, scale and skew components
// algorithm from http://hg.mozilla.org/mozilla-central/file/7cb3e9795d04/layout/style/nsStyleAnimation.cpp
	function unmatrix(matrix) {
		var
			scaleX
			, scaleY
			, skew
			, A = matrix[0]
			, B = matrix[1]
			, C = matrix[2]
			, D = matrix[3]
		;

		// Make sure matrix is not singular
		if ( A * D - B * C ) {
			// step (3)
			scaleX = Math.sqrt( A * A + B * B );
			A /= scaleX;
			B /= scaleX;
			// step (4)
			skew = A * C + B * D;
			C -= A * skew;
			D -= B * skew;
			// step (5)
			scaleY = Math.sqrt( C * C + D * D );
			C /= scaleY;
			D /= scaleY;
			skew /= scaleY;
			// step (6)
			if ( A * D < B * C ) {
				A = -A;
				B = -B;
				skew = -skew;
				scaleX = -scaleX;
			}

			// matrix is singular and cannot be interpolated
		} else {
			// In this case the elem shouldn't be rendered, hence scale == 0
			scaleX = scaleY = skew = 0;
		}

		// The recomposition order is very important
		// see http://hg.mozilla.org/mozilla-central/file/7cb3e9795d04/layout/style/nsStyleAnimation.cpp#l971
		return [
			[_translate, [+matrix[4], +matrix[5]]],
			[_rotate, Math.atan2(B, A)],
			[_skew + "X", Math.atan(skew)],
			[_scale, [scaleX, scaleY]]
		];
	}

// build the list of transform functions to interpolate
// use the algorithm described at http://dev.w3.org/csswg/css3-2d-transforms/#animation
	function interpolationList( start, end ) {
		var list = {
				start: [],
				end: []
			},
			i = -1, l,
			currStart, currEnd, currType;

		// get rid of affine transform matrix
		( start == "none" || isAffine( start ) ) && ( start = "" );
		( end == "none" || isAffine( end ) ) && ( end = "" );

		// if end starts with the current computed style, this is a relative animation
		// store computed style as the origin, remove it from start and end
		if ( start && end && !end.indexOf("matrix") && toArray( start ).join() == toArray( end.split(")")[0] ).join() ) {
			list.origin = start;
			start = "";
			end = end.slice( end.indexOf(")") +1 );
		}

		if ( !start && !end ) { return; }

		// start or end are affine, or list of transform functions are identical
		// => functions will be interpolated individually
		if ( !start || !end || functionList(start) == functionList(end) ) {

			start && ( start = start.split(")") ) && ( l = start.length );
			end && ( end = end.split(")") ) && ( l = end.length );

			while ( ++i < l-1 ) {
				start[i] && ( currStart = start[i].split("(") );
				end[i] && ( currEnd = end[i].split("(") );
				currType = $.trim( ( currStart || currEnd )[0] );

				append( list.start, parseFunction( currType, currStart ? currStart[1] : 0 ) );
				append( list.end, parseFunction( currType, currEnd ? currEnd[1] : 0 ) );
			}

			// otherwise, functions will be composed to a single matrix
		} else {
			list.start = unmatrix(matrix(start));
			list.end = unmatrix(matrix(end))
		}

		return list;
	}

	function parseFunction( type, value ) {
		var
			// default value is 1 for scale, 0 otherwise
			defaultValue = +(!type.indexOf(_scale)),
			scaleX,
			// remove X/Y from scaleX/Y & translateX/Y, not from skew
			cat = type.replace( /e[XY]/, "e" );

		switch ( type ) {
			case _translate+"Y":
			case _scale+"Y":

				value = [
					defaultValue,
					value ?
						parseFloat( value ):
						defaultValue
				];
				break;

			case _translate+"X":
			case _translate:
			case _scale+"X":
				scaleX = 1;
			case _scale:

				value = value ?
					( value = value.split(",") ) &&	[
						parseFloat( value[0] ),
						parseFloat( value.length>1 ? value[1] : type == _scale ? scaleX || value[0] : defaultValue+"" )
					]:
					[defaultValue, defaultValue];
				break;

			case _skew+"X":
			case _skew+"Y":
			case _rotate:
				value = value ? toRadian( value ) : 0;
				break;

			case _matrix:
				return unmatrix( value ? toArray(value) : [1,0,0,1,0,0] );
				break;
		}

		return [[ cat, value ]];
	}

	function isAffine( matrix ) {
		return rAffine.test(matrix);
	}

	function functionList( transform ) {
		return transform.replace(/(?:\([^)]*\))|\s/g, "");
	}

	function append( arr1, arr2, value ) {
		while ( value = arr2.shift() ) {
			arr1.push( value );
		}
	}

// converts an angle string in any unit to a radian Float
	function toRadian(value) {
		return ~value.indexOf("deg") ?
			parseInt(value,10) * (Math.PI * 2 / 360):
			~value.indexOf("grad") ?
				parseInt(value,10) * (Math.PI/200):
				parseFloat(value);
	}

// Converts "matrix(A,B,C,D,X,Y)" to [A,B,C,D,X,Y]
	function toArray(matrix) {
		// remove the unit of X and Y for Firefox
		matrix = /([^,]*),([^,]*),([^,]*),([^,]*),([^,p]*)(?:px)?,([^)p]*)(?:px)?/.exec(matrix);
		return [matrix[1], matrix[2], matrix[3], matrix[4], matrix[5], matrix[6]];
	}

	$.transform = {
		centerOrigin: "margin"
	};

})( jQuery, window, document, Math );
/*

 Quicksand 1.6.0

 Reorder and filter items with a nice shuffling animation.

 Copyright (c) 2010 Jacek Galanciak (razorjack.net)
 Big thanks for Piotr Petrus (riddle.pl) for deep code review and wonderful docs & demos.

 Dual licensed under the MIT and GPL version 2 licenses.
 https://raw.githubusercontent.com/razorjack/quicksand/master/MIT-LICENSE.txt
 https://raw.githubusercontent.com/razorjack/quicksand/master/GPL-LICENSE.txt

 Project site: https://razorjack.net/quicksand
 Github site: https://github.com/razorjack/quicksand

 */

// Uses CommonJS, AMD or browser globals to create a jQuery plugin.
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['jquery'], factory);
	} else if (typeof module === 'object' && module.exports) {
		// Node/CommonJS
		module.exports = function( root, jQuery ) {
			if ( jQuery === undefined ) {
				// require('jQuery') returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				if ( typeof window !== 'undefined' ) {
					jQuery = require('jquery');
				}
				else {
					jQuery = require('jquery')(root);
				}
			}
			factory(jQuery);
			return jQuery;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
	var cloneWithCanvases = function(jqueryObject) {
		var clonedJqueryObject =  jqueryObject.clone(true, true);
		var canvases = jqueryObject.find('canvas');
		if (canvases.length) {
			var clonedCanvases = clonedJqueryObject.find('canvas');
			clonedCanvases.each(function(index) {
				var context = this.getContext('2d');
				context.drawImage(canvases.get(index), 0, 0);
			});
		}
		return clonedJqueryObject;
	};

	$.fn.quicksand = function(collection, customOptions) {
		var options = {
			duration : 750,
			easing : 'swing',
			attribute : 'data-id',        // attribute to recognize same items within source and dest
			adjustHeight : 'call',        // 'dynamic' animates height during shuffling (slow), 'call' adjusts it
										  // before or after the animation, false leaves height alone, 'auto' sets it to auto
			adjustWidth : false,          // 'dynamic' animates width during shuffling (slow),
										  // 'call' adjusts it before or after the animation, false leaves the width alone, 'auto' sets it to auto
			useScaling : false,           // enable it if you're using scaling effect
			enhancement : function(c) {}, // Visual enhacement (eg. font replacement) function for cloned elements
			selector : '> *',
			atomic : false,
			dx : 0,
			dy : 0,
			maxWidth : 0,
			retainExisting : true         // disable if you want the collection of items to be replaced completely by incoming items.
		};

		$.extend(options, customOptions);

		if ((typeof ($.transform) == 'undefined')) {
			options.useScaling = false;
		}

		var callbackFunction;
		if (typeof (arguments[1]) == 'function') {
			callbackFunction = arguments[1];
		} else if (typeof (arguments[2] == 'function')) {
			callbackFunction = arguments[2];
		}

		var that = this;
		return this.each(function(i) {
			var val;
			var animationQueue = []; // used to store all the animation params before starting the animation;
			// solves initial animation slowdowns
			var $collection;
			if (typeof(options.attribute) == 'function') {
				$collection = $(collection);
			} else {
				$collection = cloneWithCanvases($(collection).filter('[' + options.attribute + ']')); // destination (target) collection
			}
			var $sourceParent = $(this); // source, the visible container of source collection
			var sourceHeight = $(this).css('height'); // used to keep height and document flow during the animation
			var sourceWidth = $(this).css('width'); // used to keep  width and document flow during the animation
			var destHeight, destWidth;
			var adjustHeightOnCallback = false;
			var adjustWidthOnCallback = false;
			var offset = $($sourceParent).offset(); // offset of visible container, used in animation calculations
			var offsets = []; // coordinates of every source collection item
			var $source = $(this).find(options.selector); // source collection items
			var width = $($source).innerWidth(); // need for the responsive design

			// Replace the collection and quit if IE6
			if (navigator.userAgent.match(/msie [6]/i)) {
				$sourceParent.html('').append($collection);
				return;
			}

			// Gets called when any animation is finished
			var postCallbackPerformed = 0; // prevents the function from being called more than one time
			var postCallback = function() {
				$(this).css('margin', '').css('position', '').css('top', '').css('left', '').css('opacity', '');
				if (!postCallbackPerformed) {
					postCallbackPerformed = 1;

					if (!options.atomic) {
						// hack: used to be: $sourceParent.html($dest.html());
						// put target HTML into visible source container
						// but new webkit builds cause flickering when replacing the collections
						var $toDelete = $sourceParent.find(options.selector);
						if (!options.retainExisting) {
							$sourceParent.prepend($dest.find(options.selector));
							$toDelete.remove();
						} else {
							// Avoid replacing elements because we may have already altered items in significant
							// ways and it would be bad to have to do it again. (i.e. lazy load images)
							// But $dest holds the correct ordering. So we must re-sequence items in $sourceParent to match.
							var $keepElements = $([]);
							$dest.find(options.selector).each(function(i) {
								var $matchedElement = $([]);
								if (typeof (options.attribute) == 'function') {
									var val = options.attribute($(this));
									$toDelete.each(function() {
										if (options.attribute(this) == val) {
											$matchedElement = $(this);
											return false;
										}
									});
								} else {
									$matchedElement = $toDelete.filter(
										'[' + options.attribute + '="'+
										$(this).attr(options.attribute) + '"]');
								}
								if ($matchedElement.length > 0) {
									// There is a matching element in the $toDelete list and in $dest
									// list, so make sure it is in the right location within $sourceParent
									// and put it in the list of elements we need to not delete.
									$keepElements = $keepElements.add($matchedElement);
									if (i === 0) {
										$sourceParent.prepend($matchedElement);
									} else {
										$matchedElement.insertAfter($sourceParent.find(options.selector).get(i - 1));
									}
								}
							});
							// Remove whatever is remaining from the DOM
							$toDelete.not($keepElements).remove();
						}

						if (adjustHeightOnCallback) {
							$sourceParent.css('height', destHeight);
						}
						if (adjustWidthOnCallback) {
							$sourceParent.css('width', sourceWidth);
						}
					}
					options.enhancement($sourceParent); // Perform custom visual enhancements on a newly replaced collection
					if (typeof callbackFunction == 'function') {
						callbackFunction.call(that);
					}
				}

				if ('auto' === options.adjustHeight) {
					$sourceParent.css('height', 'auto');
				}

				if ('auto' === options.adjustWidth) {
					$sourceParent.css('width', 'auto');
				}
			};

			// Position: relative situations
			var $correctionParent = $sourceParent.offsetParent();
			var correctionOffset = $correctionParent.offset();
			if ($correctionParent.css('position') == 'relative') {
				if ($correctionParent.get(0).nodeName.toLowerCase() != 'body') {
					correctionOffset.top += (parseFloat($correctionParent.css('border-top-width')) || 0);
					correctionOffset.left += (parseFloat($correctionParent.css('border-left-width')) || 0);
				}
			} else {
				correctionOffset.top -= (parseFloat($correctionParent.css('border-top-width')) || 0);
				correctionOffset.left -= (parseFloat($correctionParent.css('border-left-width')) || 0);
				correctionOffset.top -= (parseFloat($correctionParent.css('margin-top')) || 0);
				correctionOffset.left -= (parseFloat($correctionParent.css('margin-left')) || 0);
			}

			// perform custom corrections from options (use when Quicksand fails to detect proper correction)
			if (isNaN(correctionOffset.left)) {
				correctionOffset.left = 0;
			}
			if (isNaN(correctionOffset.top)) {
				correctionOffset.top = 0;
			}

			correctionOffset.left -= options.dx;
			correctionOffset.top -= options.dy;

			// keeps nodes after source container, holding their position
			if (options.adjustHeight !== false) {
				$sourceParent.css('height', $(this).height());
			}
			if (options.adjustWidth !== false) {
				$sourceParent.css('width', $(this).width());
			}

			// get positions of source collections
			$source.each(function(i) {
				offsets[i] = $(this).offset();
			});

			// stops previous animations on source container
			$(this).stop();
			var dx = 0;
			var dy = 0;
			$source.each(function(i) {
				$(this).stop(); // stop animation of collection items
				var rawObj = $(this).get(0);
				if (rawObj.style.position == 'absolute') {
					dx = -options.dx;
					dy = -options.dy;
				} else {
					dx = options.dx;
					dy = options.dy;
				}

				rawObj.style.position = 'absolute';
				rawObj.style.margin = '0';

				if (!options.adjustWidth) {
					rawObj.style.width = (width + 'px'); // sets the width to the current element
					// with even if it has been changed
					// by a responsive design
				}

				rawObj.style.top = (offsets[i].top- parseFloat(rawObj.style.marginTop) - correctionOffset.top + dy) + 'px';
				rawObj.style.left = (offsets[i].left- parseFloat(rawObj.style.marginLeft) - correctionOffset.left + dx) + 'px';

				if (options.maxWidth > 0 && offsets[i].left > options.maxWidth) {
					rawObj.style.display = 'none';
				}
			});

			// create temporary container with destination collection
			var $dest = cloneWithCanvases($($sourceParent));
			var rawDest = $dest.get(0);
			rawDest.innerHTML = '';
			rawDest.setAttribute('id', '');
			rawDest.style.height = 'auto';
			rawDest.style.width = $sourceParent.width() + 'px';
			$dest.append($collection);
			// Inserts node into HTML. Note that the node is under visible source container in the exactly same position
			// The browser render all the items without showing them (opacity: 0.0) No offset calculations are needed,
			// the browser just extracts position from underlayered destination items and sets animation to destination positions.
			$dest.insertBefore($sourceParent);
			$dest.css('opacity', 0.0);
			rawDest.style.zIndex = -1;

			rawDest.style.margin = '0';
			rawDest.style.position = 'absolute';
			rawDest.style.top = offset.top - correctionOffset.top + 'px';
			rawDest.style.left = offset.left - correctionOffset.left + 'px';

			if (options.adjustHeight === 'dynamic') {
				// If destination container has different height than source container the height can be animated,
				// adjusting it to destination height
				$sourceParent.animate({ height : $dest.height() }, options.duration, options.easing);
			} else if (options.adjustHeight === 'call') {
				destHeight = $dest.height();
				if (parseFloat(sourceHeight) < parseFloat(destHeight)) {
					// Adjust the height now so that the items don't move out of the container
					$sourceParent.css('height', destHeight);
				} else {
					// Adjust later, on callback
					adjustHeightOnCallback = true;
				}
			}

			if (options.adjustWidth === 'dynamic') {
				// If destination container has different width than source container the width can be animated,
				// adjusting it to destination width
				$sourceParent.animate({ width : $dest.width() }, options.duration, options.easing);
			} else if (options.adjustWidth === 'call') {
				destWidth = $dest.width();
				if (parseFloat(sourceWidth) < parseFloat(destWidth)) {
					// Adjust the height now so that the items don't move out of the container
					$sourceParent.css('width', destWidth);
				} else {
					// Adjust later, on callback
					adjustWidthOnCallback = true;
				}
			}

			// Now it's time to do shuffling animation. First of all, we need to identify same elements within
			// source and destination collections
			$source.each(function(i) {
				var destElement = [];
				if (typeof (options.attribute) == 'function') {
					val = options.attribute($(this));
					$collection.each(function() {
						if (options.attribute(this) == val) {
							destElement = $(this);
							return false;
						}
					});
				} else {
					destElement = $collection.filter('[' + options.attribute + '="' + $(this).attr(options.attribute) + '"]');
				}
				if (destElement.length) {
					// The item is both in source and destination collections. It it's under different position, let's move it
					if (!options.useScaling) {
						animationQueue.push({
							element : $(this), dest : destElement,
							style : {
								top : $(this).offset().top,
								left : $(this).offset().left,
								opacity : ""
							},
							animation : {
								top : destElement.offset().top - correctionOffset.top,
								left : destElement.offset().left - correctionOffset.left,
								opacity : 1.0
							}
						});
					} else {
						animationQueue.push({
							element : $(this), dest : destElement,
							style : {
								top : $(this).offset().top,
								left : $(this).offset().left,
								opacity : ""
							},
							animation : {
								top : destElement.offset().top - correctionOffset.top,
								left : destElement.offset().left - correctionOffset.left,
								opacity : 1.0,
								transform : 'scale(1.0)'
							}
						});
					}
				} else {
					// The item from source collection is not present in destination collections.  Let's remove it
					if (!options.useScaling) {
						animationQueue.push({
							element : $(this),
							style : {
								top : $(this).offset().top,
								left : $(this).offset().left,
								opacity : ""
							},
							animation : {
								opacity : '0.0'
							}
						});
					} else {
						animationQueue.push({
							element : $(this),
							style : {
								top : $(this).offset().top,
								left : $(this).offset().left,
								opacity : ""
							},
							animation : {
								opacity : '0.0',
								transform : 'scale(0.0)'
							}
						});
					}
				}
			});

			$collection.each(function(i) {
				// Grab all items from target collection not present in visible source collection
				var sourceElement = [];
				var destElement = [];
				if (typeof (options.attribute) == 'function') {
					val = options.attribute($(this));
					$source.each(function() {
						if (options.attribute(this) == val) {
							sourceElement = $(this);
							return false;
						}
					});

					$collection.each(function() {
						if (options.attribute(this) == val) {
							destElement = $(this);
							return false;
						}
					});
				} else {
					sourceElement = $source.filter('[' + options.attribute + '="' + $(this).attr(options.attribute) + '"]');
					destElement = $collection.filter('[' + options.attribute + '="' + $(this).attr(options.attribute) + '"]');
				}

				var animationOptions;
				if (sourceElement.length === 0 && destElement.length > 0) {

					// No such element in source collection...
					if (!options.useScaling) {
						animationOptions = {opacity : '1.0'};
					} else {
						animationOptions = {opacity : '1.0', transform : 'scale(1.0)'};
					}

					// Let's create it
					var d = cloneWithCanvases(destElement);
					var rawDestElement = d.get(0);
					rawDestElement.style.position = 'absolute';
					rawDestElement.style.margin = '0';

					if (!options.adjustWidth) {
						// sets the width to the current element with even if it has been changed by a responsive design
						rawDestElement.style.width = width + 'px';
					}

					rawDestElement.style.top = destElement.offset().top - correctionOffset.top + 'px';
					rawDestElement.style.left = destElement.offset().left - correctionOffset.left + 'px';

					d.css('opacity', 0.0); // IE

					if (options.useScaling) {
						d.css("transform", "scale(0.0)");
					}
					d.appendTo($sourceParent);

					if (options.maxWidth === 0 || destElement.offset().left < options.maxWidth) {
						animationQueue.push({element : $(d), dest : destElement,animation : animationOptions});
					}
				}
			});

			$dest.remove();
			if (!options.atomic) {
				options.enhancement($sourceParent); // Perform custom visual enhancements during the animation
				for (i = 0; i < animationQueue.length; i++) {
					animationQueue[i].element.animate(animationQueue[i].animation, options.duration, options.easing, postCallback);
				}
			} else {
				$toDelete = $sourceParent.find(options.selector);
				$sourceParent.prepend($dest.find(options.selector));
				for (i = 0; i < animationQueue.length; i++) {
					if (animationQueue[i].dest && animationQueue[i].style) {
						var destElement = animationQueue[i].dest;
						var destOffset = destElement.offset();

						destElement.css({
							position : 'relative',
							top : (animationQueue[i].style.top - destOffset.top),
							left : (animationQueue[i].style.left - destOffset.left)
						});

						destElement.animate({top : "0", left : "0"},
							options.duration,
							options.easing,
							postCallback);
					} else {
						animationQueue[i].element.animate(animationQueue[i].animation,
							options.duration,
							options.easing,
							postCallback);
					}
				}
				$toDelete.remove();
			}
		});
	};
}));


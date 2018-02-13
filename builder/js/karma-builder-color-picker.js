/*
 * karmaColorPicker is a color picker plugin to load color popup and load spectrum color picker
 *
 *
 * Copyright 2018 @Pixflow
 * Licensed under the MIT license.
 *
 *
 */



/**
 * @summary karmaColorPicker manager
 * The resources that add karmaColorPicker to input
 *
 * @param {object}  options input css selector
 *
 * @since 0.1.0
 * @returns {void}
 */

var $ = jQuery,
karmaColorPicker = function ( options ) {

	this.options = {};
	this.defaultOptions = {
		selector            : ".karma-color-picker",
		color               : "#000000",
		opacity             : true,
		multiColor          : true,
		firstColorTitle     : 'Main',
		secondColorTitle    : 'Hover',
		presetColors        : [ '#FFFFFF', '#FEF445', '#FAC711', '#F24726', '#E6E6E6', '#CEE741', '#8FD14F', '#DA0263', '#808080', '#13CDD4', '#0DA789', '#652CB3', '#141414', '#2D9BF0', '#404BB2' ]
	};

	for ( var i in this.defaultOptions ) {
		if ( options.hasOwnProperty( i ) ) {
			this.options[ i ] = options[ i ];
		} else {
			this.options[ i ] = this.defaultOptions[ i ];
		}
	}

	this.mainInput = document.querySelector( this.options.selector + ' input.karma-colorpicker-main-color' );
	this.hoverInput = document.querySelector( this.options.selector + ' input.karma-colorpicker-second-color' );

	if ( this.mainInput == null || $( this.mainInput ).hasClass( 'karma-color-picker-input' ) ) {
		return;
	}

	this.mainInput.value = this.options.color;
	this.activeInput = this.mainInput;
	this.generateColorPickerID();
	this.init();

};

/**
 * @summary generate uniqueID for color picker
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.generateColorPickerID = function () {

	var found = true;
	do {
		var uniqueID = new Date().valueOf();
		if ( document.querySelector( '.color-picker-' + uniqueID ) == null ) {
			found = false;
		}
	} while ( found );
	this.id = uniqueID;

};


/**
 * @summary init color picker on input with passed selector
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.init = function () {

	var that = this;
	this.createColorPickerIcon();
	this.createColorPickerPopup();
	this.setMainInputEvent();
	this.chooseColorEvent();
	this.changeColorAction();
	var handler = that.openColorPicker.bind( that );
	jQuery( document.querySelector( this.selector ) ).on( 'click.karma-color-picker', handler );

};

/**
 * @summary create color circle icon to open color picker popup
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.createColorPickerIcon = function () {

	var that = this;
	// Create Icon
	var icon = document.createElement( 'div' );
	icon.setAttribute( 'class', 'karma-color-picker-icon' );
	icon.dataset.colorPickerId = this.id;
	this.icon = icon;
	// Add icon HTML to beside of input
	this.mainInput.classList.add( 'karma-color-picker-input' );
	if ( null != this.hoverInput ) {
		this.hoverInput.classList.add( 'karma-color-picker-input' );
	}
	icon.style.background = this.mainInput.value;
	this.mainInput.parentElement.insertBefore( icon, this.mainInput );
	icon.addEventListener( 'click', function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		that.openColorPicker( e );
	}, true );


};

/**
 * @summary create no color preset
 *
 * @since 0.1.1
 * @returns {void}
 */
karmaColorPicker.prototype.createNoColor = function ( presetColors ) {

	var noColor = document.createElement( 'span' );
	noColor.setAttribute( 'class', 'karma-color-picker-preset-color karma-no-color' );
	noColor.setAttribute( 'data-color', 'rgba(0,0,0,0)' );
	noColor.style.backgroundColor = 'rgba(0,0,0,0)';
	this.presetColorsEvent( noColor );
	presetColors.appendChild( noColor );

};

/**
 * @summary create color picker popup
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.createColorPickerPopup = function () {

	var that = this;
	// Create color picker container
	var popup = document.createElement( 'div' );
	popup.setAttribute( 'class', 'karma-color-picker-container' );
	popup.dataset.colorPickerId = this.id;
	if ( this.options.multiColor ) {
		// Create color mode container (main or hover)
		var colorMode = document.createElement( 'div' );
		colorMode.setAttribute( 'class', 'karma-color-picker-mode' );
		var firstColor = document.createElement( 'span' );
		firstColor.setAttribute( 'class', 'first-color active' );
		firstColor.setAttribute( 'data-action', 'main' );
		firstColor.innerText = this.options.firstColorTitle;
		colorMode.appendChild( firstColor );
		var secondColor = document.createElement( 'span' );
		secondColor.setAttribute( 'class', 'second-color' );
		secondColor.setAttribute( 'data-action', 'hover' );
		secondColor.innerText = this.options.secondColorTitle;
		colorMode.appendChild( secondColor );
		popup.appendChild( colorMode );
	}


	// Create preset colors
	var presetColors = document.createElement( 'div' );
	presetColors.setAttribute( 'class', 'karma-color-picker-preset-colors' );
	this.createNoColor( presetColors );
	for ( var i = 0; that.options.presetColors.length > i; i++ ) {
		var presetColor = document.createElement( 'span' );
		presetColor.setAttribute( 'class', 'karma-color-picker-preset-color' );
		presetColor.setAttribute( 'data-color', that.options.presetColors[ i ].toLowerCase() );
		presetColor.style.backgroundColor = that.options.presetColors[ i ];
		this.presetColorsEvent( presetColor );
		presetColors.appendChild( presetColor );
	}

	var chooseColor = document.createElement( 'span' );
	chooseColor.setAttribute( 'class', 'karma-color-picker-preset-color karma-color-picker-choose-color' );

	var chooseColorInput = document.createElement( 'input' );
	chooseColorInput.setAttribute( 'id', that.id );
	chooseColorInput.setAttribute( 'class', 'karma-color-picker-input' );
	chooseColor.appendChild( chooseColorInput );
	that.chooseColor = chooseColor;
	presetColors.appendChild( chooseColor );
	popup.addEventListener( 'click', function ( e ) {
		e.stopPropagation();
	} );
	popup.appendChild( presetColors );
	// Add popup HTML to body
	document.body.appendChild( popup );
	that.initSpectrumColorPicker();

};

/**
 * @summary apply preset colors events
 *
 * @param  {object} el element that need event to change color
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.presetColorsEvent = function ( el ) {

	var that = this;
	el.addEventListener( 'click', function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		if ( $( e.target ).hasClass( 'selected' ) || $( e.target ).hasClass( 'temp-pallet' ) ) {
			return false;
		} else {
			$( e.target ).siblings().removeClass( 'selected' );
			e.target.className += ' selected';
			that.updateMainColor( e.target.style.backgroundColor );
		}
	}, true );

};

/**
 * @summary change color action
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.changeColorAction = function () {

	var that = this,
		$ = jQuery;
	$( this.options.selector + " .karma-color-picker-mode span" ).off( "click.changeModes" ).on( "click.changeModes", function () {

		$( this ).siblings().removeClass( 'active' );
		$( this ).addClass( 'active' );

		if( $( this ).attr( 'data-action' ) == "hover" ){
			that.activeInput = that.hoverInput;
		}else{
			that.activeInput = that.mainInput;
		}

	} )
};

/**
 * @summary set main input value
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.setMainInputEvent = function () {

	var that = this,
	$ = jQuery;
	$( this.activeInput ).on( 'change', function () {
		that.icon.style.background = this.value;
	} );

	
};

/**
 * @summary set choose color event
 *
 * @since 0.1.0
 * @returns {boolean}
 */
karmaColorPicker.prototype.chooseColorEvent = function () {

	var that = this,
		$ = jQuery;

	$( that.chooseColor ).on( 'click', function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		var $spectrum = $( "#" + that.id );
		$spectrum.spectrum( "set", that.activeInput.value );
		$spectrum.spectrum( "show" );
		that.addColorToPallet( that.activeInput.value );
		return false;
	} );

};

/**
 * @summary add user color pallet
 *
 * @param {string} color     color of new pallet
 * @param {bool}   addClass  Add extra class
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.addColorToPallet = function ( color, addClass ) {

	var presetColor = document.createElement( 'span' );
	presetColor.setAttribute( 'class', 'karma-color-picker-preset-color user-pallet temp-pallet' );
	presetColor.setAttribute( 'data-color', color.toLowerCase() );
	if ( true === addClass ) {
		presetColor.classList.remove('temp-pallet');
	}
	presetColor.style.backgroundColor = color;
	this.presetColorsEvent( presetColor );
	this.chooseColor.parentElement.insertBefore( presetColor, this.chooseColor );

};

/**
 * @summary update main input value
 *
 * @param {string} newColor main color new value
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.updateMainColor = function ( newColor ) {

	var $ = jQuery;
	$( this.activeInput ).val( newColor )
			.change()
			.trigger( 'change/updateColor', [ newColor, $( this.activeInput ).hasClass('karma-colorpicker-second-color') ] );
	$( this.activeInput ).val( newColor ).change();
	if ( $( this.activeInput ).parents( '#karma-element-setting-panel-container' ).length ) {
		$( this.activeInput ).trigger( 'input' );
	}

};

/**
 * @summary Save colors into local storage
 *
 * @param {String} Color main color new value
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.saveColors = function ( color ) {

	if ( "undefined" !== typeof( Storage ) ) {
		var savedColors = ( null == localStorage.getItem( 'karmaColors' ) ) ? [] : JSON.parse( localStorage.getItem( 'karmaColors') );
		if( true === savedColors.includes( color ) || true === this.options.presetColors.includes( color.toUpperCase() ) ){
			return ;
		}
		if (  8 == savedColors.length ){
			savedColors.shift();
		}

		savedColors.push( color );
		localStorage.setItem( 'karmaColors', JSON.stringify( savedColors ) );
	}

};

/**
 * @summary change color of elements
 *
 * @param {String}  color   Color selected in color picker
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.onChangeColor = function ( color ) {

	var that = this;
	if ( null != document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .temp-pallet' ) ) {
		$( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .selected' ).removeClass( 'selected' );
		document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .temp-pallet' ).className += ' selected';
		$( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .temp-pallet' ).removeClass( 'temp-pallet' );
	}
	var selectedPallet = document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .selected' );
	selectedPallet.style.backgroundColor = color;
	selectedPallet.setAttribute( 'data-color', color );
	that.updateMainColor( color );

}

/**
 * @summary init spectrum color picker
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.initSpectrumColorPicker = function () {

	var that = this,
		$ = jQuery;
	$( "#" + this.id ).spectrum( {
		color: that.options.color,
		showAlpha: that.options.opacity,
		alphaVertical: true,
		preferredFormat: "hex",
		showInput: true,
		replacerClassName: 'spectrum-color-preview',
		move : function ( color ) {

			that.onChangeColor( color.toHexString() );

		},

		change: function( color ) {

			that.onChangeColor( color.toHexString() );

		},
		hide : function ( color ) {

			that.saveColors( color.toHexString() );

		},

	} );

	$( document ).off( "click.hideColorPickerContainer" ).on( "click.hideColorPickerContainer", function () {

		$( ".karma-color-picker-container" ).removeClass( 'karma-color-picker-opened' );
		var $spectrum = $( "#" + that.id );
		$spectrum.spectrum( "show" );
		$spectrum.spectrum( "hide" );

	} );

	$( ".karma-color-picker-container" ).off( "click.hideColorPicker" ).on( "click.hideColorPicker", function ( e ) {

		e.stopPropagation();
		$( '.temp-pallet' ).remove();
		var $spectrum =$( "#" + that.id );
		$spectrum.spectrum( "show" );
		$spectrum.spectrum( 'hide' );

	} );
};

/**
 * @summary Open Color Picker
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.openColorPicker = function ( e ) {

	e.preventDefault();
	var colorPickerContainer = document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + e.target.dataset.colorPickerId + '"]' ),
		that = this,
		$ = jQuery;
	if ( $( colorPickerContainer ).hasClass( 'karma-color-picker-opened' ) ) {
		$( colorPickerContainer ).removeClass( 'karma-color-picker-opened' );
		var $spectrum =$( "#" + that.id );
		$spectrum.spectrum( "show" );
		$spectrum.spectrum( "hide" );
	} else {
		if ( "undefined" !== typeof( Storage ) ) {
			$('.karma-color-picker-preset-color.user-pallet').remove();
			var savedColors = ( null == localStorage.getItem( 'karmaColors' ) ) ? [] : JSON.parse( localStorage.getItem( 'karmaColors') );
			_.each( savedColors, function ( color ) {
				if ( !that.options.presetColors.includes( color.toUpperCase() ) ) {
					that.addColorToPallet( color, true );
				}
			} );
		}
		var icon = document.querySelector( '.karma-color-picker-icon[data-color-picker-id="' + e.target.dataset.colorPickerId + '"]' ),
			rect = icon.getBoundingClientRect(),
			scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
			scrollTop = window.pageYOffset || document.documentElement.scrollTop,
			topPosition = rect.top + scrollTop + icon.offsetHeight + 15,
			leftPosition = rect.left + scrollLeft + (icon.offsetWidth / 2) - 76;
		colorPickerContainer.style.top = topPosition + 'px';
		colorPickerContainer.style.left = leftPosition + 'px';
		colorPickerContainer.className += ' karma-color-picker-opened';
		$( '.karma-drop-down-box' ).removeClass( 'open-drop-down-gizmo' );
	}
	this.addCurrentColor();

};

/**
 * @summary check if current color is not exist in pallets, add it
 *
 * @since 0.1.0
 * @returns {void}
 */
karmaColorPicker.prototype.addCurrentColor = function () {

	var currentColorHex = this.rgbToHex( this.activeInput.value ).toLowerCase();
	var currentPallet = document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + this.id + '"] .karma-color-picker-preset-color[data-color="' + currentColorHex + '"]' );
	if ( null != currentPallet ) {
		currentPallet.classList.add( 'selected' );
	} else {
		this.addColorToPallet( currentColorHex, true );
		var currentPallet = document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + this.id + '"] .karma-color-picker-preset-color[data-color="' + currentColorHex + '"]' );
		currentPallet.classList.add( 'selected' );
	}

};

/**
 * @summary convert rgb color to hex color
 *
 * @since 0.1.0
 * @returns {string} return hex color or passed color if color is not rgb
 */
karmaColorPicker.prototype.rgbToHex = function ( color ) {

	if ( '#' === color.substr( 0, 1 ) ) {
		return color;
	}
	var digits = /(.*?)rgb\((\d+), (\d+), (\d+)\)/.exec( color );
	if ( null != digits ) {
		var red = parseInt( digits[ 2 ] );
		var green = parseInt( digits[ 3 ] );
		var blue = parseInt( digits[ 4 ] );
		var rgb = blue | ( green << 8 ) | ( red << 16 );
		if( 0 == rgb ){
			return '#000000';
		}else{
			return digits[ 1 ] + '#' + rgb.toString( 16 );
		}
	} else {
		return color;
	}

};
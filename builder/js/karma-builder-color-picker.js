/**
 * karmaColorPicker is a color picker plugin to load color popup and load spectrum color picker
 *
 * URL: http://pixflow.net
 * License: MIT
 */

/**
 * @summary karmaColorPicker manager
 * The resources that add karmaColorPicker to input
 *
 * @param {object}  options input css selector
 *
 * @since 1.0.0
 * @returns {void}
 */

var $ = jQuery,
	karmaColorPicker = function ( options ) {

	this.options = {};
	this.defaultOptions = {
		selector            : ".karma-color-picker",
		multiColor          : true,
		firstColorTitle     : 'Main',
		secondColorTitle    : 'Hover',
		presetColors        : [ '#FFFFFF', '#FEF445', '#FAC711', '#F24726', '#E6E6E6', '#CEE741', '#8FD14F', '#DA0263', '#808080', '#13CDD4', '#0DA789', '#652CB3', '#141414', '#2D9BF0', '#404BB2' ]
	};

	for ( var i in this.defaultOptions ) {
		this.options[ i ] = options[ i ] || this.defaultOptions[ i ];
	}

	var element = document.querySelector( this.options.selector );
	if ( element == null || $( element ).hasClass( 'karma-color-picker-input' ) ) {
		return;
	}
	this.mainInput = document.querySelector( this.options.selector );
	this.generateColorPickerID();
	this.init();

};

/**
 * @summary generate uniqueID for color picker
 *
 * @since 1.0.0
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
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.init = function () {

	var that = this;
	this.createColorPickerIcon();
	this.createColorPickerPopup();
	this.setMainInputEvent();
	this.chooseColorEvent();
	var handler = that.openColorPicker.bind( that );
	jQuery( document.querySelector( this.selector ) ).on( 'click.karma-color-picker', handler );

};

/**
 * @summary create color circle icon to open color picker popup
 *
 * @since 1.0.0
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
	var input = document.querySelector( this.options.selector );
	input.dataset.colorPickerId = this.id;
	icon.style.background = input.value;
	input.parentElement.insertBefore( icon, input );
	input.className += " karma-color-picker-input";
	icon.addEventListener( 'click', function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		that.openColorPicker( e );
	}, true );


};

/**
 * @summary create color picker popup
 *
 * @since 1.0.0
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
		firstColor.innerText = this.options.firstColorTitle;
		colorMode.appendChild( firstColor );
		var secondColor = document.createElement( 'span' );
		secondColor.setAttribute( 'class', 'second-color' );
		secondColor.innerText = this.options.secondColorTitle;
		colorMode.appendChild( secondColor );
		popup.appendChild( colorMode );
	}


	// Create preset colors
	var presetColors = document.createElement( 'div' );
	presetColors.setAttribute( 'class', 'karma-color-picker-preset-colors' );
	for ( var i = 0; that.options.presetColors.length > i; i++ ) {
		var presetColor = document.createElement( 'span' );
		presetColor.setAttribute( 'class', 'karma-color-picker-preset-color' );
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
	popup.appendChild( presetColors );
	// Add popup HTML to beside of input
	var input = document.querySelector( this.options.selector );
	input.parentElement.insertBefore( popup, input );

	that.initSpectrumColorPicker();

};

/**
 * @summary apply preset colors events
 *
 * @param  {object} el element that need event to change color
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.presetColorsEvent = function ( el ) {

	var that = this;
	el.addEventListener( 'click', function ( e ) {
		e.preventDefault();
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
 * @summary set main input value
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.setMainInputEvent = function () {

	var that = this;
	$( this.mainInput ).on( 'change', function () {
		that.icon.style.background = this.value;
	} );

	
};

/**
 * @summary set choose color event
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.chooseColorEvent = function () {

	var that = this;
	$( that.chooseColor ).on( 'click', function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		var $spectrum = $( "#" + that.id );
		$spectrum.spectrum( "set", that.mainInput.value );
		$spectrum.spectrum( "toggle" );
		that.addColorToPallet( that.mainInput.value );
		return false;
	} );

};

/**
 * @summary add user color pallet
 *
 * @param {color}   color   color of new pallet
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.addColorToPallet = function ( color ) {

	var that = this;
	var presetColor = document.createElement( 'span' );
	presetColor.setAttribute( 'class', 'karma-color-picker-preset-color user-pallet temp-pallet' );
	presetColor.style.backgroundColor = color;
	this.presetColorsEvent( presetColor );
	that.chooseColor.parentElement.insertBefore( presetColor, that.chooseColor );

};

/**
 * @summary update main input value
 *
 * @param {string} newColor main color new value
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.updateMainColor = function ( newColor ) {

	$( this.mainInput ).val( newColor ).change();

};

/**
 * @summary init spectrum color picker
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.initSpectrumColorPicker = function () {

	var that = this;
	$( "#" + this.id ).spectrum( {
		color: "#1E8FE1",
		showAlpha: true,
		alphaVertical: true,
		preferredFormat: "hex",
		showInput: true,
		replacerClassName: 'spectrum-color-preview',
		move: function ( color ) {

			if ( null != document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .temp-pallet' ) ) {
				$( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .selected' ).removeClass( 'selected' );
				document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .temp-pallet' ).className += ' selected';
				$( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .temp-pallet' ).removeClass( 'temp-pallet' );
			}
			document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .selected' ).style.backgroundColor = color;
			that.updateMainColor( color );
			
		}
	} );
	$( document ).off( "click.hideColorPickerContainer" ).on( "click.hideColorPickerContainer", function () {

		$( ".karma-color-picker-container" ).removeClass( 'opened' );

	} )
	$( ".karma-color-picker-container" ).off( "click.hideColorPicker" ).on( "click.hideColorPicker", function () {

		$( '.temp-pallet' ).remove();
		$( "#" + that.id ).spectrum( 'hide' );

	} )
};

/**
 * @summary Open Color Picker
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.openColorPicker = function ( e ) {

	e.preventDefault();
	var colorPickerContaner = document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + e.target.dataset.colorPickerId + '"]' );
	if ( $( colorPickerContaner ).hasClass( 'opened' ) ) {
		$( colorPickerContaner ).removeClass( 'opened' );
	} else {
		colorPickerContaner.className += ' opened';
	}



};
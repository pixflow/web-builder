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
var karmaColorPicker = function ( options ) {

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
	icon.setAttribute( 'class', 'karma-stop-propagation karma-color-picker-icon' );
	icon.dataset.colorPickerId = this.id;

	// Add icon HTML to beside of input
	var input = document.querySelector( this.options.selector );
	input.dataset.colorPickerId = this.id;
	icon.style.background = input.value;
	input.parentElement.insertBefore( icon, input );
	input.className += " karma-color-picker-input";
	icon.addEventListener( 'click', function ( e ) {
		e.preventDefault();
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
		presetColor.style.background = that.options.presetColors[ i ];
		presetColors.appendChild( presetColor );
	}
	var chooseColor = document.createElement( 'span' );
	chooseColor.setAttribute( 'class', 'karma-color-picker-preset-color karma-color-picker-choose-color' );
	chooseColor.innerText = '+';
	presetColors.appendChild( chooseColor );
	popup.appendChild( presetColors );


	// Add popup HTML to beside of input
	var input = document.querySelector( this.options.selector );
	input.parentElement.insertBefore( popup, input );

	that.initSpectrumColorPicker();

};

/**
 * @summary init spectrum color picker
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.initSpectrumColorPicker = function () {

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
	colorPickerContaner.className += ' opened';


};
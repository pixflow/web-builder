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

	this.mainInput = document.querySelector( this.options.selector + ' input.karma-color-gizmo' );
	this.hoverInput = document.querySelector( this.options.selector + ' input.karma-color-gizmo-hover' );

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
	this.changeColorAction();
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
	this.mainInput.classList.add( 'karma-color-picker-input' );
	this.hoverInput.classList.add( 'karma-color-picker-input' );
	icon.style.background = this.mainInput.value;
	this.mainInput.parentElement.insertBefore( icon, this.mainInput );
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
	var input = this.mainInput;
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
 * @summary change color action
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.changeColorAction = function () {

	var that = this;
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
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.setMainInputEvent = function () {

	var that = this;
	$( this.activeInput ).on( 'change', function () {
		that.icon.style.background = this.value;
	} );

	
};

/**
 * @summary set choose color event
 *
 * @since 1.0.0
 * @returns {boolean}
 */
karmaColorPicker.prototype.chooseColorEvent = function () {

	var that = this;
	$( that.chooseColor ).on( 'click', function ( e ) {
		e.preventDefault();
		e.stopPropagation();
		var $spectrum = $( "#" + that.id );
		$spectrum.spectrum( "set", that.activeInput.value );
		$spectrum.spectrum( "toggle" );
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
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.addColorToPallet = function ( color, addClass ) {

	var presetColor = document.createElement( 'span' );
	presetColor.setAttribute( 'class', 'karma-color-picker-preset-color user-pallet temp-pallet' );
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
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.updateMainColor = function ( newColor ) {

	$( this.activeInput ).val( newColor )
			.change()
			.trigger( 'change/updateColor', [ newColor, $( this.activeInput ).hasClass('karma-color-gizmo-hover') ] );

};

/**
 * @summary Save colors into local storage
 *
 * @param {String} Color main color new value
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.saveColors = function ( color ) {

	if ( typeof( Storage ) !== "undefined") {
		var savedColors = ( null == localStorage.getItem( 'karmaColors' ) ) ? [] : JSON.parse( localStorage.getItem( 'karmaColors') );
		if( true === savedColors.includes( color ) ){
			return ;
		}

		if (  8 == savedColors.length ){
			savedColors.shift();
		}

		savedColors.push( color );
		localStorage.setItem( 'karmaColors', JSON.stringify( savedColors ) );
	}

}

/**
 * @summary init spectrum color picker
 *
 * @since 1.0.0
 * @returns {void}
 */
karmaColorPicker.prototype.initSpectrumColorPicker = function () {

	var that = this;
	$( "#" + this.id ).spectrum( {
		color: that.options.color,
		showAlpha: that.options.opacity,
		alphaVertical: true,
		preferredFormat: "hex",
		showInput: true,
		replacerClassName: 'spectrum-color-preview',
		move : function ( color ) {

			if ( null != document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .temp-pallet' ) ) {
				$( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .selected' ).removeClass( 'selected' );
				document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .temp-pallet' ).className += ' selected';
				$( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .temp-pallet' ).removeClass( 'temp-pallet' );
			}
			document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + that.id + '"] .selected' ).style.backgroundColor = color;
			that.updateMainColor( color );

		},

		hide : function ( color ) {

			that.saveColors( color.toHexString() );

		},

	} );

	$( document ).off( "click.hideColorPickerContainer" ).on( "click.hideColorPickerContainer", function () {

		$( ".karma-color-picker-container" ).removeClass( 'opened' );

	} );

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
	var colorPickerContaner = document.querySelector( '.karma-color-picker-container[data-color-picker-id="' + e.target.dataset.colorPickerId + '"]' ),
		that = this;
	if ( $( colorPickerContaner ).hasClass( 'opened' ) ) {
		$( colorPickerContaner ).removeClass( 'opened' );
	} else {
		if ( typeof( Storage ) !== "undefined") {
			$('.karma-color-picker-preset-color.user-pallet').remove();
			var savedColors = ( null == localStorage.getItem( 'karmaColors' ) ) ? [] : JSON.parse( localStorage.getItem( 'karmaColors') );
			_.each( savedColors, function ( color ) {
				that.addColorToPallet( color, true );
			} );
		}
		colorPickerContaner.className += ' opened';
		$( '.karma-drop-down-box' ).removeClass( 'open-drop-down-gizmo' );
	}

};
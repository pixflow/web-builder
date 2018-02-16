var karmaBuilderTypography = karmaBuilderTypography || {};

(function ($, karmaBuilderTypography) {
	'use strict';

	karmaBuilderTypography.view = Backbone.View.extend({

		/*
		 * Underscore's default ERB-style templates are incompatible with PHP
		 * when asp_tags is enabled, so Karma uses Mustache-inspired templating syntax.
		 *
		 * Make the underscore template like wp.template function
		 *
		 */
		templateSettings: {
			evaluate: /<#([\s\S]+?)#>/g,
			interpolate: /\{\{\{([\s\S]+?)\}\}\}/g,
			escape: /\{\{([^\}]+?)\}\}(?!\})/g,
			variable: 'data'
		},


		/*
	    * Font varient template
	    *
		*/
		fontVarientTemplate: '<li class="karma-dropdown-option"'
			+ 'data-value="{{ data.fontVarient }}">'
			+ '<span class="karma-dropdown-option-title">'
			+ '{{ data.fontVarient }}'
			+ '</span>'
			+ '</li>',

		/*
	    * Google font template
	    *
		*/
		karmaGoogleFontTemplate : '<li class="karma-google-font" data-font-id="{{ data.font }}" data-font-family="{{ data.fonts[ data.font ] }}" >'
			+ '<span class="google-font-title">{{ data.fonts[ data.font ] }}</span>'
			+ '<svg width="10px" height="12px" viewBox="0 0 6 10" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="back-icon" stroke="none" stroke-width="1.5" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"> <g id="back-icon-1" transform="translate(-753.000000, -461.000000)" stroke="#419CF8"> <polyline id="back-icon-2" transform="translate(756.000000, 466.000000) rotate(90.000000) translate(-756.000000, -466.000000) " points="751 464 756 468 761 464"></polyline> </g> </g></svg>'
			+ '</li>',

		/*
	    * Google font varient template
	    *
		*/
		fontWeightHtmlTemplate : '<li class="karma-font-weight" data-font-style="{{ data.fontStyle }}" data-font-weight="{{ data.fontWeight }}">'
			+ '<label class="checkbox-style"><svg width="8px" height="6px" viewBox="0 0 10 8" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="tik-g" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <path d="M9.71548831,0.284402819 L9.71548831,0.284402819 L9.71548831,0.284402819 C10.0925929,0.668903139 10.0951418,1.28370977 9.72123818,1.6713236 L5.40686201,6.14389858 L4.46606048,7.1201828 L4.46606048,7.1201828 C4.08282991,7.51786707 3.44977335,7.5295841 3.05208909,7.14635353 C3.0428289,7.1374299 3.03374172,7.12832847 3.0248326,7.11905433 L2.0880593,6.14389858 L0.307769356,4.30043835 L0.307769356,4.30043835 C-0.0944545875,3.88394224 -0.1035336,3.22649442 0.287035967,2.79905024 L0.287035967,2.79905024 L0.287035967,2.79905024 C0.641822145,2.41076785 1.24419824,2.3836138 1.63248064,2.73839998 C1.65085187,2.75518636 1.66855808,2.77268638 1.68555849,2.79085974 L3.7448601,4.99224302 L8.36082195,0.284493479 L8.36082195,0.284493479 C8.7276333,-0.0896118577 9.32826495,-0.0955248032 9.70237028,0.271286546 C9.7067856,0.275615779 9.71115849,0.279988079 9.71548831,0.284402819 Z" id="tik-path" fill="#fff"></path> </g></svg></label>'
			+ '<span>{{ data.index }}</span>'
			+ '</li>',

		/*
	    * Google font list box template
	    *
		*/
		fontListBoxTemplate :  '<div class="karma-font-list karma-font-manger-box-style">'
			+ '<div class="karma-font-name-part">'
			+ '<span class="karma-font-name" data-font-name="{{ data.fontFamily }}" style="font-family:{{ data.fontFamily }};">{{ data.fontFamily }}</span>'
			+ '<span class="karma-font-weight-count"><# print( data.fontWeight.length ) #>  Styles'
			+ '<span class="karma-drop-down-icon">'
			+ '<svg width="12px" height="6px" viewBox="0 0 12 6" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><g id="drop-down-all-Setting-pannel--style-guide" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round"><g class="bottom-arrow" transform="translate(-2725.000000, -776.000000)" stroke-width="2" stroke="#419CF8"><g id="drop-down-Group-19" transform="translate(2715.000000, 762.000000)"><polyline id="drop-down-Path-2-Copy-9" points="11 15 16 19 21 15"></polyline></g></g></g></svg>'
			+ '</span>'
			+ '</span>'
			+ '<span class="karma-delete-font">'
			+ '<svg width="13px" height="13px" viewBox="0 0 13 13" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"> <g id="delete-element" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"> <g id="delete-element-icon" transform="translate(-482.000000, -11.000000)" fill="#394959"> <path d="M485.714286,12.625 L482.8125,12.625 L482.8125,12.625 C482.363769,12.625 482,12.9887686 482,13.4375 C482,13.8862314 482.363769,14.25 482.8125,14.25 L494.1875,14.25 C494.636231,14.25 495,13.8862314 495,13.4375 C495,12.9887686 494.636231,12.625 494.1875,12.625 L491.285714,12.625 L491.285714,12 C491.285714,11.4477153 490.837999,11 490.285714,11 L486.714286,11 C486.162001,11 485.714286,11.4477153 485.714286,12 L485.714286,12 L485.714286,12.625 Z M484.166667,15.3333333 L492.833333,15.3333333 L492.833333,23 C492.833333,23.5522847 492.385618,24 491.833333,24 L485.166667,24 C484.614382,24 484.166667,23.5522847 484.166667,23 L484.166667,15.3333333 Z" id="A124"></path> </g> </g></svg>'
			+ '</span>'
			+ '</div>'
			+ '<div class="karma-font-details-part">'
			+ '<ul style="font-family:{{ data.fontFamily }};">'
			+ '<# data.fontWeight.forEach( function ( fontName ) { #>'
			+ '<li data-font-style="<# print( fontName.style ); #>" data-font-weight="<# print( fontName.weight ); #>" >'
			+ '<# print( fontName.weight ); #> <# print( fontName.style ); #></li>'
			+ '<# }); #>'
			+' </ul></div></div>' ,

		events: {

			'mousedown body:not( .karma-dropdown-body )'                        : 'closeDropDown',
			'click .karma-dropdown-options > li:not(.karma-dropdown-add-font)'  : 'selectDropDownList',
			'click .karma-dropdown-header'                                      : 'openDropDown',
			'click .karma-backto-previous-location'                             : 'animateKarmaPanels',
			'click .karma-delete-font'                                          : 'deleteFontBox',
			'input .karma-range-slider-input'                                   : 'updateRangeSlider',
			'click .karma-font-list'                                            : 'openFontsDetails',
			'click .karma-save-setting'                                         : 'saveFontsFormat',
			'click .karma-add-to-library'                                       : 'addFontToLibrary',
			'click .karma-google-fonts-title'                                   : 'openKarmaGoogleFonts',
			'click .karma-delete-message-box-delete-button'                     : 'DeleteElement',
			'click .karma-delete-message-box-cancel-button'                     : 'cancelDeleteElement',
			'click .karma-delete-message-box'                                   : 'cancelDeleteElement',
			'click .karma-delete-message-container'                             : 'deleteBoxStopPropagation',
			'mousedown .karma-google-fonts-list'                                : 'deleteBoxStopPropagation',
			'input #karma-fonts-search-input'                                   : 'searchInGoogleFonts',
			'scroll   #karma-typography-setting'                                : 'preventFromScroll',
			'touchmove  #karma-typography-setting'                              : 'preventFromScroll',
			'mousewheel #karma-typography-setting'                              : 'preventFromScroll',
			'click .karma-dropdown-add-font a'                                  : 'animateKarmaPanels',
			'click .karma-google-fonts-list .right-side ul li'                  : 'openFontVarientList',
			'click .karma-google-fonts-list .left-side ul li'                   : 'selectFontVarient',
		},

		/**
		 * @summary In creating this view calls render
		 *
		 * @since 0.1.0
		 *
		 */
		initialize: function (options) {

			this.googleFontList = options.googleFontList;
			this.initRangeSlider();
			this.uploadCustomFonts();
			this.renderFonts();

		},


		/**
		 * @summary Stop scrolling when dropdown open
		 *
		 * @since 0.1.1
		 *
		 */
		preventFromScroll: function (e) {

			if ( null != document.querySelector('.karma-doropdown-opened') ) {
				e.preventDefault();
				e.stopPropagation();
				return false;
			}

		},

		/**
		 * @summary Create font varient list
		 *
		 * @since 0.1.1
		 * @returns void
		 */
		openFontVarientList : function ( e ) {

			var element = ( e.target.classList.contains('karma-google-font') ) ?  $( e.target ) : $( e.target ).closest('.karma-google-font'),
				fontVarient = this.googleFontList.fontVariants[ element.attr('data-font-id') ];

			$('.karma-active-font').removeClass('karma-active-font');
			element.addClass('karma-active-font');
			$('.karma-google-fonts-list').addClass('show-google-font-weight');
			$('.current-font-weight').removeClass('font-weight-selected');
			$('.karma-google-fonts-list .left-side ul li').remove();
			this.createFontVarientListHtml( element.attr('data-font-family'), fontVarient );

		},

		/**
		 * @summary Create font varient list html
		 *
		 * @param   {object}    fontVarient Font varient list
		 *
		 * @since 0.1.1
		 * @returns void
		 */
		createFontVarientListHtml : function( fontName, fontVarient ){

			var fontWeightHtml = _.template( this.fontWeightHtmlTemplate, this.templateSettings );
			fontVarient.forEach( function ( index ) {
				//font style
				var font = index,
					fontStyle = ( font.indexOf('italic') >= 0 ) ? 'italic' : 'normal',
					fontWeight;

				if ( 'regular' == font || 'normal' == font ) {
					fontWeight = 400;
				} else if ( 'normal' != fontStyle ) {
					font = font.replace( 'italic', '' );
					font = ( '' == font ) ? 400 : font;
					fontWeight = parseInt( font );
				} else {
					fontWeight = font;
				}

				$('.karma-google-fonts-list .left-side ul').append( fontWeightHtml( { index : index, fontWeight : fontWeight, fontStyle : fontStyle } ) );

			});

			this.selectActiveFontWeight( fontName );

		},

		/**
		 * @summary Choose font varient
		 *
		 * @since 0.1.1
		 * @returns void
		 */
		selectFontVarient : function ( e ) {

			var element = ( e.target.classList.contains('karma-font-weight') ) ? $( e.target ) : $( e.target ).closest('.karma-font-weight');
			element.toggleClass('active-font-weight');
			if ( $('.active-font-weight').length ) {
				$('.current-font-weight').addClass('font-weight-selected');
			} else {
				$('.current-font-weight').removeClass('font-weight-selected');
			}

		},

		/**
		 * @summary range slider in typography manager
		 *
		 * @since 0.1.0
		 *
		 */
		updateRangeSlider: function ( e ) {

			var input = e.target,
				value = input.value,
				rangeSliderInput = e.target
					.closest('.karma-range-slider-content')
					.querySelector('.karma-range-slider-range');

			$( rangeSliderInput ).val( value ).change();

		},

		/**
		 * @summary render google fonts dropdown
		 *
		 * @since 0.1.0
		 *
		 */
		renderFonts: function () {

			var fonts = this.googleFontList.fontFamily,
				that = this;

			for ( var font in fonts ) {

				var template = _.template( that.karmaGoogleFontTemplate, that.templateSettings ),
					karmaGoogleFont = template( { font : font, fonts : fonts } );

				$('.karma-google-fonts-list .right-side ul').append( karmaGoogleFont );
				$('.karma-google-fonts-list .karma-google-fonts-holder, .karma-google-fonts-list .left-side ul').niceScroll({
					cursorcolor: "#A9A9A9",
					cursorwidth: "4px",
					cursoropacitymax: 0.56,
					cursorborder: "none",
					horizrailenabled: false
				});
			}
			this.sortFontByPopular();

		},

		/**
		 * @summary After click on add to library button
		 * font list added to fonts list panel
		 *
		 * @since 0.1.1
		 *
		 */
		addFontToLibrary: function ( e ) {

			e.stopPropagation();
			var fontFamily = $('.karma-active-font').attr('data-font-family'),
				fontWeight = $('.active-font-weight'),
				arr = [],
				modelArr = [];

			fontWeight.each( function () {

				var obj = {
					'weight' : $( this ).attr('data-font-weight'),
					'style'  : $( this ).attr('data-font-style')
				};
				modelArr.push( $( this ).attr('data-font-weight') + ' ' + $( this ).attr('data-font-style') );
				arr.push( obj );

			});
			var prevFont = $('.karma-font-name[ data-font-name ="' + fontFamily.toLowerCase() + '" ]');
			if ( prevFont.length ) {
				prevFont.closest('.karma-font-list').remove();
			}
			if ( $('.current-font-weight').hasClass('font-weight-selected') ) {
				if( this.updateTypographyModels( fontFamily, modelArr ) ) {
					this.loadFont( fontFamily, modelArr) ;
					this.addFontToHeadingDropdown( fontFamily, modelArr );
					$('.karma-fonts-list').append( this.createFontListHtml( fontFamily, arr ) );
				}
				this.closeKarmaGoogleFonts();
			}

		},

		/**
		 * @summary Add added google font to heading drop down
		 *
		 * @param {string}  font    Font family name
		 * @param {object}  weights Font varients list
		 *
		 * @since   0.1.1
		 * @returns void
		 */
		addFontToHeadingDropdown: function ( font, weights ) {

			$('.karma-typography-font .karma-font-family-list').append('<li class="karma-dropdown-option " data-value="' + font + '"><span class="karma-dropdown-option-title">' + font + '</span></li>');
			weights.forEach(function ( weight ) {
				$('.karma-typography-weight .karma-font-family-list').append('<li class="karma-dropdown-option" data-value="' + weight + '"><span class="karma-dropdown-option-title">' + weight + '</span></li>');
			})

		},

		/**
		 * @summary Call font and load it.
		 *
		 * @since   0.1.1
		 * @returns {void}
		 */
		loadFont: function ( font, weights ) {

			WebFont.load({
				google: {
					families: [ font + ':' + weights.join() ]
				}
			});

		},

		/**
		 * @summary Update typography models
		 *
		 * @param {string}  fontFamily
		 * @param {Array}   arr         Array of object contains font-weight and font-style
		 *
		 * @since 0.1.0
		 *
		 * @return {boolean}
		 */
		updateTypographyModels: function ( fontFamily, arr ) {

			var result = false;
			if ( 'undefined' == typeof this.model.fonts[ fontFamily ] ) {
				this.model.fonts[ fontFamily.toLowerCase() ] = arr;
				result = true ;
			} else {
				var that = this;
				arr.forEach( function ( item ) {
					if ( that.model.fonts[ fontFamily ].indexOf( item ) == -1) {
						that.model.fonts[ fontFamily ].push( item );
						result = true ;
					}
				});
			}

			return result;
		},

		/**
		 * @summary create font list html
		 *
		 * @param fontFamily {string}
		 * @param fontWeight {Array} Array of object contains font-weight and font-style
		 *
		 * @since 0.1.0
		 *
		 * @return {string}
		 */
		createFontListHtml: function ( fontFamily, fontWeight ) {

			var template = _.template( this.fontListBoxTemplate, this.templateSettings ),
				html = template( { fontFamily : fontFamily, fontWeight : fontWeight } );

			return html;
		},

		/**
		 * @summary Move 3 popular fonts to beginning
		 *
		 * @since 0.1.0
		 *
		 * @return {void}
		 */
		sortFontByPopular : function () {

			var popularFonts = [ 'Quicksand', 'Oswald', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins', 'Raleway', 'Playfair Display', 'Nunito', 'Dosis' ];

			for ( var font in popularFonts ){
				var fontItem = $('.karma-google-fonts-list .right-side ul li[ data-font-family = "' + popularFonts[ font ] + '"]');
				$('.karma-google-fonts-list .right-side ul').prepend( fontItem );
			}

		},

		/**
		 * @summary Show list of google fonts
		 *
		 * @param {number}  searchResult
		 * @param {string}  inputValue      Search value
		 *
		 * @since 0.1.1
		 * @returns {void}
		 */
		showAfterResult: function ( searchResult, inputValue ) {

			for (searchResult; searchResult <= 848; searchResult++) {
				if (this.googleFontList.fontFamily[searchResult].substr(0, inputValue.length).toLowerCase() == inputValue) {
					document.querySelector('.karma-google-font[data-font-id="' + searchResult + '"]').style.display = 'flex';
				} else {
					break;
				}
			}

		},

		/**
		 * @summary Show list of google fonts
		 *
		 * @param {number}  beforeIndex
		 * @param {string}  inputValue  Search value
		 *
		 * @since 0.1.1
		 * @returns {void}
		 */
		showBeforeResult: function ( beforeIndex, inputValue ) {

			for ( beforeIndex; beforeIndex >= 0; beforeIndex-- ) {
				if ( this.googleFontList.fontFamily[ beforeIndex ].substr( 0, inputValue.length ).toLowerCase() == inputValue ) {
					document.querySelector('.karma-google-font[data-font-id="' + beforeIndex + '"]').style.display = 'flex';
				} else {
					break;
				}
			}

		},

		/**
		 * @summary Show list of google fonts
		 *
		 * @since 0.1.1
		 * @returns {void}
		 */
		searchInGoogleFonts: function () {

			var inputValue = document.getElementById('karma-fonts-search-input').value;

			if ('' == inputValue.trim()) {
				$('.karma-google-font').css('display', 'flex');
				return;
			}

			inputValue = inputValue.trim().toLowerCase();
			var searchResult = parseInt( this.binaryIndexOf( inputValue ) ),
				beforeIndex = searchResult - 1;

			if ( -1 != searchResult ) {
				$('.karma-google-font').css('display', 'none');
				this.showAfterResult( searchResult, inputValue );
				this.showBeforeResult( beforeIndex, inputValue );
			}


		},

		/**
		 * @summary Show list of google fonts
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		openKarmaGoogleFonts: function () {

			if ('none' == $('.karma-google-fonts-list').css('display')) {
				$('.karma-google-fonts-list').addClass('show-font-dropdown');
				$('.karma-active-font').removeClass('karma-active-font');
				$('.show-google-font-weight').removeClass('show-google-font-weight');
				setTimeout(function () {
					$('.karma-google-fonts-list').addClass('slide-down-font-drop-down');
				}, 100);
				$('.karma-google-fonts-list .karma-google-fonts-holder').css({'overflow': ''}).css({'overflow': 'hidden'});
			} else {
				this.closeKarmaGoogleFonts();
			}
		},

		/**
		 * @summary Close karma google font
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		closeKarmaGoogleFonts: function () {

			document.getElementById('karma-fonts-search-input').value = '';
			$('.karma-google-font').css('display', 'flex');
			$('.karma-google-fonts-list').removeClass('slide-down-font-drop-down');
			setTimeout( function () {
				$('.karma-google-fonts-list').removeClass('show-font-dropdown');
			}, 500 );

		},

		/**
		 * @summary Init range slider
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		initRangeSlider: function () {

			var $rangeInputs = $('.karma-range-slider-range'),
				that = this;

			$rangeInputs.rangeslider({

				polyfill: false

			}).on('input', function () {

				$( this ).next()
					.next('.karma-range-slider-number')
					.find('input')
					.val( this.value );

				that.updateFontSize( this, this.value );
			});

		},

		/**
		 * @summary Update font size in range slider
		 *
		 * @param   {object}    element
		 * @param   {number}    value
		 *
		 * @since 0.1.1
		 * @returns {void}
		 */
		updateFontSize: function ( element, value ) {

			var parent = element.closest('.karma-typography-box'),
				target = parent.querySelector('.karma-typography-text');

			target.style.fontSize = value + 'px';
			this.model.headings[ parent.getAttribute('data-heading') ]['font-size'] = value;

		},

		/**
		 * @summary Show/Hide font details
		 *
		 * @since 0.1.0
		 *
		 */
		openFontsDetails: function (e) {

			var parentElement = e.target.closest('.karma-font-list'),
				slideElement = parentElement.querySelector('.karma-font-details-part');

			if ( 'block' != slideElement.style.display ) {
				this.closeKarmaGoogleFonts();
				$( parentElement ).addClass('karma-open-font-weight-list');
				$('.karma-google-fonts-list .left-side ul').css( { 'overflow' : '' } ).css( { 'overflow' : 'hidden' } );
			} else {
				$( parentElement ).removeClass('karma-open-font-weight-list');
			}

			$( parentElement.querySelector('.karma-font-details-part') ).slideToggle( 300 );

		},

		/**
		 * @summary Drop down for typography manager page(font-family and font-weight)
		 *
		 * @since 0.1.0
		 *
		 */
		closeDropDown: function ( e ) {

			if ($(e.target).hasClass('.karma-dropdown-body') || $(e.target).closest('.karma-dropdown-body').length
				|| $(e.target).hasClass('karma-dropdown-icon') || $(e.target).closest('.karma-dropdown-icon').length) {
				return;
			} else {
				$('.karma-dropdown-body > ul').removeClass('karma-doropdown-opened');
			}

			if ($(e.target).hasClass('karma-google-fonts-title') || $(e.target).closest('.karma-google-fonts-title').length) {
				return;
			} else {

				this.closeKarmaGoogleFonts();
			}


		},

		/**
		 * @summary Update font list
		 *
		 * @param {object}  element
		 *
		 * @since 0.1.0
		 *
		 */
		updateFontType: function ( element ) {

			if ( element.closest('.karma-dropdown-options').hasClass('karma-font-varients-list') ) {
				this.updateFontVarient( element);
			} else {
				this.updateFontFamily( element );
			}

		},

		/**
		 * @summary Update font varient and add it to fonts model
		 *
		 * @param {object}  element
		 *
		 * @since 0.1.0
		 *
		 */
		updateFontVarient: function ( element ) {

			var parent = element.closest('.karma-typography-box')[0],
				target = parent.querySelector('.karma-typography-text'),
				value = element[0].innerText.trim();

			value.split(" ").forEach( function ( styleValue ) {
				if ( parseInt( styleValue ) ) {
					target.style.fontWeight = styleValue;
				} else {
					target.style.fontStyle = styleValue;
				}
			})

			this.model.headings[ parent.getAttribute('data-heading') ]['font-varients'] = value;

		},

		/**
		 * @summary Update font varient list in dropdown
		 *
		 * @param   {Object}    element
		 * @param   {String}    fontName    Selected Font name
		 *
		 * @since 0.1.0
		 *
		 */
		updateFontVarientList: function ( element, fontName ) {

			fontName = ('HelveticaNeue' == fontName) ? fontName : fontName.toLowerCase();
			var fontVarientList = this.model.fonts[ fontName],
				lists = '',
				that = this,
				fontVarientUpdate = this.model.fonts[ fontName ][0];

			_.each( fontVarientList, function (fontVarient ) {
				var template = _.template(that.fontVarientTemplate, that.templateSettings),
					source = template( { fontVarient: fontVarient } );

				lists += source;
			});

			element.querySelector('.karma-typography-text').style.fontWeight = fontVarientUpdate;
			element.querySelector('.karma-font-varients-list').innerHTML = lists;
			element.querySelector('.karma-font-varients-list .karma-dropdown-option').classList.add('karma-selected-dropdown-option');
			this.model.headings[ element.getAttribute('data-heading') ]['font-varients'] = fontVarientUpdate;
			element.querySelector('.karma-typography-weight .karma-dropdown-header .karma-dropdown-selected-item').innerText = fontVarientUpdate;


		},

		/**
		 * @summary Update font name and add it to fonts model
		 *
		 * @param {object}  element
		 *
		 * @since 0.1.0
		 *
		 */
		updateFontFamily: function ( element ) {

			var parent = element.closest('.karma-typography-box')[0],
				target = parent.querySelector('.karma-typography-text'),
				value = element[0].innerText.trim();

			target.style.fontFamily = value;
			this.model.headings[ parent.getAttribute('data-heading') ]['font-family'] = value;
			this.updateFontVarientList( parent, value );

		},

		/**
		 * @summary Fire on click in drop down list
		 *
		 * @since 0.1.1
		 */
		selectDropDownList: function ( e ) {

			var element = ( $( e.target ).hasClass('karma-dropdown-option') ) ? $( e.target ) : $( e.target ).closest('.karma-dropdown-option');
			element.closest('ul').find('.karma-selected-dropdown-option').removeClass('karma-selected-dropdown-option');
			element.addClass('karma-selected-dropdown-option');
			element.closest('.karma-dropdown-body').find('.karma-dropdown-selected-item').html( element.find('.karma-dropdown-option-title').text() );
			this.updateFontType( element );
			$('.karma-dropdown-body > ul').removeClass('karma-doropdown-opened');

		},

		/**
		 * @summary Open dropdowm
		 *
		 * @since 0.1.1
		 */
		openDropDown: function (e) {

			var element = ( $(e.target).hasClass('karma-dropdown-header') ) ? $( e.target ) : $( e.target) .closest('.karma-dropdown-header'),
				optionsContainer = element.next('ul');
			$('.karma-doropdown-opened').removeClass('karma-doropdown-opened');
			optionsContainer.addClass('karma-doropdown-opened');
			if (!optionsContainer.find('.karma-selected-dropdown-option').length) {
				optionsContainer.find('.karma-dropdown-option').first().addClass('karma-selected-dropdown-option');
			}

			var top = optionsContainer.find('.karma-selected-dropdown-option').position().top * -1 + element.offset().top - $(window).scrollTop(),
				left = element.offset().left - 5;

			optionsContainer.css({
				'top': top,
				'left': left,
				'opacity': 0
			});

			if ( this.isElementInViewport( optionsContainer ) ) {
				optionsContainer.css('opacity', '');
			} else {
				top = $(window).innerHeight() - optionsContainer.outerHeight( true );
				optionsContainer.css( { 'opacity' : '', 'top' : top } );
			}


		},

		/**
		 * @summary check if element is in viewport
		 *
		 * @param {object} el jquery object
		 * @since 0.1.1
		 * @returns { boolean }
		 */

		isElementInViewport: function ( el ) {

			if (typeof jQuery !== 'undefined' && el instanceof jQuery) el = el[0];

			var rect = el.getBoundingClientRect();
			var windowHeight = (window.innerHeight || document.documentElement.clientHeight);
			var windowWidth = (window.innerWidth || document.documentElement.clientWidth);

			return (
				( rect.left >= 0 )
				&& ( rect.top >= 0 )
				&& ( ( rect.left + rect.width ) <= windowWidth )
				&& ( ( rect.top + rect.height ) <= windowHeight )
			);
		},

		/**
		 * @summary Switch between font manager and typography with animation
		 *
		 * @since 0.1.1
		 * @returns { void }
		 */
		animateKarmaPanels: function ( e ) {

			var $panelContainer = $('.karma-typography-container'),
				$panels = $panelContainer.find('> .karma-panel'),
				that = this,
				$panelToSlideIn,
				$panelToSlideOut;

			e.preventDefault();
			$panelToSlideOut = $panels.filter('.current');
			$panelToSlideIn = $( $( e.target ).attr('href') );

			if ( $panelContainer.is('.karma-element-animating') ||
				$panelToSlideOut.attr('id') == $panelToSlideIn.attr('id')) return false;

			$panelToSlideOut.addClass('karma-element-exit slidedown fade ').removeClass('current');
			$panelToSlideIn.addClass('karma-element-enter slideup fade');

			setTimeout(function () {
				$panelContainer.addClass('karma-element-animating');
			}, 20);

			this.updatePanelNav();

			setTimeout(function () {
				that.stopAnimation($panelContainer, $panels, $panelToSlideIn);
			}, 600);

		},

		/**
		 * @summary Calls after page moves
		 *
		 * @param { object } $panelContainer panel witch contains sections
		 * @param { object } $panels  Panels of tab
		 * @param { object } $panelToSlideIn  element to slide up
		 *
		 * @since 0.1.1
		 * @returns { void }
		 */
		stopAnimation: function ( $panelContainer, $panels, $panelToSlideIn ) {

			$panelToSlideIn.removeClass().addClass('karma-panel current ');
			$panels.filter(':not(#' + $panelToSlideIn.attr('id') + ')').removeClass().addClass('karma-panel');
			$panelContainer.removeClass('karma-element-animating');

		},

		/**
		 * @summary Update navigation after switching panels
		 *
		 * @since 0.1.0
		 *@returns { void }
		 */
		updatePanelNav: function () {

			var nextPanel = $('.karma-panel.karma-element-exit'),
				backButton = $('.karma-backto-previous-location');

			backButton.attr( 'href', '#' + nextPanel.attr('id') );
			backButton.text( nextPanel.attr('data-button-text') );
			$('.karma-location-name').text( $('.karma-panel.karma-element-enter').data('panel-title') );

		},

		/**
		 * @summary Searching JavaScript arrays with a binary search
		 *
		 * @param {string}  search  Search value
		 *
		 * @since 0.1.q
		 * @returns {number} Index of find value in array
		 */
		binaryIndexOf: function ( search ) {

			var minIndex = 0,
				maxIndex = 847,
				that = this,
				currentIndex,
				currentElement;


			while (minIndex <= maxIndex) {
				currentIndex = (minIndex + maxIndex) / 2 | 0;
				currentElement = that.googleFontList.fontFamily[currentIndex].substr(0, search.length).toLowerCase();
				if (currentElement < search) {
					minIndex = currentIndex + 1;
				}
				else if (currentElement > search) {
					maxIndex = currentIndex - 1;
				}
				else {
					return currentIndex;
				}
			}

			return -1;

		},

		/**
		 * @summary Save typography model
		 *
		 * @since   0.1.1
		 * @returns {void}
		 */
		saveFontsFormat: function () {

			var that = this;
			var data = {
				fonts: this.model.fonts,
				typography: this.model.headings,
				customFonts: this.model.customFonts,
				action: 'save_fonts_format'
			};

			$.ajax({
				type: 'post',
				url: typographyParams.ajaxUrl,
				data: data,
				beforeSend: function () {

					var button = document.querySelector('.karma-save-setting');
					button.classList.add('karma-publish-animation');

				},
				success: function () {

					that.saveButtonAnimation();

				}
			});

		},

		/**
		 * @summary save button animation
		 *
		 * @since   0.1.1
		 * @returns {void}
		 */
		saveButtonAnimation: function () {

			var karmaTypographySaveButton = document.querySelector('.karma-save-setting');
			karmaTypographySaveButton.classList.add('karma-publish-finish-animation');

			setTimeout(function () {

				karmaTypographySaveButton.querySelector(".builder-publish-text").style.opacity = "0";

			}, 480);
			setTimeout(function () {

				karmaTypographySaveButton.querySelector(".builder-publish-text").style.opacity = "1";
				karmaTypographySaveButton.style.transition = 'none';
				karmaTypographySaveButton.classList.remove("karma-publish-animation", "karma-publish-finish-animation");

			}, 2400);

		},

		/**
		 * @summary open media library to upload custom fonts
		 *
		 * @since   0.1.1
		 * @returns {void}
		 */
		uploadCustomFonts: function () {

			var uploadCustomFont = document.querySelector('.karma-upload-custom-font');
			this.openMediaLibrary(uploadCustomFont, this.customFontSelected, this);

		},

		/**
		 * @summary When a font is selected in the media frame and update model
		 * @param {object} frame media library frame object
		 * @param {object} view
		 *
		 * @since 0.1.1
		 * @returns {void}
		 */
		customFontSelected: function ( frame, view ) {

			var attachment = frame.state().get('selection').first().toJSON();
			if (view.model.customFonts.length == 0) {
				view.model.customFonts = {};
			}
			if ('undefined' == typeof view.model.customFonts[attachment.title]) {
				view.model.customFonts[attachment.title] = attachment.url;
				var fontFamily = attachment.title,
					arr = [];
				var obj = {
					'weight': '',
					'style': 'Regular'
				};
				arr.push(obj);
				$('.karma-fonts-list').append(view.createFontListHtml(fontFamily, arr));
				$('.karma-google-fonts-list').slideUp(300);
			}

		},

		/**
		 * @summary Open WordPress Media library
		 *
		 * @param {Object}      uploadCustomFont    Selector dom object
		 * @param {function}    callBack      callback function
		 * @param {object}      view
		 *
		 * @since 0.1.1
		 *
		 * @returns {void}
		 */
		openMediaLibrary: function (uploadCustomFont, callBack, view) {

			var frame;

			if ('undefined' == typeof view) {
				view = {};
			}

			uploadCustomFont.addEventListener('click', function () {

				if ( frame ) {
					frame.open();
					return;
				}

				frame = wp.media({
					title: 'Select or Upload font Of Your Chosen Persuasion',
					button: {
						text: 'Use this font'
					},
					multiple: false
				});

				frame.on( 'select', callBack.bind( frame, frame, view ) );

				frame.open();

			}, false);


		},

		/**
		 * @summary open box of delete element
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		deleteFontBox: function ( event ) {

			event.stopPropagation();
			var deleteBox = this.el.querySelector('.karma-delete-message-box'),
				deleteContainer = this.el.querySelector('.karma-delete-message-container');

			if (null == deleteBox) {
				var template = KarmaView.getWpTemplate('karma-delete-message-box');
				this.$el.append(template);
			} else {

				if (deleteBox.classList.contains("karma-delete-box-animation")) {
					deleteBox.classList.remove("karma-delete-box-animation");
				}
				if (deleteContainer.classList.contains("karma-delete-container-animation")) {
					deleteContainer.classList.remove("karma-delete-container-animation");
				}
				deleteBox.style.display = "flex";
				if (undefined != event.target.closest('.karma-font-list')) {
					event.target.closest('.karma-font-list').classList.add('deleted-font')
				}
			}

		},

		/**
		 * @summary cancel delete element on click in cancel box
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		cancelDeleteElement: function () {

			var deleteBox = this.el.querySelector('.karma-delete-message-box'),
				deleteContainer = this.el.querySelector('.karma-delete-message-container');

			deleteContainer.classList.add("karma-delete-container-animation");
			deleteBox.classList.add("karma-delete-box-animation");
			setTimeout(function () {

				deleteBox.style.display = "none";
				if (undefined != document.querySelector('.deleted-font')) {
					document.querySelector('.deleted-font').classList.remove('deleted-font')
				}

			}, 300);

		},

		/**
		 * @summary  delete element on click in delete box
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		DeleteElement: function () {

			var that = this;
			var deleteBox = this.el.querySelector('.karma-delete-message-box'),
				deleteContainer = this.el.querySelector('.karma-delete-message-container');

			deleteContainer.classList.add("karma-delete-container-animation");
			deleteBox.classList.add("karma-delete-box-animation");
			setTimeout(function () {
				that.deleteFont();
				deleteBox.style.display = 'none';
			}, 100);

		},

		deleteFont: function () {

			var font = $('.deleted-font .karma-font-name').attr('data-font-name');
			delete this.model.fonts[font];
			if ( undefined != document.querySelector('.deleted-font') ) {
				$('.deleted-font').remove()
			}
		},

		/**
		 * @summary stop click in delete box container
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		deleteBoxStopPropagation: function (e) {

			e.stopPropagation();

		},

		/**
		 * @summary Separate Google fonts from fonts that user choose
		 *
		 * @since 0.1.0
		 * @returns {object}
		 */
		getGoogleFonts : function () {

			var defaultFonts = [ 'HelveticaNeue', 'arial', 'courier', 'monospace', 'sans-serif' ],
				currentFonts = this.model.fonts,
				googleFonts = {};

			for ( var i in currentFonts ){
				if ( defaultFonts.indexOf( i ) < 0 ){
					googleFonts[ i ] = currentFonts[ i ];
				}
			}
			return googleFonts;
		},

		/**
		 * @summary Select font weight of fonts that user has chosen before on
		 * opening dropdown
		 *
		 * @param { string } fontName
		 *
		 * @since 0.1.0
		 * @returns {void}
		 */
		selectActiveFontWeight: function ( fontName ) {

			var googleFonts =  this.getGoogleFonts(),
				$fontVariant = $('.karma-google-fonts-list .left-side ul');

			fontName = fontName.toLowerCase();
			if ( undefined != googleFonts[ fontName ] ){
				for( var index in googleFonts[ fontName ] ){

					var fontStyles = googleFonts[ fontName ][ index ].split(' '),
						$list = $fontVariant.find('li[data-font-weight = "' + fontStyles[ 0 ] + '"]');
					$list = $list.filter( '[data-font-style="' + fontStyles[ 1 ].toLowerCase() + '"]' );
					$list.addClass('active-font-weight');

				}
			}
		},

	});


	$(document).ready(function () {

		window.karmaBuilderTypography = new karmaBuilderTypography.view({
			el: $(document),
			model: typographyParams.typographyModel,
			googleFontList: JSON.parse(typographyParams.googleFonts)
		});

	})

})(jQuery, karmaBuilderTypography);
( function( $, karmaBuilder ){

	karmaBuilder.gizmos.sliderAndRadioButton = Backbone.View.extend({

		events: {
			'input .karma-range-slider-input.karma-input-slider-and-drop-dow'	: 'changeNumberInputValue',
			'input .karma-range-slider-slider-and-drop-down'					: 'changeSliderInputValue',
			'click input[class="karma-slider-and-drop-down-radio"]'				: 'changeclasses',

		},

		/**
		 * Build html for alignment gizmo
		 */
		template :' <button class="karma-drop-down-icon karma-slider-and-drop-down-gizmo"><div class="karma-default-icon" style="background-image: url({{ data.params.defaultIcon }})" ></div> </button> '
		+ '<div class="karma-drop-down-box karma-slider-and-drop-down karma-range-slider-container ">'
		+ '<div class="karma-range-slider-content">'
		+'<input type="range" class="karma-range-slider-slider-and-drop-down" value="{{{data.params.value}}}" min="{{{data.params.min}}}" max="{{{data.params.max}}}">'
		+ '<div class="karma-range-slider-number">'
		+ '<input type="number" class="karma-range-slider-input karma-input-number-type-input karma-input-slider-and-drop-dow"  value="{{{data.params.value}}}" min="{{{data.params.min}}}" max="{{{data.params.max}}}">'
		+ '<label class="karma-unit karma-input-number-type-unit">{{{ data.params.unit}}}</label>'
		+ '</div>'
		+ '</div>'
		+ '<div class="karma-drop-down-radio">'
		+'<# for( var i in data.params.field ) { #>'
		+ '<div class="karma-check-box-contain">'
		+ '<div class="karma-check-box-container">'
		+ '<div class="check-box-circle">'
		+ '<# var visited = ( data.defaultValue == data.params.field[i].value ) ? \'checked\' : \'\' ;#>'
		+ '<input type="radio" class="karma-slider-and-drop-down-radio" name="classes-{{ data.uniqeID }}" value="{{{ data.params.field[i].value}}}" <# print( visited ); #> >'
		+ '<label class="check-box-circle-fill" for="karma-input-checkbox-controller"></label>'
		+ '</div>'
		+ '</div>'
		+ '<div class="karma-link-open-new-tab-text">{{{ data.params.field[i].text}}}'
		+ '</div>'
		+ '</div>'
		+ '<# } #>'
		+ '</div>'
		+ '</div>' ,



		/**
		 * @summary initialize alignment
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		initialize :function(){

			this.setElement( $( '<div>' ) );

		},

		/**
		 * @summary render alignment
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		render: function(){

			this.update();
			this.$gizmoContainer.append( this.el );
			this.loadRangSlider();


		},

		update: function(){
			
			this.radioCheck();
			this.data.uniqeID = this.elementView.model.get('element_key');
			this.el.innerHTML = KarmaView.getUnderscoreTemplate( this.template, this.data );

		},
		/**
		 * @summary loading range slider
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		loadRangSlider : function () {

			var rangeSlider1 = this.el.querySelector( '.karma-range-slider-slider-and-drop-down' );
			$( rangeSlider1 ).rangeslider({

				polyfill: false

			});
		},

		/**
		 * @summary check radio checked
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		radioCheck: function () {

			if( 'undefined' != typeof this.data.params.type ){
				var type = this.data.params.type;
				this.data.defaultValue = this.elementView.getAttributes( [type] )[ type ];
			}else{
				this.data.defaultValue = this.elementView.getAttributes( ['type'] ).type;

			}

		},

		/**
		 * @summary change classes in radio button
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		changeclasses : function () {

			var karmaRangeSlider = this.elementView.el.querySelector('input.karma-slider-and-drop-down-radio:checked').value;
			if( 'undefined' != typeof this.data.params.type ){
				var modelNameChange = {};
				modelNameChange[ this.data.params.type ] = karmaRangeSlider;
				this.elementView.setAttributes( modelNameChange, false );
			}else{
				this.elementView.setAttributes( { 'type' : karmaRangeSlider }, false );
			}

		},

		/**
		 * @summary render alignment
		 *
		 * @since 0.1.0
		 *
		 * @returns {void}
		 */
		changeNumberInputValue : function () {

			var buttonInput = this.el.querySelector('.karma-range-slider-input'),
				karmaRangeSlider = this.el.querySelector( '.karma-range-slider-slider-and-drop-down' ),
					changedValue = ( "" == buttonInput.value ) ? buttonInput.defaultValue : buttonInput.value;

			if ( parseInt(changedValue) > parseInt( buttonInput.getAttribute( 'max' ) ) ){
				changedValue =  buttonInput.getAttribute( 'max' );
			} else if ( parseInt( changedValue ) < parseInt( buttonInput.getAttribute( 'min' ) ) ){
				changedValue = buttonInput.getAttribute( 'min' );
			}

			buttonInput.value = changedValue;
			karmaRangeSlider.value = changedValue ;
			$( karmaRangeSlider ).trigger( 'change' );

			this.setModels( changedValue );
			
		},

		changeSliderInputValue : function () {
			var buttonInput = this.el.querySelector('.karma-range-slider-input'),
				karmaRangeSlider = this.el.querySelector( '.karma-range-slider-slider-and-drop-down' );

			buttonInput.value = karmaRangeSlider.value;
			var changedValue = buttonInput.value;


			this.setModels( changedValue );


		},


		setModels : function ( changedValue ) {

			if( 'undefined' != typeof this.data.params.rangeModel ){
				var modelNameChange = {};
				modelNameChange[ this.data.params.rangeModel ] = changedValue;
				this.elementView.setAttributes( modelNameChange, false );
			}else{
				this.elementView.setAttributes( { 'rangemodel' : changedValue }, false );
			}
		}

	});

} )( jQuery, karmaBuilder );



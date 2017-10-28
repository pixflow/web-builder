jQuery( 'body' ).off( 'karma_finish_form_builder.range' ).on('karma_finish_form_builder.range',function() {


	var rangeSlider = document.querySelectorAll( '.karma-range-slider-content' );
	_.each( rangeSlider, function ( parent ) {
		var $ = jQuery;
		var $karmaRangeSlider = $( parent ).find( '.karma-range-slider-range' );
		var $karmaRangeInput = $( parent ).find( '.karma-range-slider-input' );

		$karmaRangeSlider.rangeslider({
		polyfill: false
			})
			.on( 'input', function () {
		$karmaRangeInput[0].value = this.value;
		});

		$karmaRangeInput.on( 'input', function () {
			var changedValue = ( "" == this.value ) ? this.defaultValue : this.value;
			$karmaRangeSlider.val( changedValue ).change();
		});
	});
});


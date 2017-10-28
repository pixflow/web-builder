jQuery( 'body' ).off( 'karma_finish_form_builder.range' ).on('karma_finish_form_builder.range',function() {


<<<<<<< a8362db2ca35d565d5d4f622eab28d4ff4eff1f5
	var rangeSlider = document.querySelectorAll( '.karma-range-slider-content' );
	_.each( rangeSlider, function ( parent ) {
		var $ = jQuery;
		var $karmaRangeSlider = $( parent ).find( '.karma-range-slider-range' );
		var $karmaRangeInput = $( parent ).find( '.karma-range-slider-input' );
=======
	$karmaRangeSlider.rangeslider({
			polyfill: false
	})
	.on('input', function (event) {

		$karmaRangeInput[0].value = this.value;

	});
>>>>>>> 3930a7cf3cc1b51e975eb808a030ccf8ee8d7f09


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


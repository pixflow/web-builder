jQuery('body').off('karma_finish_form_builder.range').on('karma_finish_form_builder.range',function() {

	var $ = jQuery;
	var $karmaRangeSlider = $('#karma-range-slider-range');
	var $karmaRangeInput = $('#karma-range-slider-input');

	$karmaRangeSlider.rangeslider({
			polyfill: false
	})
	.on('input', function () {
		$karmaRangeInput[0].value = this.value;
	});

	$karmaRangeInput.on('input', function () {

		var changedValue = ( "" == this.value ) ? this.defaultValue : this.value;
		$karmaRangeSlider.val(changedValue).change();

	});
} );
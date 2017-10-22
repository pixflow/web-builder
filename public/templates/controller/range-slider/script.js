jQuery('body').off('karma_finish_form_builder.radio-image').on('karma_finish_form_builder.radio-image',function() {

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
		$karmaRangeSlider.val(this.value).change();
	});
} );
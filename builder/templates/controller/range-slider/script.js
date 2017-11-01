jQuery( 'body' ).off( 'karma_finish_form_builder.range' ).on('karma_finish_form_builder.range',function() {


	var rangeSlider = document.querySelectorAll( '.karma-range-slider-content' );
	_.each( rangeSlider, function ( parent ) {

		var $ = jQuery,
		$karmaRangeSlider = $( parent ).find( '.karma-range-slider-range' ),
		$karmaRangeInput = $( parent ).find( '.karma-range-slider-input' ),
		changingSlider,
		doneChangingInterval = 500;

		$karmaRangeSlider.rangeslider({

			polyfill: false

		})
		.on( 'input', function () {

			$karmaRangeInput[0].value = this.value;
			clearTimeout( changingSlider );
			changingSlider = setTimeout( function () {
				$karmaRangeInput.trigger( 'input' );
			}, doneChangingInterval );

		});
		$karmaRangeInput.on( 'input', function () {

			var changedValue = ( "" == this.value ) ? this.defaultValue : this.value;
			$karmaRangeSlider.val( changedValue ).change();


		});

	});

});


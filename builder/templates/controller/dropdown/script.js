jQuery( document ).off( 'karma_finish_form_builder.dropdown-controller' ).on( 'karma_finish_form_builder.dropdown-controller', function( e, view ) {

	if ( null == document.querySelector( '.karma-dropdown-controller' ) ) {
		return;
	}

	$( '.karma-dropdown-controller' ).each(function ( key ) {

		var that = this;
		var selectedItem = $(this).find( "li[data-value *= " + $(this).find( '> input' ).val() + "] .karma-dropdown-option-title");
		$(that).find( '.karma-dropdown-selected-item' ).html( selectedItem.text() );

		$(that).find( '.karma-dropdown-selected-item , .karma-dropdown-icon' ).click(function () {

			var optionsContainer =  $(this).siblings( 'ul' );
			optionsContainer.addClass( 'karma-doropdown-opened' );
			optionsContainer.css( 'top', optionsContainer.find( '.karma-selected-dropdown-option' ).position().top * -1 );

		})

		$(this).find( '.karma-dropdown-options > li' ).click(function () {

			$(that).find('.karma-selected-dropdown-option').removeClass( 'karma-selected-dropdown-option' );
			$(this).addClass( 'karma-selected-dropdown-option' );
			$(this).closest( ' .karma-dropdown-controller > input' ).val( $(this).attr( 'data-value' ) );
			$(this).closest( ' .karma-dropdown-body ' ).find( '> .karma-dropdown-selected-item' ).html( $(this).find( '> .karma-dropdown-option-title' ).text() );
			karmaCloseDropdown();

		});

	});



	$('body:not(.karma-dropdown-body)').click(function (e) {

		if( $(e.target).hasClass( '.karma-dropdown-body' ) || $(e.target).closest( '.karma-dropdown-body' ).length ){
			return;
		}
		karmaCloseDropdown();

	})

	function karmaCloseDropdown(  ) {

		$( '.karma-dropdown-body > ul' ).removeClass( 'karma-doropdown-opened' );

	}

});
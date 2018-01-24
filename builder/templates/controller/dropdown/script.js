jQuery( document ).off( 'karma_finish_form_builder.dropdown-controller' ).on( 'karma_finish_form_builder.dropdown-controller', function( e, view ) {

	var	$ = jQuery;
	if ( null == document.querySelector( '.karma-dropdown-controller' ) ) {
		return;
	}


	$( '.karma-dropdown-controller' ).each(function () {

		var	$ = jQuery,
			that = this,
		 selectedItem = $( this ).find( "li[ data-value *= " + $( this ).find( '> input' ).val() + " ] .karma-dropdown-option-title" );
		$( that ).find( '.karma-dropdown-selected-item' ).html( selectedItem.text() );

		$( that ).find( '.karma-dropdown-header' ).click(function () {

			var optionsContainer =  $( this ).siblings( 'ul' );
			$( '.karma-doropdown-opened' ).removeClass( 'karma-doropdown-opened' );
			optionsContainer.addClass( 'karma-doropdown-opened' );
			var top =  optionsContainer.find( '.karma-selected-dropdown-option' ).position().top * -1 + $( this ).offset().top - $( window ).scrollTop(),
				left = $( this ).offset().left - 5;
			optionsContainer.css( {
				'top' : top,
				'left' : left
			} );

		});

		$( this ).find( '.karma-dropdown-options > li' ).click(function () {

			$( that ).find( '.karma-selected-dropdown-option' ).removeClass( 'karma-selected-dropdown-option' );
			$( this ).addClass( 'karma-selected-dropdown-option' );
			$( this ).closest( ' .karma-dropdown-controller ' ).find( '> input' ).val( $( this ).attr( 'data-value' ) ).trigger( 'input' );
			$( this ).closest( ' .karma-dropdown-body ' ).find( ' .karma-dropdown-selected-item' ).html( $( this ).find( '.karma-dropdown-option-title' ).text() );
			karmaCloseDropdown();
			$( this ).closest( ' .karma-dropdown-controller ' ).find( '> input' ).get(0).dispatchEvent( new Event('change') );
			var settingPanelContent = document.body.querySelector('.karma-element-setting-panel-content');
			if ( undefined != settingPanelContent ){
				settingPanelContent.style.overflow = '';
				settingPanelContent.style.overflow = 'hidden';
			}
		});

	});



	$( 'body:not( .karma-dropdown-body )' ).on('mousedown',function (e) {

		if( $(e.target).hasClass( '.karma-dropdown-body' ) || $(e.target).closest( '.karma-dropdown-body' ).length ){
			return;
		}
		karmaCloseDropdown();

	});

	function karmaCloseDropdown(  ) {

		$( '.karma-dropdown-body > ul' ).removeClass( 'karma-doropdown-opened' );

	}

});
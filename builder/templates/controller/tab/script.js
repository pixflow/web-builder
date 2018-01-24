jQuery( document ).off( 'karma_finish_form_builder.tab' ).on( 'karma_finish_form_builder.tab', function( e, view ) {

		var tabController = document.querySelector('.karma-controller-tab'),
			$ = jQuery;

		if( null == tabController ){
			return ;
		}

		$( tabController ).find('li').on( 'click', function () {
			var type = this.getAttribute('data-type'),

				input = document.querySelector('.karma-controller-tab input');

			if( 'video' == type ){
				//@TODO clear it when we have it
				return ;
			}

			this.closest('ul').querySelector('.karma-active-background-tab').classList.remove('karma-active-background-tab');
			this.classList.add('karma-active-background-tab');
			input.value = type ;
			input.dispatchEvent( new Event('change') );
			jQuery( input ).trigger( 'input' );
		});

});

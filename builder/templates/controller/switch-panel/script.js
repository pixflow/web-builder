jQuery( document ).off( 'karma_finish_form_builder.switch-panel-extra' ).on( 'karma_finish_form_builder.switch-panel-extra', function( e, view ) {

	var switchPanels = document.querySelectorAll( ".karma-switch-panel-container" );

	for( var switchPanel in switchPanels ){

		if( 'length' === switchPanel ){

			break;
		}

		var panel = switchPanels[ switchPanel ].querySelector( "#new-b-panel" ),
			button = switchPanels[ switchPanel ].querySelector( '.karma-switch-panel-button' ),
			$ =jQuery;

		panel.innerHTML =  view.formBuilderContentHtml( button.getAttribute( 'data-form' ) );

		$('body').on( 'click', '.karma-switch-panel-button', function () {

			var swithButtonAction =  $(this).attr( 'data-action' );
			console.log(swithButtonAction)
			$('.karma-switch-panel-button').attr( 'data-form' );
			if( 'open' === swithButtonAction ){

				$( "#elementRow" ).removeClass( 'active-sec' ).animate( {left: "-=360"}, {duration: 200, easing: "swing"} );

			}else if( 'close' === swithButtonAction ){

				$( "#elementRow" ).removeClass( 'active-sec' ).animate( {left: "0"}, {duration: 200, easing: "swing"} );

			}
		})

	}

});

jQuery( document ).off( 'karma_finish_form_builder.switch-panel-extra' ).on( 'karma_finish_form_builder.switch-panel-extra', function( e, view ) {

	if( null == document.querySelector('#new-form-builder-panel') ){
		return;
	}

	var switchPanels = document.querySelectorAll( ".karma-switch-panel-container" ),
			settingPanel = document.querySelector('#karma-Builder-form'),
			settingPanelHeight = settingPanel.getAttribute('data-height') ,
			$ = jQuery;


	var panelHeight = document.querySelector('#new-form-builder-panel').getAttribute('data-height');

	for( var switchPanel in switchPanels ) {

		if ( 'length' === switchPanel || "object" != typeof switchPanels [ switchPanel ] ) {
			break;
		}

		switchPanels[ switchPanel ].querySelector('.karma-switch-panel-button').addEventListener( 'click', function () {

			var action = this.getAttribute('data-action');
			if( 'open' == action ){
				$("#elementRow").removeClass('active-sec').animate( { left : "-=360" }, { duration : 300, easing : "swing" } );
				settingPanel.setAttribute( 'style', 'height:' + panelHeight + 'px' );
			}else{
				settingPanel.setAttribute( 'style', 'height:' + settingPanelHeight + 'px' );
				$( "#elementRow" ).removeClass( 'active-sec' ).animate( {left: "0"}, {duration: 300, easing: "swing"} );
			}

		});
	}

});

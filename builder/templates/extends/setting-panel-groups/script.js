jQuery(document).off( 'karma_finish_form_builder.groups' ).on( 'karma_finish_form_builder.groups', function() {

	var $ = jQuery,
		toggle = 0,
		settingPanel = document.querySelector('#karma-Builder-form'),
		settingPanelHeight = settingPanel.offsetHeight ,
		groupPanel =document.querySelector('.karma-group-panel');
		if( null === groupPanel ){
			return;
		}
		groupPanel.style.display = "block";
		var groupHeight = groupPanel.offsetHeight;
		groupPanel.style.display = "none";
		var settingPanelFullHeight = groupHeight + settingPanelHeight;

	$( '.karma-setting-panel-group-button' ).click( function () {

		var that = $(this);
		if( 0 == toggle ){
			settingPanel.setAttribute( 'style', 'height:' + settingPanelFullHeight + 'px' );
			$( this ).next(".karma-group-panel" ).slideDown(100);
			toggle = 1;
		}else if( toggle == 1 ){
			settingPanel.setAttribute( 'style', 'height:' + settingPanelHeight + 'px' );
			$( this ).next(".karma-group-panel" ).slideUp(300);
			toggle = 0;
		}
		$( this ).find('.karma-group-button-shape').toggleClass('karma-group-button-shape-rotate');
		$( this ).toggleClass('karma-group-border-radius');
		setTimeout(function (){
			var container = that.closest( '.karma-element-setting-panel-content' ),
			height = ( toggle ) ? settingPanelFullHeight : settingPanelHeight;
			container.css( 'overflow-y', '' ).css( 'overflow-y', 'hidden' );
			container.animate( { scrollTop: height }, 200 );
		 }, 300 );

	} );

} );

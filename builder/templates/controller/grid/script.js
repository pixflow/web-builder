jQuery( document ).off( 'karma_finish_form_builder.add-column' ).on( 'karma_finish_form_builder.add-column', function( e, viewObject ){

	var $ = jQuery;
	$('.karma-add-column-button, .karma-add-column-view-add').on( 'click', function () {

		var parentElement = $(this).closest('.grid-controller-template') ,
			gridCount = viewObject.currentGrid().length;

		if( 6 <= gridCount ){
			parentElement.find('.karma-add-column-view-add').css({ display : 'none' });
			return false;
		}
		var converTo = viewObject.calculateNewGrid();
		viewObject.changeRowLayout( converTo );
		parentElement.attr( 'data-current-grid', gridCount + 1 );

	});


});


jQuery( document ).off( 'changeRowLayout/finished.changeViewColumn' ).on( 'changeRowLayout/finished.changeViewColumn', function( e, layout ){

	var $ = jQuery,
		addButton = $('.karma-add-column-view-add');
	$( '.karma-add-column-view-length:not( .karma-add-column-view-add )' ).remove();
	for( var i=0; i < layout.length; i++ ){
		addButton.before('<div class="karma-add-column-view-length"></div>');
	}
	if( 6 > layout.length ){
		addButton.css( { display : 'flex' } );
	}else{
		addButton.css( { display : 'none' } );
	}

});
jQuery( document ).off('karma_finish_form_builder.add-column ').on('karma_finish_form_builder.add-column',function( e, viewObject ){

	var $ = jQuery;
	$('.karma-add-column-button, .karma-add-column-view-add').on( 'click', function () {

		var parentElement = $(this).closest('.grid-controller-template') ,
			gridCount = parseInt( parentElement.attr('data-current-grid') );

		if( 7 <= gridCount ){
			parentElement.find('.karma-add-column-view-add').fadeOut();
			return false;
		}
		var converTo = viewObject.calculateNewGrid();
		viewObject.changeRowLayout( converTo );
		parentElement.attr( 'data-current-grid', gridCount + 1 );

	});

});
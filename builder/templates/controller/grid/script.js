jQuery( document ).off('karma_finish_form_builder.add-column ').on('karma_finish_form_builder.add-column',function( e, viewObject ){

	var $ = jQuery;
	$('.karma-add-column-button, .karma-add-column-view-add').on( 'click', function () {

		var converTo = viewObject.calculateNewGrid();
		console.log(converTo);
		viewObject.changeRowLayout( converTo );

	});

});
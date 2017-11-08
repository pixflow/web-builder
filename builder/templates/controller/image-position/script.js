jQuery( document ).off( 'karma_finish_form_builder.image-position' ).on( 'karma_finish_form_builder.image-position',function(){

	var imgPosition = document.querySelectorAll( '.karma-image-position-box' ),
		imgPositioninput = document.querySelector( '.image-position-input' );
	
	if ( imgPositioninput.length < 0 ) return;
		 imgPositioninput.getAttribute( 'value' );
	var	 selected = document.querySelector( '.karma-image-position-box[data-value="' + inputAttr + '"]' );


	selected.classList.add( 'karma-image-position-selected-item' );

	for( var i in imgPosition ){
		imgPosition[ i ].onclick = changeValue;
	}

	function changeValue(){

		var input = this.parentNode.querySelector( 'input' );
		input.value = this.getAttribute( 'data-value' ) ;
		jQuery( input ).trigger( 'input' );
		add_class( this );

	}

	function add_class( that ) {

		var imgPosition = document.querySelectorAll( '.karma-image-position-box' );
		if ( imgPosition.length < 0 ) return;
		imgPosition.forEach(function ( item ) {
			item.classList.remove( 'karma-image-position-selected-item' );
		});
		that.classList.add( 'karma-image-position-selected-item' );
	}
});
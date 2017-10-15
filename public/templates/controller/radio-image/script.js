

jQuery('body').off('karma_finish_form_builder.radio-image').on('karma_finish_form_builder.radio-image',function(){
	var radioImg = document.querySelectorAll('.radio-image-controller-img');
	for( var i in radioImg ){
		radioImg[i].onclick = changeValue;
	}
	function changeValue(){

		this.parentNode.querySelector('input').value = this.getAttribute('data-value') ;

	}
});
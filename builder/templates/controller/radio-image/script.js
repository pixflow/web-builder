

jQuery('body').off('karma_finish_form_builder.radio-image').on('karma_finish_form_builder.radio-image',function(){
	var radioImg = document.querySelectorAll('.radio-image-controller-img');
	for( var i in radioImg ){

		radioImg[i].onclick = changeValue;
	}

	function changeValue(){

		this.parentNode.querySelector('input').value = this.getAttribute('data-value') ;
		add_class(this);

	}

	function add_class(that) {

		var radioImg = document.querySelectorAll('.radio-image-selected-item');
		if ( radioImg.length < 0 ) return;
		radioImg.forEach(function (item) {
			item.classList.remove('radio-image-selected-item');
		});
		that.classList.add('radio-image-selected-item');

	}
});
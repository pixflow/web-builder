jQuery(document).off( 'karma_finish_form_builder.switch-panel-extra' ).on( 'karma_finish_form_builder.switch-panel-extra', function( e, view ) {

	var switchPanels = document.querySelectorAll(".karma-switch-panel-container");

	for( var switchPanel in switchPanels ){

		if( 'length' === switchPanel ){
			break;
		}

		var panel = switchPanels[ switchPanel ].querySelector("#new-b-panel"),
			button = switchPanels[ switchPanel ].querySelector('.karma-switch-panel-button'),
			$ =jQuery;
		console.log(button)

		panel.innerHTML =  view.formBuilderContentHtml( button.getAttribute('data-form') );

		var swithButtonAction = button.getAttribute( 'data-action' );


		$('body').on( 'click' , '.karma-switch-panel-button', function () {
console.log($('.karma-switch-panel-button').attr('data-action'));
			$('.karma-switch-panel-button').attr('data-form')
			if( 'open' === swithButtonAction ){

				$("#elementRow").removeClass('active-sec').animate({left: "-=360"}, {duration: 200, easing: "swing"});

			}else if( 'close' === swithButtonAction ){

				$("#elementRow").removeClass('active-sec').animate({left: "0"}, {duration: 200, easing: "swing"});

			}
		})


	}

});




function test_dive_slider(){
	var $myForm = $('.test-drive-form')
	$(".test-drive-sec1-button").click(function() {
		if ( $(".test-drive-email").val().trim() != "") {

			if ($myForm[0].checkValidity()) {

				$(".test-drive-sec1").removeClass('active-sec').animate({left: "-=568", opacity: 0}, {duration: 200, easing: "swing"});
				$(".test-drive-sec2").delay(100).animate({left: "-=568", opacity: 1}, {duration: 200, easing: "swing"});
				$('.test-drive-container').animate({height: "+=211"}, {duration: 150, easing: "swing"});
				return false;
			}
		} else {

			if($(".test-drive-email").val().trim() == ""){
				$('.test-drive-email-validate2').css("opacity","1");
			}else{
				$('.test-drive-email-validate2').css("opacity","0");
			}
			if($('.privacy-policy').is(":checked")){
				$('.test-drive-privacy-validate ').css("opacity","0");
			}else{
				$('.test-drive-privacy-validate ').css("opacity","1");
			}


		}

	});

	$(".test-drive-sec2-button1").click(function() {
		$('.test-drive-privacy-validate ').css("opacity","0");
		$('.test-drive-email-validate2').css("opacity","0");
		$(".test-drive-sec1").addClass('active-sec').delay(100).animate({left:"+=568",opacity:1},{duration:200 ,easing:"swing"});
		$(".test-drive-sec2").animate({left:"+=568",opacity:0},{duration:200 ,easing:"swing"});
		$('.test-drive-container').animate({height:"-=211"},{duration:150 ,easing:"swing"});
		return false;
	});
}

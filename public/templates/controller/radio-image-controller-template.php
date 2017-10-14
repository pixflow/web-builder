
<div class="karma-radio-image-controller">
	<div class="radio-image-controller-template">
		<# var columnWidth = 12 / data.columns;
				if ( columnWidth % 1 != 0 ){
				alert( "COLUMN COUNT IS WRONG" );
			}
			else{

			 	 for( var i in data.field ) {
					var columnClass = "karma-col-md-"+columnWith; #>
					<div class=""><img src="{{{data.field[i].image}}}"></div>
				<# }
			} #>
	</div>
</div>
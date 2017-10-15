
<div class="karma-radio-image-controller">
	<div class="radio-image-controller-template">
		<# for( var i in data.field ) { #>
			<div class="radio-image-controller-img" data-value="{{ data.field[i].value }}"><img src="{{{data.field[i].image}}}"></div>
		<# } #>
		<input	type="text" name="{{{ data.name }}}" class="hidden-input" value="">
	</div>
</div>